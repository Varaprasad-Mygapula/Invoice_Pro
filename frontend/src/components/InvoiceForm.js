import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./InvoiceModal";
import InputGroup from "react-bootstrap/InputGroup";
import Navbar from "./nav";

class InvoiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      currency: "₹",
      currentDate: new Date().toLocaleDateString(),
      invoiceNumber: "1",
      dueDate: "",
      billTo: "",
      billToEmail: "",
      billToAddress: "",
      billFrom: "",
      billFromEmail: "",
      billFromAddress: "",
      notes: "",
      total: "0.00",
      subTotal: "0.00",
      taxRate: "0.00",
      taxAmount: "0.00",
      discountRate: "0.00",
      discountAmount: "0.00",
    };
    this.state.items = [
      {
        id: 0,
        name: "",
        description: "",
        price: "1.00",
        quantity: 1,
      },
    ];
    this.editField = this.editField.bind(this);
  }
  componentDidMount(prevProps) {
    this.handleCalculateTotal();
    if (!localStorage.getItem("username")) {
      alert("Please login to your account");
      window.location.href = "/";
    }
  }
  handleRowDel(items) {
    var index = this.state.items.indexOf(items);
    this.state.items.splice(index, 1);
    this.setState(this.state.items);
  }

  handleAddEvent(evt) {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var newItem = {
      id: id,
      name: "",
      price: "1.00",
      description: "",
      quantity: 1,
    };

    // Add the new item to the items array
    this.setState(
      (prevState) => ({
        items: [...prevState.items, newItem],
      }),
      () => {
        this.handleCalculateTotal(); // Recalculate the total after adding the item
      }
    );
  }

  handleCalculateTotal() {
    var items = this.state.items;
    var subTotal = 0;

    items.forEach((item) => {
      subTotal += parseFloat(item.price) * parseInt(item.quantity);
    });

    var discountAmount = subTotal * (this.state.discountRate / 100);
    var taxAmount = subTotal * (this.state.taxRate / 100);
    var total = subTotal - discountAmount + taxAmount;

    this.setState({
      subTotal: subTotal.toFixed(2),
      discountAmount: discountAmount.toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      total: total.toFixed(2),
    });
  }

  onItemizedItemEdit(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value,
    };
    var items = this.state.items.slice();
    var newItems = items.map(function (items) {
      for (var key in items) {
        if (key === item.name && items.id == item.id) {
          items[key] = item.value;
        }
      }
      return items;
    });
    this.setState({ items: newItems });
    this.handleCalculateTotal();
  }
  editField = (event) => {
    // Get the name and value from the event
    const { name, value } = event.target;

    // Update the state with the new values
    this.setState(
      {
        [name]:
          name === "taxRate" || name === "discountRate"
            ? parseFloat(value)
            : value,
      },
      () => {
        this.handleCalculateTotal(); // Recalculate the total when taxRate or discountRate changes
      }
    );
  };

  formatDateForDisplay = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-based
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };
  editField = (event) => {
    if (event.target.name === "dueDate") {
      const formattedDate = this.formatDateForInput(event.target.value);
      this.setState({
        [event.target.name]: formattedDate,
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }
  };
  formatDateForInput = (date) => {
    // This function should convert the formatted date "DD-MM-YYYY" back to "YYYY-MM-DD"
    // In this example, we assume that the input date is always in "DD-MM-YYYY" format
    const [day, month, year] = date.split("-");
    return `${year}-${month}-${day}`;
  };

  onCurrencyChange = (selectedOption) => {
    this.setState(selectedOption);
  };
  openModal = (event) => {
    event.preventDefault();
    this.handleCalculateTotal();
    this.setState({ isOpen: true });
  };
  closeModal = (event) => this.setState({ isOpen: false });

  render() {
    const usernameSectionStyle = {
      backgroundColor: "#007BFF",
      color: "#fff",
      padding: "10px",
      borderRadius: "5px",
      marginLeft: "auto", // Align content to the right
      display: "flex", // Enable flex container
      alignItems: "center", // Center items vertically
    };

    const userIconStyle = {
      marginRight: "10px", // Add spacing between icon and text
    };

    const headingStyle = {
      flexGrow: 1, // Allow the heading to take remaining space
      textAlign: "center", // Center the heading text
      fontSize: "1.5rem", // Adjust the font size as needed
      fontWeight: "bold", // Apply bold font weight
    };

    return (
      <>
        <div>
          <Navbar />
        </div>
        <Form onSubmit={this.openModal}>
          <div
            className="d-flex align-items-center justify-content-end"
            style={usernameSectionStyle}
          >
            <div style={headingStyle}>Invoice Generator</div>
            <div style={userIconStyle}>
              {/* You can replace the user icon with your preferred icon or image */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-person"
                viewBox="0 0 16 16"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                <path d="M8 9a4 4 0 0 0-4 4c0 .265.238.482.522.62A6.978 6.978 0 0 1 1 9a7 7 0 1 1 14 0 6.978 6.978 0 0 1-3.522 5.62.5.5 0 0 0 .256.943h.522a.5.5 0 0 0 .256-.943A6.978 6.978 0 0 1 8 9z" />
              </svg>
            </div>

            <span className="fw-bold">
              Welcome {localStorage.getItem("username")}
            </span>
          </div>
          <Row>
            <Col md={8} lg={9}>
              <Card className="p-4 p-xl-5 my-3 my-xl-4">
                <div className="d-flex flex-row align-items-start justify-content-between mb-3">
                  <div class="d-flex flex-column">
                    <div className="d-flex flex-column">
                      <div class="mb-2">
                        <span className="fw-bold">
                          Current&nbsp;Date:&nbsp;&nbsp;
                        </span>
                        <span className="current-date">
                          {this.state.currentDate}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center">
                      <span className="fw-bold d-block me-2">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Due&nbsp;Date:
                      </span>
                      <Form.Control
                        type="date"
                        value={this.formatDateForInput(this.state.dueDate)}
                        name={"dueDate"}
                        onChange={(event) => this.editField(event)}
                        style={{
                          maxWidth: "150px",
                        }}
                        required="required"
                      />
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <span className="fw-bold me-2">
                      Invoice&nbsp;Number:&nbsp;
                    </span>
                    <Form.Control
                      type="number"
                      value={this.state.invoiceNumber}
                      name={"invoiceNumber"}
                      onChange={(event) => this.editField(event)}
                      min="1"
                      style={{
                        maxWidth: "70px",
                      }}
                      required="required"
                    />
                  </div>
                </div>
                <hr className="my-4" />
                <Row className="mb-5">
                  <Col>
                    <Form.Label className="fw-bold">Bill to:</Form.Label>
                    <Form.Control
                      placeholder={"Who is this invoice to?"}
                      rows={3}
                      value={this.state.billTo}
                      type="text"
                      name="billTo"
                      className="my-2"
                      onChange={(event) => this.editField(event)}
                      autoComplete="name"
                      required="required"
                    />
                    <Form.Control
                      placeholder={"Email address"}
                      value={this.state.billToEmail}
                      type="email"
                      name="billToEmail"
                      className="my-2"
                      onChange={(event) => this.editField(event)}
                      autoComplete="email"
                      required="required"
                    />
                    <Form.Control
                      placeholder={"Billing address"}
                      value={this.state.billToAddress}
                      type="text"
                      name="billToAddress"
                      className="my-2"
                      autoComplete="address"
                      onChange={(event) => this.editField(event)}
                      required="required"
                    />
                  </Col>
                  <Col>
                    <Form.Label className="fw-bold">Bill from:</Form.Label>
                    <Form.Control
                      placeholder={"Who is this invoice from?"}
                      rows={3}
                      value={this.state.billFrom}
                      type="text"
                      name="billFrom"
                      className="my-2"
                      onChange={(event) => this.editField(event)}
                      autoComplete="name"
                      required="required"
                    />
                    <Form.Control
                      placeholder={"Email address"}
                      value={this.state.billFromEmail}
                      type="email"
                      name="billFromEmail"
                      className="my-2"
                      onChange={(event) => this.editField(event)}
                      autoComplete="email"
                      required="required"
                    />
                    <Form.Control
                      placeholder={"Billing address"}
                      value={this.state.billFromAddress}
                      type="text"
                      name="billFromAddress"
                      className="my-2"
                      autoComplete="address"
                      onChange={(event) => this.editField(event)}
                      required="required"
                    />
                  </Col>
                </Row>
                <InvoiceItem
                  onItemizedItemEdit={this.onItemizedItemEdit.bind(this)}
                  onRowAdd={this.handleAddEvent.bind(this)}
                  onRowDel={this.handleRowDel.bind(this)}
                  currency={this.state.currency}
                  items={this.state.items}
                />
                <Row className="mt-4 justify-content-end">
                  <Col lg={6}>
                    <div className="d-flex flex-row align-items-start justify-content-between">
                      <span className="fw-bold">Subtotal:</span>
                      <span>
                        {this.state.currency}
                        {this.state.subTotal}
                      </span>
                    </div>
                    <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                      <span className="fw-bold">Discount:</span>
                      <span>
                        <span className="small ">
                          ({this.state.discountRate || 0}%)
                        </span>
                        {this.state.currency}
                        {this.state.discountAmount || 0}
                      </span>
                    </div>
                    <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                      <span className="fw-bold">Tax:</span>
                      <span>
                        <span className="small ">
                          ({this.state.taxRate || 0}%)
                        </span>
                        {this.state.currency}
                        {this.state.taxAmount || 0}
                      </span>
                    </div>
                    <hr />
                    <div
                      className="d-flex flex-row align-items-start justify-content-between"
                      style={{
                        fontSize: "1.125rem",
                      }}
                    >
                      <span className="fw-bold">Total:</span>
                      <span className="fw-bold">
                        {this.state.currency}
                        {this.state.total || 0}
                      </span>
                    </div>
                  </Col>
                </Row>
                <hr className="my-4" />
                <Form.Label className="fw-bold">Notes:</Form.Label>
                <Form.Control
                  placeholder="Thanks for your business!"
                  name="notes"
                  value={this.state.notes}
                  onChange={(event) => this.editField(event)}
                  as="textarea"
                  className="my-2"
                  rows={1}
                />
              </Card>
            </Col>
            <Col md={4} lg={3}>
              <div className="sticky-top pt-md-3 pt-xl-4">
                <Button
                  variant="primary"
                  type="submit"
                  className="d-block w-100"
                >
                  Review Invoice
                </Button>
                <InvoiceModal
                  showModal={this.state.isOpen}
                  closeModal={this.closeModal}
                  info={this.state}
                  items={this.state.items}
                  currency={this.state.currency}
                  subTotal={this.state.subTotal}
                  taxAmount={this.state.taxAmount}
                  discountAmount={this.state.discountAmount}
                  total={this.state.total}
                />
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Currency:</Form.Label>
                  <Form.Select
                    onChange={(event) =>
                      this.onCurrencyChange({ currency: event.target.value })
                    }
                    className="btn btn-light my-1"
                    aria-label="Change Currency"
                  >
                    <option value="₹">INR (Indian Rupee)</option>
                    <option value="$">USD (United States Dollar)</option>
                    <option value="¥">JPY (Japanese Yen)</option>
                    <option value="$">CAD (Canadian Dollar)</option>
                    <option value="$">AUD (Australian Dollar)</option>
                    <option value="$">SGD (Signapore Dollar)</option>
                    <option value="¥">CNY (Chinese Renminbi)</option>
                    <option value="₿">BTC (Bitcoin)</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="my-3">
                  <Form.Label className="fw-bold">Tax rate:</Form.Label>
                  <InputGroup className="my-1 flex-nowrap">
                    <Form.Control
                      name="taxRate"
                      type="number"
                      value={this.state.taxRate}
                      onChange={(event) => this.editField(event)}
                      className="bg-white border"
                      placeholder="0.0"
                      min="0.00"
                      step="0.01"
                      max="100.00"
                    />
                    <InputGroup.Text className="bg-light fw-bold text-secondary small">
                      %
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                <Form.Group className="my-3">
                  <Form.Label className="fw-bold">Discount rate:</Form.Label>
                  <InputGroup className="my-1 flex-nowrap">
                    <Form.Control
                      name="discountRate"
                      type="number"
                      value={this.state.discountRate}
                      onChange={(event) => this.editField(event)}
                      className="bg-white border"
                      placeholder="0.0"
                      min="0.00"
                      step="0.01"
                      max="100.00"
                    />
                    <InputGroup.Text className="bg-light fw-bold text-secondary small">
                      %
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </div>
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}

export default InvoiceForm;
