// import React from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import AllBooks from "./pages/AllBooks";
import Login from "./pages/Login";
import SignUp from './pages/Signup';
import Cart from "./pages/cart";
import Profile from "./pages/profile";
import AboutUs from "./pages/aboutus";

const App=()=>{
  return( 
    <div>
      <Router>
        <Navbar/>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/all-books" element={<AllBooks/>} />
            <Route path="/about-us" element={<AboutUs/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/login" element={<Login/>} />
          </Routes>
        <Footer/>
      </Router>
    </div>
  );
};

export default App;