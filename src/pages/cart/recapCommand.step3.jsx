import React, { useState } from "react";
import ProductTable from "./productTable";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useHistory } from "react-router";
import { BASE_URL, generateRandomNumber } from "../../services/data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { removeCart } from "../../services/cart/cart";
import { formattedDate } from "../../services/utlilities";

export default function RecapCommand(props) {
  const [command, setCommand] = useState({
    userId: "",
    deliveryInformation: {},
    ref: "",
    date: "",
    produits: [],
  });
  const [payment, setPayment] = useState({
    numcard: "",
    month: "",
    year: "",
    crypto: "",
  });

  const history = useHistory();

  const handleChange = (e) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;
    setPayment({ ...payment, [name]: value });
  };

  const isValid = (_) => {
     
    if (Object.values(payment).filter((item) => item === "").length > 0) {
      toast.error("Please compelete the form", {
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

  const cancel = (_) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to cancel your purchase ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => history.push("/"),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const validateCommand = () => {
    const { deliveryMethod, products, userDelivery, userId } = props.state;

    let productsFiltered = (_) => {
      let res = [];
      products.forEach((p) => {
        res.push({...p, product: p.product.id })
      });
      return res
    };

    const command = {
      deliveryMethod,
      orderLine: productsFiltered(),
      userDelivery,
      userId,
      date: formattedDate()
    };
 
    return axios.post(BASE_URL + "/command", command);
  };

  return (
    <>
      <h1>Command summary</h1>
      <ProductTable products={props.state.products} />

      <h3>Your payment</h3>
      <div>
        <p>Please enter your card informations</p>
        <form id="paymentForm">
          <div className="form-group">
            <label htmlFor="numCard">Card num</label>
            <input
              type="text"
              name="numcard"
              id="numcard"
              value={payment.numcard}
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="numCard">Expiration date </label>
            <div className="d-flex">
              <div className="form-group mr-5">
                <label htmlFor="month">Month</label>
                <input
                  type="number"
                  id="month"
                  name="month"
                  value={payment.month}
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="year">Year</label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={payment.year}
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="numCard">Visual cryptogram</label>
            <input
              type="number"
              name="crypto"
              value={payment.crypto}
              className="form-control"
              style={{ width: "115px" }}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>
      <div className="d-flex justify-content-between mb-5">
        {props.hasPrev() && (
          <button
            onClick={cancel}
            style={{ width: "40%" }}
            className="btn btn-danger"
          >
            Cancel
          </button>
        )}
        {props.hasNext() && (
          <button
            onClick={(_) => {
              if (isValid()) {
                validateCommand()
                .then(res => {
                    props.next();
                    removeCart()
                });
              }
            }}
            style={{ width: "40%" }}
            className="btn btn-success"
          >
            Validate & pay
          </button>
        )}
      </div>
    </>
  );
}
