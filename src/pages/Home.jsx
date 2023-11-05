import React, { useState, useEffect} from 'react'
import BlogCard from '../components/BlogCard'
import blogService from '../appwrite/blogService'

const Home = () => {
  const [ blogs, setBlogs ] = useState([])
  useEffect(() => {
    fetchBlogs()
    // blogService.getBlogs()
    // .then((blogs) => {
    //   if(blogs){
    //     setBlogs(blogs)
    //   }
    // })
  }, [])

  const fetchBlogs = async () => {
    let blogs = await blogService.getBlogs()
    if(blogs){
      setBlogs(blogs.documents)
      console.log(typeof(blogs))
      console.log(blogs);
    }
  }
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-10">
          <div className="row">
            { blogs &&
              blogs.map((blog) => (
                <div key={blog.$id} className="col-md-6 p-1">
                  <BlogCard {...blog} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home