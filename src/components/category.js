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
          {playlists.map((playlist) => (
            <Col
              className="playlists flex-column"
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                marginTop: "3rem",
              }}
            >
              <div className="playlist-genre">{playlist.name}</div>
              <div>
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
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
