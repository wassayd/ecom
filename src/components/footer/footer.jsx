import axios from 'axios';
import React, { useState } from 'react'
import { BASE_URL } from '../../services/data';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Footer(props) {
    const [email, setEmail] = useState("")


    const handleChange = event => {
        const value = event.currentTarget.value;
        setEmail(value)
    }

    const handleSubmit = e => {
        e.preventDefault;

        axios.post(BASE_URL + "/newsletter", {
            email
        })
            .then(res => {
                setEmail("")
                console.log(res);
                if (res.status === 201) {
                    toast.success(email + ' added to newsletter!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }


            })
    }

    return (
        <footer className="footer bg-primary text-center text-white">
            <ToastContainer />
            <div className="container p-4">
                <section className="mb-4">
                    <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i className="fab fa-facebook-f"></i></a>
                    <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i className="fab fa-twitter"></i></a>
                    <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i className="fab fa-google"></i></a>
                    <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i className="fab fa-instagram"></i></a>
                    <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i className="fab fa-linkedin-in"></i></a>
                    <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i className="fab fa-github"></i></a>
                </section>

                <section>
                    <form onSubmit={handleSubmit}>
                        <div className="row d-flex justify-content-center">

                            <div className="col-auto">
                                <p className="pt-2">
                                    <strong>Sign up for our newsletter</strong>
                                </p>
                            </div>

                            <div className="col-md-5 col-12">
                                <div className="form-outline form-white mb-4">
                                    <input type="email" id="form5Example2" className="form-control" value={email} onChange={handleChange} />
                                    <label className="form-label" htmlFor="form5Example2">Email address</label>
                                </div>
                            </div>

                            <div className="col-auto">
                                <button type="submit" className="btn btn-outline-light mb-4">
                                    Subscribe
                                </button>
                            </div>
                        </div>

                    </form>
                </section>

                <section className="mb-4">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum
                        repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam
                        eum harum corrupti dicta, aliquam sequi voluptate quas.
              </p>
                </section>

                <section className="">

                    <div className="row">

                        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5 className="text-uppercase">Links</h5>

                            <ul className="list-unstyled mb-0">
                                <li>
                                    <a href="#!" className="text-white">Link 1</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Link 2</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Link 3</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Link 4</a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5 className="text-uppercase">Links</h5>

                            <ul className="list-unstyled mb-0">
                                <li>
                                    <a href="#!" className="text-white">Link 1</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Link 2</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Link 3</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Link 4</a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5 className="text-uppercase">Links</h5>

                            <ul className="list-unstyled mb-0">
                                <li>
                                    <a href="#!" className="text-white">Link 1</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Link 2</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Link 3</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Link 4</a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5 className="text-uppercase">Links</h5>

                            <ul className="list-unstyled mb-0">
                                <li>
                                    <a href="#!" className="text-white">Link 1</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Link 2</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Link 3</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-white">Link 4</a>
                                </li>
                            </ul>
                        </div>

                    </div>

                </section>

            </div>
        </footer>

    )
}
