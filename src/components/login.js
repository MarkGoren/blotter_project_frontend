import { Modal, CloseButton } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import Api from "../api/api";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Login(props) {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (Cookies.get("userInfo")) {
      navigate("/");
    }
  });

  function handleLogin(loginInfo) {
    setMessage("");
    if (loginInfo.email.includes("blotteradmin")) {
      Api.adminLogin(loginInfo).then(() => {
        if (Cookies.get("userInfo")) {
          props.setUserInfo(JSON.parse(Cookies.get("userInfo").slice(2)));
          navigate(-1);
        } else {
          setMessage("⚠ email or password incorrect");
        }
      });
    } else {
      Api.userLogin(loginInfo).then(() => {
        // i had to slice the cookie value because it started with 'j:'
        if (Cookies.get("userInfo")) {
          props.setUserInfo(JSON.parse(Cookies.get("userInfo").slice(2)));
          navigate(-1);
        } else {
          setMessage("⚠ email or password incorrect or unverified account");
        }
      });
    }
  }
  return (
    <Modal className="register-login-modal" show={true}>
      <Modal.Header>
        <Modal.Title className="register-login-title fw-bold">
          Login!
        </Modal.Title>
        <CloseButton onClick={() => navigate("/")} />
      </Modal.Header>

      <Modal.Body>
        <form
          className="login-form"
          style={{ alignItems: "center" }}
          onSubmit={handleSubmit(handleLogin)}
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
            type={"password"}
            placeholder={"Password"}
            className="register-login-input"
            {...register("password", {
              required: "⚠ password is required",
            })}
          ></input>
          <p className="error-message">{errors.password?.message}</p>
          <p className="error-message">{message}</p>
          <Link
            to={"/forgotPassword"}
            state={{ background: location }}
            className="forgot-password-link"
          >
            forgot password
          </Link>
          <button className="register-login-button" type="submit">
            Login
          </button>
        </form>
      </Modal.Body>

      <Modal.Footer className="d-flex flex-column">
        <div>
          don't have an account yet?
          <Link
            to={"/register"}
            className="login-link"
            state={{ background: location }}
          >
            {" "}
            register here
          </Link>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
