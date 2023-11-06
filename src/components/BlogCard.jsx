import React from 'react'
import parse from 'html-react-parser'
import { Link } from 'react-router-dom'

const BlogCard = (blog) => {
  return (
        <div className="card rounded-0">
            <div className="card-body overflow-hidden" style={{height: '275px'}}>
                <Link to={`/blog/${blog.$id}`} className='text-decoration-none'><h3>{blog.title}</h3></Link>
                <small className='text-secondary'>{blog.user_id} - {new Date(blog.$createdAt).toLocaleDateString('en-GB')}</small>
                <div>{parse(blog.content)}</div>
            </div>
        </div>
  )
}

export default BlogCard