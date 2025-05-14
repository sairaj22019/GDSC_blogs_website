import React, { useState } from 'react'

const RegisterPage = () => {
    const [username , setusername] = useState('')
    const [password , setpassword] = useState('')
    async function register(ev){
        ev.preventDefault();
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/register` , {
            method : 'POST',
            body : JSON.stringify({username , password}),
            headers : {'Content-Type' : 'application/json'}
        })
        if(response.status === 200){
          alert("Registration successful")
        }else{
          alert("Registration failed")
        }
        setusername('')
        setpassword('')
    }
  return (
    <form className="form" onSubmit={register}>
        <h1 className='text-3xl font-extrabold text-center'>Register</h1>
        <input 
            type="text" 
            placeholder="Username" 
            className="user_inputs"
            value = {username}
            onChange={ev=>{setusername(ev.target.value)}}
        />
        <input 
            type="password" 
            placeholder="Password" 
            className="user_inputs"
            value = {password}
            onChange={ev=>{setpassword(ev.target.value)}}
        />
  <button className="button-4" role="button">Register</button>
</form>
  )
}

export default RegisterPage
