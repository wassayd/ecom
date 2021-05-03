import React from 'react'
import { Link } from "react-router-dom";

export default function Menuli({name, to, onClick}) {
    return (
        <>
            <li className="nav-item">
              <Link className="nav-link" to={to} onClick={onClick}>{name}</Link>
            </li>
        </>
    )
}
