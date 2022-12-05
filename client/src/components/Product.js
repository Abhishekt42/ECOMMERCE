import React from 'react';
import { NavLink } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Button';
import Rating from './Rating';

 function Product(props) {

  const {product} = props;
  return (
            <div className="product">
              <NavLink to={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
              </NavLink>

              <div>
                <NavLink to={`/product/${product.slug}`}>
                  <p>{product.name}</p>
                </NavLink>
                <p>Price : {product.price}</p>
                <p>Rating : {product.rating}</p>
                <button className="btn_add"> Add to Cart</button>
                </div>
            </div>
  )
}

export default Product;
