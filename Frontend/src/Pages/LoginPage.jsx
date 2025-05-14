import React, { useContext } from 'react'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Usercontext } from '../UserContext'

const LoginPage = () => {
  const [username , setusername] = useState('')
  const [password , setpassword] = useState('')
  const [redirect,setredirect] = useState(false)
  const {setuserInfo} = useContext(Usercontext)
  async function login(ev){
    ev.preventDefault()
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login`,{
      method : 'POST',
      body : JSON.stringify({username , password}),
      headers : {'Content-Type' : 'application/json'},
      credentials:'include'
    })
    if(response.ok){
        response.json().then(userInfo=>{
          setuserInfo(userInfo)
          setredirect(true)
        })
    }else{
      alert('wrong credentials')
    }
  }

  if(redirect){
    return <Navigate to={'/'} />
  }
  return (
    <form className="form" onSubmit={login}>
        <h1 className='text-3xl font-extrabold text-center'>Login</h1>
        <input 
            type="text" 
            placeholder="Username" 
            className="user_inputs"
            value={username}
            onChange={ev=>{setusername(ev.target.value)}}
        />
        <input 
            type="password" 
            placeholder="Password" 
            className="user_inputs"
            value = {password}
            onChange={ev=>{setpassword(ev.target.value)}}
        />
  <button className="button-4 " role="button">Login</button>
</form>
  )
}

export default LoginPage






