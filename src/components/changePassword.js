import Cookies from "js-cookie";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Api from "../api/api";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  if (!submitted && !Cookies.get("userId")) {
    navigate("/");
  }
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({
    defaultValues: {
      password: "",
      passwordRepeat: "",
    },
  });

  function submitPassword(password) {
    Api.changePassword(password)
      .then(() => setSubmitted(true))
      .then(() => Cookies.remove("userId"));
  }
  return submitted ? (
    <Container>
      <div className="page-title" style={{ marginBottom: "4rem" }}>
        <h3>Password Changed Succefully!</h3>
      </div>

      <p className="web-message">
        your password was changed succefully, you can now login with your new
        password
      </p>
    </Container>
  ) : (
    <Container>
      <div className="page-title" style={{ marginBottom: "4rem" }}>
        <h3>New Password!</h3>
      </div>

      <p className="web-message">
        please provide a new password, it must be at least 8 characters long
      </p>

      <form
        className="d-flex flex-column"
        style={{ alignItems: "center" }}
        onSubmit={handleSubmit(submitPassword)}
      >
        <input
          type={"password"}
          placeholder={"Password"}
          className="register-login-input"
          {...register("password", {
            required: "⚠ password is required",
            pattern: {
              value: "^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$",
              message: "⚠ password must contain at least one number and letter",
            },
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
        <button
          className="register-login-button"
          type="submit"
          style={{ width: "15rem" }}
        >
          Change Password
        </button>
      </form>
    </Container>
  );
}
