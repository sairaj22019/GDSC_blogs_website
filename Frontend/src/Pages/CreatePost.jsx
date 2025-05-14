import React from 'react';
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { useState } from 'react';
import { Navigate } from 'react-router-dom';


const modules={
        toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['link', 'image'],
        ['clean']
    ]
    }
    const formats = [
        'header',
        'font',
        'size',
        'bold', 'italic', 'underline', 'strike',
        'color', 'background',
        'script',
        'blockquote', 'code', 'code-block',
        'list', 'bullet', 'indent',
        'direction', 'align',
        'link', 'image', 'video', 'formula',
        'clean'
];


const CreatePost = () => {
    const [title,settitle] = useState('')
    const [summary,setsummary] = useState('')
    const [content, setcontent] = useState('');
    const [file,setfile] = useState('')
    const [redirect , setredirect] = useState(false)
    
    async function createNewPost(ev){
        const data = new FormData()
        data.set('title',title)
        data.set('summary',summary)
        data.set('content',content)
        data.set('file',file[0])
        ev.preventDefault()
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/post`,{
            method:'POST',
            body:data,
            credentials:'include',
        })
        
        if(response.ok){
            setredirect(true)
        }

    }

    if(redirect){
        return <Navigate to={'/'}/>
    }
  return (
    <form className="form" onSubmit={createNewPost}>
      <h1 className="text-3xl font-extrabold text-center">Create New Post</h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={ev=>{settitle(ev.target.value)}}
        className="user_inputs"
      />

      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={ev=>{setsummary(ev.target.value)}}
        className="user_inputs"
      />

      <input
        type="file"
        onChange={ev=>setfile(ev.target.files)}
        className="user_inputs"
      />

        <ReactQuill
            value={content}
            onChange={ev=>{setcontent(ev)}}
            modules={modules}
            formats={formats}
            className="editor"
        />
       

      <button className="button-4" type="submit">
        Publish
      </button>
    </form>
  );
};

export default CreatePost;
