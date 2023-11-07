import React, { useState, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import blogService from '../appwrite/blogService';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


const AddBlog = () => {
    const editorRef = useRef(null);
    const navigate = useNavigate()
    const { user } = useAuth()

    const [title, setTitle] = useState("")
    const [slug, setSlug] = useState("")
    const [content, setContent] = useState("")
    const [file, setFile] = useState()
    const [error, setError] = useState("")

    const slugTransform = (value) => {
        return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-")
            .substring(0,30);
        // if(slug.length<30){
        // } else {
        //     return ""
        // }
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
            const featuredImage = await blogService.fileUpload(file)
            if (file) {
                const fileId = featuredImage.$id;
                let response = await blogService.createBlog(title, slug, content, fileId, user.$id, user.name)
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
            <div className="row my-3 justify-content-center">
                <div className="col-md-10">
                    <div className="card border-0">
                        <div className="card-body">
                            <h3 className="text-center">Add A Blog</h3>
                            <p className="test-danger">{error}</p>
                            <form method="post" onSubmit={handleSubmit}>
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
                                        initialValue=""
                                        init={{
                                            height: 500,
                                            menubar: false,
                                            plugins: [
                                                'advlist autolink lists link image charmap print preview anchor',
                                                'searchreplace visualblocks code fullscreen',
                                                'insertdatetime media table paste code help wordcount'
                                            ],
                                            toolbar: 'undo redo | formatselect | ' +
                                                'bold italic backcolor | alignleft aligncenter ' +
                                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                                'removeformat | help',
                                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                        }}
                                        onEditorChange={handleEditorChange}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Select an Image</label>
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
                                        value="Post"
                                        className="btn btn-secondary w-100 rounded-0"
                                        required
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddBlog