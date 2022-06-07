import React from 'react'
import { NavLink } from 'react-router-dom'
import "./signinup.css"
import { useState , useContext} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from '../context/ContextProvider';
import {useNavigate} from 'react-router-dom';



const SignIn = () => {

  const history=useNavigate()
  const [logdata, setData] = useState({
    email: "",
    password: ""
});
  console.log(logdata);

  const {account,setAccount} = useContext(LoginContext);

    const adddata = (e) => {
      const { name, value } = e.target;
      // console.log(name, value);

      setData((pre) => {
        return {
            ...pre,
            [name]: value
        }
      })
  };


  const senddata = async (e) => {
    e.preventDefault();

    const {email,password} = logdata;

    const res = await fetch("/login", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          email, password
      })
  });

  const data = await res.json();
   console.log(data);
   localStorage.setItem("login",JSON.stringify(data))

  if (res.status === 400 || !data){
    console.log("Invalid Details");
    toast.warn("Invalid Data",{
      position: "top-center"
     })
  }else{
    console.log("Data valid");
    history("/")
    setAccount(data)
    toast.success("Valid User",{
      position: "top-center"
     })
    setData({...logdata,email:"",password:""}); 
    
  }

  }



  return (
    <>
        <section>
            <div className="signin_container">

                <div className="signin_form"> 
                  <form method='POST'>
                    <h1> Sign-In </h1>
                    <div className="form_data">
                        <label htmlFor="email">Email id : </label>
                        <input type="text" 
                        onChange={adddata}
                        value={logdata.email}
                        name="email" id="email" />
                    </div>

                    <div className="form_data">
                        <label htmlFor="password">Password : </label>
                        <input type="password" 
                        onChange={adddata}
                        value={logdata.password}
                        name="password" id="password" placeholder="At least enter 6 Character"/>
                    </div>

                      <button className="signin_btn" onClick={senddata}> Continue </button>

                  </form>
                </div>

                <div className="create_accinfo"> 
                  <p> New To E-Shop </p>
                  <NavLink to="/Register"> <button > Create New E-Shop Account </button> </NavLink>
                </div>

              </div>
              <ToastContainer/>
        </section>
    </>
  )
}

export default SignIn