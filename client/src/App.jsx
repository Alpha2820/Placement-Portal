import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
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
import PlacementDetail from './pages/PlacementDetail';
import CompanyVisitDetail from './pages/CompanyVisitDetail';
import SuperAdminUsers from './pages/SuperAdminUser';
import SuperAdminRegister from './pages/SuperAdminRegister';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/superadmin-register" element={<SuperAdminRegister />} />
          <Route path="/admin-register" element={<AdminRegister />} />

          {/* Super Admin Routes */}
          <Route 
            path="/superadmin/admins" 
            element={
              <ProtectedRoute requiredRole="superadmin">
                <SuperAdminUsers />
              </ProtectedRoute>
            } 
          />

          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/company-visits" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminCompanyVisits />
              </ProtectedRoute>
            } 
          />

          {/* Student Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute requiredRole="student">
                <DashboardOverview />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/submit" 
            element={
              <ProtectedRoute requiredRole="student">
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/my-placements" 
            element={
              <ProtectedRoute requiredRole="student">
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/profile" 
            element={
              <ProtectedRoute requiredRole="student">
                <Profile />
              </ProtectedRoute>
            } 
          />

          {/* Public Pages */}
          <Route path="/placements" element={<Placements />} />
          <Route path="/placement/:id" element={<PlacementDetail />} />
          <Route path="/company-visits" element={<CompanyVisits />} />
          <Route path="/company-visit/:id" element={<CompanyVisitDetail />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;