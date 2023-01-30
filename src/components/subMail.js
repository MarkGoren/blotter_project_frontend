import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Api from "../api/api";

export default function SubMail() {
  const navigate = useNavigate();
  const userInfo = Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo").slice(2))
    : undefined;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      songLink1: "",
      songLink2: "",
      songLink3: "",
    },
  });

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else if (!userInfo.isAdmin) {
      navigate("/");
    }
  });

  const [links, setLinks] = useState({});

  function displayLink(e) {
    let pattern =
      /(https?:\/\/open.spotify.com\/(track)\/[a-zA-Z0-9]+|spotify:(track):[a-zA-Z0-9])/;
    if (pattern.test(e.target.value) || !e.target.value) {
      let newLinks = { ...links };
      newLinks[e.target.id] = e.target.value;
      setLinks({ ...newLinks });
    }
  }

  function sendEmail(emailData) {
    Api.sendEmail(emailData)
      .then(() => document.getElementById("emailForm").reset())
      .then(() => setLinks({}))
      .finally(() => alert("Email Sent!"));
  }

  return (
    <>
      <Container>
        <div className="page-title">
          <h3>email promotion</h3>
        </div>

        <div className="web-message">Write email letter here:</div>

        <form
          id="emailForm"
          className="email-form"
          onSubmit={handleSubmit(sendEmail)}
        >
          <div>
            <textarea
              style={{ whiteSpace: "pre", overflowWrap: "break-word" }}
              maxLength={998}
              className="email-input"
              placeholder="write letter here..."
              {...register("email", {
                required: "⚠ letter is required",
              })}
            ></textarea>
            <p className="error-message">{errors.email?.message}</p>
          </div>
          <div>
            <div className="web-message">Track 1:</div>
            <input
              onInput={(e) => displayLink(e)}
              id="link1"
              className="link-input"
              type={"url"}
              placeholder="https://open.spotify.com/track/example"
              {...register("songLink1", {
                required: "⚠ track is required",
                pattern: {
                  value:
                    /(https?:\/\/open.spotify.com\/(track)\/[a-zA-Z0-9]+(\/playlist\/[a-zA-Z0-9]+|)|spotify:(track):[a-zA-Z0-9])/,
                  message: "⚠ incorrect link",
                },
              })}
            ></input>
            {links?.link1?.length ? (
              <div>
                <iframe
                  className="track-frame"
                  title="link1"
                  style={{ borderRadius: "12px" }}
                  src={`https://open.spotify.com/embed/track/${
                    links.link1.split("/")[4].split("?")[0]
                  }?utm_source=generator`}
                  width="285vw"
                  height="80"
                  frameBorder="0"
                  allowFullscreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                ></iframe>
              </div>
            ) : null}
            <p className="error-message">{errors.songLink1?.message}</p>
          </div>
          <div>
            <div className="web-message">Track 2:</div>
            <input
              onInput={(e) => displayLink(e)}
              id="link2"
              className="link-input"
              type={"url"}
              placeholder="https://open.spotify.com/track/example"
              {...register("songLink2", {
                required: "⚠ track is required",
                pattern: {
                  value:
                    /(https?:\/\/open.spotify.com\/(track)\/[a-zA-Z0-9]+(\/playlist\/[a-zA-Z0-9]+|)|spotify:(track):[a-zA-Z0-9])/,
                  message: "⚠ incorrect link",
                },
              })}
            ></input>
            {links?.link2?.length ? (
              <div>
                <iframe
                  className="track-frame"
                  title="link1"
                  style={{ borderRadius: "12px" }}
                  src={`https://open.spotify.com/embed/track/${
                    links.link2.split("/")[4].split("?")[0]
                  }?utm_source=generator`}
                  width="285vw"
                  height="80"
                  frameBorder="0"
                  allowFullscreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                ></iframe>
              </div>
            ) : null}
            <p className="error-message">{errors.songLink2?.message}</p>
          </div>
          <div>
            <div className="web-message">Track 3:</div>
            <input
              onInput={(e) => displayLink(e)}
              id="link3"
              className="link-input"
              type={"url"}
              placeholder="https://open.spotify.com/track/example"
              {...register("songLink3", {
                required: "⚠ track is required",
                pattern: {
                  value:
                    /(https?:\/\/open.spotify.com\/(track)\/[a-zA-Z0-9]+(\/playlist\/[a-zA-Z0-9]+|)|spotify:(track):[a-zA-Z0-9])/,
                  message: "⚠ incorrect link",
                },
              })}
            ></input>
            {links?.link3?.length ? (
              <div>
                <iframe
                  className="track-frame"
                  title="link1"
                  style={{ borderRadius: "12px" }}
                  src={`https://open.spotify.com/embed/track/${
                    links.link3.split("/")[4].split("?")[0]
                  }?utm_source=generator`}
                  width="285vw"
                  height="80"
                  frameBorder="0"
                  allowFullscreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                ></iframe>
              </div>
            ) : null}
            <p className="error-message">{errors.songLink3?.message}</p>
          </div>
          <button type="submit" className="submit-button">
            Send Email
          </button>
        </form>
      </Container>
    </>
  );
}
