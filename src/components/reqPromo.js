import { Container } from "react-bootstrap";
import { set, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { Link, useLocation } from "react-router-dom";
import * as moment from "moment";
import { useEffect, useRef, useState } from "react";
import Api from "../api/api";

export default function ReqPromo() {
  const daysLastSubmit = useRef();

  const [link, setLink] = useState("");
  const [genres, setGenres] = useState([]);

  const userInfo = Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo").slice(2))
    : undefined;

  function getDaysFromLastSubmit() {
    if (!userInfo) {
      daysLastSubmit.current = 8;
      return;
    } else if (userInfo.last_submit) {
      const dateNow = moment();
      daysLastSubmit.current = dateNow.diff(
        moment(userInfo.last_submit),
        "days"
      );
      return;
    }
    Api.getLastReqDate().then((data) => {
      if (data[0] && data[0].last_submit) {
        const dateNow = moment();
        daysLastSubmit.current = dateNow.diff(
          moment(data[0].last_submit),
          "days"
        );
      } else {
        daysLastSubmit.current = 8;
      }
    });
  }

  useEffect(() => {
    getDaysFromLastSubmit();
    Api.getAllGenres().then((data) => setGenres(data));
  });

  const location = useLocation();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      genre: "",
      songLink: "",
      agreement: "",
    },
  });

  function reqSubmit(reqInfo) {
    Api.newReq(reqInfo)
      .then(() => getDaysFromLastSubmit())
      .then(() => window.location.reload());
  }

  function displayLink(e) {
    let pattern =
      /(https?:\/\/open.spotify.com\/(track)\/[a-zA-Z0-9]+|spotify:(track):[a-zA-Z0-9])/;
    if (pattern.test(e.target.value) || !e.target.value) {
      let newLink = e.target.value;
      setLink(newLink);
    }
  }
  return (
    <>
      <Container>
        <div className="page-title">
          <h3>request promotion</h3>
        </div>
        <div className="form-explain">
          Here you can fill out a track promotion request bellow and if we find
          a good place for your requested track in one of our playlists it will
          show up there after 7 days.
        </div>
        {userInfo ? (
          <>
            {daysLastSubmit.current >= 7 ? (
              <form
                className="promo-req-form d-flex flex-column"
                onSubmit={handleSubmit(reqSubmit)}
              >
                <div className="form-title">Fill Out The Info</div>
                <div className="form-input">
                  <span className="input-title">Choose Genre:</span>
                  <select
                    {...register("genre", {
                      required: "⚠ please select genre",
                    })}
                  >
                    <option value={""}>Select</option>
                    {genres.map((genre) => {
                      return <option value={genre}>{genre}</option>;
                    })}
                  </select>
                  <p className="error-message">{errors.genre?.message}</p>
                </div>

                <div className="form-input">
                  <span className="input-title">Track Link:</span>
                  <input
                    onInput={(e) => displayLink(e)}
                    style={{ width: "35vw" }}
                    type={"url"}
                    placeholder="https://open.spotify.com/track/example"
                    {...register("songLink", {
                      required: "⚠ song link is required",
                      pattern: {
                        value:
                          /(https?:\/\/open.spotify.com\/(track)\/[a-zA-Z0-9]+(\/playlist\/[a-zA-Z0-9]+|)|spotify:(track):[a-zA-Z0-9])/,
                        message: "⚠ incorrect link",
                      },
                    })}
                  ></input>
                  <p className="error-message">{errors.songLink?.message}</p>
                  {link?.length ? (
                    <div>
                      <iframe
                        className="track-frame"
                        title="link1"
                        style={{ borderRadius: "12px" }}
                        src={`https://open.spotify.com/embed/track/${
                          link.split("/")[4].split("?")[0]
                        }?utm_source=generator`}
                        width="285vw"
                        height="80"
                        frameBorder="0"
                        allowFullscreen={true}
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      ></iframe>
                    </div>
                  ) : null}
                </div>

                <div className="form-input">
                  <input
                    type={"checkbox"}
                    {...register("agreement", {
                      required: "⚠ you must agree to our terms",
                    })}
                  ></input>
                  <span className="input-title" style={{ fontSize: "0.85rem" }}>
                    I acknwoledge that this request will be processed in 7 days
                    and I will accept the answer if it's positive or negative.{" "}
                  </span>
                  <div style={{ fontSize: "0.85rem" }}>
                    Each promotion can be requested once a week.
                  </div>
                  <p className="error-message">{errors.agreement?.message}</p>
                </div>

                <div>
                  <button className="register-login-button" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            ) : (
              <div className="web-message">
                You can submit again in {7 - daysLastSubmit.current} days!
              </div>
            )}
          </>
        ) : (
          <div className="web-message">
            To submit a promotion request you have to{" "}
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
