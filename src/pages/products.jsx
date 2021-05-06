import axios from "axios";
import React, { useEffect, useState } from "react";
import CardProduct from "../components/product/cardProduct";
import { BASE_URL } from "../services/data";
import Pagination from "react-js-pagination";

export default function Products(props) {
  const [product, setProduct] = useState([]);
  const [params, setParams] = useState({});
  const [categories, setCategories] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [nbProducts, setNbProducts] = useState(0);
  const [limit, setLimit] = useState(6)


  useEffect(() => {
    axios.get(BASE_URL + "/sneakers", {
        params: {
          ...params,
          name_like: window.search,
        },
      }).then((res) => setNbProducts(res.data.length));

    axios.get(BASE_URL + "/category").then((res) => setCategories(res.data));

    axios
      .get(BASE_URL + "/sneakers", {
        params: {
          ...params,
          name_like: window.search,
          _page: activePage,
          _limit: limit
        },
      })
      .then((res) => setProduct(res.data));
  }, [params, search,activePage, limit]);

  const handleChange = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;

    if (value === "all" && name === "gender") {
      setParams({ ...params, gender: null });
      return;
    }

    if (value === "all" && name === "category") {
      setParams({ ...params, category: null });
      return;
    }

    setParams({ ...params, [name]: value });
  };

  const removeSearch = (_) => {
    window.setSearch(null);
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <>
      <h1 className="my-3">Products list</h1>
      <div className="row mb-4">
        <div className="col-md-4">
          <label htmlFor="gender">Gender</label>
          <select
            name="gender"
            id="gender"
            className="form-control"
            onChange={handleChange}
          >
            <option value="all">All</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="youth">Youth</option>
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="gender">Category</label>
          <select
            name="category"
            id="category"
            className="form-control"
            onChange={handleChange}
          >
            s<option value="all">All</option>
            {categories &&
              categories.map((category, key) => (
                <option key={key} value={category.name}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
       <div className="col-md-4">
       <label htmlFor="limit">Display number</label>
        <select name="limit" id="limit" value={limit} onChange={e => setLimit(parseInt(e.target.value))} className="form-control mb-3">
                {[...Array(11).keys()].map(k => k > 0 && <option key={k} value={k}>{k}</option>)}
            </select>
       </div>
        {search && (
          <div style={{ alignSelf: "flex-end" }} onClick={removeSearch}>
            <button className="btn btn-info">remove search</button>
          </div>
        )}
      </div>

      <div className="row">
        {params.length === 0 && (
          <div className="col-md-12">
            <div className="alert alert-warning">Products not found</div>
          </div>
        )}
        {product.map((p) => (
          <CardProduct key={p.id} product={p} />
        ))}
      </div>
      <div className="row">
            <Pagination
            itemClass="page-item"
            linkClass="page-link"
            activePage={activePage}
            itemsCountPerPage={limit}
            totalItemsCount={nbProducts}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            />
        </div>
    </>
  );
}
