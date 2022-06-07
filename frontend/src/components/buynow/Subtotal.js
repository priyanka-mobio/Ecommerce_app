import React, {useState, useEffect} from 'react'


const Subtotal = ({item }) => {
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
    <div className="sub_item" >
        <h3> Subtotal ({item.length} items): <strong style={{fontweight:700, color:"#111"}}> ₹{price}.00 </strong> </h3>
    </div>
  )
}

export default Subtotal