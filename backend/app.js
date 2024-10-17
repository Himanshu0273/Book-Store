const express = require("express");
const app = express();
require("dotenv").config();
require("./conn/conn.js");
const user = require("./routes/user");
const book = require("./routes/book");  
const favourite = require("./routes/favourite");
const cart = require("./routes/cart");
const Order = require("./routes/order");

// Middleware to parse JSON
app.use(express.json());  

// Use the user route
app.use("/api/v1", user);

// Use the book route
app.use("/api/v1", book);  

// Use the favourite route
app.use("/api/v1", favourite);  

// Use the cart route
app.use("/api/v1", cart);  

app.use("/api/v1", Order);

// Creating port
app.listen(process.env.PORT, () => {
    console.log(`Server Started at port: ${process.env.PORT}`);
});
