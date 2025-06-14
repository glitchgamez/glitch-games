import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DatabaseProvider } from './contexts/DatabaseContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <DatabaseProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute adminOnly>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </Router>
      </DatabaseProvider>
    </AuthProvider>
  );
}

export default App;