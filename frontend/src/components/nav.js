// import React from "react";
// import { Link } from "react-router-dom";

// const Nav = () => {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light container-fluid">
//     <a class="navbar-brand" href="#">Navbar</a>
//     <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
//       <span class="navbar-toggler-icon"></span>
//     </button>
//     <div class="collapse navbar-collapse" id="navbarNavDropdown">
//       <ul class="navbar-nav">
//         <li class="nav-item active">
//           <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
//         </li>
//         <li class="nav-item">
//           <Link to='/login' className='nav-link'>Login or Signup</Link>
//         </li>
//         <li class="nav-item">
//           <Link to='/stockregister' className='nav-link'>Stock Register</Link>
//         </li>

//       </ul>
//     </div>
//   </nav>
//   );
// };
// export default Nav;

import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Styles/main.css";
import { useState, useEffect } from "react";

function Navbar() {
  const navRef = useRef();

  const [username, setUsername] = useState("");

  // useEffect to fetch the username from local storage on component mount
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername || ""); // Set to an empty string if null
  }, []);

  // Use the conditional (ternary) operator to check if username is empty
  const account = username ? "log Out" : "Sign In";

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <h3>Invoice PRO</h3>
      <nav ref={navRef}>
        <a href="/">Home</a>
        <a href="/#about">About</a>
        <a href="/invoice">Make a new Invoice</a>
        <a href="/stockregister">StockRegister</a>
        <a href={account === "Sign In" ? "/login" : "/logout"}>{account}</a>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Navbar;
