const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");  
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");

// Add book --admin
router.post("/add-book", authenticateToken, async (req, res) => {  // <-- Changed to post
    try {
        const { id } = req.headers;
        const user = await User.findById(id);
        if (user.role !== "admin") {
            return res.status(400).json({ message: "You do not have access to perform admin duties" });
        }

        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });

        await book.save();  // <-- Changed from Book.save() to book.save()
        return res.status(200).json({ message: "Book added successfully" });
    } catch (error) {
        console.error("Error adding book:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

//Update book 
router.put("/update-book", authenticateToken, async(req,res)=>{
    try{
        const {bookid} = req.headers;
        await Book.findByIdAndUpdate(bookid,{
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });
        return res.status(200).json({
            message: "Book updated successfully!",
        });
    }catch (error) {
        console.error("Error updating book:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
})

//Delete book
router.delete("/delete-book", authenticateToken, async(req,res)=>{
    try{
        const {bookid} = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({message: "Book deleted successfully"})
    }catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

//get all books
router.get("/get-all-books", async(req, res)=>{
    try{
        const books = await Book.find().sort({createdAt: -1});
        return res.json({
            status: "Success",
            data: books,
        });
    }catch(error){
        return res.status(500).json({ message: "An error occured" });
    }
});

//get recently added books limit: 2(can be increased)
router.get("/get-recent-books", authenticateToken, async (req, res) =>{
    try{
        const books = await Book.find().sort({createdAt: -1}).limit(2);
        return res.json({status: "Success", data: books});
    }catch{
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

//get book by id
router.get("/get-book-by-id/:id", authenticateToken, async (req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        return res.json({
            status: "Success",
            data: book,
        });
    }catch{
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
    
});
module.exports = router;
