import { Divider } from '@mui/material'
import "./cart.css";
import {useParams,useNavigate} from 'react-router-dom';
import { useContext, useEffect, useState} from 'react';
import {LoginContext} from "../context/ContextProvider";


const Cart = () => {


  const {id} = useParams("");
   //console.log(id);

  const history = useNavigate("");

 const {account,setAccount} = useContext(LoginContext);
  console.log(account);

   const [inddata,setIndedata] = useState("");
  console.log(inddata);
 
  const getinddata = async()=>{
    const res = await fetch(`/getproductsone/${id}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    });

    const data = await res.json();
      // console.log(data);
       if(res.status !== 201){
        alert("no data available")
    }else{
        // console.log("ind mila hain");
        setIndedata(data);
    }
};

 useEffect(() => {
  getinddata();
 },[id]);


// Add cart function

const addtocart = async (id) => {
  const checkres = await fetch(`/addcart/${id}`, {
    method: "POST",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        inddata
    }),
    credentials: "include"
});

   const data1 = await checkres.json();
   console.log(data1);
 
    if(checkres.status === 401 || !data1){
      console.log("User Invalid");
      alert ("User Invalid");
    }else{
     // alert ("Data added in Cart");
     history("/buynow");
     setAccount(data1);
    }
 }



 return (
       
  <div className="cart_section">
      { inddata && Object.keys (inddata).length && 
      <div className="cart_container">
          <div className="left_cart"> 
              <img src= {inddata.detailUrl} alt="cart_img" /> 
          
          <div className="cart_btn">
            <button className="cart_btn1" onClick={() => addtocart(inddata.id)}> Add To Cart </button>
            <button className="cart_btn2"> Buy Now </button>
          </div>
      </div>

          <div className="right_cart"> 
                 <h3> {inddata.title.shortTitle} </h3>
                  <h4> {inddata.title.longTitle}  </h4>
              <Divider />
              <p className="mrp"> ₹{inddata.price.mrp} </p>
              <p> Deal of the day : <span style={{color:"#B12704"}}> ₹{inddata.price.cost}.00</span> </p>
              <p> You Save : <span style={{color:"#B12704"}}>₹{inddata.price.mrp-inddata.price.cost} ({inddata.price.discount})</span> </p>

              <div className="discount_box"> 
              <h5> Dicount : <span style={{color:"#111"}}>{inddata.discount}</span> </h5>
              <h4> Free Delivery : <span style={{color:"#111", fontweight:600}}> Oct 8-21</span> Details </h4>
              <p> Fastest Delivery: <span style={{color:"#111", fontweight:600}}> Tommorow 11AM</span></p>
              </div>
              <p className="description"> About The Item : <span style={{color:"#565659",fontSize:14, fontweight:500, letterSpacing:"0.4px"}}> {inddata.description} </span> </p> 
          </div>
      </div>
    }
  </div>
)
} 

export default Cart