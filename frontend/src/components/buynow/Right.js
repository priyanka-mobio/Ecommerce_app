import React,{useState,useEffect}from 'react'

const Right = ({item}) => {

  const [price, setPrice] = useState(0);

  useEffect(() => {
      totalAmount();
  }, [item]);

  const totalAmount = () => {
      let price = 0
      item.forEach((item) => {
        if (item) { 
          price = item.price.cost + price
        }
      });
      setPrice(price)
  }


  return (
    <div className="right_buy">
        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png" alt="rightimg" />
    
        <div className="cost_right"> 
        <p>Your order is eligible for FREE Delivery. <br />
        <span style={{ color: "#565959" }}> Select this option at checkout. Details</span></p>
        <h3>Subtotal ({item.length} items) <span style={{fontWeight: "700"}}> ₹{price}.00 </span></h3> 
        <button className="rightbuy_btn">  Process To Buy </button>
        <div className="emi"> 
              Emi Avaliable
        </div>
        </div>
    </div>
        
  )
}

export default Right