import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../services/data'
import { centsToEuro, convertAllSize } from '../services/product/product'
 import {addProductToCart} from '../services/cart/cart'

export default function ProductShow({match}) {
    const [product, setProduct] = useState({})
    const [size, setSize] = useState([])
    const [cart, setCart] = useState({productId:"",quantity:1, size: ""})

    useEffect(() => {
        axios.get(BASE_URL+"/sneakers/"+match.params.id)
        .then(res => {
            setProduct(res.data);
            return res.data;
        })
        .then((product)=> {
            const arrSorted = [... new Set(convertAllSize(product.size_range))].sort()
            setSize(arrSorted)
            setCart({...cart,productId: product.id, size: arrSorted[0]})
        })
    }, [])

    const handleChange = event => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
 
        setCart({...cart, [name]: value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        cart.price = centsToEuro(product.retail_price_cents)
        cart.quantity = parseInt(cart.quantity)
        addProductToCart(cart)
    }

    return (
        <>
            <div className="d-flex">
               <img className="border m-5" src={product.original_picture_url} alt="" width="50%"/>
                <div className="content">
                    <h3 className="mt-5">{product.name}</h3>
                    <h4 className="mt-2">{centsToEuro(product.retail_price_cents)} €</h4>
                    <div className="d-flex flex-column mt-3">
                        <p style={{fontSize:"14px", margin: 0}}><b>Color:</b></p>
                        <div style={{backgroundColor:product.color, width:"24px", height:"24px", borderRadius:100}}></div>
                    </div>
                    <form className="mt-2" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="size"><b>Size :</b></label>
                            <select name="size" id="size" className="form-control" onChange={handleChange} value={cart.size}>
                                { size && size.map((s, key) => <option key={key}>{s}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="quantity"><b>Quantity :</b></label>
                            <input type="number" name="quantity" id="quantity" className="form-control" onChange={handleChange} value={cart.quantity}/>
                        </div>
                        <button type="submit" className="btn btn-primary form-control">Add to cart</button>
                    </form>
                    {product.story_html && <div className="content jumbotron" dangerouslySetInnerHTML={{__html:product.story_html}}></div>}
                </div>

            </div>
            
        </>
    )
}