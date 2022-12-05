import React from "react";
import Navbar from "./components/Navbar";
import HomeScreen from './components/screens/HomeScreen'
import ProductScreen from './components/screens/ProductScreen'
import {BrowserRouter , Routes,Route} from 'react-router-dom';
import Product from "./components/Product";

export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element = {< HomeScreen />}/>
        <Route path="/product/:slug" element = {<ProductScreen />} />
      </Routes>
      </BrowserRouter>
      
    </div>
  )
}
