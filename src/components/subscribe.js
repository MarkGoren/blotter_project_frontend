import Cookies from "js-cookie";
import { Accordion, Container } from "react-bootstrap";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import Api from "../api/api";

export default function Subscribe() {
  const userInfo = Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo").slice(2))
    : undefined;
  const isSub = Cookies.get("isSub") ? Cookies.get("isSub") : false;
  const location = useLocation();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      agreement: "",
    },
  });

  function subscribe() {
    Api.userSubscribe(userInfo);
  }

  return (
    <>
      {!userInfo ? (
        <Container>
          <div className="page-title">
            <h3>Subscribe NOW for FREE!</h3>
          </div>

          <div className="web-message">
            To subscribe you have to{" "}
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
        </Container>
      ) : (
        <>
          {userInfo.is_sub || isSub ? (
            <Container>
              <div className="page-title">
                <h3>Thank you for SUBSCRIBING!</h3>
              </div>

              <div className="web-message">
                Check your email inbox with which you are registered so you
                won't miss out on weekly Blotter newsletters!
              </div>

              <Accordion style={{ margin: "1rem 0" }}>
                <AccordionItem>
                  <AccordionHeader eventKey="0">FAQs</AccordionHeader>
                  <AccordionBody>
                    <div className="faq-title">When do we send email?</div>
                    <div>
                      Emails are sent every week usually on the weekends, we
                      don't have a constant time.
                    </div>
                    <br></br>

                    <div className="faq-title">
                      I can't find your email, what to do?
                    </div>
                    <div>
                      If our email didn't get to your inbox you can try checking
                      in the Socials section.
                      <br></br>If the email doesn't appear there either check in
                      the Spam section.
                    </div>
                    <br></br>

                    <div className="faq-title">
                      I keep recieving your email in spam, what to do?
                    </div>
                    <div>
                      You will need to mark our email as not spam and as safe in
                      the email settings in the mail that we sent.
                    </div>
                  </AccordionBody>
                </AccordionItem>
              </Accordion>
            </Container>
          ) : (
            <Container>
              <div className="page-title">
                <h3>Subscribe NOW for FREE!</h3>
              </div>

              <div className="web-message">
                Subscribe now and get weekly updates and interesting insights
                about new tracks and playlists!
              </div>

              <form onSubmit={handleSubmit(subscribe)}>
                <div className="web-message" style={{ margin: "1rem 0" }}>
                  By subscribing to us you agree to get weekly news, new
                  playlists and new tracks via email with which you registered.
                  Genre of the tracks and playlists may differ.
                </div>

                <div className="web-message" style={{ margin: "1rem 0" }}>
                  <input
                    type={"checkbox"}
                    style={{ width: "1rem" }}
                    {...register("agreement", {
                      required: "⚠ you have to agree to our terms to subscribe",
                    })}
                  ></input>
                  <span>I Agree!</span>
                </div>
                <p className="error-message">{errors.agreement?.message}</p>

                <button type="submit" className="submit-button">
                  Subscribe
                </button>
              </form>
            </Container>
          )}
        </>
      )}
    </>
  );
}
