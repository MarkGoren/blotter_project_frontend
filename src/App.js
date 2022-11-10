import "./App.css";
import Footer from "./components/footer";
import BlotterNavbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Category from "./components/category";
import AboutUs from "./components/aboutUs";
import WhatsNew from "./components/whatsNew";

function App() {
  return (
    <div className="App">
      <header>
        <BlotterNavbar />
      </header>
      <body>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/whatsNew" element={<WhatsNew />} />
          </Routes>
        </Router>
      </body>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
