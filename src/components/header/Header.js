import React, { useContext, useState, useRef } from "react";
import { Link } from "@reach/router";
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { navigate, useLocation } from "@reach/router";
import { UserContext } from "../../context/user/UserContext";
import RoleAuthenticator from "../../context/roleAuthenticator/RoleAuthenticator";
import { ROLE } from "../../utils/constants";
import "./Header.scss";
import wcoLogo from "../../images/WCO_GTAS_header_brand.svg";

const Header = () => {
  const { getUserState, userAction } = useContext(UserContext);

  const user = getUserState();
  const currentPath = useLocation();

  const logout = () => {
    userAction({ type: "logoff" });

    navigate("/login");
  };

  if (user === undefined) logout();

  const userFullName = user?.fullName || "";

  const headerTabs = {
    DASHBOARD: "/gtas/dashboard",
    FLIGHT: "/gtas/flights",
    VETTING: "/gtas/vetting",
    TOOLS: "/gtas/tools",
    ADMIN: "/gtas/admin"
  };

  const toggleRef = useRef();

  const clickTab = tabName => {
    if (toggleRef.current.clientHeight > 0) {
      toggleRef.current.click();
    }
  };

  const getActiveClass = tabName => {
    return currentPath.pathname === tabName ? "active-tab" : "";
  };

  return (
    <Navbar sticky="top" expand="md" className="header-navbar" variant="light">
      <Navbar.Brand className="header-navbar-brand">
        <Link to="dashboard" onClick={() => clickTab(headerTabs.DASHBOARD)}>
          <img src={wcoLogo} />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" ref={toggleRef} />
      <Navbar.Collapse>
        <Nav variant="tabs" className="left-nav">
          <Nav.Link
            as={Link}
            to="dashboard"
            className={`${getActiveClass(headerTabs.DASHBOARD)}`}
            onClick={() => clickTab(headerTabs.DASHBOARD)}
          >
            Dashboard
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="flights"
            className={`${getActiveClass(headerTabs.FLIGHT)}`}
            onClick={() => clickTab(headerTabs.FLIGHT)}
          >
            Flights
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="vetting"
            className={`${getActiveClass(headerTabs.VETTING)}`}
            onClick={() => clickTab(headerTabs.VETTING)}
          >
            Vetting
          </Nav.Link>
          <RoleAuthenticator alt={<></>} roles={[ROLE.ADMIN]}>
            {/* <Nav.Link
              as={Link}
              to="admin"
              className={`${getActiveClass(headerTabs.ADMIN)}`}
              onClick={() => clickTab(headerTabs.ADMIN)}
            >
              Admin
            </Nav.Link> */}
            <NavDropdown title="Admin" id="nav-dropdown">
              <NavDropdown.Item as={Link} to="admin/manageusers">
                Manage Users
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="admin/auditlog">
                Audit Log
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="admin/errorlog">
                Error Log
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="admin/settings">
                Settings
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="admin/filedownload">
                File Download
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="admin/codeeditor">
                Code Editor
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="admin/loaderstats">
                Loader Statistics
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="admin/watchlistcats">
                Watchlist Categories
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="admin/notetypecats">
                Note Type Categories
              </NavDropdown.Item>
            </NavDropdown>
          </RoleAuthenticator>
          <NavDropdown title="Tools" id="nav-dropdown">
            <NavDropdown.Item as={Link} to="tools/queries" onClick={() => clickTab("")}>
              <i className="fa fa-filter"></i> Queries
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="tools/rules" onClick={() => clickTab("")}>
              <i className="fa fa-flag"></i> Rules
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="tools/watchlist" onClick={() => clickTab("")}>
              <i className="fa fa-eye"></i> Watchlist
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="tools/neo4j" onClick={() => clickTab("")}>
              <i className="fa fa-filter"></i> Neo4J Browser
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="tools/about" onClick={() => clickTab("")}>
              <i className="fa fa-info-circle"></i> About
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav className="navbar-search">
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
          </Form>
        </Nav>
        <Nav variant="tabs" className="ml-auto">
          <NavDropdown title={userFullName} id="basic-nav-dropdown" className="right">
            <NavDropdown.Item
              as={Link}
              to={"user/change-password"}
              onClick={() => clickTab("")}
            >
              Change Password
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="#" onClick={logout}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
