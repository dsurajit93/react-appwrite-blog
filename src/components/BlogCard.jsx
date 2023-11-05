import React from 'react'
import parse from 'html-react-parser'

const BlogCard = (blog) => {
  return (
        <div className="card rounded-0">
            <div className="card-body overflow-hidden" style={{height: '275px'}}>
                <h3>{blog.title}</h3>
                <small className='text-secondary'>{blog.user_id} - {new Date(blog.$createdAt).toLocaleDateString('en-GB')}</small>
                <p className=''>{parse(blog.content)}</p>
            </div>
        </div>
  )
}

export default BlogCard