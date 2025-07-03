import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import an from '../assets/an.png';
import { useAuth } from '../utils/auth.js';
import Footer from '../components/Footer';

export default function ListYourCar() {
    const [formData, setFormData] = useState({
        // Owner Details
        ownerName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        
        // Car Details
        carMake: '',
        carModel: '',
        carYear: '',
        licensePlate: '',
        color: '',
        mileage: '',
        transmission: '',
        fuelType: '',
        seats: '',
        category: '',
        
        // Rental Details
        dailyRate: '',
        weeklyRate: '',
        monthlyRate: '',
        availability: '',
        deliveryOption: false,
        
        // Additional Info
        description: '',
        features: [],
        insuranceValid: false,
        roadWorthyValid: false,
        
        // Images
        images: []
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFeatureChange = (feature) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.includes(feature)
                ? prev.features.filter(f => f !== feature)
                : [...prev.features, feature]
        }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prev => ({
            ...prev,
            images: [...prev.images, ...files]
        }));
    };

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Create car listing request
        const requestId = `CAR${Date.now()}`;
        const carListingRequest = {
            id: requestId,
            type: 'car_listing', // Distinguish from rental requests
            status: 'pending',
            dateSubmitted: new Date().toISOString(),
            owner: {
                name: formData.ownerName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                state: formData.state
            },
            car: {
                make: formData.carMake,
                model: formData.carModel,
                year: parseInt(formData.carYear),
                licensePlate: formData.licensePlate,
                color: formData.color,
                mileage: parseInt(formData.mileage),
                transmission: formData.transmission,
                fuelType: formData.fuelType,
                seats: parseInt(formData.seats),
                category: formData.category,
                description: formData.description,
                features: formData.features,
                insuranceValid: formData.insuranceValid,
                roadWorthyValid: formData.roadWorthyValid
            },
            pricing: {
                dailyRate: parseInt(formData.dailyRate),
                weeklyRate: formData.weeklyRate ? parseInt(formData.weeklyRate) : null,
                monthlyRate: formData.monthlyRate ? parseInt(formData.monthlyRate) : null,
                availability: formData.availability,
                deliveryOption: formData.deliveryOption
            },
            images: formData.images.length > 0 ? formData.images : ['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400'],
            message: null
        };
        
        // Save to localStorage (same storage as rental requests)
        const existingRequests = JSON.parse(localStorage.getItem('rentalRequests') || '[]');
        const updatedRequests = [...existingRequests, carListingRequest];
        localStorage.setItem('rentalRequests', JSON.stringify(updatedRequests));
        
        console.log('✅ Car listing request saved:', carListingRequest);
        
        setTimeout(() => {
            alert('Your car listing has been submitted for approval! You will receive an email notification once it\'s reviewed.');
            setIsSubmitting(false);
            // Reset form
            setFormData({
                ownerName: '', email: '', phone: '', address: '', city: '', state: '',
                carMake: '', carModel: '', carYear: '', licensePlate: '', color: '', mileage: '',
                transmission: '', fuelType: '', seats: '', category: '', dailyRate: '',
                weeklyRate: '', monthlyRate: '', availability: '', deliveryOption: false,
                description: '', features: [], insuranceValid: false, roadWorthyValid: false,
                images: []
            });
            setCurrentStep(1);
        }, 2000);
    };

    const nextStep = () => setCurrentStep(prev => prev + 1);
    const prevStep = () => setCurrentStep(prev => prev - 1);

    const carFeatures = [
        'Air Conditioning', 'Bluetooth', 'GPS Navigation', 'Backup Camera',
        'Heated Seats', 'Sunroof', 'Leather Seats', 'USB Charging Ports',
        'Automatic Windows', 'Central Locking', 'ABS Brakes', 'Airbags'
    ];

    return (
        <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
            <header className="sticky top-0 z-50 bg-white shadow-sm">
                <div className="px-4 mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        <div className="flex-shrink-0">
                            <Link to="/" className="flex">
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
                            <div className="flex items-center space-x-1 bg-white p-1 rounded-lg shadow-sm">
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
                                <Link to="/rent-cars" className="group flex items-center px-3 py-2 text-sm font-semibold rounded-md transition-all duration-200 text-gray-600 hover:text-gray-800 hover:bg-gray-100" title="Rent a Car">
                                    <div className="flex flex-col items-center space-y-1">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>
                                        <span className="text-xs hidden xl:block">Rent</span>
                                    </div>
                                </Link>
                                <Link to="/list-your-car" className="group relative flex items-center px-3 py-2 text-sm font-semibold rounded-md transition-all duration-200 bg-green-600 text-white shadow-sm" title="List Your Car">
                                    <div className="flex flex-col items-center space-y-1">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        <span className="text-xs hidden xl:block">List</span>
                                    </div>
                                </Link>
                                <Link to="/my-requests" className="group flex items-center px-3 py-2 text-sm font-semibold rounded-md transition-all duration-200 text-gray-600 hover:text-gray-800 hover:bg-gray-100" title="My Requests">
                                    <div className="flex flex-col items-center space-y-1">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                        </svg>
                                        <span className="text-xs hidden xl:block">Requests</span>
                                    </div>
                                </Link>
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
                                <Link to="/rent-cars" className="flex items-center px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md">
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                    </svg>
                                    Rent a Car
                                </Link>
                                <Link to="/list-your-car" className="flex items-center px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md border-l-4 border-green-500">
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    List Your Car
                                </Link>
                                <Link to="/my-requests" className="flex items-center px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md">
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                    My Requests
                                </Link>
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
                            </div>
                        </div>
                    )}
                </div>
            </header>

            <section className="py-10 sm:py-16 lg:py-24">
                <div className="px-4 mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-black sm:text-5xl">List Your Car</h1>
                        <p className="mt-4 text-lg text-gray-600">
                            Fill out the form below to list your car for rental. Our team will review and approve your listing.
                        </p>
                    </div>

                    {/* Progress Steps */}
                    <div className="mb-12">
                        <div className="flex items-center justify-center space-x-8">
                            {[1, 2, 3, 4].map((step) => (
                                <div key={step} className="flex items-center">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                                        currentStep >= step ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
                                    }`}>
                                        {step}
                                    </div>
                                    {step < 4 && (
                                        <div className={`w-16 h-1 ml-4 ${
                                            currentStep > step ? 'bg-green-600' : 'bg-gray-300'
                                        }`}></div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center space-x-8 mt-4">
                            <span className="text-sm font-medium text-gray-600">Owner Info</span>
                            <span className="text-sm font-medium text-gray-600 ml-8">Car Details</span>
                            <span className="text-sm font-medium text-gray-600 ml-8">Pricing</span>
                            <span className="text-sm font-medium text-gray-600 ml-8">Photos</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
                        {/* Step 1: Owner Information */}
                        {currentStep === 1 && (
                            <div>
                                <h2 className="text-2xl font-bold text-black mb-6">Owner Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                        <input
                                            type="text"
                                            name="ownerName"
                                            value={formData.ownerName}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                                        <select
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        >
                                            <option value="">Select State</option>
                                            <option value="Lagos">Lagos</option>
                                            <option value="Abuja">Abuja</option>
                                            <option value="Kano">Kano</option>
                                            <option value="Rivers">Rivers</option>
                                            <option value="Oyo">Oyo</option>
                                            {/* Add more states */}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Car Details */}
                        {currentStep === 2 && (
                            <div>
                                <h2 className="text-2xl font-bold text-black mb-6">Car Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Car Make *</label>
                                        <input
                                            type="text"
                                            name="carMake"
                                            value={formData.carMake}
                                            onChange={handleInputChange}
                                            placeholder="e.g., Toyota"
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Car Model *</label>
                                        <input
                                            type="text"
                                            name="carModel"
                                            value={formData.carModel}
                                            onChange={handleInputChange}
                                            placeholder="e.g., Camry"
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Year *</label>
                                        <input
                                            type="number"
                                            name="carYear"
                                            value={formData.carYear}
                                            onChange={handleInputChange}
                                            min="2000"
                                            max="2025"
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">License Plate *</label>
                                        <input
                                            type="text"
                                            name="licensePlate"
                                            value={formData.licensePlate}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Color *</label>
                                        <input
                                            type="text"
                                            name="color"
                                            value={formData.color}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Mileage (km) *</label>
                                        <input
                                            type="number"
                                            name="mileage"
                                            value={formData.mileage}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Transmission *</label>
                                        <select
                                            name="transmission"
                                            value={formData.transmission}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        >
                                            <option value="">Select Transmission</option>
                                            <option value="Automatic">Automatic</option>
                                            <option value="Manual">Manual</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type *</label>
                                        <select
                                            name="fuelType"
                                            value={formData.fuelType}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        >
                                            <option value="">Select Fuel Type</option>
                                            <option value="Petrol">Petrol</option>
                                            <option value="Diesel">Diesel</option>
                                            <option value="Hybrid">Hybrid</option>
                                            <option value="Electric">Electric</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Number of Seats *</label>
                                        <select
                                            name="seats"
                                            value={formData.seats}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        >
                                            <option value="">Select Seats</option>
                                            <option value="2">2 Seats</option>
                                            <option value="4">4 Seats</option>
                                            <option value="5">5 Seats</option>
                                            <option value="7">7 Seats</option>
                                            <option value="8+">8+ Seats</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        >
                                            <option value="">Select Category</option>
                                            <option value="Economy">Economy</option>
                                            <option value="Luxury">Luxury</option>
                                            <option value="SUV">SUV</option>
                                            <option value="Truck">Truck</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Car Features</label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {carFeatures.map((feature) => (
                                            <label key={feature} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.features.includes(feature)}
                                                    onChange={() => handleFeatureChange(feature)}
                                                    className="mr-2 text-green-600 focus:ring-green-500"
                                                />
                                                <span className="text-sm text-gray-700">{feature}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows="4"
                                        placeholder="Describe your car's condition, special features, or any additional information..."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    ></textarea>
                                </div>

                                <div className="mt-6 space-y-4">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="insuranceValid"
                                            checked={formData.insuranceValid}
                                            onChange={handleInputChange}
                                            required
                                            className="mr-2 text-green-600 focus:ring-green-500"
                                        />
                                        <span className="text-sm text-gray-700">I confirm that my car has valid insurance *</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="roadWorthyValid"
                                            checked={formData.roadWorthyValid}
                                            onChange={handleInputChange}
                                            required
                                            className="mr-2 text-green-600 focus:ring-green-500"
                                        />
                                        <span className="text-sm text-gray-700">I confirm that my car has valid road worthiness certificate *</span>
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Pricing & Availability */}
                        {currentStep === 3 && (
                            <div>
                                <h2 className="text-2xl font-bold text-black mb-6">Pricing & Availability</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Daily Rate (₦) *</label>
                                        <input
                                            type="number"
                                            name="dailyRate"
                                            value={formData.dailyRate}
                                            onChange={handleInputChange}
                                            min="0"
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Weekly Rate (₦)</label>
                                        <input
                                            type="number"
                                            name="weeklyRate"
                                            value={formData.weeklyRate}
                                            onChange={handleInputChange}
                                            min="0"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Rate (₦)</label>
                                        <input
                                            type="number"
                                            name="monthlyRate"
                                            value={formData.monthlyRate}
                                            onChange={handleInputChange}
                                            min="0"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Availability *</label>
                                    <select
                                        name="availability"
                                        value={formData.availability}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    >
                                        <option value="">Select Availability</option>
                                        <option value="Always Available">Always Available</option>
                                        <option value="Weekdays Only">Weekdays Only</option>
                                        <option value="Weekends Only">Weekends Only</option>
                                        <option value="Custom Schedule">Custom Schedule</option>
                                    </select>
                                </div>

                                <div className="mt-6">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="deliveryOption"
                                            checked={formData.deliveryOption}
                                            onChange={handleInputChange}
                                            className="mr-2 text-green-600 focus:ring-green-500"
                                        />
                                        <span className="text-sm text-gray-700">I offer car delivery service (additional charges may apply)</span>
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Photos */}
                        {currentStep === 4 && (
                            <div>
                                <h2 className="text-2xl font-bold text-black mb-6">Car Photos</h2>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Upload Photos of Your Car * (Minimum 1 photo required)
                                    </label>
                                    <p className="text-sm text-gray-500 mb-4">
                                        Include exterior, interior, engine bay, and any damage photos. High-quality photos increase booking chances.
                                    </p>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>

                                {formData.images.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-700 mb-4">Uploaded Photos ({formData.images.length})</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {formData.images.map((image, index) => (
                                                <div key={index} className="relative">
                                                    <img
                                                        src={URL.createObjectURL(image)}
                                                        alt={`Car photo ${index + 1}`}
                                                        className="w-full h-32 object-cover rounded-lg"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(index)}
                                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-8">
                            {currentStep > 1 && (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Previous
                                </button>
                            )}
                            
                            {currentStep < 4 ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="ml-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={isSubmitting || formData.images.length < 1}
                                    className="ml-auto px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit for Approval'}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </section>
            
            {/* Footer */}
            <Footer />
        </div>
    );
}
