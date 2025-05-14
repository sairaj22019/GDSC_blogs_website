import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { Usercontext } from '../UserContext'

const Header = () => {
  const {setuserInfo,userInfo} = useContext(Usercontext)
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/profile`,{
      credentials:'include'
    }).then(response=>{
      response.json().then(userInfo=>{
        setuserInfo(userInfo)
      })
    })
  }, [])

  async function logout(){
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }
    setuserInfo(null)
    console.log('Logged out successfully');
  }
  const username = userInfo?.username
  return (
    <header className="flex justify-between my-2">
        <Link to="/" className="font-bold text-xl">MyBlog</Link>
        <nav className="flex gap-5">
          {username && (
            <>
            <Link to='/create'>Create new post</Link>
            <a onClick={logout}>Logout</a>
            </>
          )}
          {!username && (
            <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            </>
          )}
          
        </nav>
      </header>
  )
}

export default Header
