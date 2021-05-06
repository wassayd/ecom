import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../services/data'
import { centsToEuro, convertAllSize } from '../services/product/product'
import { addProductToCart } from '../services/cart/cart'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductShow({ match }) {
    const [product, setProduct] = useState({})
    const [size, setSize] = useState([])
    const [cartline, setCartLine] = useState({ product: {}, quantity: 1, size: "", totalPrice: 0 })

    useEffect(() => {
        axios.get(BASE_URL + "/sneakers/" + match.params.id)
            .then(res => {
                setProduct(res.data);
                return res.data;
            })
            .then((product) => {
                const arrSorted = [... new Set(convertAllSize(product.size_range))].sort()
                setSize(arrSorted)
                setCartLine({ ...cartline, product, size: arrSorted[0] })
            })
    }, [])

    const handleChange = event => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        setCartLine({ ...cartline, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        cartline.price = centsToEuro(product.retail_price_cents)
        cartline.quantity = parseInt(cartline.quantity)
        cartline.totalPrice = cartline.price * cartline.quantity
        addProductToCart(cartline)
        toast.success("Your product was successfuly added to cart", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        
    }

    return (
        <>
        <ToastContainer/>
            <div className="d-flex">
                <img className="border m-5" src={product.original_picture_url} alt="" width="50%" />
                <div className="content">
                    <h3 className="mt-5">{product.name}</h3>
                    <h4 className="mt-2">{centsToEuro(product.retail_price_cents)} €</h4>
                    <div className="d-flex flex-column mt-3">
                        <p style={{ fontSize: "14px", margin: 0 }}><b>Color:</b></p>
                        <div style={{ backgroundColor: product.color, width: "24px", height: "24px", borderRadius: 100 }}></div>
                    </div>
                    <form className="mt-2" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="size"><b>Size :</b></label>
                            <select name="size" id="size" className="form-control" onChange={handleChange} value={cartline.size}>
                                {size && size.map((s, key) => <option key={key}>{s}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="quantity"><b>Quantity :</b></label>
                            <input type="number" name="quantity" id="quantity" className="form-control" onChange={handleChange} value={cartline.quantity} />
                        </div>
                        <button type="submit" className="btn btn-primary form-control">Add to cart</button>
                    </form>
                    {product.story_html && <div className="content jumbotron my-2" dangerouslySetInnerHTML={{ __html: product.story_html }}></div>}
                </div>

            </div>

        </>
    )
}
