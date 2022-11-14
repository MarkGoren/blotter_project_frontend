import "./App.css";
import Footer from "./components/footer";
import BlotterNavbar from "./components/navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/home";
import Category from "./components/category";
import AboutUs from "./components/aboutUs";
import WhatsNew from "./components/whatsNew";
import Register from "./components/register";

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <div className="App">
      <BlotterNavbar />
      <Routes location={background || location}>
        <Route path="/" element={<Home />}>
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/category/:category" element={<Category />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/whatsNew" element={<WhatsNew />} />
      </Routes>
      <Footer />
      {background && (
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
