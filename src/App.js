import Home from "./component/Home.js"
import {BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Navbar from "./component/Navbar.js";
import Login from "./component/Login.js";
import "./App.css";
import Signin from "./component/Signin.js";
function App() {

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signin" element={<Signin/>}/>
      </Routes>
    </Router>
  );
}

export default App;
