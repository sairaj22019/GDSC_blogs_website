import React from 'react'
import { format } from 'date-fns';
import { Link } from 'react-router-dom';


const Post = ({_id,title,summary,content,cover,createdAt,author}) => {
  const name = author.username.split('@')[0]
  return (
    <div className="post flex h-fit pt-4 gap-2 ">
        <div className="image min-w-[45%] max-w-[55%]">
          <Link to={`/post/${_id}`}>
        <img src={`${import.meta.env.VITE_API_BASE_URL}/${cover}`}  alt="Image" className=" rounded-sm mt-1" />
          </Link>
        </div>
        <div className="text flex flex-col gap-4">
          <Link to={`/post/${_id}`}>
               <h2 className="text-2xl font-bold">{title}</h2>
          </Link>
        <p className="info flex gap-4 ">
          <a href="" className="author text-xl font-semibold text-gray-400">{name}</a>
          <time datetime="" className="font-semibold text-gray-400 text-lg">{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
        </p>
        <p>{summary}</p>
        </div>
      </div>
    

  )
}

export default Post
