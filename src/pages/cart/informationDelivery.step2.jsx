import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import { AuthContext } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUser } from "../../services/user/auth";
import UserForm from "../form/userForm";

export default function InformationDelivery(props) {
  const [user, setUser] = useState(getUser()[0]);
  const context = useContext(AuthContext);

  if (!context.isConnected) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: "/cart" },
        }}
      />
    );
  }

  const handleSubmit = () => {};

  const handleChange = (e) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;

    if (user.address && name in user.address) {
      setUser({
        ...user,
        address: {
          ...user.address,
          [name]: value,
        },
      });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const isValid = (_) => {
    if (
      Object.values(user).filter((item) => item === "").length > 0 ||
      Object.values(user.address).filter((item) => item === "").length > 0
    ) {
        toast.error("Please compelete the form", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
       
      return false
    }

    return true;
  };

  return (
    <>
      <h1>Information delivery</h1>

      <UserForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        user={user}
      />

      <div className="d-flex justify-content-between mb-5">
        {props.hasPrev() && (
          <button
            onClick={props.prev}
            style={{ width: "40%" }}
            className="btn btn-danger"
          >
            Cancel
          </button>
        )}

        {props.hasNext() && (
          <button
            onClick={() => {
              if (isValid()) {
                props.next();
                props.state.userId = user.id;
                const userDelivery = () => {
                  delete user.id;
                  delete user.password;
                  return user;
                };
                props.state.userDelivery = userDelivery();
              }
            }}
            style={{ width: "40%" }}
            className="btn btn-success"
          >
            Validate
          </button>
        )}
      </div>
    </>
  );
}
