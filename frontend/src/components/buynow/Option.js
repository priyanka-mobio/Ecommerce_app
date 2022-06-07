import React,{useContext} from 'react'
import { LoginContext } from "../context/ContextProvider";
import { NavLink } from 'react-router-dom';


const Option = ({deletedata,get}) => {

  const {account,setAccount} = useContext(LoginContext);
   console.log(account);
  const removedata = async(req,res)=>{
    try {
      const res = await fetch(`/remove/${deletedata}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    const data = await res.json();
    console.log(data);

    if(res.status === 400 || !data){
    console.log("error");
    }else{
      console.log("user delete");
      setAccount(data);
      get();
    }

    } catch (error) {
        console.log("error");
    }
  }

  return (
    <div className="add_remove_select"> 
        <select> 
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </select>
         <p style={{cursor:"pointer",fontWeight:"bold"}}onClick ={()=>removedata(deletedata)}> Delete </p> 
         <NavLink to="/payment" style={{width:"30%",fontSize:"80%", color:'black',fontWeight:"bold"}}> Payment</NavLink>
        
    </div>
  )
}

export default Option