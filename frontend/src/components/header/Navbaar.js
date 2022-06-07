import {React, useContext, useEffect, useState} from 'react';
import "./navbaar.css";
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Rightheader from './Rightheader';
import { NavLink } from 'react-router-dom';
import  {LoginContext} from "../context/ContextProvider";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {useSelector} from 'react-redux';


const Navbaar = () => {


  const {account,setAccount} = useContext(LoginContext);
  console.log(account); 
  const storage=localStorage.getItem('login')

  const history = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

 
  const [text,setText] = useState("");
  console.log(text);
  const [liopen,setLiopen] = useState(true); 

 const { products } = useSelector(state => state.getproductsdata);


  const [dropen,setDropen] = useState(false);

  const getdetailvaliduser = async()=>{
    const res = await fetch("/validuser",{
      method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
    });

    const data = await res.json();
    console.log(data);

    if(res.status !== 201){
      console.log("error");
    }else{
      console.log("data valid");
      setAccount(data);
    }

  };

  const handleopen = ()=>{
    setDropen(true)
  }

  const handledrclose = ()=>{
    setDropen(false)
  }
  

  const logoutuser = async()=>{
    const res2 = await fetch("/logout",{
      method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
    });

    const data2 = await res2.json();
    console.log(data2);
    localStorage.clear()

    if(res2.status !== 201){
      console.log("error");
    }else{
      console.log("data valid");
     // alert("logout");
     toast.success("User Logout",{
      position: "top-center"
     })
      history("/");
      setAccount(false);
      
    }

  };

  const getText = (items)=>{
      setText(items);
      setLiopen(false);
  }


  useEffect(()=>{
    getdetailvaliduser ()
  },[])

  return (
    <header>
        <nav>
          <div className = "left">
        
          <IconButton className="hamburgur" onClick={handleopen}> 
            <MenuIcon style = {{color:"#fff"}}/>
          </IconButton>
        
            <Drawer open={dropen} onClose={handledrclose}>
              <Rightheader logClose ={handledrclose} logoutuser={logoutuser}/>
            </Drawer>
          
              <div className = "navlogo"> 
                 <NavLink to="/"> <img src = "./s.png" alt=""/> </NavLink>
              </div>

              <div className = "nav_searchbaar">
                   <input type="text" name="" id=""
                   onChange={(e)=>getText(e.target.value)}
                   placeholder = 'Search Products'
                   />
                <div className = "search_icon" >
                    <SearchIcon id="search"/>
                </div>

                {/* Search filter */}

                {
                  text &&
                  <List className="extrasearch" hidden={liopen}>
                  {
                      products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                          <ListItem>
                              <NavLink to={`/getproductsone/${product.id}`} onClick={() => setLiopen(true)}>
                                  {product.title.longTitle}
                              </NavLink>
                          </ListItem>
                      ))
                  }
              </List>
          }

              </div>
            </div>
          <div className = "right"> 
                {
                    account ?
                        <div className="flag">

                            <h3 onClick={() => logoutuser()} style={{ cursor: "pointer",color:"white",fontSize:15,fontWeight:'normal'}}>Log Out</h3>
                        </div>
                        : <NavLink to="/LogIn" style={{color:"white",cursor: "pointer"}}>Log in</NavLink>
                } 

             <div className="cart_btn">  

                    {
                        account ? <NavLink to="/buynow">
                            <Badge badgeContent={account.carts.length} color="primary">
                                <ShoppingCartIcon id="icon" />
                            </Badge>
                        </NavLink> : <NavLink to="/login">
                            <Badge badgeContent={0} color="primary">
                                <ShoppingCartIcon id="icon" />
                            </Badge>
                        </NavLink>
                    }

                    <ToastContainer />

              
                 <p> Cart </p>
              </div>
              {storage?
             account ? <Avatar className="avtar2"
             id="basic-button"
             aria-controls={open ? 'basic-menu' : undefined}
             aria-haspopup="true"
             aria-expanded={open ? 'true' : undefined}
             onClick={handleClick}
             >{account.fname[0].toUpperCase()}</Avatar>:
             <Avatar className="avtar" 
             id="basic-button"
             aria-controls={open ? 'basic-menu' : undefined}
             aria-haspopup="true"
             aria-expanded={open ? 'true' : undefined}
             onClick={handleClick}
             > </Avatar>:null}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>My account</MenuItem>
        {
          account ?  <MenuItem onClick={handleClose} onClick = {logoutuser} ><LogoutIcon style={{ fontSize: 16, marginRight: 3 }} /> Logout </MenuItem> : "" 
        }
       
      </Menu>

              </div>

        </nav>
        
    </header>
  )
}

export default Navbaar