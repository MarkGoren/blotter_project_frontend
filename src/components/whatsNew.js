import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Api from "../api/api";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";

export default function WhatsNew() {
  const [playlists, setPlaylists] = useState([]);
  const userInfo = Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo").slice(2))
    : undefined;
  const navigate = useNavigate();
  const location = useLocation();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    Api.getNewPlaylists()
      .then((data) => setPlaylists(data))
      .then(() => {
        if (userInfo) {
          Api.getFavorites(userInfo).then((data) => setFavorites(data));
        }
      });
  }, [userInfo]);

  function handleLike(e) {
    if (userInfo.isAdmin) {
      return;
    }
    if (userInfo) {
      let info = { userId: userInfo.id, playlistId: e.target.id };
      if (favorites.indexOf(parseInt(e.target.id)) > -1) {
        Api.removeFromFav(info).then(() => {
          Api.getFavorites(userInfo).then((data) => setFavorites(data));
        });
      } else {
        Api.addToFav(info).then(() => {
          Api.getFavorites(userInfo).then((data) => setFavorites(data));
        });
      }
    } else {
      navigate("/login", { state: { background: location } });
    }
  }
  return (
    <Container>
      <div className="page-title">
        <h3>what's new?</h3>
      </div>
      <div className="web-message">
        Here you can discover new playlists or new tracks in playlists!
      </div>
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
              id={playlist.id}
            >
              <div className="genre-and-like">
                <span className="playlist-genre">
                  {playlist.genre} - {playlist.name}
                </span>
                {favorites.indexOf(playlist.id) > -1 ? (
                  <i
                    className="fa fa-heart like-button"
                    aria-hidden="true"
                    id={playlist.id}
                    onClick={(e) => handleLike(e)}
                  ></i>
                ) : (
                  <i
                    className="fa fa-heart-o like-button"
                    aria-hidden="true"
                    id={playlist.id}
                    onClick={(e) => handleLike(e)}
                  ></i>
                )}
              </div>
              <div>
                <iframe
                  className="playlists-frames"
                  title={`playlist${playlist.id}`}
                  style={{
                    borderRadius: "12px",
                    width: "300px",
                    height: "360px",
                  }}
                  src={playlist.src}
                  frameBorder="0"
                  allowFullScreen={true}
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
