import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useParams, } from 'react-router-dom'
import blogService from '../appwrite/blogService';
import { useAuth } from '../contexts/AuthContext'
import parse from 'html-react-parser'
import {Settings} from 'react-feather'

const BlogDetails = () => {
    const [blog, setBlog] = useState(false)
    const {slug} = useParams();
    const {user} = useAuth()
    const navigaet = useNavigate();

    useEffect(()=>{
        // console.log("Blog Details: ",blog);
        if(user){
            getBlog(slug)
        } else {
            navigaet("/signin", {state: {error: "Please Login to read the blog", next: slug}})
        }
    },[slug])

    const getBlog = async(slug) =>{
        try{
            let post = await blogService.getBlog(slug);
            if(post){
                console.log("BlogDetails: ",post);
                setBlog(post)
            } else {
                navigaet("/")
            }
            // console.log(typeof(post));
        } catch(error){
            console.log(error);
        }
    }

    const deleteBlog = async () =>{
           let res = await blogService.deleteBlog(blog.$id)
           if(res){
            let fdRes = await blogService.deleteFile(blog.featured_image)
            if(fdRes){
                navigaet("/")
            } else {
                console.log("Blog Image Deletion Error");
            }
           }else{
            console.log("Blog deletion error");
           }
    }
  return (
    <div>
        {
        blog && 
            <div className='container'>
                <div className="row my-5">
                    <div className="col-md-10 mx-auto">
                        <div className="d-flex justify-content-between align-items-center">
                            <h1>{blog.title}</h1>
                            {user && (user.$id === blog.user_id) && 
                            <div className="dropdown">
                            <button className="bg-dark border-0 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <Settings />
                            </button>
                            <ul className="dropdown-menu">
                                <li><Link to={"/"} className="dropdown-item" href="#">Edit</Link></li>
                                <li><Link to={"/"} onClick={deleteBlog} className="dropdown-item" href="#">Delete</Link></li>  
                            </ul>
                            </div>
                            }

                        </div>
                        <p><small className='text-secondary'>{blog.user_name} - {new Date(blog.$createdAt).toLocaleDateString('en-GB')}</small></p>
                        <div className='text-center my-3'>
                            <img src={blogService.getFilePreview(blog.featured_image)} className='img-fluid' />
                        </div>
                        <div>
                            {parse(blog.content)}
                        </div>
                    </div>
                </div>
            </div>
        }
    </div>
  )
}

export default BlogDetails