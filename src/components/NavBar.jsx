import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/auth';
import an from '../assets/an.png'; 

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        // redirect to home page
        window.location.href = '/';
    };

    const isActivePage = (path) => {
        return location.pathname === path;
    };

    const navItems = [
        { path: '/', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { path: '/solutions', label: 'Solutions', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
        { path: '/rent-cars', label: 'Rent', icon: 'M19 14l-7 7m0 0l-7-7m7 7V3' },
        { path: '/list-your-car', label: 'List', icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6' },
        { path: '/partner-with-us', label: 'Partner', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
        { path: '/contact-us', label: 'Contact', icon: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' }
    ];


    const allNavItems = [...navItems];

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            <div className="px-4 mx-auto sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" title="" className="flex">
                            <img className="w-auto h-25 pt-5" src={an} alt="Accelerate Nigeria" />
                        </Link>
                    </div>

                    {/* Mobile menu button */}
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

                    {/* Desktop navigation */}
                    <div className="hidden ml-auto lg:flex lg:items-center lg:space-x-1">
                        <div className="flex items-center space-x-1 bg-white p-1 rounded-lg shadow-sm mr-4">
                            {allNavItems.map((item) => (
                                <Link 
                                    key={item.path}
                                    to={item.path} 
                                    className={`group flex items-center px-3 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${
                                        isActivePage(item.path)
                                            ? 'bg-green-600 text-white shadow-sm'
                                            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                                    }`}
                                    title={item.label}
                                >
                                    <div className="flex flex-col items-center space-y-1">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                                        </svg>
                                        <span className="text-xs hidden xl:block">{item.label}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Divider */}
                        <div className="w-px h-5 bg-black/20"></div>

                        {/* Auth section */}
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-600">
                                    Welcome, {user?.name?.split(' ')[0] || 'User'}
                                </span>
                                <button 
                                    onClick={handleLogout}
                                    className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-black border-2 border-black hover:bg-black hover:text-white transition-all duration-200 focus:bg-black focus:text-white rounded-lg"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link 
                                to="/register" 
                                className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-black border-2 border-black hover:bg-black hover:text-white transition-all duration-200 focus:bg-black focus:text-white rounded-lg"
                            >
                                Register
                            </Link>
                        )}
                    </div>
                </div>

                {/* Mobile navigation */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                            {allNavItems.map((item) => (
                                <Link 
                                    key={item.path}
                                    to={item.path} 
                                    className={`flex items-center px-3 py-2 text-base font-medium rounded-md ${
                                        isActivePage(item.path)
                                            ? 'text-black bg-gray-100 border-l-4 border-green-500'
                                            : 'text-black hover:bg-gray-100'
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                                    </svg>
                                    {item.label === 'Rent' ? 'Rent a Car' : 
                                     item.label === 'List' ? 'List Your Car' : 
                                     item.label === 'Partner' ? 'Partner with us' : 
                                     item.label === 'Contact' ? 'Contact Us' : item.label}
    
                                </Link>
                            ))}
                            
                            {/* Mobile auth section */}
                            <div className="border-t border-gray-200 pt-2 mt-2">
                                {isAuthenticated ? (
                                    <>
                                        <div className="px-3 py-2 text-sm text-gray-600">
                                            Welcome, {user?.name?.split(' ')[0] || 'User'}
                                        </div>
                                        <button 
                                            onClick={handleLogout}
                                            className="block w-full text-left px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <Link 
                                        to="/register" 
                                        className="block px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Register
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;