import express from "express";
import data from "./data.js";

const app = express();

app.get("/api/products" , (req , res) => {
    res.send(data.products)
})

app.get("/api/products/slug/:slug" , (req , res) => {
    const product = data.products.find((x) => x.slug == req.params.slug)
    if(product) {
        res.send(product)
    } else
    res.status(404).send({message : 'product not found'});
})

const port = process.env.PORT || 8000;
app.listen (port , () => {
    console.log(`server started at http://localhost:${port}`)
})





