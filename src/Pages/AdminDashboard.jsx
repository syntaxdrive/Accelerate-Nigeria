import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import an from '../assets/an.png';
import { useCarContext } from '../context/CarContext.jsx';
import ErrorBoundary from '../components/ErrorBoundary';

// Add Car Form Component
function AddCarForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    licensePlate: '',
    color: '',
    category: '',
    location: '',
    dailyRate: '',
    weeklyRate: '',
    monthlyRate: '',
    features: [],
    description: '',
    fuelType: '',
    transmission: '',
    seats: '',
    mileage: '',
    images: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFeatureToggle = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = [];
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        imageUrls.push(event.target.result);
        if (imageUrls.length === files.length) {
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, ...imageUrls]
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const availableFeatures = [
    'Air Conditioning', 'Bluetooth', 'GPS Navigation', 'Backup Camera',
    'Heated Seats', 'Sunroof', 'Leather Seats', 'USB Ports',
    'Automatic Windows', 'Central Locking', 'ABS Brakes', 'Airbags'
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Add New Rental Car</h1>
          <button
            onClick={onCancel}
            className="text-gray-600 hover:text-gray-800"
          >
            ✕
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Make</label>
            <input
              type="text"
              name="make"
              value={formData.make}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">License Plate</label>
            <input
              type="text"
              name="licensePlate"
              value={formData.licensePlate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              required
            >
              <option value="">Select Category</option>
              <option value="Economy">Economy</option>
              <option value="Compact">Compact</option>
              <option value="Mid-size">Mid-size</option>
              <option value="Luxury">Luxury</option>
              <option value="SUV">SUV</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              required
            >
              <option value="">Select Location</option>
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja</option>
              <option value="Port Harcourt">Port Harcourt</option>
              <option value="Kano">Kano</option>
              <option value="Ibadan">Ibadan</option>
              <option value="Enugu">Enugu</option>
              <option value="Kaduna">Kaduna</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Daily Rate (₦)</label>
            <input
              type="number"
              name="dailyRate"
              value={formData.dailyRate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Weekly Rate (₦)</label>
            <input
              type="number"
              name="weeklyRate"
              value={formData.weeklyRate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Rate (₦)</label>
            <input
              type="number"
              name="monthlyRate"
              value={formData.monthlyRate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
            <select
              name="fuelType"
              value={formData.fuelType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              required
            >
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
            <select
              name="transmission"
              value={formData.transmission}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              required
            >
              <option value="">Select Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Seats</label>
            <input
              type="number"
              name="seats"
              value={formData.seats}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Car Images</label>
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> car images
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            
            {formData.images.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Images ({formData.images.length})</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Car image ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Mileage (km)</label>
          <input
            type="number"
            name="mileage"
            value={formData.mileage}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            placeholder="e.g., 25000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {availableFeatures.map(feature => (
              <label key={feature} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.features.includes(feature)}
                  onChange={() => handleFeatureToggle(feature)}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="ml-2 text-sm text-gray-700">{feature}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            placeholder="Describe the car's condition, special features, etc."
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Add Car
          </button>
        </div>
      </form>
    </div>
  );
}

// Car Details View Component
function CarDetailsView({ car, onBack, onEdit }) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <button
          onClick={onBack}
          className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-700 mb-4 transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Fleet
        </button>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{car.year} {car.make} {car.model}</h1>
            <p className="text-gray-600 mt-1">License Plate: {car.licensePlate}</p>
          </div>
          <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
            car.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {car.available ? 'Available' : 'Unavailable'}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Car Images */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Photos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {(car.images && car.images.length > 0) ? (
              car.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${car.make} ${car.model} ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border"
                />
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500">No photos available</p>
              </div>
            )}
          </div>
        </div>

        {/* Car Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Vehicle Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium">{car.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Color:</span>
                <span className="font-medium">{car.color}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fuel Type:</span>
                <span className="font-medium">{car.fuelType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transmission:</span>
                <span className="font-medium">{car.transmission}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Seats:</span>
                <span className="font-medium">{car.seats}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Pricing</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Daily Rate:</span>
                <span className="font-medium">₦{car.dailyRate?.toLocaleString()}</span>
              </div>
              {car.weeklyRate && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Weekly Rate:</span>
                  <span className="font-medium">₦{car.weeklyRate?.toLocaleString()}</span>
                </div>
              )}
              {car.monthlyRate && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Rate:</span>
                  <span className="font-medium">₦{car.monthlyRate?.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
          <div className="flex flex-wrap gap-2">
            {car.features.map((feature, index) => (
              <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        {car.description && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700">{car.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  // Use CarContext for state management
  const {
    rentalCars,
    addRentalCar,
    updateRentalCar,
    deleteRentalCar,
    toggleCarAvailability,
    rentalRequests,
    approveRentalRequest,
    denyRentalRequest,
    carListingRequests,
    updateCarListingRequestStatus,
    addApprovedCarToFleet
  } = useCarContext();

  const [activeTab, setActiveTab] = useState('rental-requests');
  const [selectedCar, setSelectedCar] = useState(null);
  const [isAddingCar, setIsAddingCar] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [selectedRentalRequest, setSelectedRentalRequest] = useState(null);
  const [rentalRequestFilter, setRentalRequestFilter] = useState('pending');

  // Car management helpers using CarContext
  const handleAddCar = (carData) => {
    const newCarData = {
      ...carData,
      pricePerDay: parseInt(carData.dailyRate),
      type: carData.category,
      imageUrl: carData.images.length > 0 ? carData.images[0] : 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400',
      images: carData.images.length > 0 ? carData.images : ['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400'],
    };
    
    addRentalCar(newCarData);
    setIsAddingCar(false);
    alert('Car added successfully!');
  };

  const handleToggleAvailability = (id) => {
    toggleCarAvailability(id);
  };

  const handleDeleteCar = (id) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      deleteRentalCar(id);
    }
  };

  // Rental request handlers
  const handleApproveRentalRequest = (requestId) => {
    const request = rentalRequests.find(r => r.id === requestId);
    
    if (request.type === 'car_listing') {
      const message = prompt('Enter approval message (optional):') || 'Your car listing has been approved and added to our rental fleet!';
      updateCarListingRequestStatus(requestId, 'approved', message);
      alert('Car listing approved and added to rental fleet successfully!');
    } else {
      const message = prompt('Enter approval message (optional):') || 'Your rental request has been approved!';
      approveRentalRequest(requestId, message);
      alert('Rental request approved successfully!');
    }
  };

  const handleDenyRentalRequest = (requestId) => {
    const request = rentalRequests.find(r => r.id === requestId);
    const message = prompt('Enter denial reason:') || 
      (request.type === 'car_listing' ? 'Your car listing has been denied.' : 'Your rental request has been denied.');
    
    if (request.type === 'car_listing') {
      updateCarListingRequestStatus(requestId, 'denied', message);
    } else {
      denyRentalRequest(requestId, message);
    }
    alert(request.type === 'car_listing' ? 'Car listing denied.' : 'Rental request denied.');
  };

  // Filter rental requests
  const filteredRentalRequests = rentalRequests.filter(request => {
    if (rentalRequestFilter === 'all') return true;
    return request.status === rentalRequestFilter;
  });

  const getStatusColor = s => ({ pending:'bg-yellow-100 text-yellow-800', approved:'bg-green-100 text-green-800', denied:'bg-red-100 text-red-800' }[s] || 'bg-gray-100 text-gray-800');

  return (
    <ErrorBoundary>
      <div className="bg-gradient-to-b from-green-50 to-green-100 min-h-screen">
        {/* Header matching other pages */}
        <header className="sticky top-0 z-50 bg-white shadow-sm">
          <div className="px-4 mx-auto sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20">
              <div className="flex-shrink-0">
                <Link to="/" title="" className="flex">
                  <img className="w-auto h-40 pt-10" src={an} alt="Accelerate Nigeria" />
                </Link>
              </div>

              <button 
                type="button" 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex p-1 text-black transition-all duration-200 border border-black lg:hidden focus:bg-gray-100 hover:bg-gray-100"
              >
                <svg className={`w-6 h-6 ${isMobileMenuOpen ? 'hidden' : 'block'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg className={`w-6 h-6 ${isMobileMenuOpen ? 'block' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>

              <div className="hidden ml-auto lg:flex lg:items-center lg:justify-center lg:space-x-10">
                <Link to="/" className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"> Home </Link>
                <Link to="/solutions" className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"> Solutions </Link>
                <Link to="/partner-with-us" className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"> Partner with us </Link>
                <Link to="/contact-us" className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"> Contact Us </Link>
                <div className="w-px h-5 bg-black/20"></div>
                <span className="text-base font-semibold text-black border-b-2 border-green-500 pb-1">Admin Dashboard</span>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="lg:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                  <Link to="/" className="block px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md">Home</Link>
                  <Link to="/solutions" className="block px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md">Solutions</Link>
                  <Link to="/partner-with-us" className="block px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md">Partner with us</Link>
                  <Link to="/contact-us" className="block px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md">Contact Us</Link>
                  <div className="border-t border-gray-200 pt-2">
                    <span className="block px-3 py-2 text-base font-medium text-black bg-gray-100 rounded-md border-l-4 border-green-500">Admin Dashboard</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="sticky top-16 lg:top-20 z-40 bg-gradient-to-b from-green-50 to-green-100 px-4 mx-auto sm:px-6 lg:px-8 pt-8 pb-4">
          <div className="flex justify-center space-x-1 bg-white p-1 rounded-lg shadow-sm max-w-md mx-auto">
            <button
              onClick={() => {setActiveTab('rental-requests'); setSelectedCar(null); setIsAddingCar(false); setSelectedRentalRequest(null);}}
              className={`group relative flex-1 px-3 py-3 text-sm font-semibold rounded-md transition-all duration-200 ${
                activeTab === 'rental-requests'
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
              title="Rental Requests"
            >
              <div className="flex flex-col items-center space-y-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <span className="text-xs hidden sm:block">Requests</span>
              </div>
              {rentalRequests.filter(r => r.status === 'pending').length > 0 && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                  {rentalRequests.filter(r => r.status === 'pending').length}
                </span>
              )}
            </button>
            <button
              onClick={() => {setActiveTab('rental-cars'); setSelectedCar(null); setIsAddingCar(false); setSelectedRentalRequest(null);}}
              className={`group flex-1 px-3 py-3 text-sm font-semibold rounded-md transition-all duration-200 ${
                activeTab === 'rental-cars'
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
              title="Rental Fleet"
            >
              <div className="flex flex-col items-center space-y-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                <span className="text-xs hidden sm:block">Fleet</span>
              </div>
            </button>
          </div>
        </div>

        <div className="px-4 mx-auto sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:space-x-8">
            {/* Sidebar */}
            <aside className="lg:w-64 mb-8 lg:mb-0">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {activeTab === 'rental-requests' ? (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Rental Requests</h3>
                    <div className="space-y-2">
                      {[
                        {key: 'pending', label: 'Pending', count: filteredRentalRequests.filter(r => r.status === 'pending').length},
                        {key: 'approved', label: 'Approved', count: filteredRentalRequests.filter(r => r.status === 'approved').length},
                        {key: 'denied', label: 'Denied', count: filteredRentalRequests.filter(r => r.status === 'denied').length},
                        {key: 'all', label: 'All Requests', count: rentalRequests.length}
                      ].map(item => (
                        <button 
                          key={item.key}
                          onClick={() => setRentalRequestFilter(item.key)} 
                          className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                            rentalRequestFilter === item.key 
                              ? 'bg-green-600 text-white shadow-sm' 
                              : 'text-gray-700 hover:bg-gray-100 border border-gray-200'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span>{item.label}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              rentalRequestFilter === item.key ? 'bg-white/20' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {item.count}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-600 mb-3">Quick Actions</h4>
                      <div className="space-y-2">
                        <button 
                          onClick={() => setActiveTab('rental-cars')}
                          className="w-full text-left px-3 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-sm font-medium transition-colors duration-200"
                        >
                          View Rental Fleet
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Fleet Overview</h3>
                    <div className="space-y-3">
                      {[
                        {key: 'available', label: 'Available Cars', count: rentalCars.filter(c => c.available).length},
                        {key: 'unavailable', label: 'Unavailable', count: rentalCars.filter(c => !c.available).length},
                        {key: 'total', label: 'Total Fleet', count: rentalCars.length}
                      ].map(item => (
                        <div key={item.key} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                          <span className="font-medium text-gray-700">{item.label}</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            item.key === 'available' ? 'bg-green-100 text-green-800' :
                            item.key === 'unavailable' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {item.count}
                          </span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setIsAddingCar(true)}
                      className="w-full mt-4 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
                    >
                      Add New Car
                    </button>
                  </div>
                )}
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              {activeTab === 'rental-requests' ? (
                !selectedRentalRequest ? (
                  <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                      <h1 className="text-2xl font-bold text-gray-900">Rental Requests</h1>
                      <p className="text-gray-600 mt-1">Review and manage car rental requests from customers</p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Renter</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rental Period</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredRentalRequests.map(request => (
                            <tr key={request.id} className="hover:bg-gray-50 transition-colors duration-200">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {request.type === 'car_listing' ? request.owner.name : request.renterName}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {request.type === 'car_listing' ? request.owner.email : request.renterEmail}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {request.type === 'car_listing' ? request.owner.phone : request.renterPhone}
                                  </div>
                                  {request.type === 'car_listing' && (
                                    <div className="text-xs text-blue-600 font-medium mt-1">Car Listing</div>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  {request.car ? `${request.car.year || ''} ${request.car.make || ''} ${request.car.model || ''}` : 'Vehicle information unavailable'}
                                </div>
                                <div className="text-sm text-gray-500">
                                  Daily Rate: ₦{(request.type === 'car_listing' ? request.pricing?.dailyRate : request.car?.pricePerDay)?.toLocaleString() || 'N/A'}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {request.type === 'car_listing' ? (
                                  <div className="text-sm text-gray-900">Car Listing Request</div>
                                ) : (
                                  <div>
                                    <div className="text-sm text-gray-900">
                                      {new Date(request.startDate).toLocaleDateString()} to {new Date(request.endDate).toLocaleDateString()}
                                    </div>
                                    <div className="text-sm text-gray-500">{request.totalDays} days</div>
                                  </div>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {request.type === 'car_listing' ? 'N/A' : `₦${request.totalAmount?.toLocaleString()}`}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(request.dateSubmitted).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                <button
                                  onClick={() => setSelectedRentalRequest(request)}
                                  className="text-green-600 hover:text-green-900 font-medium transition-colors duration-200"
                                >
                                  View Details
                                </button>
                                {request.status === 'pending' && (
                                  <div className="inline-flex space-x-2">
                                    <button
                                      onClick={() => handleApproveRentalRequest(request.id)}
                                      className="text-green-600 hover:text-green-900 font-medium transition-colors duration-200"
                                    >
                                      Approve
                                    </button>
                                    <button
                                      onClick={() => handleDenyRentalRequest(request.id)}
                                      className="text-red-600 hover:text-red-900 font-medium transition-colors duration-200"
                                    >
                                      Deny
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  // Request Details View (keeping existing implementation)
                  <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                      <button
                        onClick={() => setSelectedRentalRequest(null)}
                        className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-700 mb-4 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Requests
                      </button>
                      <div className="flex justify-between items-start">
                        <div>
                          <h1 className="text-2xl font-bold text-gray-900">Rental Request Details</h1>
                          <p className="text-gray-600 mt-1">Submitted on {new Date(selectedRentalRequest.dateSubmitted).toLocaleDateString()}</p>
                        </div>
                        <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedRentalRequest.status)}`}>
                          {selectedRentalRequest.status.charAt(0).toUpperCase() + selectedRentalRequest.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    {/* Request details content would go here - keeping existing implementation */}
                  </div>
                )
              ) : (
                // Rental Cars Management Tab
                isAddingCar ? (
                  <AddCarForm onSubmit={handleAddCar} onCancel={() => setIsAddingCar(false)} />
                ) : selectedCar ? (
                  <CarDetailsView car={selectedCar} onBack={() => setSelectedCar(null)} onEdit={() => {}} />
                ) : (
                  <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <h1 className="text-2xl font-bold text-gray-900">Rental Fleet Management</h1>
                          <p className="text-gray-600 mt-1">Manage cars available for rental</p>
                        </div>
                        <button
                          onClick={() => setIsAddingCar(true)}
                          className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
                        >
                          Add New Car
                        </button>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Daily Rate</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {rentalCars.map(car => (
                            <tr key={car.id} className="hover:bg-gray-50 transition-colors duration-200">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <img 
                                    src={car.imageUrl || car.image || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400'} 
                                    alt={`${car.make} ${car.model}`}
                                    className="w-12 h-12 rounded-lg object-cover mr-3"
                                  />
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">
                                      {car.year} {car.make} {car.model}
                                    </div>
                                    <div className="text-sm text-gray-500">{car.licensePlate}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {car.category || car.type}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                ₦{car.pricePerDay?.toLocaleString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  car.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {car.available ? 'Available' : 'Unavailable'}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(car.dateAdded).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                <button
                                  onClick={() => setSelectedCar(car)}
                                  className="text-green-600 hover:text-green-900 transition-colors duration-200"
                                >
                                  View
                                </button>
                                <button
                                  onClick={() => handleToggleAvailability(car.id)}
                                  className={`${car.available ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'} transition-colors duration-200`}
                                >
                                  {car.available ? 'Disable' : 'Enable'}
                                </button>
                                <button
                                  onClick={() => handleDeleteCar(car.id)}
                                  className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )
              )}
            </main>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}