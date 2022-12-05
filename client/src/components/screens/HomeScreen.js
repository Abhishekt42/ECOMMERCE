import React, { useEffect, useReducer } from "react";
// import data from "../data";
import { NavLink } from "react-router-dom";
import "../../index.css"
import axios from 'axios'
import logger from 'use-reducer-logger'
import Product from "../Product";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";

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

 function HomeScreen() {

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
        <h2 className="heading_1">Featured Products</h2>
        {
          loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox />
          ) : (
            <Row>
          {products.map((product) => (
            <Col key = {product.slug}>
              <Product product={product}></Product>
            </Col>
          ))}
          </Row>
        )}
          

      </div>
    
  );
}

export default HomeScreen;
