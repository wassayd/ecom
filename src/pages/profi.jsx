import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router";
import { AuthContext } from "../App";
import { BASE_URL } from "../services/data";
import { getUser, logout } from "../services/user/auth";
import ProductTable from "./cart/productTable";
import Pagination from "react-js-pagination";

export default function Profil() {
  const context = useContext(AuthContext);
  const user = getUser()[0];
  const [commands, setCommands] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [nbCommand, setNbCommand] = useState(0)
  const [limit, setLimit] = useState(1)


  useEffect(() => {
    axios
    .get(BASE_URL + "/command", {
      params: { 
          userId: user.id,
      },
    }).then(res => setNbCommand(res.data.length))
    axios
      .get(BASE_URL + "/command", {
        params: { 
            userId: user.id,
            _page: activePage,
            _limit: limit
        },
      })
      .then((res) => {
        setCommands(res.data);
      });
  }, [activePage, limit]);

  if (!context.isConnected) {
    return <Redirect to="/login" />;
  }

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <>
      <h1 className="my-5">
        Hi {user.lastname} {user.firstname} - my commands
      </h1>

      <div>
        <div>
        <select name="limit" id="limit" value={limit} onChange={e => setLimit(parseInt(e.target.value))} className="form-control mb-3">
            {[...Array(11).keys()].map(k => k > 0 && <option key={k} value={k}>{k}</option>)}
        </select>
        </div>
        {commands &&
          commands.map((cmd, k) => (
            <div key={k} className="jumbotron">
              <h3>Details</h3>
              <div className="d-flex justify-content-between">
                <p>Date : {cmd.date}</p>
                <p>Reference : {cmd.id}</p>
              </div>
              <ProductTable key={k} products={cmd.orderLine} />
              <div>
                <p>
                  <b>Delivery method :</b> {cmd.deliveryMethod} <br />
                  <b>Total amount :</b> {cmd.total} €
                </p>
              </div>
            </div>
          ))}

        <Pagination
          itemClass="page-item"
          linkClass="page-link"
          activePage={activePage}
          itemsCountPerPage={limit}
          totalItemsCount={nbCommand}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
}
