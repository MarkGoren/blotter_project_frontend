import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Api from "../api/api";
import Cookies from "js-cookie";

export default function Favorites() {
  const [favPlaylists, setFavPlaylists] = useState([]);
  const userInfo = Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo").slice(2))
    : undefined;
  useEffect(() => {
    if (Cookies.get("userInfo")) {
      Api.getFavPlaylists(userInfo).then((data) => setFavPlaylists(data));
    }
  }, [userInfo]);

  function handleLike(e) {
    let info = { userId: userInfo.id, playlistId: e.target.id };
    Api.removeFromFav(info).then(() => {
      Api.getFavPlaylists(userInfo).then((data) => setFavPlaylists(data));
    });
  }
  return (
    <>
      <Container>
        <div className="page-title">Favorites</div>
        {Cookies.get("userInfo") && favPlaylists[0] ? (
          <Row>
            {favPlaylists.map((playlist) => (
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

                  <i
                    className="fa fa-heart like-button"
                    aria-hidden="true"
                    id={playlist.id}
                    onClick={(e) => handleLike(e)}
                  ></i>
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
        ) : (
          <div className="favorites-message">
            <div>No favorite playlists here yet...</div>
            {Cookies.get("userInfo") ? null : (
              <div>To save a playlist in Favorites login first!</div>
            )}
          </div>
        )}
      </Container>
    </>
  );
}
