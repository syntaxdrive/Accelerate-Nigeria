import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Solutions from './Pages/Solutions.jsx'
import PartnerWithUs from './Pages/PartnerWithUs.jsx'
import ContactUs from './Pages/ContactUs.jsx'
import ListYourCar from './Pages/ListYourCar.jsx'
import AdminDashboard from './Pages/AdminDashboard.jsx'
import RentCars from './Pages/RentCars.jsx'
import Register from './Pages/Register.jsx'
import Login from './Pages/Login.jsx'
import MyRequests from './Pages/MyRequests.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/partner-with-us" element={<PartnerWithUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes - Require Authentication */}
        <Route path="/list-your-car" element={
          <ProtectedRoute>
            <ListYourCar />
          </ProtectedRoute>
        } />
        <Route path="/rent-cars" element={
          <ProtectedRoute>
            <RentCars />
          </ProtectedRoute>
        } />
        <Route path="/my-requests" element={
          <ProtectedRoute>
            <MyRequests />
          </ProtectedRoute>
        } />
        
        {/* Admin routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
