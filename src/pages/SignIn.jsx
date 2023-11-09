import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import authService from '../appwrite/authService'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

const SignIn = () => {
    const navigate = useNavigate()
    const {state} = useLocation()
    const {user, setUser } = useAuth()
    if(user){
        navigate("/")
    }
    const [ credentials, setCredentials ] = useState({
        email: "",
        password: "",
    })
    const [error, setError] = useState("")

    const handleInputChange = (e) => {
        let name = e.target.name
        let value = e.target.value 
        setCredentials({...credentials, [name]:value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        try {
            const user = await authService.login(credentials)
            if(user){
                console.log("Login Successfull");
                setCredentials({
                    email: "",
                    password: "",
                })
                setUser(user)
                if(state && state.next){
                    console.log(state.next);
                    console.log("Next is available");
                    navigate(`/blog/${state.next}`)
                } else {
                    navigate("/")
                }
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
                        <h2 className="h2 text-center mb-3">Sign In</h2>
                        {state && state.error && <p className='text-danger'>{state.error}</p>}
                        <p className='text-danger'>{error}</p>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-2">
                                <label>Email<span className="text-danger">*</span></label>
                                <input 
                                    type="email" 
                                    name="email"
                                    className="form-control border-0 border-bottom border-white rounded-0 shadow-none" 
                                    value={credentials.email}
                                    onChange={(e) => {handleInputChange(e)}}
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
                                    onChange={(e) => {handleInputChange(e)}}
                                    required 
                                />
                            </div>
                            <div className="form-group mt-4">
                                <input 
                                    type="submit" 
                                    value="Sign In"
                                    className="btn btn-secondary w-100 rounded-0"  
                                />
                            </div>
                            <p>Dont have an account? <Link to="/signup">Create One</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default SignIn