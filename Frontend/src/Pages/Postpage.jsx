import { formatISO9075 } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Postpage = () => {
    const [postInfo,setpostInfo] = useState(null)
    const {id} = useParams()
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_API_BASE_URL}/post/${id}`)
        .then(response=>{
            response.json().then(postInfo=>{
                setpostInfo(postInfo)
            })
        })
    },[])
    if(!postInfo) return '';
    const name = postInfo.author.username.split('@')[0]
   return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-4xl font-bold mb-2 text-center">{postInfo.title}</h1>
      
      <div className="flex justify-center gap-4 text-sm text-gray-500 mb-6">
        <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
        <span>•</span>
        <span className="italic">by @{name}</span>
      </div>

      <div className="flex justify-center mb-8">
        <img
          src={`${import.meta.env.VITE_API_BASE_URL}/${postInfo.cover}`}
          alt="Post cover"
          className="w-full md:w-[90%] rounded-md shadow-sm object-cover"
        />
      </div>

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </div>
  )
  
}

export default Postpage
