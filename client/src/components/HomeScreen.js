import React, { useEffect, useState } from "react";
// import data from "../data";
import { NavLink } from "react-router-dom";
import "../index.css";
import axios from 'axios'

export default function () {

  const [products , setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/products');
      setProducts(result.data);
    }
    fetchData();
  },[])
  return (
    <div>
      <div>
        <h2 className="heading_1">Featured Products</h2>
        <div className="products">
          {products.map((product) => (
            <div key={product.slug} className="product">
              <NavLink to={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
              </NavLink>

              <div className="product_info">
                <NavLink to={`/product/${product.slug}`}>
                  <p>{product.name}</p>
                </NavLink>
                <p>Price : {product.price}</p>
                <button className="btn_add"> Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
