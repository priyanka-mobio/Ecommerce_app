import React from 'react'
import "./newnav.css";

const Newnav = () => {
  return (
    <div className="new_nav">
        <div className="nav_data">
            <div className="left_data"> 
                <p>  All </p>
                <p>  Mobile </p>
                <p>  Best Sellers </p>
                <p>  Fashion </p>
                <p>  Customer Service </p>
                <p>  Electronics </p>
                <p>  Prime </p>
                <p>  Today's Deals </p>
                <p>  E-Shop Pay </p>
            </div>

            <div className="right_data"> 
                <img src="./nav1.jpg" alt="navdata"/>
            </div>

        </div>
    </div>
  )
}

export default Newnav