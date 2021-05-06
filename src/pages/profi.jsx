import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import { AuthContext } from '../App'
import { BASE_URL } from '../services/data';
import { getUser, logout } from '../services/user/auth';
import ProductTable from './cart/productTable';


export default function Profil() {
    const context = useContext(AuthContext)
    const user = getUser()[0];
    const [commands, setCommands] = useState([])

    useEffect(() => {
        axios.get(BASE_URL+'/command',{
            params:{userId: user.id}
        })
        .then(res => {
            res.data.map(cmd => {
                cmd.orderLine.map(o => {
                    axios.get(BASE_URL+"/sneakers/"+o.product)
                    .then(res => {
                       o.product = res.data;
                    })
                })
            })
            setCommands(res.data);
        })
    }, [commands])

    if(!context.isConnected){
        return <Redirect to="/"/>
    }

    return (
        <>
            <h1 className="jumbotron mt-2">Hi {user.lastname} {user.firstname} - my commands</h1>

            <div>
                {commands && commands.map((cmd, k) => typeof cmd.orderLine.product === 'object' && <ProductTable key={k} products={cmd.orderLine}/>)}
                
            </div>
        </>
    )
}
