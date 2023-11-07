import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import blogService from '../appwrite/blogService'
import BlogCard from '../components/BlogCard'

const Profile = () => {
    const {user} = useAuth()
    const [userBlogs, setUserBlogs] = useState(false)

    useEffect(()=>{getUserBlogs()},[])

    const getUserBlogs = async() => {
        try {
            let userPosts = await blogService.getUsersBlog(user.$id)
            console.log(userPosts);
            setUserBlogs(userPosts.documents)
            
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className="container">
        <div className="row my-2">
            <div className="col-md-4">
                <div className="card rounded-0 mt-5">
                    <div className="card-body">
                        <h3 className="text-center">User Profile</h3>
                        <h5>Name: {user.name}</h5>
                        <h5>Email: {user.email}</h5>
                    </div>
                </div>
            </div>
            <div className="col-md-8">
                <div className="card border-0 rounded-0">
                    <div className="card-body">
                        <h3 className="text-center">Your Posts</h3>
                        <div className="row">
                        { userBlogs &&
                        userBlogs.map((blog) => (
                            <div key={blog.$id} className="col-12 p-1">
                            <BlogCard {...blog} />
                            </div>
                        ))
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile