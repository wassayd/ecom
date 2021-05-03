import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CardProduct from '../components/product/cardProduct'
import { BASE_URL } from '../services/data'

export default function Products() {
    const [product, setProduct] = useState([])
    const [params, setParams] = useState({})
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get(BASE_URL + "/category")
        .then(res => setCategories(res.data))

        axios.get(BASE_URL + "/sneakers", {
            params
        })
        .then(res => setProduct(res.data))
    }, [params])

    const handleChange = event => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        if(value === "all"){
            setParams({})
            return;
        }

        setParams({...params, [name]: value})
    }

    return (
        <>
            <h1 className="my-3">Liste des produit</h1>
            <div className="row mb-4">
                <div className="col-md-4">
                    <label htmlFor="gender">Gender</label>
                    <select name="gender" id="gender" className="form-control" onChange={handleChange}>
                        <option value="all">All</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <label htmlFor="gender">Category</label>
                    <select name="category" id="category" className="form-control" onChange={handleChange}>
                        {categories && categories.map((category, key) => <option key={key} value={category.name}>{category.name}</option>)}
                    </select>
                </div>
            </div>
            <div className="row">
                {product.length === 0 && 
                    <div className="col-md-12">
                        <div className="alert alert-warning">Products not found</div>
                    </div>
                }
                {product.map(p => <CardProduct key={p.id} product={p} />)}
            </div>
        </>
    )
}
