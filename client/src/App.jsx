import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Home from './Pages/Home';
import { ThemeProvider } from './ThemeContex';
import Hero from './Pages/User';
// import 'bootstrap/dist/css/bootstrap.min.css'
import Admin from './Pages/Admin';
import AdminLogin from './Pages/login/AdminLogin';
import Adminsignup from './Pages/signup/Adminsignup';
import UserLogin from './Pages/login/UserLogin';
import Usersignup from './Pages/signup/Usersignup';
import { useAuthContext } from './authContext/AuthContext';
import UserHome from './Pages/home/UserHome';
import AdminHome from './Pages/home/AdminHome';
import { Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import User from './Pages/User';
import AdminSignupHome from './Pages/signup/AdminSignupHome';
import UserSignupHome from './Pages/signup/UserSignupHome';

function App() {
  const {authUser, loading} = useAuthContext();
  console.log(authUser)

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <ThemeProvider>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '18px'
        }}>
          Loading...
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/"  element= {!authUser ? <User /> : (authUser === "admin" ? <AdminHome /> : <UserHome />)}/>

          <Route path='/admin-login' element={!authUser ? <Admin/> : <Navigate to="/" />} /> 
          <Route path='/admin-signup' element={!authUser ? <AdminSignupHome /> : <Navigate to="/" />} /> 
          <Route path='/user-login' element={!authUser ? <User /> : <Navigate to="/" />} /> 
          <Route path='/user-signup' element={!authUser ? <UserSignupHome /> : <Navigate to="/" />} /> 
      
          
          <Route path="/editor/:roomid" element={<Dashboard />} />
        </Routes>
      </Router>
        
        <Toaster/>

    </ThemeProvider>
  );
}

export default App;
