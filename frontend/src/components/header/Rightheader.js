import {React, useContext} from 'react'
import Avatar from '@mui/material/Avatar';
import { LoginContext } from '../context/ContextProvider';
import { NavLink } from 'react-router-dom';
import { Divider } from '@mui/material';
import "./rightheader.css";
import LogoutIcon from '@mui/icons-material/Logout';


const Rightheader = ({logClose,logoutuser}) => {

   const {account,setAccount} = useContext(LoginContext);

  return (
    <>
        <div className = "rightheader">
            <div className = "right_nav">
            {
               account? <Avatar className = "avtar2">{account.fname[0].toUpperCase()}</Avatar>:
                <Avatar className = "avtar"></Avatar>
            }
            {account ? <h3>Hello, {account.fname.toUpperCase()}</h3> : ""}
            
            </div>
            <div className = "nav_btn" onClick={()=>logClose()}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/">Shop By Category</NavLink>

                <Divider style={{ width: "100%", marginLeft: -20 }} />

                <NavLink to="/">Today's Deal</NavLink>
                {
                    account ?  <NavLink to="/buynow">Your Orders</NavLink> :
                    <NavLink to="/LogIn">Your Orders</NavLink>
                }
                 <Divider style={{ width: "100%", marginLeft: -20 }} />

                 <div className = "flag"> 
                    <NavLink to="/">Settings</NavLink>
                 </div>
                 {
                    account ?
                        <div className="flag">
                            <LogoutIcon style={{ fontSize: 18, marginRight: 4 }} />
                            <h3 onClick={() => logoutuser()} style={{ cursor: "pointer", fontWeight: 500 }}>LogOut</h3>
                        </div>
                        : <NavLink to="/login">Sign in</NavLink>
                }
                
            </div>
        </div>
    </>
  )
}

export default Rightheader