import axios from 'axios';
import React, { useContext, useState } from 'react'
import Inputlabel from '../components/form/inputlabel';
import { BASE_URL } from '../services/data';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setUserLocalStorage } from '../services/user/user.service';
import { AuthContext } from '../App';
import { Redirect } from 'react-router';
import UserForm from './form/userForm';

export default function Register() {
    const [credentials, setCredentials] = useState({
        firstname: "",
        lastname: "",
        email: "",
        gender: "",
        password: "",
        phone: "",
        address: {
            num: "",
            street: "",
            postalCode: "",
            city: "",
            country: ""
        }
    })

    const context = useContext(AuthContext)

    const handleSubmit = e => {
        e.preventDefault();
        axios.post(BASE_URL + "/user", credentials)
            .then(res => {
                if(res.status === 201) {
                    toast.success("L'utilisateur a bien etais ajouté", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setCredentials({
                        firstname: "",
                        lastname: "",
                        email: "",
                        gender: "",
                        password: "",
                        phone: "",
                        address: {
                            num: "",
                            street: "",
                            postalCode: "",
                            city: "",
                            country: ""
                        }
                    })

                    setUserLocalStorage(res.data)
                }
            })

    }

    const handleChange = e => {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;

        if (name in credentials.address) {
            setCredentials({
                ...credentials, address: {
                    ...credentials.address,
                    [name]: value
                }
            })

        } else {
            setCredentials({ ...credentials, [name]: value })
        }

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
            <ToastContainer/>
            <h1>S'inscrire</h1>
            <UserForm handleChange={handleChange} handleSubmit={handleSubmit} user={credentials} showBtn={true} showPassword={true}/>
        </>
    )
}