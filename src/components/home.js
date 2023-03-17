import { Col, Container, Row } from "react-bootstrap";
import logo3d from "../web_imgs/blotter_logo.png";
import { useEffect, useState } from "react";
import Api from "../api/api";

export default function Home() {
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    Api.getAllGenres().then((data) => setGenres(data));
  });
  return (
    <>
      <Container className="home-page">
        <div className="page-title">choose a genre</div>
        <div>
          <img className="logo3d" src={logo3d} alt="oopsie"></img>
        </div>
        <Row>
          {genres.map((genre) => (
            <Col className="col-6 gx-5" style={{ padding: "2rem" }}>
              <a className="genre-buttons" href={`/category/${genre}`}>
                {genre}
              </a>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
