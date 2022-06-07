require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/Conn");
const Products = require("./models/productSchema");
const DefaultData = require("./defaultdata");
const cors = require("cors");
const router = require("./routes/router");
const cookieParser = require("cookie-parser"); 


app.use(express.json());
app.use(cookieParser(""));
app.use(cors());
app.use(router);

const port = 3000;

app.listen(port,()=>{
    console.log(`your server is running on port ${port} `);
});


DefaultData();