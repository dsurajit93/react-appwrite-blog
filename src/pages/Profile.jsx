import React from 'react'
import { useAuth } from '../contexts/AuthContext'

const Profile = () => {
    const {user} = useAuth()
  return (
    <div className="container">
        <div className="row my-2">
            <div className="col-md-4">
                <div className="card rounded-0">
                    <div className="card-body">
                        <h3 className="text-center">User Profile</h3>
                        <h5>Name: {user.name}</h5>
                        <h5>Email: {user.email}</h5>
                    </div>
                </div>
            </div>
            <div className="col-md-8">
                <div className="card rounded-0">
                    <div className="card-body">
                        <h3 className="text-center">Your Posts</h3>

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile