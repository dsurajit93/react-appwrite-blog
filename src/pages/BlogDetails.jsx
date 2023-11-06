import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import blogService from '../appwrite/blogService';
import { useAuth } from '../contexts/AuthContext'

const BlogDetails = () => {
    const {blog, setBlog} = useState({})
    const {slug} = useParams();
    const {user} = useAuth()
    const navigaet = useNavigate();

    useEffect(()=>{
        console.log("Blog Details: ",user);
        if(user){
            getBlog(slug)
        } else {
            navigaet("/signin", {state: {error: "Please Login to read the blog", next: slug}})
        }
    },[slug])

    const getBlog = async(slug) =>{
        try{
            let post = await blogService.getBlog(slug);
            setBlog(post)
            console.log(typeof(post));
            console.log(post);
        } catch(error){
            console.log(error);
        }
    }
  return (
    <div>BlogDetails of {slug}
        {
        blog && 
            <div>
                <h1>{blog.title}</h1>
            </div>
        }
    </div>
  )
}

export default BlogDetails