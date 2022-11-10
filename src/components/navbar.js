import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../web_imgs/blotter_logo.png";

export default function BlotterNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">
          <img id="web-logo" src={logo} alt="oopsie"></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
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
          <Nav>
            <Nav.Link href="#deets">Login</Nav.Link>
            <Nav.Link href="#memes" style={{ color: "black" }}>
              Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
