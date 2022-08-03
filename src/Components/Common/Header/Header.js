import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./header.css";
import { FaShoppingCart } from "react-icons/fa";
import { BsFillHeartFill, BsFillPersonFill } from "react-icons/bs";
import { AiOutlineBars } from "react-icons/ai";
import { useSelector } from "react-redux";
// import Badge from "react-bootstrap/Badge";
import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";

function Header() {
  const [price, setPrice] = useState(0);

  const getdata = useSelector((state) => state.cartreducer.carts);
  const getdata1 = useSelector((state1) => state1.wishreducer.wishLists);

  const navigate = useNavigate();

  const movetocart = () => {
    navigate("/shoppingCart");
  };

  const movetowishlist = () => {
    navigate("/wish");
  };

  const total = () => {
    let price = 0;
    getdata.map((ele, k) => {
      price = ele.price * ele.qnty + price;
    });
    setPrice(price);
  };

  useEffect(() => {
    total();
  }, [total]);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      style={{
        zIndex: "1",
        background: "#FFF",
        position: "fixed",
        width: "100%",
        top: "0",
      }}
    >
      <Navbar.Brand href="/" className="logo animate-charcter">
        MY Begs
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="responsive-navbar-nav"
        style={{ marginRight: "1rem" }}
      />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto" style={{ marginLeft: "auto" }}>
          <Nav.Link href="/" className="headbtn">
            Home
          </Nav.Link>
          <Nav.Link href="/ourproducts" className="headbtn">
            Categories
          </Nav.Link>
          <Nav.Link href="/ourproducts" className="headbtn">
            Products
          </Nav.Link>
          <Nav.Link href="/about" className="headbtn">
            About Us
          </Nav.Link>
          <Nav.Link href="/contact" className="headbtn">
            Contact Us
          </Nav.Link>
        </Nav>
        <Nav>
          <div>
            <Badge badgeContent={getdata.length} color="primary">
              <FaShoppingCart
                style={{
                  margin: "1rem",
                  width: "20px",
                  height: "20px",
                  color: "#000",
                }}
                onClick={() => movetocart()}
                className="me-2"
              />
            </Badge>
            <Badge badgeContent={getdata1.length} color="primary">
              <BsFillHeartFill
                style={{ margin: "1rem", width: "20px", height: "20px" }}
                onClick={() => movetowishlist()}
                className="me-2"
              />
            </Badge>
            <BsFillPersonFill
              style={{ margin: "1rem", width: "20px", height: "20px" }}
            />
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
