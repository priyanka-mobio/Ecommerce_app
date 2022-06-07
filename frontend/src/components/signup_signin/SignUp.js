import React from 'react'
import "./signinup.css"
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';

const SignUp = () => {

    const history = useNavigate();

    const [udata, setUdata] = useState({
        fname: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: ""
    });

         console.log(udata);

    const adddata = (e) => {
        const { name, value } = e.target;
        // console.log(name,value);

        setUdata((pre) => {
            return {
                ...pre,
                [name]: value
            }
        })
    };

    const senddata = async(e)=>{
        e.preventDefault();
        const { fname,email,mobile,password,cpassword } = udata;


        const res = await fetch("/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                fname,email,mobile,password,cpassword 
            })
        });
        const data = await res.json();
        // console.log(data);

        if (res.status=== 422 || !data){
            toast.warn("Invalid Data",{
                position: "top-center"
               })
        }else{
           // alert ("successfully Added ");
           toast.success("successfully Added",{
            position: "top-center"
           })
            setUdata({...udata,fname:"",email:"",mobile:"",password:"",cpassword:""});
            history('/LogIn')
        }

    }

  return (
    <section>
    <div className="signin_container">
        <div className="signin_form"> 
          <form method="POST">
            <h1> Create New Account </h1>
            <div className="form_data">
                <label htmlFor="fname">Enter Name : </label>
                <input type="text"
                onChange={adddata}
                value={udata.fname}
                name="fname" id="fname" />
            </div>

            <div className="form_data">
                <label htmlFor="email">Email: </label>
                <input type="text"
                onChange={adddata}
                value={udata.email}
                name="email" id="email" />
            </div>

            <div className="form_data">
                <label htmlFor="number">Mobile Number : </label>
                <input type="text" 
                onChange={adddata}
                value={udata.mobile}
                name="mobile" id="mobile" placeholder="Enter only number0-9"/>
            </div>

            <div className="form_data">
                <label htmlFor="password">Password : </label>
                <input type="password" 
                onChange={adddata}
                value={udata.password}
                name="password" id="password" placeholder="At least enter 6 Character"/>
            </div>

            <div className="form_data">
                <label htmlFor="cpassword">Confirm Password : </label>
                <input type="password" 
                 onChange={adddata}
                 value={udata.cpassword}
                name="cpassword" id="cpassword" placeholder="Re-enter Password"/>
            </div>

              <button className="signin_btn" onClick={senddata}>  Continue </button>

          </form>
        </div>
        <ToastContainer />
      </div>
</section>
  )
}

export default SignUp
