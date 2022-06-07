import { Divider } from '@mui/material';
import React,{useState , useEffect} from 'react'
import Option from './Option';
import Right from './Right';
import "./buynow.css";
import Subtotal from './Subtotal';



const Buynow = () => {
 

  const [cartdata, setCartdata] = useState("");
  console.log(cartdata.carts);
  

  const getdatabuy = async () => {
    const res = await fetch("/cartdetails", {
        method: "GET",
        headers: {
            Accept:"application/json",
            "Content-Type": "application/json"
        },
        credentials:"include"
    });
    const data = await res.json();

    if (res.status !== 201) {
      console.log("error" );
    } else {
      // history("/buynow")
      
      setCartdata(data.carts); 
     
    }
  
  };

  useEffect(() => {
    getdatabuy();
  }, []);


    return (
      <>
      {
        cartdata.length ? <div className="buynow_section"> 
        <div className="buynow_container"> 
            <div className="left_buy"> 
                <h1> Shopping Cart </h1>
                <p> Select All Items </p>
                <span className="leftbuyprice">Price</span>
                <Divider />

                {
                  cartdata.map((e,k)=>{
                    if (!e) return null
                    return(
                      <>
                          <div className="item_container"> 
                            <img src={e.detailUrl} alt="cart_img" /> 
                                <div className="item_details">
                                   <h3>{e.title.longTitle}</h3>
                                   <h3> {e.title.shortTitle}</h3>
                                   <h3 className="diffrentprice"> ₹4049.00</h3>
                                   <p className="unusuall"> Usually Dispatched In 8 Days</p>
                                   <p> Eligible For FREE Shipping </p>
                                   <img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png" alt="logo" />
                                   <Option deletedata={e.id} get={getdatabuy} />
                                </div>
                                    <h3 className="item_price"> ₹{e.price.cost}.00</h3>
                          </div>
                          <Divider />
                      </>
                    )
                  })
                }

                <Subtotal item = {cartdata} />
            </div>
          <Right item = {cartdata} />
        </div>
      </div> : ""
      }
      
    </>
    
      
    
  )
}

export default Buynow