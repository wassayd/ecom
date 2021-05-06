import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import Inputlabel from '../components/form/inputlabel'
import { BASE_URL } from '../services/data';

export default function Contact() {
    const [contact, setContact] = useState({
        lastname:'',
        firstname:'',
        email:'',
        phone:'',
        message: ""
    })

    const handleChange = e => {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;

        setContact({ ...contact, [name]: value })
        
    }
    
    const handleSubmit = e => {
        e.preventDefault()

        if (Object.values(contact).filter((item) => item === "").length > 0) {
            toast.error("Please compelete the form", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
      
            return false;
          }

        axios.post(BASE_URL+'/contact', contact)
        .then(res => {
            toast.success("Your message was sent", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });

              setContact({
                lastname:'',
                firstname:'',
                email:'',
                phone:'',
                message: ""
            })
        })
    }

    return (
        <>
            <h1 className="jumbotron mt-3">Contact</h1>
            <form onSubmit={handleSubmit} className="my-4">
                <Inputlabel change={handleChange} label="Firstname" placeholder="Firstname" name="firstname" type="text" value={contact.firstname}/>
                <Inputlabel change={handleChange} label="Lastname" placeholder="Lastname" name="lastname" type="text" value={contact.lastname}/>
                <Inputlabel change={handleChange} label="Email" placeholder="Email" name="email" type="emil" value={contact.email}/>
                <Inputlabel change={handleChange} label="Phone" placeholder="Phone" name="phone" type="tel" value={contact.phone}/>
                <label htmlFor="message">Message</label>
                <textarea name="message" id="message" value={contact.message} onChange={handleChange} 
                cols="30" rows="10" className="form-control" placeholder="Message ..."></textarea>
                <input type="submit" value="Submit" className="btn btn-success form-control mt-3"/>
            </form>
        </>
    )
}
