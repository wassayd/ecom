import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MyCarousel from '../components/home/carousel'
import CardProduct from '../components/product/cardProduct'
import { BASE_URL } from '../services/data'


export default function Home() {
    const [product, setProduct] = useState([])

    useEffect(() => {
        axios.get(BASE_URL + "/sneakers?_limit=3")
            .then(res => setProduct(res.data))
    }, [])

    return (
        <>
            <MyCarousel />
            <h1 className="mt-3">Nos produits phares</h1>
            <div className="row">
                {product.map(p => <CardProduct key={p.id} product={p} />)}
            </div>
            <h2 className="mt-3">Présentation de l'entreprise</h2>
            <div className="d-flex">
                <img src="http://via.placeholder.com/640x360" alt=""/>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Ex obcaecati aliquid, assumenda veritatis quisquam adipisci
                repudiandae incidunt aliquam doloribus dolorem quae aspernatur voluptate?
                 Molestiae eveniet nam suscipit cumque velit. Ducimus?</p>
            </div>
           
        </>
    )
}
