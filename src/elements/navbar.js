import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../web_imgs/blotter_logo.png";

export default function BlotterNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home">
          <img id="web-logo" src={logo} alt="oopsie"></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#new">What's new?</Nav.Link>
            <Nav.Link href="#favorites">Favorites</Nav.Link>
            <Nav.Link href="#reqPromo">Request Promo</Nav.Link>
            <Nav.Link href="#userPromos">Your Promos</Nav.Link>
            <Nav.Link href="#subscribe">Subscribe</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">Login</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
