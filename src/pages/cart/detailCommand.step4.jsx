import React from 'react'
import { Link } from 'react-router-dom'
import ProductTable from './productTable';

export default function DetailCommand(props) {
    const user = props.state.userDelivery.lastname +" "+ props.state.userDelivery.firstname

    return (
        <>
           <h1 className='mt-5'>Thanks {user} for your purchase</h1> 
           <div className="jumbotron">
            <h5>The reference for your command is ref.</h5>
                <h5>A purchase confirmation email has been sent to your inbox.</h5>
                <h5>See you soon in our shop!</h5>
            </div>

            <h4>Command Details</h4>
            <ProductTable products={props.state.products} />

            <div>
                <p><b>Delivery method :</b> {props.state.deliveryMethod}</p>
                <p><b>Total amount :</b> {props.state.total} €</p>
            </div>
           <Link to="/" className="btn btn-primary mb-5" style={{width:'40%'}}>Back to homepage</Link>
        </>
    )
}
