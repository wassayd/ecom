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
    const [products, setProducts] = useState([])
    useEffect(() => {
        axios.get(BASE_URL+'/command',{
            params:{userId: user.id}
        })
        .then(res => {
            setCommands(res.data);
            return res.data;
        })
        .then(data => {
            data.forEach(cmd => {
                cmd.sneakers.forEach(productId => {
                    axios.get(BASE_URL+'/sneakers/'+productId)
                    .then(res => {
                        cmd.sneakers[Object.keys(cmd.sneakers).find(k=>cmd.sneakers[k]===productId)] = res.data
                        let key = cmd.id
                        setProducts([{[key]: [...cmd.sneakers]}])
                    })
                });
            });
        })

    }, [])

    if(!context.isConnected){
        return <Redirect to="/"/>
    }

    return (
        <>
            <h1 className="jumbotron mt-2">Hi {user.lastname} {user.firstname} - my commands</h1>

            <div>
                {products.length > 0 && commands.map(cmd => console.log(products))}
                
            </div>
        </>
    )
}
