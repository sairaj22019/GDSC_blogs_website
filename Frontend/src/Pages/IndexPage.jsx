import React, { useEffect, useState } from 'react'
import Post from '../Components/Post'

const IndexPage = () => {
  const [posts,setposts] = useState([])
  useEffect(()=>{
    fetch(`${import.meta.env.VITE_API_BASE_URL}/post`).then(response=>{
      response.json().then(posts=>{
        setposts(posts)
        console.log(posts)
      })
    })
  },[])
  return (
    <div>
      {posts.length && posts.map(post=>
        <Post {...post} />
      )}
    </div>
  )
}

export default IndexPage
