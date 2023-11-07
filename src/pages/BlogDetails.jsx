import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import blogService from '../appwrite/blogService';
import { useAuth } from '../contexts/AuthContext'
import parse from 'html-react-parser'
import authService from '../appwrite/authService';

const BlogDetails = () => {
    const [blog, setBlog] = useState(false)
    const [author, setAuthor] = useState(false)
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
                let author = await authService.getUserDetails(post.user_id)
                console.log("Author: ",author);
                setAuthor(author.name)
            } else {
                navigaet("/")
            }
            // console.log(typeof(post));
        } catch(error){
            console.log(error);
        }
    }
  return (
    <div>
        {
        blog && 
            <div className='container'>
                <div className="row my-5">
                    <div className="col-md-10 mx-auto">
                        <h1>{blog.title}</h1>
                        <p><small className='text-secondary'>{author} - {new Date(blog.$createdAt).toLocaleDateString('en-GB')}</small></p>
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