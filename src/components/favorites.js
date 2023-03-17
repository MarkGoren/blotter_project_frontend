import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Api from "../api/api";
import Cookies from "js-cookie";
import { Link, useLocation } from "react-router-dom";

export default function Favorites() {
  const location = useLocation();
  const [favPlaylists, setFavPlaylists] = useState([]);
  const userInfo = Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo").slice(2))
    : undefined;
  useEffect(() => {
    if (userInfo) {
      Api.getFavPlaylists().then((data) => setFavPlaylists(data));
    }
  }, [userInfo]);

  function handleLike(e) {
    let info = { playlistId: e.target.id };
    Api.removeFromFav(info).then(() => {
      Api.getFavPlaylists().then((data) => setFavPlaylists(data));
    });
  }
  return (
    <>
      <Container>
        <div className="page-title">
          <h3>Favorites</h3>
        </div>
        {userInfo && favPlaylists[0] ? (
          <Row>
            {favPlaylists?.map((playlist) => (
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
                  <span className="playlist-genre">
                    {playlist.genre} - {playlist.name}
                  </span>

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
            ))}
          </Row>
        ) : (
          <div className="web-message">
            <div style={{ fontSize: "1.3rem", margin: "1.3rem 0" }}>
              No favorite playlists here yet...
            </div>
            {Cookies.get("userInfo") ? null : (
              <div>
                To view playlists in Favorites you have to{" "}
                <Link
                  className="web-links"
                  to="/login"
                  style={{ color: "black", textDecoration: "none" }}
                  state={{ background: location }}
                >
                  login
                </Link>{" "}
                first!
              </div>
            )}
          </div>
        )}
      </Container>
    </>
  );
}
