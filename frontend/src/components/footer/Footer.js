import React from 'react'
import "../footer/footer.css";

const Footer = () => {

    const year = new Date().getFullYear();
    console.log(year);

  return (
    <footer>
            <div className="footer_container"> 
                   <div className="footer_details_one">
                        <h3> Know Us Better</h3>
                        <p>About us</p>
                        <p>Careers</p>
                        <p>Press Releases</p>
                        <p> Gift a Smile</p>
                        <p>E-Shop Cares</p>
                    </div> 

                    <div className="footer_details_one forres">
                        <h3> Follows Us</h3>
                        <p>Instagram</p>
                        <p>Facebook</p>
                        <p>Twitter</p>
                    </div> 

                    <div className="footer_details_one forres">
                        <h3> Make Money with Us </h3>
                        <p>Sell on E-Shop </p>
                        <p>E-Shop Global Selling</p>
                        <p>Advertise Your Products</p>
                    </div> 

                    <div className="footer_details_one forres">
                        <h3> Let Us Help You </h3>
                        <p>Your Account</p>
                        <p>Returns Centre</p>
                        <p> E-Shop App Download</p>
                        <p> Help </p>
                    </div> 
            </div> 

            <div className="lastdetails">
                        <img src="./s.png" alt="" />
                        <p> Conditions of Use and Sale &nbsp; &nbsp;&nbsp;  Privacy Notice  &nbsp; &nbsp;&nbsp; Interest-Based Ads  &nbsp; &nbsp;&nbsp;  © 1996-{year}, E-shop.com, Inc. or its affiliates  </p>
            </div>
            
    </footer>
  )
}

export default Footer 