import { useContext, useEffect, useState } from "react";
import { Button, Dropdown, Nav, NavDropdown, Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { UserContext } from "../App";
import { Link, NavLink } from "react-router-dom";
import API, { endpoints } from "../configs/API";

const Header = () => {
  const [user, dispatch] = useContext(UserContext);

  const logout = () => {
    dispatch({ type: "logout" });
    window.location.href = `/login`;
  };

  const [isAuthorized, setIsAuthorized] = useState(false);

  let userInfo = (
    <>
      <NavLink className="nav-link" to="/login">
        &#128119; LOG IN
      </NavLink>
      <NavLink className="nav-link" to="/register">
        &#128119; REGISTER
      </NavLink>
      <NavLink className="nav-link" to="/register_Company">
        &#128119; REGISTER FOR BUSINESSES
      </NavLink>
    </>
  );

  if (user != null)
    userInfo = (
      <>
        <NavLink
          title="Trang cá nhân"
          className="nav-link text-danger"
          to="/ProfileUser"
        >
          <img
            src={user.avatar_path}
            width={30}
            height={30}
            alt={""}
            className="rounded-circle "
          />

          <NavLink
            style={{ textDecoration: "none" }}
            to="/ProfileUser"
            className="text-info "
          >
            {user.username}
          </NavLink>
        </NavLink>
        <Button variant="outline-danger" onClick={logout}>
          Đăng xuất
        </Button>
      </>
    );

  if (user != null && user.role_name === "Employee")
    userInfo = (
      <>
        <NavLink to="/Employers" activeClassName="active" className="nav-link">
          FOR EMPLOYERS
        </NavLink>
        <NavLink
          title="Trang cá nhân"
          className="nav-link text-danger"
          to="/ProfileUser"
        >
          <img
            src={user.avatar_path}
            width={30}
            height={30}
            alt={""}
            className="rounded-circle"
          />

          <NavLink
            style={{ textDecoration: "none" }}
            to="/ProfileUser"
            className="text-info"
          >
            {user.username}
          </NavLink>
        </NavLink>
        <Button variant="outline-danger" onClick={logout}>
          Đăng xuất
        </Button>
      </>
    );

  if (user != null && user.role_name === "Company")
    userInfo = (
      <>
        <NavLink to="/ForCompany" activeClassName="active" className="nav-link">
          FOR COMPANY
        </NavLink>
        <NavLink
          title="Trang cá nhân"
          className="nav-link text-danger"
          to="/ProfileUser"
        >
          <img
            src={user.avatar_path}
            width={30}
            height={30}
            alt={""}
            className="rounded-circle "
          />

          <NavLink
            style={{ textDecoration: "none" }}
            to="/ProfileUser"
            className="text-info ms-2"
          >
            {user.username}
          </NavLink>
        </NavLink>
        <Button variant="outline-danger" onClick={logout}>
          Đăng xuất
        </Button>
      </>
    );

  if (user != null && user.role_name === "Candidate")
    userInfo = (
      <>
        <NavDropdown title="FOR CANDIDATE" id="collasible-nav-dropdown">
          <NavDropdown.Item href="/profileUser">PROFILE USER</NavDropdown.Item>
          <NavDropdown.Item href="/applications">
            MY APPLICATION
          </NavDropdown.Item>

          <NavDropdown.Divider />
          <NavDropdown.Item href="/userCv">MY CV</NavDropdown.Item>
        </NavDropdown>
        <NavLink
          title="Trang cá nhân"
          className="nav-link text-danger"
          to="/ProfileUser"
        >
          <img
            src={user.avatar_path}
            width={30}
            height={30}
            alt={""}
            className="rounded-circle "
          />

          <NavLink
            style={{ textDecoration: "none" }}
            to="/ProfileUser"
            className="text-info ms-2"
          >
            {user.username}
          </NavLink>
        </NavLink>
        <Button variant="outline-danger" onClick={logout}>
          Đăng xuất
        </Button>
      </>
    );

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" activeClassName="active" className="nav-link">
                <i class="bi bi-house-door"></i> HOME
              </NavLink>
              <NavLink
                to="/Companies"
                activeClassName="active"
                className="nav-link"
              >
                COMPANIES
              </NavLink>
              <NavLink to="/Jobs" activeClassName="active" className="nav-link">
                JOB
              </NavLink>
              <NavLink to="/Blog" activeClassName="active" className="nav-link">
                TECH BLOG
              </NavLink>
              {/* <NavLink to="/" activeClassName="active" className="nav-link">
                SERVICES
              </NavLink> */}

              {userInfo}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
