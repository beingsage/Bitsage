import './App.css'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import { AuthProvider } from "./Context/AuthContext";
// import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "./Components/theme-provider";
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Create from './pages/Create'

function App() {

  return (
   <AuthProvider>
    <ThemeProvider>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} /> 
          <Route path="/create" element={<Create />} />
        </Routes>
        </Router>
    </ThemeProvider>
    </AuthProvider>
  )
}

export default App
