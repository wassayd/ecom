import axios from "axios";
import React, { useEffect, useState } from "react";
import MyCarousel from "../components/home/carousel";
import CardProduct from "../components/product/cardProduct";
import { BASE_URL } from "../services/data";

export default function Home() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get(BASE_URL + "/sneakers?_limit=3")
      .then((res) => setProduct(res.data));
  }, []);

  return (
    <>
      <MyCarousel />
      <h1 className="mt-3">Our featured products</h1>
      <div className="row">
        {product.map((p) => (
          <CardProduct key={p.id} product={p} />
        ))}
      </div>
      <h2 className="mt-3">Presentation</h2>
      <div className="d-flex my-3">
        <img
          src="https://numero.twic.pics/images/article/homepage/full/lidl-sneakers-baskets-prix-encheres-chaussettes-numero-magazine.jpg?twic=v1/cover=4:3/resize=600" width="100%"
          className="mr-3"
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus modi
          praesentium voluptates neque. Soluta distinctio recusandae tempora
          voluptatum sunt eius corporis nemo? Reprehenderit numquam deleniti
          iusto veritatis excepturi, magnam ducimus! Non molestiae, recusandae
          quisquam veritatis ipsum dolore consequuntur cum neque voluptatibus
          voluptates, accusantium libero debitis veniam vel omnis officia, dolor
          quam atque similique id nulla eaque impedit facere voluptatum. Eum.
          Alias sequi asperiores deserunt. Architecto aut asperiores commodi
          doloremque. Rerum, ipsam eveniet libero, debitis repudiandae similique
          assumenda dolore quisquam veniam vitae, corrupti laudantium? Culpa at
          veniam, excepturi repellendus earum quam! Quibusdam, consequuntur eius
          omnis fuga ipsum sed necessitatibus recusandae vitae enim qui
          perferendis magni minima temporibus velit officiis nulla repellat quo
          voluptas iusto corporis eum. Velit expedita vero hic veritatis.
          Consectetur eius iusto doloribus sequi eveniet facilis. Animi, nisi
          vel dolorum labore inventore voluptate, odit quasi harum laboriosam
          maiores corrupti tempore. Placeat impedit quis suscipit facilis illum
          iure. Quasi, mollitia.
          voluptas iusto corporis eum. Velit expedita vero hic veritatis.
          Consectetur eius iusto doloribus sequi eveniet facilis. Animi, nisi
          vel dolorum labore inventore voluptate, odit quasi harum laboriosam
          maiores corrupti tempore. Placeat impedit quis suscipit facilis illum
          iure. Quasi, mollitia.
          maiores corrupti tempore. Placeat impedit quis suscipit facilis illum
          iure. Quasi, mollitia.
          maiores corrupti tempore. Placeat impedit quis suscipit facilis illum
          iure. Quasi, mollitia.
        </p>
      </div>
    </>
  );
}
