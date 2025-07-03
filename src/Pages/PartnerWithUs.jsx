import Drive from '../assets/drive.png';
import an from '../assets/an.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../utils/auth.js';
import Footer from '../components/Footer';

export default function PartnerWithUs() {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
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
                                <Link to="/partner-with-us" className="group relative flex items-center px-3 py-2 text-sm font-semibold rounded-md transition-all duration-200 bg-green-600 text-white shadow-sm" title="Partner with us">
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
                                <Link to="/" className="block px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md">Home</Link>
                                <Link to="/solutions" className="block px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md">Solutions</Link>
                                <Link to="/rent-cars" className="block px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md">Rent a Car</Link>
                                <Link to="/list-your-car" className="block px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md">List Your Car</Link>
                                <Link to="/my-requests" className="block px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md">My Requests</Link>
                                <Link to="/partner-with-us" className="flex items-center px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md border-l-4 border-green-500">
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Partner with us
                                </Link>
                                <Link to="/contact-us" className="block px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md">Contact Us</Link>
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

            <section className="py-10 sm:py-16 lg:py-24">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl">
                            Partner
                            <div className="relative inline-flex ml-4">
                                <span className="absolute inset-x-0 bottom-0 border-b-[30px] border-gray-400"></span>
                                <span className="relative text-4xl font-bold text-black sm:text-6xl lg:text-7xl">With Us</span>
                            </div>
                        </h1>
                        <p className="mt-8 text-base text-gray-700 sm:text-xl max-w-3xl mx-auto">
                            Own a car? Turn it into a source of income! Join Accelerate Nigeria and rent out your vehicle to trusted customers across the country.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-black mb-8">Why List Your Car With Us?</h2>
                            
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center mr-4">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-black mb-2">Earn Extra Income</h3>
                                        <p className="text-gray-600">Turn your idle car into a money-making asset. Earn up to ₦50,000 monthly by renting out your vehicle.</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center mr-4">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-black mb-2">Safe & Secure</h3>
                                        <p className="text-gray-600">All renters are verified and insured. Your car is protected with comprehensive coverage during rentals.</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center mr-4">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-black mb-2">Flexible Control</h3>
                                        <p className="text-gray-600">Set your own rental rates, availability, and rental requirements. You're in complete control of your listing.</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center mr-4">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-black mb-2">24/7 Support</h3>
                                        <p className="text-gray-600">Our dedicated support team is available round the clock to assist you with any issues or questions.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <img className="w-full rounded-lg shadow-lg" src={Drive} alt="Partnership" />
                        </div>
                    </div>

                    {/* Car Categories */}
                    <div className="mt-20">
                        <h2 className="text-3xl font-bold text-black text-center mb-12">What Types of Cars Can You List?</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-black mb-4">Economy Cars</h3>
                                <p className="text-gray-600 mb-6">
                                    Perfect for daily commuting and budget-conscious renters. Toyota Corolla, Honda Civic, etc.
                                </p>
                                <div className="text-gray-600 font-semibold">
                                    ₦8,000 - ₦15,000/day
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-black mb-4">Luxury Cars</h3>
                                <p className="text-gray-600 mb-6">
                                    High-end vehicles for special occasions and premium experiences. BMW, Mercedes, Audi, etc.
                                </p>
                                <div className="text-gray-600 font-semibold">
                                    ₦25,000 - ₦50,000/day
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-black mb-4">SUVs & Trucks</h3>
                                <p className="text-gray-600 mb-6">
                                    Perfect for families and group travel. Toyota Prado, Ford Explorer, Hilux, etc.
                                </p>
                                <div className="text-gray-600 font-semibold">
                                    ₦18,000 - ₦35,000/day
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="mt-20 text-center">
                        <div className="bg-white rounded-lg shadow-lg p-12">
                            <h2 className="text-3xl font-bold text-black mb-4">Ready to Start Earning?</h2>
                            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                                List your car today and start earning passive income. Join thousands of car owners already making money on our platform.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/list-your-car" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gray-700 rounded-lg hover:bg-gray-800 transition-colors">
                                    List Your Car Now
                                </Link>
                                <a href="#" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-gray-700 border-2 border-gray-700 rounded-lg hover:bg-gray-700 hover:text-white transition-colors">
                                    Download Host Guide
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* How it Works */}
                    <div className="mt-20">
                        <h2 className="text-3xl font-bold text-black text-center mb-12">How It Works</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-2xl font-bold text-white">1</span>
                                </div>
                                <h3 className="text-xl font-semibold text-black mb-4">List Your Car</h3>
                                <p className="text-gray-600">
                                    Upload photos, set your price, and provide car details. Our team will verify and approve your listing.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-2xl font-bold text-white">2</span>
                                </div>
                                <h3 className="text-xl font-semibold text-black mb-4">Get Bookings</h3>
                                <p className="text-gray-600">
                                    Receive booking requests from verified customers. Accept or decline based on your availability.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-2xl font-bold text-white">3</span>
                                </div>
                                <h3 className="text-xl font-semibold text-black mb-4">Earn Money</h3>
                                <p className="text-gray-600">
                                    Hand over your car and get paid instantly. Track your earnings and manage bookings through our platform.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
