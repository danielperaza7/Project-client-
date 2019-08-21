/*
  props:{
    username
  }
*/

import React from "react";
import { Navbar, NavItem, Nav } from "react-bootstrap";

export default ({ username, logout, toggleList }) => {
  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a
            href="#"
            onClick={() => toggleList("admin")}
            style={{ color: "#fff", paddingRight: "30px" }}
          >
            CMS Admin List Panel
          </a>
          <a href="#" onClick={() => toggleList("archived")} style={{ color: "#fff" }}>
            CMS Archived List Panel
          </a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem eventKey={1} href="#">
            Welcome,
            {" "}
            {username}
          </NavItem>
          <NavItem eventKey={2} onClick={() => logout()}>
            Logout
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
