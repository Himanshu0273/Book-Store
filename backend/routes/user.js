const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {authenticateToken} = require("./userAuth");

//Sign Up
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;
        console.log("Received data:", req.body); // Log the received data

        // Check username length is more than 3
        if (username.length < 4) {
            return res.status(400).json({ message: "Username must be more than 3 characters" });
        }

        // Check if the username already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Check if the email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Check password length
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be more than 5 characters" });
        }
        const hashPass = await bcrypt.hash(password, 10);
        // Save new user
        const newUser = new User({ 
            username: username, 
            email: email, 
            password: hashPass, 
            address: address
         });
        await newUser.save();

        return res.status(200).json({ message: "Sign-up Successful!!" });
    } catch (error) {
        console.error("Sign-up error:", error);  // <-- Log the error for debugging
        res.status(500).json({ message: "Internal server error" });
    }
});


//Sign In
router.post("/sign-in", async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (isPasswordValid) {

            const authClaims=[
                {name:existingUser.username,},
                {role:existingUser.role,}
            ];

            const token = jwt.sign({authClaims},"bookStore123",{  //This is a secret key for the JWT and can also be stored in .env file if wanted
                expiresIn: "30d",
            });
            return res.status(200).json({ id:existingUser.id, role: existingUser.role, token:token });
        } else {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
    } catch (error) {
        console.error("Sign-in error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

//get-user-information
router.get("/get-user-information", authenticateToken, async(req,res)=>{
    try{
        const {id} = req.headers;
        const data = await User.findById(id).select('-password');
        return res.status(200).json(data);
    }catch{
        return res.status(500).json({ message: "Internal server error" });
    }
});

//update address
router.put("/update-address", authenticateToken, async (req, res) => {
    try{
        const {id} = req.headers;
        const {address} = req.body;
        await User.findByIdAndUpdate(id,{address: address});
        return res.status(200).json({message: "Address updated successfully"});
    }catch{
        return res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = router;
