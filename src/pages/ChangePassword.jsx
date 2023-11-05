import React, { useState } from 'react'
import authService from '../appwrite/authService'
import { useAuth } from '../contexts/AuthContext'

const ChangePassword = () => {
    const {user, setUser} = useAuth()
    const [credentials, setCredentials] = useState({
        oldPassword: "",
        password: "",
        password2: ""
    })
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    const handleInputChange = (e) =>{
        let name = e.target.name
        let value = e.target.value

        setCredentials({...credentials, [name]:value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSuccess("")
        setError("")
        console.log(credentials)
        if(credentials.password !== credentials.password2){
            setError("New Password and Confirm New Password must be same")
            return
        }
        try {
            let userDetals = await authService.updatePassword(credentials.oldPassword, credentials.password)
            if(userDetals){
                setSuccess("Password Updated Successfully")
            } else {
                setError("Something Went Worng. Try Again Later")
            }
            setUser(userDetals)
        } catch (error) {
            // setError(error.message)
            if(error.message.includes("Invalid credentials")){
                setError("Old Password is Incorrect")
            } else {
                setError(error.message)
            }

        }

    }

  return (
    <div className='container'>
        <div className="row justify-content-center my-5">
            <div className="col-md-6">
                <div className="card rounded-0 border-0">
                    <div className="card-body">
                        <h2 className="h2 text-center mb-3">Update Password</h2>
                        <p className='text-success'>{success}</p>
                        <p className='text-danger'>{error}</p>
                        <form method="POST" onSubmit={handleSubmit}>
                            <div className="mb-2">
                                <label>Old Passwrod<span className="text-danger">*</span></label>
                                <input 
                                    type="password" 
                                    name="oldPassword"
                                    className="form-control border-0 border-bottom border-white rounded-0 shadow-none"
                                    value={credentials.oldPassword}
                                    onChange={(e)=>handleInputChange(e)} 
                                    required 
                                />
                            </div>
                            <div className="mb-2">
                                <label>New Passwrod<span className="text-danger">*</span></label>
                                <input 
                                    type="password" 
                                    name="password"
                                    className="form-control border-0 border-bottom border-white rounded-0 shadow-none"
                                    value={credentials.password}
                                    onChange={(e)=>handleInputChange(e)} 
                                    required 
                                />
                            </div>
                            <div className="mb-2">
                                <label>Confirm New Passwrod<span className="text-danger">*</span></label>
                                <input 
                                    type="password"
                                    name="password2" 
                                    className="form-control border-0 border-bottom border-white rounded-0 shadow-none" 
                                    value={credentials.password2}
                                    onChange={(e)=>handleInputChange(e)}
                                    required 
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

    </div>
  )
}

export default ChangePassword