import React from 'react'
import './App.css';
import Navbaar from './components/header/Navbaar';
import Newnav from './components/newnavbaar/Newnav';
import Maincomponent from './components/home/Maincomponent';
import Footer from './components/footer/Footer';
import SignIn from './components/signup_signin/SignIn';
import SignUp from './components/signup_signin/SignUp';
import {Routes,Route} from "react-router-dom";
import Cart from './components/cart/Cart';
import Buynow from './components/buynow/Buynow';
import Payment from './components/Payment';


function App() {


  return (

    <>
    
      <Navbaar/>
      <Newnav/>
          <Routes> 
              <Route path="/" element={<Maincomponent/>} />
              <Route path="/LogIn" element={<SignIn/>} />
              <Route path="/Register" element={<SignUp/>} />
              <Route path="/getproductsone/:id" element={<Cart/>} />
              <Route path="/buynow" element={<Buynow/>} />
              <Route path="/payment" element={<Payment/>}/>
          </Routes>
      <Footer />
    </>
  );
}

export default App; 
