import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Placements from './pages/Placement';
import AdminRegister from './pages/AdminRegister';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/placements" element={<Placements />} />
          <Route path="/admin-register" element={<AdminRegister />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;