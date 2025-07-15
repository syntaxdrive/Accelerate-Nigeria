import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import an from '../assets/an.png';
import { useAuth } from '../utils/auth.js';
import { useCarContext } from '../context/CarContext.jsx';
import Footer from '../components/Footer';
import ErrorBoundary from '../components/ErrorBoundary.jsx';
import Navbar from '../components/NavBar.jsx';

export default function RentCars() {
    const { user, isAuthenticated, logout } = useAuth();
    const { getAvailableCars, submitRentalRequest } = useCarContext();
    const navigate = useNavigate();
    
    const handleLogout = () => {
        logout();
        navigate('/');
    };
    
    // Get available cars from CarContext (will auto-sync when admin makes changes)
    const [availableCars, setAvailableCars] = useState(getAvailableCars());
    
    // Listen for real-time updates when admin adds/removes/updates cars
    useEffect(() => {
        const updateAvailableCars = () => {
            console.log('🔄 Updating available cars from sync...');
            setAvailableCars(getAvailableCars());
        };

        // Listen for sync events to update the car list in real-time
        window.addEventListener('acc-nigeria-sync', updateAvailableCars);
        
        // Also update every few seconds to catch any missed syncs
        const interval = setInterval(updateAvailableCars, 3000);
        
        return () => {
            window.removeEventListener('acc-nigeria-sync', updateAvailableCars);
            clearInterval(interval);
        };
    }, [getAvailableCars]);
    

    
    // Demo user phone for tracking requests
    const DEMO_USER_PHONE = '+234 800 000 0000';
    
    const [selectedCar, setSelectedCar] = useState(null);
    const [filters, setFilters] = useState({
        category: '',
        priceRange: '',
        transmission: '',
        fuelType: '',
        location: ''
    });
    const [sortBy, setSortBy] = useState('price-low');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showRentalForm, setShowRentalForm] = useState(false);
    const [selectedCarForRent, setSelectedCarForRent] = useState(null);

    // Filter and sort cars
    const getFilteredAndSortedCars = () => {
        let filtered = availableCars.filter(car => car.available);

        // Apply filters
        if (filters.category) {
            filtered = filtered.filter(car => car.type === filters.category);
        }
        if (filters.transmission) {
            filtered = filtered.filter(car => car.transmission === filters.transmission);
        }
        if (filters.fuelType) {
            filtered = filtered.filter(car => car.fuelType === filters.fuelType);
        }
        if (filters.location) {
            filtered = filtered.filter(car => car.location === filters.location);
        }
        if (filters.priceRange) {
            const [min, max] = filters.priceRange.split('-').map(Number);
            filtered = filtered.filter(car => car.pricePerDay >= min && (max ? car.pricePerDay <= max : true));
        }

        // Sort cars
        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.pricePerDay - b.pricePerDay);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.pricePerDay - a.pricePerDay);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                filtered.sort((a, b) => b.year - a.year);
                break;
            default:
                break;
        }

        return filtered;
    };

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const clearFilters = () => {
        setFilters({
            category: '',
            priceRange: '',
            transmission: '',
            fuelType: '',
            location: ''
        });
    };

    const handleRentNow = (car) => {
        setSelectedCarForRent(car);
        setShowRentalForm(true);
    };

    const handleSubmitRentalRequest = (rentalDetails) => {
        console.log('📝 Submitting rental request via CarContext...', rentalDetails);
        
        // Use CarContext to submit the request - this will automatically sync across all devices
        const result = submitRentalRequest(selectedCarForRent.id, {
            renterName: rentalDetails.renterName,
            renterPhone: user?.phone || 'N/A', // Use actual user phone if available
            renterEmail: rentalDetails.renterEmail || user?.email || 'demo@example.com',
            startDate: rentalDetails.startDate,
            endDate: rentalDetails.endDate
        });
        
        if (result.success) {
            alert(` Rental request submitted successfully! Request ID: ${result.requestId}\n\nYour request will be reviewed by our team and you'll be notified once approved.`);
            console.log(' Rental request submitted:', result);
            
            // Close the form
            setShowRentalForm(false);
            setSelectedCarForRent(null);
        } else {
            alert(` Error submitting rental request: ${result.message}`);
            console.error(' Error submitting rental request:', result);
        }
    };

    const filteredCars = getFilteredAndSortedCars();

    // Helper function to get rental request for a specific car
    const getRequestForCar = (carId) => {
        // This would typically fetch from your rental requests data
        // For now, returning null as placeholder
        return null;
    };

    // Function to handle canceling a rental request
    const handleCancelRequest = (requestId) => {
        // This would typically cancel the rental request
        console.log('Canceling request:', requestId);
        alert('Request canceled successfully');
    };

    return (
        <ErrorBoundary>
            <div>
        <Navbar />
            <div className="py-10 sm:py-16 lg:py-24">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-black sm:text-5xl lg:text-6xl">
                            Rent a
                            <div className="relative inline-flex ml-4">
                                <span className="absolute inset-x-0 bottom-0 border-b-[30px] border-green-400"></span>
                                <span className="relative text-4xl font-bold text-black sm:text-5xl lg:text-6xl">Car</span>
                            </div>
                        </h1>
                        <p className="mt-8 text-base text-gray-700 sm:text-xl max-w-3xl mx-auto">
                            Choose from our fleet of well-maintained vehicles. Perfect for business trips, vacations, or daily commutes.
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Filters Sidebar */}
                        <aside className="lg:w-80">
                            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                                    <button
                                        onClick={clearFilters}
                                        className="text-sm text-green-600 hover:text-green-700"
                                    >
                                        Clear All
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {/* Category Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
                                        <div className="space-y-2">
                                            {['Economy', 'Compact', 'Mid-size', 'Luxury', 'SUV'].map(category => (
                                                <label key={category} className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="category"
                                                        value={category}
                                                        checked={filters.category === category}
                                                        onChange={(e) => handleFilterChange('category', e.target.value)}
                                                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-700">{category}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price Range Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">Daily Rate</label>
                                        <div className="space-y-2">
                                            {[
                                                { label: 'Under ₦10,000', value: '0-10000' },
                                                { label: '₦10,000 - ₦20,000', value: '10000-20000' },
                                                { label: '₦20,000 - ₦30,000', value: '20000-30000' },
                                                { label: 'Above ₦30,000', value: '30000-999999' }
                                            ].map(range => (
                                                <label key={range.value} className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="priceRange"
                                                        value={range.value}
                                                        checked={filters.priceRange === range.value}
                                                        onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                                                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-700">{range.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Transmission Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">Transmission</label>
                                        <div className="space-y-2">
                                            {['Automatic', 'Manual'].map(transmission => (
                                                <label key={transmission} className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="transmission"
                                                        value={transmission}
                                                        checked={filters.transmission === transmission}
                                                        onChange={(e) => handleFilterChange('transmission', e.target.value)}
                                                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-700">{transmission}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Fuel Type Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">Fuel Type</label>
                                        <div className="space-y-2">
                                            {['Petrol', 'Diesel', 'Electric', 'Hybrid'].map(fuelType => (
                                                <label key={fuelType} className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="fuelType"
                                                        value={fuelType}
                                                        checked={filters.fuelType === fuelType}
                                                        onChange={(e) => handleFilterChange('fuelType', e.target.value)}
                                                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-700">{fuelType}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Location Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">Location</label>
                                        <div className="space-y-2">
                                            {['Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan', 'Enugu', 'Kaduna'].map(location => (
                                                <label key={location} className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="location"
                                                        value={location}
                                                        checked={filters.location === location}
                                                        onChange={(e) => handleFilterChange('location', e.target.value)}
                                                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-700">{location}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Cars Grid */}
                        <main className="flex-1">
                            <div className="flex items-center justify-between mb-6">
                                <p className="text-gray-600">
                                    Showing {filteredCars.length} of {availableCars.filter(car => car.available).length} available cars
                                </p>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                >
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Highest Rated</option>
                                    <option value="newest">Newest First</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredCars.map(car => (
                                    <div key={car.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
                                        <div className="relative">
                                            <img
                                                src={car.imageUrl}
                                                alt={`${car.make} ${car.model}`}
                                                className="w-full h-48 object-cover"
                                            />
                                            <div className="absolute top-3 right-3">
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                    car.type === 'Economy' ? 'bg-blue-100 text-blue-800' :
                                                    car.type === 'Luxury' ? 'bg-purple-100 text-purple-800' :
                                                    'bg-green-100 text-green-800'
                                                }`}>
                                                    {car.type}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-4 flex flex-col flex-grow">
                                            {/* Title and Rating */}
                                            <div className="flex items-start justify-between mb-3">
                                                <h3 className="text-lg font-semibold text-gray-900 flex-1 min-w-0">
                                                    {car.year} {car.make} {car.model}
                                                </h3>
                                                <div className="flex items-center ml-2 flex-shrink-0">
                                                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    <span className="ml-1 text-sm text-gray-600">{car.rating}</span>
                                                </div>
                                            </div>

                                            {/* Car Details Grid */}
                                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-3 text-sm text-gray-600">
                                                <div className="flex items-center">
                                                    <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                    <span className="truncate">{car.seats} seats</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                    </svg>
                                                    <span className="truncate">{car.fuelType}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                                                    </svg>
                                                    <span className="truncate">{car.transmission}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                                                    </svg>
                                                    <span className="truncate">{car.color}</span>
                                                </div>
                                            </div>

                                            {/* Features */}
                                            <div className="flex flex-wrap gap-1 mb-4">
                                                {car.features.slice(0, 2).map((feature, index) => (
                                                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded truncate">
                                                        {feature}
                                                    </span>
                                                ))}
                                                {car.features.length > 2 && (
                                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                                        +{car.features.length - 2}
                                                    </span>
                                                )}
                                            </div>
                                            
                                            {/* Price and Actions - Push to bottom */}
                                            <div className="mt-auto pt-2">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div>
                                                        <span className="text-xl font-bold text-gray-900">₦{car.pricePerDay.toLocaleString()}</span>
                                                        <span className="text-gray-600 text-sm">/day</span>
                                                    </div>
                                                </div>
                                                
                                                {/* Action Buttons */}
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => setSelectedCar(car)}
                                                        className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm"
                                                    >
                                                        Details
                                                    </button>
                                                    
                                                    {(() => {
                                                        const request = getRequestForCar(car.id);
                                                        
                                                        if (request) {
                                                            if (request.status === 'pending') {
                                                                return (
                                                                    <button
                                                                        onClick={() => handleCancelRequest(request.id)}
                                                                        className="flex-1 px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200 text-sm font-medium"
                                                                    >
                                                                        Cancel Request
                                                                    </button>
                                                                );
                                                            } else if (request.status === 'approved') {
                                                                return (
                                                                    <button
                                                                        disabled
                                                                        className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium cursor-not-allowed opacity-75"
                                                                    >
                                                                        Approved
                                                                    </button>
                                                                );
                                                            }
                                                        }
                                                        
                                                        return (
                                                            <button
                                                                onClick={() => handleRentNow(car)}
                                                                className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium"
                                                            >
                                                                Rent Now
                                                            </button>
                                                        );
                                                    })()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {filteredCars.length === 0 && (
                                <div className="text-center py-12">
                                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.034 0-3.934.606-5.5 1.647M15 6.317A7.97 7.97 0 0012 5c-1.085 0-2.13.215-3.077.604M17 12H7M7 7l5 5 5-5" />
                                    </svg>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No cars found</h3>
                                    <p className="text-gray-600">Try adjusting your filters to see more results.</p>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </div>

            {/* Car Details Modal */}
            {selectedCar && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {selectedCar.year} {selectedCar.make} {selectedCar.model}
                                </h2>
                                <button
                                    onClick={() => setSelectedCar(null)}
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <div className="mb-4">
                                        <img
                                            src={selectedCar.imageUrl}
                                            alt={`${selectedCar.make} ${selectedCar.model}`}
                                            className="w-full h-64 object-cover rounded-lg"
                                        />
                                    </div>
                                    <p className="text-gray-700">{selectedCar.description}</p>
                                </div>

                                <div>
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Vehicle Details</h3>
                                            <div className="grid grid-cols-2 gap-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Category:</span>
                                                    <span className="font-medium">{selectedCar.type}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Seats:</span>
                                                    <span className="font-medium">{selectedCar.seats}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Transmission:</span>
                                                    <span className="font-medium">{selectedCar.transmission}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Fuel Type:</span>
                                                    <span className="font-medium">{selectedCar.fuelType}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Pricing</h3>
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Daily Rate:</span>
                                                    <span className="font-medium">₦{selectedCar.pricePerDay.toLocaleString()}</span>
                                                </div>
                                                {selectedCar.weeklyRate && (
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Weekly Rate:</span>
                                                        <span className="font-medium">₦{selectedCar.weeklyRate.toLocaleString()}</span>
                                                    </div>
                                                )}
                                                {selectedCar.monthlyRate && (
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Monthly Rate:</span>
                                                        <span className="font-medium">₦{selectedCar.monthlyRate.toLocaleString()}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Features</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedCar.features.map((feature, index) => (
                                                    <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <button
                                                onClick={() => handleRentNow(selectedCar)}
                                                className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
                                            >
                                                Rent This Car - ₦{selectedCar.pricePerDay.toLocaleString()}/day
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        
            )}

            {/* Rental Form Modal */}
            {showRentalForm && selectedCarForRent && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-md w-full">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-gray-900">
                                    Rent {selectedCarForRent.year} {selectedCarForRent.make} {selectedCarForRent.model}
                                </h2>
                                <button
                                    onClick={() => {
                                        setShowRentalForm(false);
                                        setSelectedCarForRent(null);
                                    }}
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const rentalDetails = {
                                renterName: formData.get('renterName'),
                                renterEmail: formData.get('renterEmail'),
                                startDate: formData.get('startDate'),
                                endDate: formData.get('endDate')
                            };
                            
                            console.log('📝 Form submitted with details:', rentalDetails);
                            console.log('🚗 Selected car:', selectedCarForRent);
                            
                            handleSubmitRentalRequest(rentalDetails);
                        }} className="p-6 space-y-4">
                            <div>
                                <label htmlFor="renterName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="renterName"
                                    name="renterName"
                                    required
                                    defaultValue="Demo User"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="renterEmail" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="renterEmail"
                                    name="renterEmail"
                                    required
                                    defaultValue="demo@example.com"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    required
                                    min={new Date().toISOString().split('T')[0]}
                                    defaultValue={new Date().toISOString().split('T')[0]}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    id="endDate"
                                    name="endDate"
                                    required
                                    min={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                                    defaultValue={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                />
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Daily Rate:</span>
                                    <span className="font-semibold">₦{selectedCarForRent.pricePerDay.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowRentalForm(false);
                                        setSelectedCarForRent(null);
                                    }}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                                >
                                    Submit Request
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
            {/* Footer */}
            <Footer />
        </div>
        </ErrorBoundary>
    );
}
