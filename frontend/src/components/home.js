import React from "react";
import "./home.css"; // Import your custom CSS

function HomePage() {
  return (
    <div className="home-page">
      <section className="company-name">
        <h1>Welcome to InvoicePro</h1>
        <p>Your Trusted Partner for Hassle-Free Invoicing Solutions</p>
      </section>
      <section className="introduction">
        <h2>Streamline Your Invoicing Process</h2>
        <p>
          At InvoicePro, we understand the importance of efficient invoicing for
          your business. We provide a cutting-edge digital invoicing platform
          that simplifies the entire process, from creating and sending invoices
          to tracking payments. Say goodbye to paperwork and hello to
          productivity!
        </p>
        <p>
          Join thousands of businesses that have revolutionized their financial
          operations with our user-friendly platform. Whether you're a
          freelancer, small business owner, or a large enterprise, our services
          are tailored to meet your unique invoicing needs.
        </p>
      </section>
      <section className="about-us" id="about">
        <h2>About Us</h2>
        <p>
          InvoicePro was founded by a team of dedicated professionals with a
          passion for making invoicing effortless. Our mission is to empower
          businesses of all sizes to manage their finances with confidence.
        </p>
        <p>
          We are committed to delivering a secure, reliable, and feature-rich
          platform. We're not just a service; we're your partner in success. Let
          us handle your invoicing needs so you can focus on what you do best –
          growing your business.
        </p>
      </section>
      <section className="services">
        <h2>Our Services</h2>
        <ul>
          <li>Create and Customize Invoices</li>
          <li>Automate Recurring Invoices</li>
          <li>Track Payments and Outstanding Balances</li>
          <li>Generate Comprehensive Financial Reports</li>
          <li>Access 24/7 Customer Support</li>
        </ul>
      </section>
      <section className="contact">
        <h2>Contact Us</h2>
        <p>
          If you have any questions or need assistance, feel free to reach out
          to us:
        </p>
        <p>Email: info@invoicepro.com</p>
        <p>Phone: 1-800-123-4567</p>
      </section>
      <footer>
        <div className="footer-content">
          <p>&copy; 2023 InvoicePro</p>
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
