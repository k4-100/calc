import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="p-1">
      <Navbar className="px-3 py-0" bg="dark" variant="dark">
        <Navbar.Brand href="#home">SHEET</Navbar.Brand>
        <div className="vr text-info p-4"></div>
        <Nav className="me-auto">
          <Link className="nav-link" to="/calc">
            Calc
          </Link>
          <Link className="nav-link" to="/calc">
            Write
          </Link>
          <Link className="nav-link" to="/calc">
            Pres
          </Link>
        </Nav>
      </Navbar>
    </header>
  );
};

export default Header;
