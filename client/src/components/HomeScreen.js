import React, { useEffect, useReducer, useState } from "react";
// import data from "../data";
import { NavLink } from "react-router-dom";
import "../index.css";
import axios from 'axios'
import logger from 'use-reducer-logger'

const reducer = (state , action) => {
  switch(action.type) {
    case 'FETCH_REQUEST':
      return {
        ...state ,
        loading : true
      }
    case 'FETCH_SUCCESS': 
      return {
        ...state ,
        products : action.payload ,
        loading: false
      }
    case 'FETCH_FAIL':
      return {
        ...state ,
        error : action.payload ,
        loading : false
      }  
    default:
      return state;
  }
}

export default function () {

  const [{loading , error , products} , dispatch] = useReducer (logger(reducer) , {
    products:[],
    loading:true,
    error:'',
  })
  useEffect(() => {
    const fetchData = async () => {
      dispatch({type: 'FETCH_REQUEST'});
      try {
        const result = await axios.get('/api/products');
        dispatch({type : 'FETCH_SUCCESS' , payload : result.data});
      } catch (error) {
        dispatch({type : 'FETCH_FAIL' , payload : error.message});
      }
            // setProducts(result.data);
    };
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
