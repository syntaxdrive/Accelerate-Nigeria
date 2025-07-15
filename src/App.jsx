import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CarProvider } from './context/CarContext';
import ErrorBoundary from './components/ErrorBoundary';

// Import pages
import Home from './Pages/Home';
import RentCars from './Pages/RentCars';
import ListYourCar from './Pages/ListYourCar';
import PartnerWithUs from './Pages/PartnerWithUs';
import ContactUs from './Pages/ContactUs';
import Solutions from './Pages/Solutions';
import Register from './Pages/Register';
import Login from './Pages/Login';
import AdminDashboard from './Pages/AdminDashboard';

function App() {
  return (
    <ErrorBoundary>
      <CarProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/rent-cars" element={<RentCars />} />
              <Route path="/list-your-car" element={<ListYourCar />} />
              <Route path="/partner-with-us" element={<PartnerWithUs />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </div>
        </Router>
      </CarProvider>
    </ErrorBoundary>
  );
}

export default App;