import React from "react";

export default function ProductTable({products, handleChange}) {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ?products.map((p, key) => {
            const product = p.product;
            return (
              <tr key={key}>
                <td>
                  <div className="d-flex">
                    <img src={product.grid_picture_url} width="100px" />
                    <p>
                      {product.name} <br />
                      Color : {product.color} <br />
                      Size : {p.size}
                    </p>
                  </div>
                </td>
                <td>{p.price} €</td>
                <td>
                {handleChange ? <input
                    className="form-control form-control-sm"
                    type="number"
                    min="1"
                    name={key}
                    value={p.quantity}
                    onChange={handleChange}
                  /> : p.quantity }
                 
                </td>
                <td>{p.totalPrice} €</td>
              </tr>
            );
          }):
            <tr>
              <td className="text-center" colSpan="4"><b>You have 0 product in cart</b></td>
            </tr> 
          }
        </tbody>
      </table>
    </>
  );
}
