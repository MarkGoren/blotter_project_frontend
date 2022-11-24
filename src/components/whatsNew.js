import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Api from "../api/api";

export default function WhatsNew() {
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    Api.getNewPlaylists().then((data) => setPlaylists(data));
  }, []);
  return (
    <Container>
      <div className="page-title">what's new?</div>
      <Row>
        {playlists[0] ? (
          playlists.map((playlist) => (
            <Col
              className="playlists flex-column"
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                marginTop: "3rem",
              }}
            >
              <div className="playlist-genre">
                {playlist.genre} - {playlist.name}
              </div>
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
          ))
        ) : (
          <div className="web-message" style={{ marginTop: "2rem" }}>
            nothing new just yet...
          </div>
        )}
      </Row>
    </Container>
  );
}
