import { Modal, CloseButton } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import Api from "../api/api";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function Register(props) {
  const [message, setMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      email_repeat: "",
      password: "",
      password_repeat: "",
    },
  });

  useEffect(() => {
    if (Cookies.get("userInfo")) {
      navigate("/");
    }
  });

  function handleRegister(userInfo) {
    Api.userExists(userInfo).then((data) => {
      if (data[0]) {
        setMessage("⚠ user already exists");
      } else {
        Api.registerUser(userInfo).then(() => {
          setIsRegistered(true);
        });
      }
    });
  }
  return (
    <Modal className="register-login-modal" show={true}>
      <Modal.Header>
        <Modal.Title className="register-login-title fw-bold">
          Sign Up!
        </Modal.Title>
        <CloseButton onClick={() => navigate(-1)} />
      </Modal.Header>

      {isRegistered ? (
        <Modal.Body>
          <div className="web-message register-message">
            <p style={{ fontWeight: "bold" }}>
              Thank you for registering to Blotter!
            </p>
            <p>
              To activate and use your account please check your email for
              account verification message.
            </p>
          </div>
        </Modal.Body>
      ) : (
        <Modal.Body>
          <form
            className="d-flex flex-column"
            style={{ alignItems: "center" }}
            onSubmit={handleSubmit(handleRegister)}
          >
            <input
              type={"email"}
              placeholder={"Email"}
              className="register-login-input"
              {...register("email", {
                required: "⚠ email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "⚠ incorrect email",
                },
              })}
            ></input>
            <p className="error-message">{errors.email?.message}</p>
            <input
              type={"email"}
              placeholder={"Repeat Email"}
              className="register-login-input"
              {...register("email_repeat", {
                validate: (value) => {
                  if (value !== watch("email")) {
                    return "⚠ emails do not match";
                  }
                },
              })}
            ></input>
            <p className="error-message">{errors.email_repeat?.message}</p>
            <input
              type={"password"}
              placeholder={"Password"}
              className="register-login-input"
              {...register("password", {
                required: "⚠ password is required",
                minLength: {
                  value: 8,
                  message: "⚠ password must be at least 8 characters long",
                },
              })}
            ></input>
            <p className="error-message">{errors.password?.message}</p>
            <input
              type={"password"}
              placeholder={"Repeat Password"}
              className="register-login-input"
              {...register("password_repeat", {
                validate: (value) => {
                  if (watch("password") !== value) {
                    return "⚠ passwords do not match";
                  }
                },
              })}
            ></input>
            <p className="error-message">{errors.password_repeat?.message}</p>
            <p className="error-message">{message}</p>
            <button className="register-login-button" type="submit">
              Register
            </button>
          </form>
        </Modal.Body>
      )}

      {isRegistered ? null : (
        <Modal.Footer className="d-flex flex-column">
          <div>
            already registered?
            <Link
              to={"/login"}
              className="login-link"
              state={{ background: location }}
            >
              {" "}
              login here
            </Link>
          </div>
        </Modal.Footer>
      )}
    </Modal>
  );
}
