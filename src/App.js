import Home from "./component/Home.js"
import {BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Navbar from "./component/Navbar.js";
import Login from "./component/Login.js";
import "./App.css";
import Signin from "./component/Signin.js";
import Rentalstate from "./context/Rentalstate.js";



function App() {

  return (
    <Rentalstate>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signin" element={<Signin/>}/>
        </Routes>
      </Router>
    </Rentalstate>
  );
}

export default App;
