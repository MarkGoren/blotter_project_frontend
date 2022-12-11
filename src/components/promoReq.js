import moment from "moment";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Api from "../api/api";
import SpotifyWebApi from "spotify-web-api-js";
import Cookies from "js-cookie";

export default function PromoReq() {
  const SpotifyApi = new SpotifyWebApi({
    clientId: "2566e85d5c15432c8dffd96a36b70e81",
    clientSecret: "d5317cd6614542e88f19990b101be9fb",
    redirectUri: "http://localhost:3001/promoReq",
  });
  const CLIENT_ID = "2566e85d5c15432c8dffd96a36b70e81";
  const REDIRECT_URI = "http://localhost:3001/promoReq";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const [requests, setRequests] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const userInfo = Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo").slice(2))
    : undefined;
  if (!(userInfo && userInfo.isAdmin)) {
    window.location.href = "http://localhost:3001";
  }

  function checkTokenValidity() {
    SpotifyApi.getMe()
      .then(() => console.log("token valid!"))
      .catch((err) => {
        if (err.status === 401) {
          logout();
        } else {
          console.log(err);
        }
      });
  }

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    SpotifyApi.setAccessToken(token);

    checkTokenValidity();

    Api.getAllRequests().then((data) => {
      setRequests(data);
    });
    Api.getPlaylists().then((data) => {
      setPlaylists(data);
    });
  }, []);

  const logout = () => {
    window.localStorage.removeItem("token");
  };

  const [showErrorMessageId, setShowErrorMessageId] = useState(null);

  function handleSubmit(info) {
    if (info.approval) {
      SpotifyApi.addTracksToPlaylist(info.playlist_id, [info.song_uri])
        .then(() => {
          Api.processRequest(info).then(() =>
            Api.getAllRequests().then((data) => {
              setRequests(data);
            })
          );
        })
        .catch((err) => {
          if (JSON.parse(err.responseText).error.status === 401) {
            logout();
          } else {
            console.log(err.responseText);
          }
        });
    } else {
      Api.processRequest(info).then(() =>
        Api.getAllRequests().then((data) => {
          setRequests(data);
        })
      );
    }
  }

  return (
    <>
      <Container>
        <div className="page-title" style={{ marginBottom: "3rem" }}>
          Pending Promotion Requests
        </div>

        <Row className="columns-promoReq">
          {requests.length > 0 ? (
            requests.map((request) => (
              <Col>
                <Card>
                  <Card.Header>
                    {moment().diff(request.request_date, "days") < 3 ? (
                      <p
                        style={{
                          backgroundColor: "green",
                          color: "white",
                        }}
                      >
                        new
                      </p>
                    ) : (
                      <p style={{ backgroundColor: "red", color: "white" }}>
                        urgent
                      </p>
                    )}
                  </Card.Header>
                  <Card.Title className="card-title">
                    {request.genre}
                  </Card.Title>
                  <Card.Body>
                    <iframe
                      title={request.id}
                      style={{ borderRadius: "12px" }}
                      src={`https://open.spotify.com/embed${
                        request.song_src.split("https://open.spotify.com")[1]
                      }`}
                      width="70%"
                      height="80"
                      frameBorder="0"
                      allowFullScreen={true}
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    ></iframe>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target);

                        if (
                          formData.get("choice") === "false" ||
                          (formData.get("select") &&
                            formData.get("choice") === "true")
                        ) {
                          const info = {
                            user_id: request.user_id,
                            request_id: request.id,
                            playlist_id: formData.get("select"),
                            song_uri:
                              "spotify:track:" +
                              request.song_src
                                .split("https://open.spotify.com/track/")[1]
                                .split("?")[0],
                            approval: JSON.parse(formData.get("choice")),
                          };
                          handleSubmit(info);
                        } else {
                          setShowErrorMessageId(request.id);
                        }
                      }}
                    >
                      <select name="select" className="form-inputs">
                        <option value={""}>Choose Playlist</option>
                        {playlists.map((playlist) => (
                          <option
                            value={
                              playlist.src
                                .split(
                                  "https://open.spotify.com/embed/playlist/"
                                )[1]
                                .split("?")[0]
                            }
                          >
                            {playlist.name + " " + playlist.genre}
                          </option>
                        ))}
                      </select>

                      <div className="form-inputs">
                        <span className="radio-buttons">
                          <input
                            type={"radio"}
                            name={"choice"}
                            value={true}
                            id="choice-approve"
                          ></input>
                          <label htmlFor="choice-approve">Approve</label>
                        </span>

                        <span className="radio-buttons">
                          <input
                            type={"radio"}
                            name={"choice"}
                            value={false}
                            id="choice-deny"
                          ></input>
                          <label htmlFor="choice-deny">Deny</label>
                        </span>
                      </div>

                      <p className="error-message">
                        {showErrorMessageId === request.id
                          ? "⚠ please fillout necesary fields"
                          : null}
                      </p>

                      <div>
                        {localStorage.getItem("token") ? (
                          <button className="submit-button">Submit</button>
                        ) : (
                          <a
                            className="submit-button"
                            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=playlist-modify-public`}
                          >
                            Login To Spotify
                          </a>
                        )}
                      </div>
                    </form>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Container>No Requests Yet...</Container>
          )}
        </Row>
      </Container>
    </>
  );
}
