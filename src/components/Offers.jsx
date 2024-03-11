import axios from 'axios'
import React, { useEffect } from 'react'
import './Offers.css';
import { useNavigate } from 'react-router';

export default function Offers() {

const token = localStorage.getItem('token');
const navigate = useNavigate();

useEffect(()=>{
  if(!token)
  {
    navigate('/');
  }
})

  const sendEmail = async () => {
   const res= await axios.post("http://localhost:4000/api/user/mail");
   console.log("Email response=",res)
    if(res.status===200)
    {
      alert("Check you mail for exciting Offers!")
    }
  }

  return (

<div class="container">
<div class="advertisement">
    <h2>Don't Miss Out!</h2>
    <p>Enjoy a whopping <span class="discount">50% off</span> on all items.</p>
    <p>This offer is only valid for a limited time!</p>
    <button class="btn" onClick={sendEmail}>Avail all your offers</button>
</div>
</div>
  )
}
