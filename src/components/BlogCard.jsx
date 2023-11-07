import React from 'react'
import parse from 'html-react-parser'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const BlogCard = (blog) => {
  const { user } = useAuth();
  return (
        <div className="card rounded-0">
            <div className="card-body overflow-hidden" style={{height: '275px'}}>
                <div className="d-flex justify-content-between align-items-center">
                  <Link to={`/blog/${blog.$id}`} className='text-decoration-none'><h3>{blog.title}</h3></Link>
                </div>
                {/* <small className='text-secondary'>{blog.user_id} - {new Date(blog.$createdAt).toLocaleDateString('en-GB')}</small> */}
                <p>{new Date(blog.$createdAt).toLocaleDateString('en-GB')}</p>
                <div>{parse(blog.content)}</div>
            </div>
        </div>
  )
}

export default BlogCard