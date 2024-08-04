// Register.js
import React, { useState } from "react";
import axios from "axios";
import Navbar from "./nav";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    alert(`User ${username} registered successfully`);
    let obj = {
      username,
      password,
    };
    axios
      .post("https://invoice-pro-backend.onrender.com/register", obj)
      .then(() => {
        console.log("Invoice data sent to MongoDB:", obj);
      })
      .catch((error) => {
        console.error("Error sending invoice data:", error);
      });
    window.location.href = "/login";
  };

  return (
    <div>
      <React.Fragment>
        <Navbar />
      </React.Fragment>

      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
