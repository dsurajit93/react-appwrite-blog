import React, { useState, useEffect, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import blogService from '../appwrite/blogService';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBlog = () => {
    const editorRef = useRef(null);
    const navigate = useNavigate()
    const {id} = useParams();
    const { user } = useAuth()
    const [blog, setBlog] = useState(false)

    const [title, setTitle] = useState("")
    const [slug, setSlug] = useState("")
    const [content, setContent] = useState("")
    const [file, setFile] = useState(false)
    const [publish, setPublish] = useState(true)
    const [error, setError] = useState("")

    useEffect(()=>{
        // console.log("Blog Details: ",blog);
        if(user){
            getBlog(id)
        } else {
            navigate("/signin", {state: {error: "Please Login to read the blog", next: slug}})
        }
    },[id])

    const getBlog = async(id) =>{
        try{
            let post = await blogService.getBlog(id);
            if(post){
                console.log("BlogDetails: ",post);
                setBlog(post)
                setTitle(post.title)
                setSlug(post.$id)
                setPublish(post.published)
                setContent(post.content)

            } else {
                navigate("/")
            }
            // console.log(typeof(post));
        } catch(error){
            console.log(error);
        }
    }
    
    const slugTransform = (value) => {
        return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-")
            .substring(0,30);
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
        let newSlug = slugTransform(title)
        setSlug(newSlug)
    }

    const handleEditorChange = (e) => {
        setContent(editorRef.current.getContent());
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // setContent(editorRef.current.getContent());
        // if (editorRef.current) {
        // }
        console.log(content);
        try {
            if (file) {
                const featuredImage = await blogService.fileUpload(file)
                const fileId = featuredImage.$id;
                console.log(blog.$id, title, slug, content, fileId, user.name);
                let response = await blogService.updateBlog(blog.$id, title, slug, content, fileId, publish)
                if (response) {
                    navigate("/")
                }
            } else {
                console.log(blog.$id, title, slug, content, blog.featured_image, user.name);
                let response = await blogService.updateBlog(blog.$id, title, slug, content, blog.featured_image, publish)
                if (response) {
                    navigate("/")
                }   
            }
        } catch (error) {
            if (error.message.includes("Document with the requested ID already exists.")) {
                setError("Please chnage the blog title as its already in use.")
            } else {
                setError(error.message)
            }
        }

    }

    return (
    <div className="container">
        {
            blog && 
                <div className="row my-3 justify-content-center">
                    <div className="col-md-10">
                        <div className="card border-0">
                            <div className="card-body">
                                <h3 className="text-center">Update Your Blog</h3>
                                <p className="test-danger">{error}</p>
                                <form method="post" onSubmit={handleSubmit}>
                                    <div className="mb-2 d-flex">
                                     <label className="form-check-label" for="flexSwitchCheckChecked">Publish</label>
                                      <div className="form-check form-switch ms-3">
                                            <input 
                                            className="form-check-input" 
                                            type="checkbox" 
                                            role="switch" 
                                            // {blog.published ? "" : ""}
                                            checked={publish}
                                            value={publish}
                                            onChange={()=>setPublish(!publish)}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <label>Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            className="form-control border-0 border-bottom border-white rounded-0 shadow-none"
                                            value={title}
                                            onChange={(e) => handleTitleChange(e)}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label>Slug</label>
                                        <input
                                            type="text"
                                            name="slug"
                                            className="form-control border-0 border-bottom border-white rounded-0 shadow-none"
                                            value={slug}
                                            readOnly
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label">Article</label>
                                        <Editor
                                            onInit={(evt, editor) => editorRef.current = editor}
                                            apiKey="pob0bm6hpfwlxyo31851hk18ni6px5dc90q0p3ilmuthet02"
                                            initialValue={blog.content}
                                            init={{
                                                height: 500,
                                                menubar: false,
                                                plugins: [
                                                    "image","advlist","autolink","lists","link","image","charmap","preview","anchor","searchreplace","visualblocks","code","fullscreen","insertdatetime","media","table","code","help","wordcount","anchor",
                                                ],
                                                toolbar:
                                                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                                                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                                            }}
                                            onEditorChange={handleEditorChange}
                                        />
                                    </div>
                                    <div className="text-center">
                                        <img src={blogService.getFilePreview(blog.featured_image)} alt="" style={{width: '200px', height: '200px'}}/>
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label">Select an Image to Update or leave empty to keep the old image</label>
                                        <input
                                            type="file"
                                            name="image"
                                            className="form-control border-0 border-bottom border-white rounded-0 shadow-none"
                                            accept="image/png, image/jpg, image/jpeg, image/gif"
                                            onChange={(e) => setFile(e.target.files[0])}
                                        />
                                    </div>
                                    <div className="form-group mt-4">
                                        <input
                                            type="submit"
                                            value="Update"
                                            className="btn btn-secondary w-100 rounded-0"
                                            required
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        }
        </div>
  )
}

export default UpdateBlog