import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CardProduct from '../components/product/cardProduct'
import { BASE_URL } from '../services/data'

export default function Products() {
    const [product, setProduct] = useState([])

    useEffect(() => {
        axios.get(BASE_URL + "/sneakers")
            .then(res => setProduct(res.data))
    }, [])

    return (
        <>
            <h1 className="my-3">Liste des produit</h1>
            <div className="row">
                {product.map(p => <CardProduct key={p.id} product={p} />)}
            </div>
        </>
    )
}
