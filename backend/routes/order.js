const router = require("express").Router();
const Order = require("../models/order");
const User = require("../models/user");
const Book = require("../models/book")
const { authenticateToken } = require("./userAuth");

//Place Order
router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const {order} = req.body;
        for(const orderData  of order){
            const newOrder = new Order({user: id, book: orderData._id});
            const ordereDataFromDb = await newOrder.save();

            //saving order in user model
            await User.findByIdAndUpdate(id,{
                $push: {orders: ordereDataFromDb._id},
            });

            //clearing cart
            await User.findByIdAndUpdate(id,{
                $pull: {cart: orderData._id},
            });
        }
        return res.json({
            status: "Success",
            message: "Order Placed Successfully",
        });
    }catch{
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

//Get order history of a particular user
router.get("/user-order-history", authenticateToken, async (req, res) => {
    try{
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            cath: "orders",
            populate: {path: "book"},
        });
        const ordersData = userData.orders.reverse();
        return res.json({
            status: "Success",
            data: ordersData,
        });
    }catch{
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

//Get all orders --admin
router.get("/get-all-orders", authenticateToken, async(req,res)=>{
    try{
        const userData = await Order.find()
        .populate({
            path: "book",
        }).populate({
            path: "user",
        })
        .sort({createdAt: -1});
        return res.json({
            status: "Success",
            data: userData,
        });
    }catch{
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
})

//Update order Status --admin
router.put("/update-order-status/:id", authenticateToken, async (req, res) => {
    try{
        const {id} = req.params;
        await Order.findByIdAndUpdate(id,{status: req.body.status});
        return res.json({
            status: "Success",
            message: "Status Updated Successfully",
        });
    }catch{
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;