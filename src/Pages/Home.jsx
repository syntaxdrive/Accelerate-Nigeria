import Drive from '../assets/drive.png';
import an from '../assets/an.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../utils/auth.js';
import Footer from '../components/Footer';

export default function Home() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsMobileMenuOpen(false);
    };

    return(

        <div className="bg-gradient-to-b from-green-50 to-green-100">
    <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="px-4 mx-auto sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20">
                <div className="flex-shrink-0">
                    <Link to="/" title="" className="flex">
                        <img className="w-auto h-40 pt-10" src={an} alt="" />
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
                        <Link to="/" className="group relative flex items-center px-3 py-2 text-sm font-semibold rounded-md transition-all duration-200 bg-green-600 text-white shadow-sm" title="Home">
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
                        <div className="flex items-center space-x-3">
                            <Link to="/login" className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-green-600 border-2 border-green-600 hover:bg-green-600 hover:text-white transition-all duration-200 rounded-lg">Login</Link>
                            <Link to="/register" className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-white bg-green-600 hover:bg-green-700 transition-all duration-200 rounded-lg">Register</Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                        <Link to="/" className="flex items-center px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md border-l-4 border-green-500">
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
                                <div className="space-y-2">
                                    <div className="px-3 py-2 text-sm text-gray-600">Welcome, {user?.name?.split(' ')[0] || 'User'}</div>
                                    <button 
                                        onClick={handleLogout}
                                        className="block w-full text-left px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <Link to="/login" className="block px-3 py-2 text-base font-medium text-green-600 hover:bg-gray-100 rounded-md">Login</Link>
                                    <Link to="/register" className="block px-3 py-2 text-base font-medium text-white bg-green-600 hover:bg-green-700 rounded-md">Register</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    </header>

    <section className="py-10 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
                <div>
                    <h1 className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl">
                        Collaborate remotely, with
                        <div className="relative inline-flex">
                            <span className="absolute inset-x-0 bottom-0 border-b-[30px] border-[#4ADE80]"></span>
                            <h1 className="relative text-4xl font-bold text-black sm:text-6xl lg:text-7xl">Accelerate Nigeria.</h1>
                        </div>
                    </h1>

                    <p className="mt-8 text-base text-black sm:text-xl">Experience the freedom of mobility with Nigeria's premier car rental platform. Whether you need a car for business, vacation, or daily commute, we've got you covered with our extensive fleet of well-maintained vehicles.</p>

                    <div className="mt-10 sm:flex sm:items-center sm:space-x-8">
                    <Link to="/rent-cars" className="inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-white transition-all duration-200 bg-green-600 hover:bg-green-700 focus:bg-green-700 rounded-lg" role="button"> Browse Cars </Link>

                        <a href="#" title="" className="inline-flex items-center mt-6 text-base font-semibold transition-all duration-200 sm:mt-0 hover:opacity-80">
                            <svg className="w-10 h-10 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path fill="#059669" stroke="#059669" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            How It Works
                        </a>
                    </div>
                </div>

                <div>
                    <img className="w-full" src={Drive} alt="" />
                </div>
            </div>
        </div>
    </section>

    {/* Stats Section */}
    <section className="py-10 sm:py-16 lg:py-24 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-black sm:text-4xl lg:text-5xl">
                    Trusted by Thousands
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                    Our numbers speak for themselves
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
                <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
                    <div className="text-gray-600">Cars Available</div>
                </div>
                <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">10,000+</div>
                    <div className="text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">25+</div>
                    <div className="text-gray-600">Cities Covered</div>
                </div>
                <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">99%</div>
                    <div className="text-gray-600">Customer Satisfaction</div>
                </div>
            </div>
        </div>
    </section>

    {/* Features Section */}
    <section className="py-10 sm:py-16 lg:py-24 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-black sm:text-4xl lg:text-5xl">
                    Why Choose Accelerate Nigeria?
                </h2>
                <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                    We make car rental simple, safe, and affordable for everyone across Nigeria
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-black mb-4">Verified Vehicles</h3>
                    <p className="text-gray-600">
                        All our vehicles undergo thorough inspection and maintenance to ensure your safety and comfort.
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-black mb-4">24/7 Support</h3>
                    <p className="text-gray-600">
                        Our customer support team is available round the clock to assist you whenever you need help.
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-black mb-4">Nationwide Coverage</h3>
                    <p className="text-gray-600">
                        Rent cars in over 25 cities across Nigeria with convenient pickup and drop-off locations.
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-black mb-4">Secure Booking</h3>
                    <p className="text-gray-600">
                        Your personal and payment information is protected with bank-level security measures.
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-black mb-4">Affordable Rates</h3>
                    <p className="text-gray-600">
                        Competitive pricing with no hidden fees. Pay exactly what you see during booking.
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-black mb-4">Instant Booking</h3>
                    <p className="text-gray-600">
                        Book your car in minutes with our easy-to-use platform. Get instant confirmation and keys.
                    </p>
                </div>
            </div>
        </div>
    </section>

    {/* About Section */}
    <section className="py-10 sm:py-16 lg:py-24 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-3xl font-bold text-black sm:text-4xl lg:text-5xl mb-8">
                        About Accelerate Nigeria
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                        Founded in 2020, Accelerate Nigeria was born from a simple vision: to revolutionize transportation in Nigeria by making quality vehicles accessible to everyone, everywhere.
                    </p>
                    <p className="text-lg text-gray-600 mb-6">
                        Our founders, Adebayo Ogundimu and Kemi Adesanya, noticed the challenges Nigerians faced in accessing reliable transportation. With backgrounds in technology and automotive industries, they combined their expertise to create a platform that connects car owners with people who need reliable vehicles.
                    </p>
                    <p className="text-lg text-gray-600 mb-8">
                        Today, we're proud to serve thousands of customers across Nigeria, providing them with safe, affordable, and convenient car rental solutions while helping car owners generate additional income.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-lg font-semibold text-black mb-2">Our Mission</h4>
                            <p className="text-gray-600">To democratize access to transportation and empower Nigerians with mobility solutions.</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-black mb-2">Our Vision</h4>
                            <p className="text-gray-600">To become Africa's leading car-sharing platform, connecting communities through shared mobility.</p>
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                        <img className="w-full rounded-lg shadow-lg" src={Drive} alt="Our team" />
                        <div className="bg-green-50 p-6 rounded-lg">
                            <h4 className="font-semibold text-black mb-2">Adebayo Ogundimu</h4>
                            <p className="text-sm text-gray-600">Co-Founder & CEO</p>
                            <p className="text-sm text-gray-600 mt-2">Former Tesla engineer with 10+ years in automotive technology.</p>
                        </div>
                    </div>
                    <div className="space-y-4 mt-8">
                        <div className="bg-green-50 p-6 rounded-lg">
                            <h4 className="font-semibold text-black mb-2">Kemi Adesanya</h4>
                            <p className="text-sm text-gray-600">Co-Founder & CTO</p>
                            <p className="text-sm text-gray-600 mt-2">Tech entrepreneur and former Uber Nigeria operations lead.</p>
                        </div>
                        <img className="w-full rounded-lg shadow-lg" src={Drive} alt="Our impact" />
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Testimonials Section */}
    <section className="py-10 sm:py-16 lg:py-24 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-black sm:text-4xl lg:text-5xl">
                    What Our Customers Say
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                    Don't just take our word for it - hear from our satisfied customers
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="flex items-center mb-6">
                        <div className="flex text-yellow-400">
                            ★★★★★
                        </div>
                    </div>
                    <p className="text-gray-600 mb-6">
                        "Accelerate Nigeria saved my business trip! I needed a reliable car in Lagos on short notice, and they delivered exactly what I needed. The booking process was seamless."
                    </p>
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                            <span className="text-green-600 font-semibold">OA</span>
                        </div>
                        <div>
                            <h4 className="font-semibold text-black">Olumide Adebayo</h4>
                            <p className="text-gray-500 text-sm">Business Executive, Lagos</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="flex items-center mb-6">
                        <div className="flex text-yellow-400">
                            ★★★★★
                        </div>
                    </div>
                    <p className="text-gray-600 mb-6">
                        "As a car owner, listing my vehicle on Accelerate Nigeria has been incredibly profitable. I earn extra income while helping others, and the platform handles everything professionally."
                    </p>
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                            <span className="text-green-600 font-semibold">FU</span>
                        </div>
                        <div>
                            <h4 className="font-semibold text-black">Fatima Usman</h4>
                            <p className="text-gray-500 text-sm">Car Owner, Abuja</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="flex items-center mb-6">
                        <div className="flex text-yellow-400">
                            ★★★★★
                        </div>
                    </div>
                    <p className="text-gray-600 mb-6">
                        "Perfect for family trips! We rented an SUV for our vacation to Calabar. The car was clean, well-maintained, and the customer service was outstanding throughout our journey."
                    </p>
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                            <span className="text-green-600 font-semibold">CE</span>
                        </div>
                        <div>
                            <h4 className="font-semibold text-black">Chidi Ezekiel</h4>
                            <p className="text-gray-500 text-sm">Family Traveler, Port Harcourt</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* How It Works Section */}
    <section className="py-10 sm:py-16 lg:py-24 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-black sm:text-4xl lg:text-5xl">
                    How It Works
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                    Rent a car in 3 simple steps
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                    <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-2xl font-bold text-white">1</span>
                    </div>
                    <h3 className="text-xl font-semibold text-black mb-4">Choose Your Car</h3>
                    <p className="text-gray-600">
                        Browse our extensive fleet of vehicles. Filter by location, price, car type, and features to find the perfect match for your needs.
                    </p>
                </div>
                
                <div className="text-center">
                    <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-2xl font-bold text-white">2</span>
                    </div>
                    <h3 className="text-xl font-semibold text-black mb-4">Book & Pay</h3>
                    <p className="text-gray-600">
                        Select your rental dates, review the details, and complete your booking with our secure payment system. Get instant confirmation.
                    </p>
                </div>
                
                <div className="text-center">
                    <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-2xl font-bold text-white">3</span>
                    </div>
                    <h3 className="text-xl font-semibold text-black mb-4">Pick Up & Drive</h3>
                    <p className="text-gray-600">
                        Meet the car owner at the designated location, complete a quick inspection, and you're ready to hit the road!
                    </p>
                </div>
            </div>
        </div>
    </section>

    {/* CTA Section */}
    <section className="py-10 sm:py-16 lg:py-24 bg-green-600">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                    Ready to Get Started?
                </h2>
                <p className="mt-4 text-lg text-green-100 max-w-3xl mx-auto">
                    Join thousands of satisfied customers who trust Accelerate Nigeria for their transportation needs.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/rent-cars" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-green-600 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                        Rent a Car Now
                    </Link>
                    <Link to="/list-your-car" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white border-2 border-white rounded-lg hover:bg-white hover:text-green-600 transition-colors">
                        List Your Car
                    </Link>
                </div>
            </div>
        </div>
    </section>

    <Footer />
</div>

    )
}