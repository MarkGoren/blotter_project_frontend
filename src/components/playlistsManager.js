import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Accordion, Container, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Api from "../api/api";

export default function PlaylistsManager() {
  const [playlists, setPlaylists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [show, setShow] = useState(false);
  const [currentPlaylistId, setCurrentPlaylistId] = useState(null);
  const [playlistPreviewLink, setPlaylistPreviewLink] = useState(null);
  const userInfo = Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo").slice(2))
    : undefined;
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      playlistSrc: "",
      genre: "",
      playlistName: "",
    },
  });

  function fetchData() {
    let promises = [Api.getAllGenres(), Api.getPlaylists()];
    Promise.all(promises).then((data) => {
      setGenres(data[0]);
      setPlaylists(data[1]);
    });
  }

  useEffect(() => {
    if (!userInfo.isAdmin) {
      navigate("/");
    }
    fetchData();
  }, [userInfo.isAdmin, navigate]);

  function openWarningMessage(e) {
    setShow(true);
    setCurrentPlaylistId(e.target.value);
  }

  function removePlaylist(e) {
    Api.deletePlaylistById(e.target.value)
      .then(() => setShow(false))
      .then(() => setCurrentPlaylistId(null))
      .then(() => fetchData());
  }

  function addPlaylist(info) {
    Api.addPlaylist(info)
      .then(() => reset())
      .then(() => setPlaylistPreviewLink(null))
      .then(() => fetchData());
  }

  function displayLink(e) {
    let pattern =
      /(https?:\/\/open.spotify.com\/(playlist)\/[a-zA-Z0-9]+|spotify:(playlist):[a-zA-Z0-9])/;
    if (pattern.test(e.target.value)) {
      let newLink = `https://open.spotify.com/embed/playlist/${
        e.target.value.split("/")[4].split("?")[0]
      }?utm_source=generator`;
      setPlaylistPreviewLink(newLink);
    } else {
      setPlaylistPreviewLink(null);
    }
  }
  return (
    <Container>
      <div className="page-title">
        <h3>Playlists Manager</h3>
      </div>
      <div className="web-message">All playlists:</div>
      <Accordion className="accordion">
        {genres.map((genre, index) => {
          return (
            <Accordion.Item eventKey={index}>
              <Accordion.Header>{genre}</Accordion.Header>
              {playlists
                .filter((playlist) => playlist.genre === genre)
                .map((playlist) => {
                  return (
                    <Accordion.Body key={playlist.id}>
                      <iframe
                        className="track-frame"
                        title={playlist.id}
                        style={{ borderRadius: "12px" }}
                        src={playlist.src}
                        width="300vw"
                        height="80"
                        frameBorder="0"
                        allowFullScreen={true}
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      ></iframe>
                      <button
                        id={playlist.id}
                        value={playlist.id}
                        className="remove-button"
                        onClick={(e) => openWarningMessage(e)}
                      >
                        remove
                      </button>
                    </Accordion.Body>
                  );
                })}
            </Accordion.Item>
          );
        })}
      </Accordion>

      <Modal show={show} style={{ textAlign: "center" }}>
        <Modal.Header className="warning">
          ARE YOU SURE ABOUT THAT!?
        </Modal.Header>
        <Modal.Body>
          <button
            value={currentPlaylistId}
            className="register-login-button"
            style={{ color: "red" }}
            onClick={(e) => removePlaylist(e)}
          >
            yes remove
          </button>
          <button
            className="register-login-button"
            onClick={() => {
              setShow(false);
              setCurrentPlaylistId(null);
            }}
          >
            nevermind
          </button>
        </Modal.Body>
      </Modal>

      <div className="web-message">Add new playlist:</div>
      <div>
        <form
          className="promo-req-form d-flex flex-column"
          onSubmit={handleSubmit(addPlaylist)}
        >
          <div className="form-title">Fill Out The Info</div>
          <div className="form-input">
            <span className="input-title">Input Playlist Link:</span>
            <input
              onInput={(e) => displayLink(e)}
              style={{ width: "35vw" }}
              type={"url"}
              placeholder="https://open.spotify.com/playlist/example"
              {...register("playlistSrc", {
                required: "⚠ song link is required",
                pattern: {
                  value:
                    /(https?:\/\/open.spotify.com\/(playlist)\/[a-zA-Z0-9]+(\/playlist\/[a-zA-Z0-9]+|)|spotify:(playlist):[a-zA-Z0-9])/,
                  message: "⚠ incorrect link",
                },
              })}
            ></input>
            <p className="error-message">{errors.playlistSrc?.message}</p>
            <span className="input-title">Choose Genre Of The Playlist:</span>
            <input
              type="text"
              placeholder="Type the genre here"
              list="list-genres"
              id="input-genrelist"
              {...register("genre", {
                required: "⚠ please select genre or type a new genre",
              })}
            />
            <datalist id="list-genres">
              {genres.map((genre) => {
                return <option>{genre}</option>;
              })}
            </datalist>
            <p className="error-message">{errors.genre?.message}</p>

            <span className="input-title">Input Playlist Name:</span>
            <input
              type="text"
              placeholder="Type the name here"
              {...register("playlistName", {
                required: "⚠ playlist name is required",
              })}
            ></input>
            <p className="error-message">{errors.playlistName?.message}</p>

            {playlistPreviewLink?.length ? (
              <div>
                <div>Playlist preview:</div>
                <iframe
                  className="track-frame"
                  title="link1"
                  style={{ borderRadius: "12px" }}
                  src={playlistPreviewLink}
                  width="285vw"
                  height="80"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                ></iframe>
              </div>
            ) : null}

            <div>
              <button className="register-login-button" type="submit">
                Add Playlist
              </button>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
}
