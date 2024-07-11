import Home from "./component/Home.js"
import {BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Navbar from "./component/Navbar.js";
import Login from "./component/Login.js";
import "./App.css";
import Signin from "./component/Signin.js";
import Rentalstate from "./context/Rentalstate.js";
import Addshop from "./component/Addshop.js";
import Usershop from "./component/Usershop.js";
import Shop from "./component/Shop.js";
import SearchResult from "./component/SearchResult.js";



function App() {

  return (
    <Rentalstate>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/addshop" element={<Addshop/>}/>
          <Route path="/myshop" element={<Usershop/>}/>
          <Route path="/shop" element={<Shop/>}/>
          <Route path="/serchresults" element={<SearchResult/>}/>
        </Routes>
      </Router>
    </Rentalstate>
  );
}

export default App;
