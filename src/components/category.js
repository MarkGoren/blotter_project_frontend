import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Api from "../api/api";

export default function Category(props) {
  const [playlists, setPlaylists] = useState([]);
  const category = useParams().category;
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo").slice(2))
    : undefined;

  useEffect(() => {
    Api.getByCategory(category).then((data) => setPlaylists(data));
  }, [category]);

  function handleLike(e) {
    if (Cookies.get("userInfo")) {
      let info = { userId: userInfo.id, playlistId: e.target.id };
      if (props.favorites.indexOf(parseInt(e.target.id)) > -1) {
        Api.removeFromFav(info).then(() => {
          Api.getFavorites(userInfo).then((data) => props.setFavorites(data));
        });
      } else {
        Api.addToFav(info).then(() => {
          Api.getFavorites(userInfo).then((data) => props.setFavorites(data));
        });
      }
    } else {
      navigate("/login", { state: { background: location } });
    }
  }
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
              <div className="genre-and-like">
                <span className="playlist-genre">{playlist.name}</span>
                {props.favorites.indexOf(playlist.id) > -1 ? (
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
                  style={{ borderRadius: "12px" }}
                  src={playlist.src}
                  width="240"
                  height="240"
                  frameBorder="0"
                  allowFullScreen={true}
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
