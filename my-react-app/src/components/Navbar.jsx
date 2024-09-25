import React, { useState } from "react";
import {
  Navbar as BootstrapNavbar,
  Nav,
  Badge,
  Dropdown,
  DropdownButton,
  Button,
  Modal,
} from "react-bootstrap";
import "./Navbar.css";

const AppNavbar = ({ cart, removeFromCart }) => {

  const [showModal, setShowModal] = useState(false);

  const handlePlaceOrder = () => {
    setShowModal(true); 
  };
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const couponDiscount = 10.0; 
  const platformFee = 5.0; 
  const shippingCharges = 7.5; 

  const finalTotal = (
    parseFloat(totalAmount) -
    couponDiscount +
    platformFee +
    shippingCharges
  ).toFixed(2);

  return (
    <>
      {/* Navbar */}
      <BootstrapNavbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <BootstrapNavbar.Brand href="#">E-Commerce</BootstrapNavbar.Brand>
        <Nav className="ms-auto d-flex align-items-center">
          <DropdownButton
            align="end"
            title={`Cart (${totalItems})`}
            id="dropdown-menu-align-end"
            variant="light"
            className="me-3"
          >
            {cart.length > 0 ? (
              <>
                {cart.map((item) => (
                  <Dropdown.Item key={item.id} className="cart-item">
                    <div className="d-flex align-items-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{
                          width: "70px",
                          height: "70px",
                          objectFit: "cover",
                          marginRight: "15px",
                        }}
                      />
                      <div>
                        {item.title} - {item.quantity} x ${item.price.toFixed(2)}
                        <button
                          className="btn btn-danger btn-sm ms-2"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </Dropdown.Item>
                ))}
                <Dropdown.Divider />
                <Dropdown.Item>
                  <div>Subtotal: ${totalAmount}</div>
                  <div>Coupon Discount: -${couponDiscount.toFixed(2)}</div>
                  <div>Platform Fee: +${platformFee.toFixed(2)}</div>
                  <div>Shipping: +${shippingCharges.toFixed(2)}</div>
                  <strong>Total: ${finalTotal}</strong>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="text-center">
                  <Button variant="success" onClick={handlePlaceOrder}>
                    Place Order
                  </Button>
                </Dropdown.Item>
              </>
            ) : (
              <Dropdown.Item>Your cart is empty</Dropdown.Item>
            )}
          </DropdownButton>
          <Badge pill bg="light" text="dark" className="p-2">
            Total: ${finalTotal}
          </Badge>
        </Nav>
      </BootstrapNavbar>


      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Order Placed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your order has been placed successfully! Thank you for shopping with us.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AppNavbar;
