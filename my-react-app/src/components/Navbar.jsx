import React from "react";
import {
  Navbar as BootstrapNavbar,
  Nav,
  Badge,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import "./Navbar.css"; 

const AppNavbar = ({ cart, removeFromCart }) => {
  
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  return (
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
            cart.map((item) => (
              <Dropdown.Item key={item.id} className="cart-item">
                <div className="d-flex align-items-center">
                  <img
                    src={item.image} 
                    alt={item.title}
                    style={{
                      width: '70px', 
                      height: '70px', 
                      objectFit: 'cover', 
                      marginRight: '15px', 
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
            ))
          ) : (
            <Dropdown.Item>Your cart is empty</Dropdown.Item>
          )}
          <Dropdown.Divider />
          <Dropdown.Item>
            <strong>Total: ${totalAmount}</strong>
          </Dropdown.Item>
        </DropdownButton>
        <Badge pill bg="light" text="dark" className="p-2">
          Total: ${totalAmount}
        </Badge>
      </Nav>
    </BootstrapNavbar>
  );
};

export default AppNavbar;
