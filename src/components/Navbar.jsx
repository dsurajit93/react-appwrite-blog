import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import authService from '../appwrite/authService'

const Navbar = () => {
  const {user, setUser} = useAuth()
  const handleLogout = () => {
    authService.logout()
    setUser(null)
  }
  return (
    <nav className="navbar navbar-expand-lg ">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">Appwrite Blog</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link to="/" className='nav-link'>Home</Link>
          </li>
          {user ? (
            <>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {user.name}
              </a>
              <ul className="dropdown-menu">
                <li><Link to="/profile" className='nav-link'>Profile</Link></li>
                <li><Link to="/changePassword" className='nav-link'>Change Passwrod</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link to="/" className='nav-link' onClick={handleLogout}>Sign Out</Link></li>
              </ul>
            </li>
            <li className="nav-item">
                <Link to="/addBlog" className='btn btn-outline-light rounded-0'>Write a Blog</Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/signin" className='nav-link'>Sign In</Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className='nav-link'>Sign Up</Link>
              </li>
            </>
          ) }
          
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default Navbar