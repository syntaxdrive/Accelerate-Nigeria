import Drive from '../assets/drive.png';
import an from '../assets/an.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../utils/auth.js';
import Footer from '../components/Footer';

export default function ContactUs() {
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
                                <Link to="/partner-with-us" className="group flex items-center px-3 py-2 text-sm font-semibold rounded-md transition-all duration-200 text-gray-600 hover:text-gray-800 hover:bg-gray-100" title="Partner with us">
                                    <div className="flex flex-col items-center space-y-1">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <span className="text-xs hidden xl:block">Partner</span>
                                    </div>
                                </Link>
                                <Link to="/contact-us" className="group relative flex items-center px-3 py-2 text-sm font-semibold rounded-md transition-all duration-200 bg-green-600 text-white shadow-sm" title="Contact Us">
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
                                <Link to="/partner-with-us" className="block px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md">Partner with us</Link>
                                <Link to="/contact-us" className="flex items-center px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md border-l-4 border-green-500">
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

            <section className="py-10 sm:py-16 lg:py-24">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl">
                            Contact
                            <div className="relative inline-flex ml-4">
                                <span className="absolute inset-x-0 bottom-0 border-b-[30px] border-gray-400"></span>
                                <span className="relative text-4xl font-bold text-black sm:text-6xl lg:text-7xl">Us</span>
                            </div>
                        </h1>
                        <p className="mt-8 text-base text-gray-700 sm:text-xl max-w-3xl mx-auto">
                            Ready to accelerate your journey with us? Get in touch and let's discuss how we can work together to drive Nigeria's growth.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Contact Form */}
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-black mb-6">Send us a message</h2>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                                        placeholder="+234 XXX XXX XXXX"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="partnership">Partnership Inquiry</option>
                                        <option value="solutions">Solutions Information</option>
                                        <option value="support">Technical Support</option>
                                        <option value="general">General Inquiry</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="5"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-vertical"
                                        placeholder="Tell us more about your inquiry..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full px-6 py-4 text-base font-semibold text-white bg-gray-700 rounded-lg hover:bg-gray-800 transition-colors duration-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div className="bg-white rounded-lg shadow-lg p-8">
                                <h2 className="text-2xl font-bold text-black mb-6">Get in touch</h2>
                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-black mb-1">Our Office</h3>
                                            <p className="text-gray-600">
                                                123 Accelerate Street<br />
                                                Victoria Island, Lagos<br />
                                                Nigeria
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-black mb-1">Phone</h3>
                                            <p className="text-gray-600">
                                                +234 XXX XXX XXXX<br />
                                                +234 XXX XXX XXXX
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-black mb-1">Email</h3>
                                            <p className="text-gray-600">
                                                info@acceleratenigeria.com<br />
                                                partnerships@acceleratenigeria.com
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-black mb-1">Follow us</h3>
                                            <p className="text-gray-600">
                                                <Link to="#" className="hover:text-gray-800 transition-colors">Facebook</Link>, 
                                                <Link to="#" className="hover:text-gray-800 transition-colors"> Twitter</Link>, 
                                                <Link to="#" className="hover:text-gray-800 transition-colors"> LinkedIn</Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-lg p-8">
                                <h2 className="text-2xl font-bold text-black mb-6">Business Hours</h2>
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Monday - Friday:</span>
                                        <span className="text-black">9:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Saturday:</span>
                                        <span className="text-black">10:00 AM - 4:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Sunday:</span>
                                        <span className="text-black">Closed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}
