import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState,useEffect,useReducer } from 'react';

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
        product : action.payload ,
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


function ProductScreen() {

  const params = useParams();
  const { slug } = params;

  const [{loading , error , product} , dispatch] = useReducer (reducer , {
    product:[],
    loading:true,
    error:'',
  })
  useEffect(() => {
    const fetchData = async () => {
      dispatch({type: 'FETCH_REQUEST'});
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({type : 'FETCH_SUCCESS' , payload : result.data});
      } catch (error) {
        dispatch({type : 'FETCH_FAIL' , payload : error.message});
      }
            // setProducts(result.data);
    };
    fetchData();
  },[slug])

  console.log(product);

    return (
    <div className='
    
    '>
      <div className='flex'>
        <img src={product.image} alt = {product.name} style = {{height:400}} />
        <div>
        <p className='text-2xl font-bold mr-4'>{product.name}</p>
        <p>Rating : {product.rating}</p>
        <p>Price : Rs.{product.price}</p>
        <p>Description : {product.description}</p>
        <div className='bg-green-500 text-center rounded-xl'>
        {
          product.countInStock > 0 ? 
            <p>In Stock</p> : 
            <p>Unavailable</p>
          }
        </div>
        <div className='bg-yellow-500 font-bold p-2 rounded-xl text-center '>
        {
            product.countInStock > 0 &&
            <button>Add To Cart</button>
          }
        </div>

        </div>
      </div>
    </div>
  );
}
export default ProductScreen;