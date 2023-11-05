import { createContext, useState, useEffect, useContext } from "react";
import authService from "../appwrite/authService";

const AuthContext = createContext();
export const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(false)

    useEffect(()=>{
        getUserOnLoad()
    }, [])

    const getUserOnLoad = async () => {
        try {
            let userDetails = await authService.getCurrentUser()
            setUser(userDetails)
        } catch (error) {
            console.log("UserContext: ",error)
        }
        setLoading(false)
    }

    const contextData = {
        user,
        setUser,
    }

    return <AuthContext.Provider value={contextData}>
        {loading ? (
            <div className="row justify-content-center align-items-center" style={{height: '100vh'}}>
                <div className="spinner-grow text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        ) : children}
    </AuthContext.Provider>
}

export const useAuth = () =>{
    return useContext(AuthContext)
}

export default AuthContext