import React, { useState } from 'react'
import authService from '../appwrite/authService'

const SignUp = () => {
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
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
            setError("Password and Confirm Password must be same")
            return
        }
        try {
            let userDetals = await authService.createAccount(credentials)
            if(userDetals){
                setSuccess("Account Created Successfully. Login to Continue")
            } else {
                setError("Something Went Worng. Try Again Later")
            }
            
        } catch (error) {
            setError(error.message)
        }

    }

  return (
    <div className='container'>
        <div className="row justify-content-center my-5">
            <div className="col-md-6">
                <div className="card rounded-0 border-0">
                    <div className="card-body">
                        <h2 className="h2 text-center mb-3">Sign Up</h2>
                        <p className='text-success'>{success}</p>
                        <p className='text-danger'>{error}</p>
                        <form method="POST" onSubmit={handleSubmit}>
                            <div className="mb-2">
                                <label>Name<span className="text-danger">*</span></label>
                                <input 
                                    type="text" 
                                    name="name"
                                    className="form-control border-0 border-bottom border-white rounded-0 shadow-none" 
                                    value={credentials.name}
                                    onChange={(e)=>handleInputChange(e)}
                                    required 
                                />
                            </div>
                            <div className="mb-2">
                                <label>Email<span className="text-danger">*</span></label>
                                <input 
                                    type="email" 
                                    name="email"
                                    className="form-control border-0 border-bottom border-white rounded-0 shadow-none" 
                                    value={credentials.email}
                                    onChange={(e)=>handleInputChange(e)}
                                    required 
                                />
                            </div>
                            <div className="mb-2">
                                <label>Passwrod<span className="text-danger">*</span></label>
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
                                <label>Confirm Passwrod<span className="text-danger">*</span></label>
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
                                    value="Sign Up"
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

export default SignUp
