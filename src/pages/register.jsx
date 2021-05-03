import axios from 'axios';
import React, { useContext, useState } from 'react'
import Inputlabel from '../components/form/inputlabel';
import { BASE_URL } from '../services/data';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setUserLocalStorage } from '../services/user/user.service';
import { AuthContext } from '../App';
import { Redirect } from 'react-router';

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
            <form onSubmit={handleSubmit} className="mb-5">
                <fieldset> 
                    <div className="form-group">
                        <label htmlFor="gender">Civilité</label>
                        <div className="custom-control custom-radio">
                            <input type="radio" id="customRadio1" name="gender" className="custom-control-input" onChange={handleChange} value="H"/>
                            <label className="custom-control-label" htmlFor="customRadio1">Homme</label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input type="radio" id="customRadio2" name="gender" className="custom-control-input" onChange={handleChange} value="F"/>
                            <label className="custom-control-label" htmlFor="customRadio2">Femme</label>
                        </div>      
                    </div>
                </fieldset>
                <Inputlabel type="text" label="Nom" name="lastname" value={credentials.lastname}
                    placeholder="Veuillez saisir un nom" change={handleChange} />

                <Inputlabel type="text" label="Prenom" name="firstname" value={credentials.firstname}
                    placeholder="Veuillez saisir un prenom" change={handleChange} />

                <Inputlabel type="email" label="Email" name="email" value={credentials.email}
                    placeholder="Veuillez saisir un email" change={handleChange} />

                <Inputlabel type="password" label="Mot de passe" name="password" value={credentials.password}
                    placeholder="Veuillez saisir un mot de passe" change={handleChange} />

                <Inputlabel type="tel" label="Tél" name="phone" value={credentials.phone}
                    placeholder="Veuillez saisir un numéro de téléphone" change={handleChange} />

                <Inputlabel type="text" label="Pays" name="country" value={credentials.address.country}
                    placeholder="Veuillez saisir un pays" change={handleChange} />

                <Inputlabel type="text" label="Ville" name="city" value={credentials.address.city}
                    placeholder="Veuillez saisir une ville" change={handleChange} />

                <Inputlabel type="text" label="N°" name="num" value={credentials.address.num}
                    placeholder="Veuillez saisir un n°" change={handleChange} />

                <Inputlabel type="text" label="Rue" name="street" value={credentials.address.street}
                    placeholder="Veuillez saisir une rue" change={handleChange} />

                <Inputlabel type="text" label="Code postale" name="postalCode" value={credentials.address.postalCode}
                    placeholder="Veuillez saisir un code postal" change={handleChange} />

                <button className="btn btn-primary form-control" type="submit">Enregistrer</button>
            </form>
        </>
    )
}