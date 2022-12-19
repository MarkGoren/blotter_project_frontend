import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import Api from "../api/api";

export default function UserPromos() {
  const location = useLocation();
  const [userPromoPlaylists, setUserPromoPlaylists] = useState([]);
  const userInfo = Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo").slice(2))
    : undefined;
  useEffect(() => {
    if (userInfo) {
      Api.getAllUserPromoRequests(userInfo).then((data) =>
        setUserPromoPlaylists(() => data)
      );
    }
  }, [userInfo]);
  return (
    <>
      <Container>
        <div className="page-title">
          <h3>Your Requested Promotions</h3>
        </div>
        {userInfo ? (
          userPromoPlaylists.length ? (
            userPromoPlaylists.map((info) => (
              <Row style={{ margin: "2rem 0.5rem" }}>
                <iframe
                  id={info.id}
                  title={`track${info.id}`}
                  style={{
                    borderRadius: "12px",
                    height: "200px",
                    width: "50%",
                  }}
                  src={`https://open.spotify.com/embed/track/${
                    info.song_src.split(":")[2]
                  }?utm_source=generator`}
                  frameBorder="0"
                  allowfullscreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                ></iframe>

                {info.is_approved ? (
                  <iframe
                    title={`playlist${info.id}`}
                    style={{
                      borderRadius: "5%",
                      width: "50%",
                      height: "200px",
                    }}
                    src={`https://open.spotify.com/embed/playlist/${info.playlist_id}?utm_source=generator`}
                    frameBorder="0"
                    allowfullscreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  ></iframe>
                ) : (
                  <span
                    className="web-message"
                    style={{ width: "50%", margin: "5rem 0", fontSize: "2rem" }}
                  >
                    Denied 😔
                  </span>
                )}
              </Row>
            ))
          ) : (
            <div className="web-message">No requests here yet</div>
          )
        ) : (
          <div className="web-message">
            To view your requested promotions you have to{" "}
            <Link
              className="web-links"
              to="/login"
              style={{ color: "black", textDecoration: "none" }}
              state={{ background: location }}
            >
              login{" "}
            </Link>
            first!
          </div>
        )}
      </Container>
    </>
  );
}
