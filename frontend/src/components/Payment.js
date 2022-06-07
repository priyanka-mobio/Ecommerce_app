import React,{useState} from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';

function Payment() {

    const [number,setNumber] = useState('')
    const [name,setName] = useState('')
    const [expiry,setExpiry] = useState('')
    const [cvc,setCvv] = useState('')
    const [focus,setFocus] = useState('')

    const history=useNavigate()
     const handlebutton=()=>{
         history("/buynow")
     }

  return (
      <> 
      <div className="app"> 
        <form align="center" style={{marginTop:"80px"}}>

        <Cards 
        number={number}
        name={name}
        expiry={expiry}
        cvc={cvc}      
        focused={focus}  
        />

            <input type='tel'
             name='number'
             placeholder='Card Number' 
            value={number} 
            onChange={e =>setNumber(e.target.value)}
            onFocus={e => setFocus(e.target.name)}
            style={{marginTop:"20px", padding:"10px",width:"20%"}} /> <br />
            
             <input type='text'
             name='name'
             placeholder='name' 
             value={name} 
             onChange={e =>setName(e.target.value)}
             onFocus={e => setFocus(e.target.name)}
             style={{marginTop:"8px",padding:"10px",width:"20%"}}/> <br/>


            <input type='text'
             name='expiry'
             placeholder='MM/YY expiry' 
            value={expiry} 
            onChange={e =>setExpiry(e.target.value)}
            onFocus={e => setFocus(e.target.name)}
            style={{marginTop:"8px",padding:"10px",width:"20%"}}/><br/>

            <input type='tel'
             name='cvc'
             placeholder='Cvc' 
             value={cvc} 
             onChange={e =>setCvv(e.target.value)}
             onFocus={e => setFocus(e.target.name)}
             style={{marginTop:"8px",padding:"10px",width:"20%"}}/><br/>

          <Button variant="contained" style={{width:"10%",marginTop:"1%",left:"-8px"}}>Pay Now</Button>
          <Button variant="contained"style={{width:"10%",marginTop:"1%",right:"-3px"}} onClick={handlebutton}>Cancel</Button>
        </form>
      </div>
      </>
  )
}
export default Payment; 