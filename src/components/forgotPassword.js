import { Modal, CloseButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Api from "../api/api";

export default function ForgotPassword() {
  const navigate = new useNavigate();
  const [emailSent, setEmailSent] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  function emailSubmit(email) {
    Api.sendResetPasswordEmail(email).then(() => {
      setEmailSent(true);
    });
  }
  return (
    <Modal className="register-login-modal" show={true}>
      <Modal.Header>
        <Modal.Title className="register-login-title fw-bold">
          Forgot Password
        </Modal.Title>
        <CloseButton onClick={() => navigate("/")} />
      </Modal.Header>

      {emailSent ? (
        <Modal.Body>
          <p
            className="web-message"
            style={{ textAlign: "center", fontWeight: "bold" }}
          >
            Check your email and open the link we sent you to continue!
          </p>
        </Modal.Body>
      ) : (
        <Modal.Body>
          <p
            className="web-message"
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginTop: "1rem",
            }}
          >
            Enter your email and we'll send you a link to reset your password
          </p>
          <form
            className="d-flex flex-column"
            style={{ alignItems: "center" }}
            onSubmit={handleSubmit(emailSubmit)}
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
            <button
              className="register-login-button"
              type="submit"
              style={{ width: "17rem" }}
            >
              Send Link To Email
            </button>
          </form>
        </Modal.Body>
      )}
    </Modal>
  );
}
