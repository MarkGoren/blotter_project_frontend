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
        <p className="content-line">
          Blotter™ is a place to find good quality Spotify playlists.
        </p>
        <p className="content-line">
          By{" "}
          <a className="web-links" href="/subscribe">
            subscribing
          </a>{" "}
          to us you will get weekly news, updates and insights with hand picked
          tracks.
        </p>
        <p className="content-line">
          You can contribute to our playlists by{" "}
          <a className="web-links" href="/reqPromo">
            requesting song promotions
          </a>
          , we will gladly review your request in week time 😊
        </p>
        <p>We hope you'll find our service helpfull!</p>
        <p className="about-us-quote">
          "If you don't already have tinnitus, you're not listening loud
          enough."
        </p>
        <p className="about-us-quote">-Unknown</p>
      </div>
    </Container>
  );
}
