import React from 'react'
import parse from 'html-react-parser'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import {Settings} from 'react-feather'

const BlogCard = (blog) => {
  const { user } = useAuth();
  return (
        <div className="card rounded-0">
            <div className="card-body overflow-hidden" style={{height: '275px'}}>
                <div className="d-flex justify-content-between align-items-center">
                  <Link to={`/blog/${blog.$id}`} className='text-decoration-none'><h3>{blog.title}</h3></Link>
                  {user && (user.$id === blog.user_id) && 
                  <div className="dropdown">
                  <button className="bg-dark border-0 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <Settings />
                  </button>
                  <ul className="dropdown-menu">
                    <li><Link to={"/"} className="dropdown-item" href="#">Edit</Link></li>
                    <li><Link to={"/"} className="dropdown-item" href="#">Delete</Link></li>  
                  </ul>
                </div>
                }

                </div>
                {/* <small className='text-secondary'>{blog.user_id} - {new Date(blog.$createdAt).toLocaleDateString('en-GB')}</small> */}
                <div>{parse(blog.content)}</div>
            </div>
        </div>
  )
}

export default BlogCard