import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineCalculator } from "react-icons/ai";
import { CgNotes, CgImage } from "react-icons/cg";
const Header = () => {
  return (
    <header className="fixed-top">
      <Navbar className="px-3 py-0" bg="dark" variant="dark">
        <Navbar.Brand href="#home">SHEET</Navbar.Brand>
        <div className="vr text-light px-3 "></div>
        <Nav className="me-auto">
          <Link className="nav-link p-0 px-1" to="/calc">
            <AiOutlineCalculator className="h2 h-100" />
          </Link>
          <Link className="nav-link p-0 px-1" to="/calc">
            <CgNotes className=" h1 h-100" />
          </Link>
          <Link className="nav-link p-0 px-1" to="/calc">
            <CgImage className="h1 h-100" />
          </Link>
        </Nav>
      </Navbar>
    </header>
  );
};

export default Header;
