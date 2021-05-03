import React from 'react'
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
                    </p>
                </div>
            </div>
        </div>
    )
}
