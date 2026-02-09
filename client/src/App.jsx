import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Placements from './pages/Placement';
import AdminRegister from './pages/AdminRegister';
import CompanyVisits from './pages/CompanyVisits';
import AdminCompanyVisits from './pages/AdminCompanyVisits';
import DashboardOverview from './pages/DashboardOverview';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin-register" element={<AdminRegister />} />

          <Route path="/admin/company-visits" element={<AdminCompanyVisits />} />

          <Route path="/dashboard" element={<DashboardOverview />} />
          <Route path="/dashboard/submit" element={<StudentDashboard />} />
          <Route path="/dashboard/my-placements" element={<StudentDashboard />} />
          <Route path="/dashboard/profile" element={<Profile />} />

          <Route path="/placements" element={<Placements />} />
          <Route path="/company-visits" element={<CompanyVisits />} />


        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;