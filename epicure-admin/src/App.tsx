import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AdminPannel from "./Pages/AdminPannel/AdminPannel";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import SingIn from "./Pages/SingIn/SingIn";
import Footer from "./Components/Footer/Footer";
import ResponsiveDrawer from "./Pages/AdminPannel/Components/ResponsiveDrawer/ResponsiveDrawer";
import SingUp from "./Pages/SingUp/SingUp";
const token=localStorage.getItem('token')
function App() {
  return (
    <div className="app">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/login" element={<SingIn />}></Route>
          <Route path="/admin" element={token&&<ResponsiveDrawer />}></Route>
          <Route path="/SingUp" element={<SingUp />}></Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
