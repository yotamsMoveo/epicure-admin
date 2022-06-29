import React from 'react';
import logo from './logo.svg';
import './App.css';
import AdminPannel from './Pages/AdminPannel/AdminPannel';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import SingIn from './Pages/SingIn/SingIn';
import Footer from './Components/Footer/Footer';
import ResponsiveDrawer from './Pages/AdminPannel/Components/ResponsiveDrawer/ResponsiveDrawer';

function App() {
  return (
    <div className="app">
    <Navbar/>
    <Router>
      <div>
        <Router>
          <Route path="/">
            <SingIn />
          </Route>
          <Route path="/admin">
            <AdminPannel/>
          </Route>
        </Router>
      </div>
    </Router>
    <Footer/>
  </div>
  );
}

export default App;
