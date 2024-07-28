import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./nav";

const StockRegister = () => {
  let [records, setRecords] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/getinvoice").then((response) => {
      console.log(response.data.recorddata);
      setRecords(response.data.recorddata);
    });
  }, []);

  useEffect(() => {
    // Check if "username" exists in localStorage
    if (!localStorage.getItem("username")) {
      // If not, show an alert
      alert("Please login to your account");

      // Redirect to the home page
      window.location.href = "/";
    }
  }, []);

  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete("http://localhost:5000/deleteRecord/" + id)
      .then((res) => {
        console.log(res);
        alert("data is deleted successfully");
        window.location.reload();
      })
      // .catch(err=>{console.log(err)})
      //   .then(() => {
      //     // Remove the deleted student from the local state
      //     setStudents(students.filter(student => student._id !== studentId));
      //   })
      .catch((error) => {
        console.error("Error deleting Record", error);
      });
  };

  return (
    <>
      <Navbar />
      <>
        <h1> &nbsp; &nbsp; &nbsp; Invoice Management Software</h1>
      </>
      <br />
      <th colSpan={2}>
        <Link to={`/invoice`} align="left">
          <button
            className="btn btn-danger"
            style={{
              backgroundColor: "skyblue",
              borderColor: "skyblue",
              textColor: "white",
            }}
          >
            <i class="fa-solid fa-circle-plus"></i> ADD Invoice
          </button>
        </Link>
        &nbsp; &nbsp; &nbsp;
        <Link to="/logout">
          <button className="btn btn-danger" align="left">
            Logout
          </button>
        </Link>
      </th>
      <table
        className="table table-success table-hover"
        align="center"
        cellSpacing={10}
        cellPadding={0}
      >
        <thead>
          <br />
          <tr>
            <th>S.no</th>
            <th>Bill From</th>
            <th>Bill to</th>
            <th>Invoice Date</th>
            <th>Due Date</th>
            <th>Item Desc.</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Tax</th>
            <th>Total</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
          {records &&
            records.map((ele, index, arr) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {ele.billFrom}
                    {ele.billFromAddress}
                    {ele.billFromEmail}
                  </td>
                  <td>
                    {ele.billTo}
                    {ele.billToAddress}
                    {ele.billToEmail}
                  </td>
                  <td>{ele.currentDate}</td>
                  <td>{ele.dueDate}</td>
                  <td>
                    <ul style={{ listStyleType: "none" }}>
                      {ele.items.map((item) => (
                        <li key={item.id}>
                          {item.name} - {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <ul style={{ listStyleType: "none" }}>
                      {ele.items.map((item) => (
                        <li key={item.id}>
                          {ele.currency} {item.price}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    ({ele.discountRate}%)
                    <br />
                    {ele.currency}.{ele.discountAmount}
                  </td>
                  <td>
                    ({ele.taxRate}%)
                    <br />
                    {ele.currency}.{ele.taxAmount}
                  </td>
                  <td>
                    {ele.currency}.{ele.total}
                  </td>
                  <td>
                    &nbsp;{" "}
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(ele._id)}
                    >
                      <i class="fa-solid fa-trash"></i> DELETE
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};
export default StockRegister;
