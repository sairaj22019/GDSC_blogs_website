import React from 'react'
import { format } from 'date-fns';


const Post = ({title,summary,content,cover,createdAt}) => {
  return (
    <div className="post flex h-fit pt-4 gap-2 ">
        <div className="image min-w-[45%] ">
        <img src="https://cdn.pixabay.com/photo/2025/01/29/06/44/elephants-9367271_640.jpg" alt="Image" className=" rounded-sm mt-1" />
        </div>
        <div className="text flex flex-col gap-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="info flex gap-4 ">
          <a href="" className="author text-xl font-semibold text-gray-400">Sairaj</a>
          <time datetime="" className="font-semibold text-gray-400 text-lg">{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
        </p>
        <p>{summary}</p>
        </div>
      </div>
  )
}

export default Post
