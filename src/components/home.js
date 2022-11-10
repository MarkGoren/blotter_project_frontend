import { Col, Container, Row } from "react-bootstrap";
import technoCat from "../web_imgs/techno_cat.png";
import rockCat from "../web_imgs/rock_cat.png";
import metalCat from "../web_imgs/metal_cat.png";
import rapCat from "../web_imgs/rap_cat.png";

export default function Home(props) {
  return (
    <>
      <Container className="home-page">
        <div className="page-title">choose a category</div>
        <Row>
          <Col>
            <a href="/category/techno">
              <img className="category-imgs" src={technoCat} alt="oopsie"></img>
            </a>
          </Col>
          <Col>
            <a href="/category/rap">
              <img className="category-imgs" src={rapCat} alt="oopsie"></img>
            </a>
          </Col>
        </Row>
        <Row>
          <Col>
            <a href="/category/rock">
              <img className="category-imgs" src={rockCat} alt="oopsie"></img>
            </a>
          </Col>
          <Col>
            <a href="/category/metal">
              <img className="category-imgs" src={metalCat} alt="oopsie"></img>
            </a>
          </Col>
        </Row>
      </Container>
    </>
  );
}
