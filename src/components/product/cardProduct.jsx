import React from 'react'
import { Link } from 'react-router-dom'
import { centsToEuro } from '../../services/product/product'

export default function CardProduct({ product }) {
    return (
        <div className="col-md-4">
            <div className="card border-primary mb-4" style={{ maxWidth: '20rem' }}>
                <div className="card-header">
                    <img src={product.grid_picture_url} alt="" width="100%"/>
                </div>
                <div className="card-body">
                    <h4 className="card-title">{product.name}</h4>
                    <p className="card-text">
                        <b>{centsToEuro(product.retail_price_cents)}€</b>
                        <Link to={"product/"+product.id} className="btn btn-primary float-right">Voir</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
