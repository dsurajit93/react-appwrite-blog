import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const { user } = useAuth()
  return (
    <>
        {user ? <Outlet /> : <Navigate to='/signin' />}
    </>
  )
}

export default ProtectedRoute