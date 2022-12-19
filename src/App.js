import "./App.css";
import Footer from "./components/footer";
import BlotterNavbar from "./components/navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/home";
import Category from "./components/category";
import AboutUs from "./components/aboutUs";
import WhatsNew from "./components/whatsNew";
import Register from "./components/register";
import Login from "./components/login";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Logout from "./components/logout";
import Api from "./api/api";
import Favorites from "./components/favorites";
import ReqPromo from "./components/reqPromo";
import PromoReq from "./components/promoReq";
import UserPromos from "./components/userPromos";
import Subscribe from "./components/subscribe";

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  const [userInfo, setUserInfo] = useState({});
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (Cookies.get("userInfo")) {
      setUserInfo(JSON.parse(Cookies.get("userInfo").slice(2)));
      Api.getFavorites(JSON.parse(Cookies.get("userInfo").slice(2))).then(
        (data) => setFavorites(data)
      );
    } else {
      setUserInfo({});
    }
  }, []);
  return (
    <div className="App">
      <BlotterNavbar userInfo={userInfo} />
      <Routes location={background || location}>
        <Route path="/" element={<Home />}>
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/" element={<Home />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/" element={<Home />}>
          <Route path="/logout" element={<Logout />} />
        </Route>
        <Route
          path="/category/:category"
          element={
            <Category favorites={favorites} setFavorites={setFavorites} />
          }
        />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/whatsNew" element={<WhatsNew />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/reqPromo" element={<ReqPromo />} />
        <Route path="/promoReq" element={<PromoReq />} />
        <Route path="/userPromos" element={<UserPromos />} />
        <Route path="/subscribe" element={<Subscribe />} />
      </Routes>
      <Footer />
      {background && (
        <Routes>
          <Route
            path="/register"
            element={<Register setUserInfo={setUserInfo} />}
          />
        </Routes>
      )}
      {background && (
        <Routes>
          <Route path="/login" element={<Login setUserInfo={setUserInfo} />} />
        </Routes>
      )}
      {background && (
        <Routes>
          <Route
            path="/logout"
            element={<Logout setUserInfo={setUserInfo} />}
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
