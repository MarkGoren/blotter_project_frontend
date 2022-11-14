import { Container } from "react-bootstrap";
import logo from "../web_imgs/blotter_logo.png";

export default function AboutUs() {
  return (
    <Container>
      <div className="page-title">about us</div>
      <div>
        <img
          src={logo}
          alt="oopsie"
          style={{ width: "12rem", height: "auto", marginTop: "1rem" }}
        ></img>
      </div>
      <div className="about-us-content">
        <div>Blotter™ is a place to find good quality Spotify playlists.</div>
        <div>
          By{" "}
          <a className="web-links" href="/subscribe">
            subscribing
          </a>{" "}
          to us you will get weekly news about new playlists with hand picked
          songs.
        </div>
        <div>
          You can contribute to our playlists by{" "}
          <a className="web-links" href="/reqPromo">
            requesting song promotions
          </a>
          , we will gladly review your request in week time 😊
        </div>
        <div>We hope you'll find our service helpfull!</div>
      </div>
    </Container>
  );
}
