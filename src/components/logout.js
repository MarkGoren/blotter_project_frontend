import Cookies from "js-cookie";
import { Modal, CloseButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Logout(props) {
  const navigate = useNavigate();
  function logout() {
    Cookies.remove("userInfo");
    Cookies.remove("isSub");
    Cookies.remove("jwtToken");
    props.setUserInfo("");
    navigate("/");
  }
  return (
    <Modal className="register-login-modal" show={true}>
      <Modal.Header>
        <Modal.Title className="register-login-title fw-bold">
          Logout?!
        </Modal.Title>
        <CloseButton onClick={() => navigate("/")} />
      </Modal.Header>

      <Modal.Body style={{ textAlign: "center" }}>
        <div style={{ fontSize: "1.3rem", margin: "1rem 0" }}>
          Are you sure you want to logout?
        </div>
        <div>
          <button
            className="register-login-button"
            onClick={() => navigate(-1)}
          >
            No
          </button>
          <button className="register-login-button" onClick={() => logout()}>
            Yes
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
