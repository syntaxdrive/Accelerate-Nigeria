import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import an from '../assets/an.png';
import { useAuth } from '../utils/auth.js';
import Footer from '../components/Footer';

export default function RentCars() {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    
    const handleLogout = () => {
        logout();
        navigate('/');
    };
    
    // Get cars from localStorage (approved cars from admin)
    const [availableCars, setAvailableCars] = useState(() => {
        const stored = localStorage.getItem('rentalCars');
        return stored ? JSON.parse(stored).filter(car => car.available) : [
            // Fallback cars if none in localStorage
            {
                id: 1,
                make: 'Toyota',
                model: 'Camry',
                year: 2023,
                type: 'Sedan',
                fuelType: 'Hybrid',
                transmission: 'Automatic',
                pricePerDay: 15000,
                features: ['Air Conditioning', 'Bluetooth', 'Backup Camera', 'Cruise Control'],
                imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400',
                available: true,
                location: 'Lagos',
                description: 'Comfortable and fuel-efficient sedan perfect for city driving and long trips.',
                mileage: 12000,
                color: 'Silver',
                seats: 5,
                licensePlate: 'LAG-123-AB',
                rating: 4.8,
                reviews: 24
            }
        ];
    });
    
    // Auto-refresh available cars from localStorage every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            const stored = localStorage.getItem('rentalCars');
            const cars = stored ? JSON.parse(stored) : [];
            setAvailableCars(cars);
        }, 5000);
        
        return () => clearInterval(interval);
    }, []);
    
    // Check localStorage size and clean up if needed
    useEffect(() => {
        try {
            // Check the size of rentalRequests in localStorage
            const rentalRequests = localStorage.getItem('rentalRequests');
            if (rentalRequests) {
                const sizeMB = (rentalRequests.length * 2) / (1024 * 1024);
                console.log(`📊 Current localStorage usage for rentalRequests: ~${sizeMB.toFixed(2)}MB`);
                
                // If it's getting close to quota limits, clean up older requests
                if (sizeMB > 4) {
                    const requestsArray = JSON.parse(rentalRequests);
                    console.log(`⚠️ localStorage size approaching limit, pruning from ${requestsArray.length} requests`);
                    
                    // Keep only the 10 most recent requests
                    const prunedRequests = requestsArray
                        .sort((a, b) => new Date(b.dateSubmitted) - new Date(a.dateSubmitted))
                        .slice(0, 10);
                    
                    localStorage.setItem('rentalRequests', JSON.stringify(prunedRequests));
                    console.log(`✂️ Pruned rentalRequests to ${prunedRequests.length} entries`);
                }
            }
        } catch (error) {
            console.error('Error managing localStorage:', error);
        }
    }, []);
    
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
        // Get existing requests from localStorage
        const existingRequests = JSON.parse(localStorage.getItem('rentalRequests') || '[]');
        
        // Create new request with minimal car data to save space in localStorage
        const requestId = `REQ${Date.now()}`;
        const newRequest = {
            id: requestId,
            carId: selectedCarForRent.id,
            // Store only essential car information, not the complete car object
            car: {
                make: selectedCarForRent.make,
                model: selectedCarForRent.model,
                year: selectedCarForRent.year,
                licensePlate: selectedCarForRent.licensePlate || `${selectedCarForRent.make.substring(0,3).toUpperCase()}-${Math.floor(Math.random() * 1000)}`,
                // Store only the imageUrl reference, not the full image data
                imageUrl: selectedCarForRent.imageUrl || 
                    (selectedCarForRent.images && selectedCarForRent.images.length > 0 ? selectedCarForRent.images[0] : ''),
                // Include only essential properties for display in admin dashboard
                pricePerDay: selectedCarForRent.pricePerDay
            },
            renterName: rentalDetails.renterName,
            renterPhone: DEMO_USER_PHONE,
            renterEmail: rentalDetails.renterEmail || 'demo@example.com',
            startDate: rentalDetails.startDate,
            endDate: rentalDetails.endDate,
            totalDays: Math.ceil((new Date(rentalDetails.endDate) - new Date(rentalDetails.startDate)) / (1000 * 60 * 60 * 24)),
            totalAmount: Math.ceil((new Date(rentalDetails.endDate) - new Date(rentalDetails.startDate)) / (1000 * 60 * 60 * 24)) * selectedCarForRent.pricePerDay,
            status: 'pending',
            dateSubmitted: new Date().toISOString(),
            message: null
            // Note: Not setting a type field makes the Admin Dashboard treat it as a regular rental request
            // (as opposed to 'car_listing')
        };
        
        // Clean up old requests if there are too many (keep most recent 20)
        let updatedRequests = [...existingRequests, newRequest];
        if (updatedRequests.length > 20) {
            console.log('⚠️ Too many rental requests in storage, removing oldest ones');
            updatedRequests = updatedRequests
                .sort((a, b) => new Date(b.dateSubmitted) - new Date(a.dateSubmitted))
                .slice(0, 20);
        }
        
        try {
            // Try storing the requests
            const dataToStore = JSON.stringify(updatedRequests);
            // Check size before attempting to store (approximate size in MB)
            const dataSizeMB = (dataToStore.length * 2) / (1024 * 1024);
            console.log(`📊 Rental requests data size: ~${dataSizeMB.toFixed(2)}MB`);
            
            if (dataSizeMB > 4.5) {
                throw new Error(`Data size (${dataSizeMB.toFixed(2)}MB) exceeds safe limit for localStorage`);
            }
            
            localStorage.setItem('rentalRequests', dataToStore);
            console.log('✅ Rental request saved to localStorage:', newRequest);
            console.log('📊 Total rental requests in storage:', updatedRequests.length);
        } catch (error) {
            console.error('❌ Error saving rental request to localStorage:', error);
            
            // Fallback: Try storing only the most recent 5 requests
            try {
                const reducedRequests = [newRequest, ...existingRequests.slice(0, 4)];
                localStorage.setItem('rentalRequests', JSON.stringify(reducedRequests));
                console.log('⚠️ Fallback: Saved only the 5 most recent requests');
                alert('Your request was saved, but some older requests were removed due to storage limitations.');
            } catch (fallbackError) {
                console.error('❌ Even fallback storage failed:', fallbackError);
                alert(`Error saving rental request: ${error.message}. Try clearing your browser cache.`);
            }
        }
        
        alert(`Rental request submitted successfully!\nRequest ID: ${requestId}\nVehicle: ${selectedCarForRent.year} ${selectedCarForRent.make} ${selectedCarForRent.model}\nDaily Rate: ₦${selectedCarForRent.pricePerDay.toLocaleString()}\n\nYour request has been sent to the admin for approval.`);
        setShowRentalForm(false);
        setSelectedCarForRent(null);
    };

    const handleCancelRequest = (requestId) => {
        const existingRequests = JSON.parse(localStorage.getItem('rentalRequests') || '[]');
        const updatedRequests = existingRequests.map(request => 
            request.id === requestId 
                ? { ...request, status: 'cancelled' }
                : request
        );
        localStorage.setItem('rentalRequests', JSON.stringify(updatedRequests));
        alert('Rental request cancelled successfully!');
    };

    const getRequestForCar = (carId) => {
        const requests = JSON.parse(localStorage.getItem('rentalRequests') || '[]');
        return requests.find(request => 
            request.carId === carId && 
            request.renterPhone === DEMO_USER_PHONE &&
            (request.status === 'pending' || request.status === 'approved')
        );
    };

    const filteredCars = getFilteredAndSortedCars();

    return (
        <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
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

                        <div className="hidden ml-auto lg:flex lg:items-center lg:space-x-1">
                            <div className="flex items-center space-x-1 bg-white p-1 rounded-lg shadow-sm mr-4">
                                <Link to="/" className="group flex items-center px-3 py-2 text-sm font-semibold rounded-md transition-all duration-200 text-gray-600 hover:text-gray-800 hover:bg-gray-100" title="Home">
                                    <div className="flex flex-col items-center space-y-1">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                        <span className="text-xs hidden xl:block">Home</span>
                                    </div>
                                </Link>
                                <Link to="/solutions" className="group flex items-center px-3 py-2 text-sm font-semibold rounded-md transition-all duration-200 text-gray-600 hover:text-gray-800 hover:bg-gray-100" title="Solutions">
                                    <div className="flex flex-col items-center space-y-1">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                        <span className="text-xs hidden xl:block">Solutions</span>
                                    </div>
                                </Link>
                                <Link to="/rent-cars" className="group relative flex items-center px-3 py-2 text-sm font-semibold rounded-md transition-all duration-200 bg-green-600 text-white shadow-sm" title="Rent a Car">
                                    <div className="flex flex-col items-center space-y-1">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>
                                        <span className="text-xs hidden xl:block">Rent</span>
                                    </div>
                                </Link>
                                <Link to="/list-your-car" className="group flex items-center px-3 py-2 text-sm font-semibold rounded-md transition-all duration-200 text-gray-600 hover:text-gray-800 hover:bg-gray-100" title="List Your Car">
                                    <div className="flex flex-col items-center space-y-1">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        <span className="text-xs hidden xl:block">List</span>
                                    </div>
                                </Link>
                                {isAuthenticated && (
                                    <Link to="/my-requests" className="group flex items-center px-3 py-2 text-sm font-semibold rounded-md transition-all duration-200 text-gray-600 hover:text-gray-800 hover:bg-gray-100" title="My Requests">
                                        <div className="flex flex-col items-center space-y-1">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                            </svg>
                                            <span className="text-xs hidden xl:block">Requests</span>
                                        </div>
                                    </Link>
                                )}
                                <Link to="/partner-with-us" className="group flex items-center px-3 py-2 text-sm font-semibold rounded-md transition-all duration-200 text-gray-600 hover:text-gray-800 hover:bg-gray-100" title="Partner with us">
                                    <div className="flex flex-col items-center space-y-1">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <span className="text-xs hidden xl:block">Partner</span>
                                    </div>
                                </Link>
                                <Link to="/contact-us" className="group flex items-center px-3 py-2 text-sm font-semibold rounded-md transition-all duration-200 text-gray-600 hover:text-gray-800 hover:bg-gray-100" title="Contact Us">
                                    <div className="flex flex-col items-center space-y-1">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-xs hidden xl:block">Contact</span>
                                    </div>
                                </Link>
                            </div>
                            <div className="w-px h-5 bg-black/20"></div>
                            {isAuthenticated ? (
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm text-gray-600">Welcome, {user?.name?.split(' ')[0] || 'User'}</span>
                                    <button 
                                        onClick={handleLogout}
                                        className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-black border-2 border-black hover:bg-black hover:text-white transition-all duration-200 focus:bg-black focus:text-white rounded-lg"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link to="/register" className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-black border-2 border-black hover:bg-black hover:text-white transition-all duration-200 focus:bg-black focus:text-white rounded-lg">Register</Link>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <div className="lg:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                                <Link to="/" className="flex items-center px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md">
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    Home
                                </Link>
                                <Link to="/solutions" className="flex items-center px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md">
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                    Solutions
                                </Link>
                                <Link to="/rent-cars" className="flex items-center px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md border-l-4 border-green-500">
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                    </svg>
                                    Rent a Car
                                </Link>
                                <Link to="/list-your-car" className="flex items-center px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md">
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    List Your Car
                                </Link>
                                {isAuthenticated && (
                                    <Link to="/my-requests" className="flex items-center px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md">
                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                        </svg>
                                        My Requests
                                    </Link>
                                )}
                                <Link to="/partner-with-us" className="flex items-center px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md">
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Partner with us
                                </Link>
                                <Link to="/contact-us" className="flex items-center px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md">
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Contact Us
                                </Link>
                                <div className="border-t border-gray-200 pt-2 mt-2">
                                    {isAuthenticated ? (
                                        <>
                                            <div className="px-3 py-2 text-sm text-gray-600">Welcome, {user?.name?.split(' ')[0] || 'User'}</div>
                                            <button 
                                                onClick={handleLogout}
                                                className="block w-full text-left px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md"
                                            >
                                                Logout
                                            </button>
                                        </>
                                    ) : (
                                        <Link to="/register" className="block px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md">Register</Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </header>

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
    );
}
