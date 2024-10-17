import React from "react";
import {Link} from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";


const Navbar = () => {
    const links = [
      {
        title: "Home",
        link: "/",
      },
      //Do this later
      {
          title: "About Us",
          link: "/about-us",
      },
      {
        title: "All Books",
        link: "/all-books",
      },
      {
        title: "Cart",
        link: "/cart",
      },
      {
        title: "Profile",
        link: "/profile",
      },
    ];
    
    const [MobileNav, setMobileNav] = useState("hidden")
    return (
        <>
      <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
        <Link to ={"/"} className="flex items-center">
          <img
            className="h-10 me-4"
            src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
            alt="logo"
          />
  
          <h1 className="text-2xl font-semibold">Verse Vault</h1>
        </Link>
  
        <div className="nav-links-versevault block md:flex items-center gap-4">
          {/* Navbar options with subtle dividers */}
          <div className=" hidden md:flex items-center gap-2">
            {links.map((items, i) => (
              <React.Fragment key={i}>
                <Link 
                to={items.link} 
                    className="hover:text-blue-500 transition-all duration-300">
                    {items.title}{" "} 
                </Link>
                {/* Divider between links except the last one */}
                {i < links.length - 1 && (
                  <div className="h-4 border-l border-gray-500 opacity-50"></div>
                )}
              </React.Fragment>
            ))}
          </div>
  
          {/* Main divider line */}
          <div className="hidden md:h-6 border-l border-gray-400 mx-4"></div>
  
          {/* Login and Signup button */}
          <div className="hidden md:flex gap-4">
            <Link to={"/login"} className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition duration-300">
              Login
            </Link>
            <Link to={"/signup"} className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition duration-300">
              Sign Up
            </Link>
          </div>
          <button className="block md:hidden text-white text-2xl hover:text-zinc-400" 
            onClick={()=>
                MobileNav === "hidden"
                    ?setMobileNav("block")
                    :setMobileNav("hidden")
                }
            >
            <IoMenu />
          </button>
        </div>
      </nav>
      {/* Navbar for medium screen */}
      <div className={`${MobileNav} bg-zinc-700 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center p-4`}>

        {links.map((items, i) => (
                <Link 
                to={items.link} 
                className={`${MobileNav} text-white text-2xl font-semibold mb-8 hover:text-blue-500 transition-all duration-300`} 
                key={i}
                onClick={()=>
                    MobileNav === "hidden"
                        ?setMobileNav("block")
                        :setMobileNav("hidden")
                    }>
                    {items.title}{" "} 
                </Link>
            ))}
            <Link 
                to={"/login"} 
                className={`${MobileNav} px-8 py-2 mb-8 text-2xl border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition duration-300`}
                onClick={()=>
                    MobileNav === "hidden"
                        ?setMobileNav("block")
                        :setMobileNav("hidden")
                }
            >
              Login
            </Link>
            <Link 
                to={"/signup"} 
                className={`${MobileNav} px-8 py-2 mb-8 text-2xl bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition duration-300`}
                onClick={()=>
                    MobileNav === "hidden"
                        ?setMobileNav("block")
                        :setMobileNav("hidden")
                }
            >
              Sign Up
            </Link>
      </div>

      </>
    );
  };
  
  export default Navbar;
  