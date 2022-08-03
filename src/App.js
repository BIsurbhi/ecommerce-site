import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Common/Header/Header";

import Cards from "./Components/Cards";
import Footer from "./Components/Common/Footer/Footer";

import Main from "./Components/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Slide from "./Components/Slide";
import WishLists from "./Components/WishLists/WishLists";
import ConatactUs from "./Components/ConatactUs";
import AboutUs from "./Components/AboutUs";
import Shoppingcart from "./Components/ShoppingCart/Shoppingcart";
import Slick from "./Components/Slick";
//import Stepper from "./Components/stepper";
function App() {
  return (
    <div>
      <Header/>
        <Routes>
          <Route element={<Main />} path="/" />
         
          <Route element={<Slide />} path="/slider" />
          <Route element={<WishLists />} path="/wish" />
          <Route element= {<Cards/>} path='/ourproducts' />
          <Route element= {<ConatactUs/>} path='/contact' />
          <Route element= {<AboutUs/>} path='/about' />
          <Route  element={<Shoppingcart/>} path='/shoppingCart'/>
          <Route  element={<Slick/>} path='/slick'/>
        </Routes>
      

      
    </div>
  );
}

export default App;
