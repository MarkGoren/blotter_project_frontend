import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "../web_imgs/blotter_logo.png";
import Cookies from "js-cookie";

export default function BlotterNavbar(props) {
  const location = useLocation();
  const userInfo = Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo").slice(2))
    : undefined;
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">
          <img id="web-logo" src={logo} alt="oopsie"></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {userInfo && userInfo.isAdmin ? (
            <Nav className="me-auto">
              <Nav.Item className="admin-welcome">Welcome Back Admin!</Nav.Item>
              <Nav.Link className="nav-link" href="/whatsNew">
                What's New?
              </Nav.Link>
              <Nav.Link className="nav-link" href="/promoReq">
                Pending Requests
              </Nav.Link>
              <Nav.Link className="nav-link" href="/subMail">
                Email Promotion
              </Nav.Link>
              <Nav.Link className="nav-link" href="/playlistsManager">
                Playlists Manager
              </Nav.Link>
            </Nav>
          ) : (
            <Nav className="me-auto">
              <Nav.Link className="nav-link" href="/whatsNew">
                What's New?
              </Nav.Link>
              <Nav.Link className="nav-link" href="/favorites">
                Favorites
              </Nav.Link>
              <Nav.Link className="nav-link" href="/reqPromo">
                Request Promo
              </Nav.Link>
              <Nav.Link className="nav-link" href="/userPromos">
                Your Promos
              </Nav.Link>
              <Nav.Link className="nav-link" href="/subscribe">
                Subscribe
              </Nav.Link>
              <Nav.Link className="nav-link" href="/aboutUs">
                About Us
              </Nav.Link>
            </Nav>
          )}
          <Nav>
            {props.userInfo.username ? (
              <Nav.Item>
                <Link
                  to="/logout"
                  style={{ color: "grey", textDecoration: "none" }}
                  state={{ background: location }}
                >
                  <i className="fa fa-user" aria-hidden="true"></i>
                  <span style={{ textTransform: "capitalize" }}>
                    {props.userInfo.username}
                  </span>
                </Link>
              </Nav.Item>
            ) : (
              <>
                <Nav.Item style={{ margin: "0 0.5rem 0 0.5rem" }}>
                  <Link
                    to="/login"
                    style={{ color: "grey", textDecoration: "none" }}
                    state={{ background: location }}
                  >
                    Login
                  </Link>
                </Nav.Item>
                <Nav.Item style={{ margin: "0 0.5rem 0 0.5rem" }}>
                  <Link
                    to="/register"
                    style={{ color: "black", textDecoration: "none" }}
                    state={{ background: location }}
                  >
                    Register
                  </Link>
                </Nav.Item>
              </>
            )}
            <Outlet />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
