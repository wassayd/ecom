import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCart } from "../../services/cart/cart";
import ProductTable from "./productTable";

export default function Cart(props) {
  const [products, setProducts] = useState(getCart());
  const [deliveryMethod, setDeliveryMethod] = useState({
    name: "",
    price: 0,
  });

  const handleChange = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    const productCart = products[name];
    productCart.quantity = value == "" ? 1 : +parseInt(value);
    productCart.totalPrice = productCart.quantity * productCart.price;

    setProducts([...products]);
  };

  const handleChangedDeliveryMethod = (e) => {
    const value = e.currentTarget.value;
    setDeliveryMethod({
      name: value,
      price: parseFloat(e.currentTarget.dataset.price),
    });
  };

  const totalAmount = (_) => {
    let total = 0;

    products.forEach((element) => {
      total += element.totalPrice;
    });
    console.log(deliveryMethod);
    return total + deliveryMethod.price;
  };

  const isValid = (_) => {
    if (deliveryMethod.name === "") {
      toast.error("Please choose a delivery method", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return false;
    }

    return true;
  };

  return (
    <>
      <ToastContainer />
      <h1 className="my-5">Your cart</h1>

      <ProductTable products={products} handleChange={handleChange} />

      <div>
        <p className="mb-2" style={{ fontSize: "18px", margin: 0 }}>
          Delivery method
        </p>
        <div className="form-group">
          <div className="custom-control custom-radio">
            <input
              type="radio"
              id="customRadio1"
              name="deliverymethod"
              className="custom-control-input"
              onChange={handleChangedDeliveryMethod}
              value="Relay point"
              data-price="0"
            />
            <label className="custom-control-label" htmlFor="customRadio1">
              Relay point (free)
            </label>
          </div>
          <div className="custom-control custom-radio">
            <input
              type="radio"
              id="customRadio2"
              name="deliverymethod"
              className="custom-control-input"
              onChange={handleChangedDeliveryMethod}
              value="Collisimo"
              data-price="5.90"
            />
            <label className="custom-control-label" htmlFor="customRadio2">
              Collisimo 5,90 €
            </label>
          </div>
        </div>
      </div>

      <div>
        <p className="mb-2" style={{ fontSize: "18px", margin: 0 }}>
          Total amount
        </p>
        <p style={{ fontSize: "18px" }}>
          <b>{totalAmount()} €</b>
        </p>
      </div>

      <div className="d-flex justify-content-between mb-5">
        <Link
          to="/products"
          className="btn btn-primary"
          style={{ width: "40%" }}
        >
          Continue purchase
        </Link>
        <button
            disabled={products.length === 0 ? true: false}
          onClick={() => {
            if (isValid() && products.length > 0) {
              props.next();
              props.state.deliveryMethod = deliveryMethod.name;
              props.state.products = products;
              props.state.total = totalAmount()
            }
          }}
          className="btn btn-success"
          style={{ width: "40%" }}
        >
          Validate cart
        </button>
      </div>
    </>
  );
}
