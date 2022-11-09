import { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Api from "../api/api";

export default function Category() {
  const [playlists, setPlaylists] = useState([]);
  const category = useParams().category;
  useEffect(() => {
    Api.getByCategory(category).then((data) => setPlaylists(data));
  }, [category]);
  return (
    <>
      <Container>
        <div className="page-title">{category}</div>
        <Row>
          {playlists
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((playlist) => (
              <Col
                className="playlists"
                style={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                  marginTop: "3rem",
                }}
              >
                <iframe
                  className="playlists-frames"
                  title={`playlist${playlist.id}`}
                  style={{ borderRadius: "12px" }}
                  src={playlist.src}
                  width="240"
                  height="240"
                  frameBorder="0"
                  allowfullscreen="true"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
}
