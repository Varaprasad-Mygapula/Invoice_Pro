import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import InvoiceForm from "./components/InvoiceForm";
import Login from "./components/login";
import Register from "./components/register";
import StockRegister from "./components/stockRegister";
import Navbar from "./components/nav";
import Logout from "./components/logout";
import HomePage from "./components/home";

class Home extends Component {
  render() {
    return (
      <>
        {/* <nav className="navbar navbar-expand-lg navbar-light bg-light container-fluid">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <Link to='/login' className='nav-link'>Login or Signup</Link>
      </li>
      <li class="nav-item">
        <Link to='/stockregister' className='nav-link'>Stock Register</Link>
      </li>
      
    </ul>
  </div>
</nav> */}

        <React.Fragment>
          <Navbar />
        </React.Fragment>

        <div>
          <HomePage />
        </div>
      </>
    );
  }
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App d-flex flex-column align-items-center justify-content-center w-100">
          <div className="container-fluid">
            <Routes>
              <Route
                path="/Varaprasad-Mygapula/Invoice_Pro"
                element={<Home />}
              />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/register" element={<Register />} />
              <Route path="/invoice" element={<InvoiceForm />} />
              <Route path="/stockregister" element={<StockRegister />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

// user authentication
// navbar construction
//styles
//home and about page links
//login and register page design
//invoice background
