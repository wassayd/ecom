import axios from 'axios';
import React, { useContext, useState } from 'react'
import Inputlabel from '../components/form/inputlabel';
import {AuthContext} from '../App'
import { Redirect } from 'react-router';
import { BASE_URL } from '../services/data';
import { setUserLocalStorage } from '../services/user/user.service';

export default function Login(props) {
    const [credentatials, setCredentatials] = useState({email:'', password: ''})
    const [error, setError] = useState(false)
    const context = useContext(AuthContext)
    const handleChange = event => {
        setError(false)
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        setCredentatials({...credentatials, [name]: value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        const url = BASE_URL+"/user";

        const result = axios.get(url , {
            params: {
                email: credentatials.email,
                password: credentatials.password
            }
        })
        
        result.then(res => {
            const user = res.data[0]

            if(!user) {
                context.setConnected(false)
                setError(true)
                return;
            }  
        
            context.setConnected(true)
            setUserLocalStorage(res.data)
            props.history.push('/')
        })
    }

    if(context.isConnected){
        return <Redirect
            to={{
            pathname: "/",
            state: { from: '/login' }
            }}
      />
    }
    return (
        <>
            <h1>Se connecter</h1>
            {error &&       
                <div className="alert alert-danger">
                    Le mot de passe/email est invalide
                </div>}
            <form onSubmit={handleSubmit} className="mb-2">
                <Inputlabel name="email" type="email" label="Email" placeholder="Email" value={credentatials.email} change={handleChange}/>
                <Inputlabel name="password" type="password" label="Password" placeholder="Password" value={credentatials.password} change={handleChange}/>
                <button type="submit" className="btn btn-primary form-control">Submit</button>
            </form>
        </>
    )
}
