import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../App";
import { getCart } from "../../services/cart/cart";
import { logout } from "../../services/user/auth";
import Menuli from "./menuli";

export default function Header() {
  const context = useContext(AuthContext);
  let [notif, setNotif] = useState(getCart().length)
  window.setNotifification = setNotif

  const menu = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Products",
      url: "/products",
    },
    {
      name: "Contact",
      url: "/contact",
    },
    {
      name: "About",
      url: "/about",
    },
  ];

  const onLogount = (e) => {
    e.preventDefault();
    logout();
    context.setConnected(false);
  };

  if (context.isConnected) {
    menu.push({
      name: "Logout",
      url: "/logout",
      onClick: onLogount,
    });
  } else {
    menu.push(
      {
        name: "Login",
        url: "/login",
      },
      {
        name: "Register",
        url: "/register",
      }
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="#">
        Navbar
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">
          {menu.map(({ name, url, onClick }, key) => (
            <Menuli key={key} name={name} to={url} onClick={onClick} />
          ))}
          {/* <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Categories</a>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <a className="dropdown-item" href="#">Something else here</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">Separated link</a>
                        </div>
                    </li> */}
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <Link className="btn btn-outline-light btn-floating m-1" to="/profil">
            <i style={{ fontSize: "14px" }} className="fas fa-user"></i>
          </Link>
          <Link id='nbProduct-container' className="btn btn-outline-light btn-floating m-1" to="/cart">
            {notif > 0 && <span id='nbProduct'>{notif}</span>}
            <i
              style={{ fontSize: "14px" }}
              className="fas fa-shopping-cart"
            ></i>
          </Link>
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Search"
          />
          <button className="btn btn-secondary my-2 my-sm-0" type="submit">
            <i style={{ fontSize: "14px" }} className="fas fa-search"></i>
          </button>
        </form>
      </div>
    </nav>
  );
}
