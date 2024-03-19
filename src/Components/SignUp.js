import React, { useState } from 'react'
import axios from 'axios'
import './SignUp.css'
import { NavLink, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const navigate=useNavigate();
  const [name,setname]=useState('')
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [email,setEmail]=useState('')

    const handleSignup=()=>{
        axios.post('http://localhost:3001/users',{"name":name,"username":username,"password":password,"email":email})
        .then(res=>(console.log(res)))
        .catch(err=>(console.log(err)))
        navigate('/')
    }
  return (
    <div className='Signupcon'>
      <form className='Signupform' onSubmit={handleSignup}>
            <input type='text' value={name} onChange={(e)=>{setname(e.target.value)}} placeholder='Name'/><br></br>
            <input type='text' value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email'/><br></br>
            <input type='text' value={username} onChange={(e)=>{setUsername(e.target.value)}} placeholder='Username'/><br></br>
            
            <input type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password'/><br></br>
            <button type='submit'>Signup</button>
            <br></br>
            <p>-----------------------or-----------------------</p>
            <div>
              <NavLink to="/"><p>Already have an Account</p></NavLink>
            </div>
        </form>
    </div>
  )
}
