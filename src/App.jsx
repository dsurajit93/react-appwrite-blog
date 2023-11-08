import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Layout from './components/Layout';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import AddBlog from './pages/AddBlog';
import BlogDetails from './pages/BlogDetails';
import UpdateBlog from './pages/UpdateBlog';


function App() {


  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/blog/:slug" element={<BlogDetails />} />
            <Route path="/blog/update/:id" element={<UpdateBlog />} />
            <Route element={<ProtectedRoute/> }>
              <Route path="/addBlog" element={<AddBlog />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/changePassword" element={<ChangePassword />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
