import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {getCart} from '../services/cart/cart'

export default function Cart() {
    const [products, setProducts] = useState(getCart())
    

    const handleChange = event => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
        const productCart = products.filter(p => p.product.id == name )[0]
        productCart.quantity = value == "" ? 1 : +parseInt(value)
        productCart.totalPrice = productCart.quantity * productCart.price

        setProducts([...products])
    } 

    const totalAmount = _ => {
        let total = 0;

        products.forEach(element => {
            total += element.totalPrice
        });

        return total;
    }

    return (
        <>
            <h1 className="my-5">Your cart</h1>

            <table className="table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p,key) => {
                        const product = p.product
                        return (
                            <tr key={key}>
                                <td>
                                    <div className='d-flex'>
                                        <img src={product.grid_picture_url} width="100px"/>
                                        {product.name} <br/>
                                        {product.color}
                                    </div>
                                </td>
                                <td>
                                    {p.price} €
                                </td>
                                <td>
                                   <input className='form-control form-control-sm' type="number" min='1' name={product.id}  value={p.quantity} onChange={handleChange}/>
                                </td>
                                <td>
                                    {p.totalPrice} €
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <div>
                <p className='mb-2' style={{fontSize:"18px", margin:0}}>Delevery method</p>
                <div className="form-group">
                        <div className="custom-control custom-radio">
                            <input type="radio" id="customRadio1" name="gender" className="custom-control-input" value="relay"/>
                            <label className="custom-control-label" htmlFor="customRadio1">Relay point (free)</label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input type="radio" id="customRadio2" name="gender" className="custom-control-input" value="colissimo"/>
                            <label className="custom-control-label" htmlFor="customRadio2">Collisimo 5,90 €</label>
                        </div>      
                    </div>
            </div>

            <div>
                <p className='mb-2' style={{fontSize:"18px", margin:0}}>Total amount</p>
                <p style={{fontSize:"18px"}}><b>{totalAmount()} €</b></p>
            </div>

            <div className="d-flex justify-content-between mb-5">
                <Link to='/products' className="btn btn-primary" style={{width:'40%'}}>Continue purchase</Link>
                <Link className="btn btn-success" style={{width:'40%'}}>Validate cart</Link>
            </div>
        </>
    )
}
