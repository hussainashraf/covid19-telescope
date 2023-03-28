// import logo from './logo.svg';
import Dashbord from "./components/Dashbord";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
// import Login from "./components/Login";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./components/Navbar";
import Page from "./components/Page";
import Welcome from "./components/Welcome";
import './App.css'
function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  const newPage = () => {
    let path = "/auth";
    navigate(path);
  };
  return (
    <div>
      <Navbar />
      {isAuthenticated ? (
        <Routes>
          <Route path="/" element={<Dashbord />} />
          <Route path="/profile" element={<Page />} />
        </Routes>
      ) : (
        <Welcome />
      )}
    </div>
  );
}

export default App;
