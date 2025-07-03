import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import an from '../assets/an.png';
import { useAuth } from '../utils/auth.js';
import Footer from '../components/Footer';
import ErrorBoundary from '../components/ErrorBoundary';

export default function MyRequests() {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    
    const [userRequests, setUserRequests] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [activeTab, setActiveTab] = useState('requests'); // 'requests' or 'messages'
    const [userMessage, setUserMessage] = useState('');

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Load user's requests from localStorage
    useEffect(() => {
        const loadUserRequests = () => {
            const allRequests = JSON.parse(localStorage.getItem('rentalRequests') || '[]');
            
            // Filter requests for this user (car listings or rental requests)
            const userFilteredRequests = allRequests.filter(request => {
                if (request.type === 'car_listing') {
                    return request.owner.phone === user?.phone || request.owner.email === user?.email;
                } else {
                    return request.renterPhone === user?.phone || request.renterEmail === user?.email;
                }
            });
            
            setUserRequests(userFilteredRequests);
        };

        if (isAuthenticated && user) {
            loadUserRequests();
            
            // Auto-refresh every 5 seconds
            const interval = setInterval(loadUserRequests, 5000);
            return () => clearInterval(interval);
        }
    }, [user, isAuthenticated]);

    // Calculate unread messages count
    const unreadMessages = userRequests.reduce((count, request) => {
        if (request.messages) {
            const unreadAdminMessages = request.messages.filter(
                msg => msg.sender === 'admin' && !msg.read
            ).length;
            return count + unreadAdminMessages;
        }
        return count;
    }, 0);

    // Filter requests based on status
    const filteredRequests = userRequests.filter(request => {
        if (activeFilter === 'all') return true;
        return request.status === activeFilter;
    });

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            approved: 'bg-green-100 text-green-800 border-green-200',
            denied: 'bg-red-100 text-red-800 border-red-200',
            cancelled: 'bg-gray-100 text-gray-800 border-gray-200'
        };
        return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return (
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case 'approved':
                return (
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case 'denied':
                return (
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            default:
                return (
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
        }
    };

    // Format date
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Function to handle user response to admin
    const handleSubmitResponse = (requestId) => {
        if (!userMessage.trim()) {
            alert('Please enter a message');
            return;
        }

        // Get all requests from localStorage
        const allRequests = JSON.parse(localStorage.getItem('rentalRequests') || '[]');
        
        // Find the specific request
        const updatedRequests = allRequests.map(req => {
            if (req.id === requestId) {
                // Create or update the messages array
                const messages = req.messages || [];
                messages.push({
                    sender: 'user',
                    message: userMessage,
                    timestamp: new Date().toISOString(),
                    read: false
                });
                
                return { 
                    ...req, 
                    messages,
                    hasUnreadUserMessages: true // Flag for admin to see there's a new message
                };
            }
            return req;
        });
        
        // Save back to localStorage
        localStorage.setItem('rentalRequests', JSON.stringify(updatedRequests));
        
        // Update state
        const userFilteredRequests = updatedRequests.filter(request => {
            if (request.type === 'car_listing') {
                return request.owner.phone === user?.phone || request.owner.email === user?.email;
            } else {
                return request.renterPhone === user?.phone || request.renterEmail === user?.email;
            }
        });
        
        setUserRequests(userFilteredRequests);
        
        // If currently viewing a request, update that view with the latest data
        if (selectedRequest && selectedRequest.id === requestId) {
            const updatedRequest = updatedRequests.find(r => r.id === requestId);
            setSelectedRequest(updatedRequest);
        }
        
        // Clear the input
        setUserMessage('');
        
        // Show a more subtle notification instead of an alert
        const messageElement = document.createElement('div');
        messageElement.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg';
        messageElement.textContent = 'Message sent successfully';
        document.body.appendChild(messageElement);
        
        // Remove the notification after 3 seconds
        setTimeout(() => {
            document.body.removeChild(messageElement);
        }, 3000);
    };

    const handleCancelRequest = (requestId) => {
        if (window.confirm('Are you sure you want to cancel this request?')) {
            const allRequests = JSON.parse(localStorage.getItem('rentalRequests') || '[]');
            const updatedRequests = allRequests.map(request => 
                request.id === requestId 
                    ? { ...request, status: 'cancelled', cancelledDate: new Date().toISOString() }
                    : request
            );
            localStorage.setItem('rentalRequests', JSON.stringify(updatedRequests));
            
            // Update local state
            setUserRequests(prev => prev.map(request => 
                request.id === requestId 
                    ? { ...request, status: 'cancelled', cancelledDate: new Date().toISOString() }
                    : request
            ));
            
            alert('Request cancelled successfully!');
        }
    };

    // Function to mark admin messages as read when user views the request
    const markAdminMessagesAsRead = (requestId) => {
        // Get all requests from localStorage
        const allRequests = JSON.parse(localStorage.getItem('rentalRequests') || '[]');
        
        // Find the specific request and update its messages
        const updatedRequests = allRequests.map(req => {
            if (req.id === requestId) {
                // If there are messages and the request has unread admin messages
                if (req.messages && req.hasUnreadAdminMessages) {
                    // Mark all admin messages as read
                    const updatedMessages = req.messages.map(msg => {
                        if (msg.sender === 'admin' && !msg.read) {
                            return { ...msg, read: true };
                        }
                        return msg;
                    });
                    
                    return { 
                        ...req, 
                        messages: updatedMessages,
                        hasUnreadAdminMessages: false // Remove the unread flag
                    };
                }
            }
            return req;
        });
        
        // Save back to localStorage
        localStorage.setItem('rentalRequests', JSON.stringify(updatedRequests));
        
        // Update state
        const userFilteredRequests = updatedRequests.filter(request => {
            if (request.type === 'car_listing') {
                return request.owner.phone === user?.phone || request.owner.email === user?.email;
            } else {
                return request.renterPhone === user?.phone || request.renterEmail === user?.email;
            }
        });
        
        setUserRequests(userFilteredRequests);
    };

    return (
        <ErrorBoundary>
            <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
            {/* Header */}
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
                                <Link to="/my-requests" className="group relative flex items-center px-3 py-2 text-sm font-semibold rounded-md transition-all duration-200 bg-green-600 text-white shadow-sm" title="My Requests">
                                    <div className="flex flex-col items-center space-y-1">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                        </svg>
                                        <span className="text-xs hidden xl:block">Requests</span>
                                    </div>
                                    {/* Unread messages indicator */}
                                    {unreadMessages > 0 && (
                                        <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                                            {unreadMessages}
                                        </span>
                                    )}
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
                            <div className="w-px h-5 bg-black/20"></div>
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-600">Welcome, {user?.name?.split(' ')[0] || 'User'}</span>
                                <button 
                                    onClick={handleLogout}
                                    className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-black border-2 border-black hover:bg-black hover:text-white transition-all duration-200 focus:bg-black focus:text-white rounded-lg"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile menu */}
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
                                <Link to="/list-your-car" className="flex items-center px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md">
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    List Your Car
                                </Link>
                                <Link to="/my-requests" className="flex items-center px-3 py-2 text-base font-medium text-black bg-gray-100 rounded-md border-l-4 border-green-500">
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                    My Requests
                                    {unreadMessages > 0 && (
                                        <span className="ml-auto px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                                            {unreadMessages}
                                        </span>
                                    )}
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
                                <div className="border-t border-gray-200 pt-2 mt-2">
                                    <div className="px-3 py-2 text-sm text-gray-600">Welcome, {user?.name?.split(' ')[0] || 'User'}</div>
                                    <button 
                                        onClick={handleLogout}
                                        className="block w-full text-left px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <div className="px-4 mx-auto sm:px-6 lg:px-8 py-8">
                <div className="max-w-7xl mx-auto">
                    {/* Page Header */}
                    <div className="mb-8">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">My Requests</h1>
                                <p className="text-gray-600">Track your car listing and rental requests</p>
                            </div>
                        </div>
                        
                        {/* Navigation Tabs */}
                        <div className="border-b border-gray-200 mb-6">
                            <nav className="flex -mb-px">
                                <button 
                                    onClick={() => setActiveTab('requests')} 
                                    className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                                        activeTab === 'requests'
                                            ? 'border-green-500 text-green-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                        Requests
                                    </div>
                                </button>
                                <button 
                                    onClick={() => setActiveTab('messages')} 
                                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                        activeTab === 'messages'
                                            ? 'border-green-500 text-green-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                        </svg>
                                        Messages
                                        {userRequests.some(req => req.hasUnreadAdminMessages) && (
                                            <span className="ml-2 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                                                New
                                            </span>
                                        )}
                                    </div>
                                </button>
                            </nav>
                        </div>

                    </div>

                    {activeTab === 'requests' && (
                        <>
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                {[
                                    { key: 'all', label: 'Total Requests', count: userRequests.length, color: 'bg-blue-50 text-blue-700 border-blue-200' },
                                    { key: 'pending', label: 'Pending', count: userRequests.filter(r => r.status === 'pending').length, color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
                                    { key: 'approved', label: 'Approved', count: userRequests.filter(r => r.status === 'approved').length, color: 'bg-green-50 text-green-700 border-green-200' },
                                    { key: 'denied', label: 'Denied', count: userRequests.filter(r => r.status === 'denied').length, color: 'bg-red-50 text-red-700 border-red-200' }
                                ].map(stat => (
                                    <button
                                        key={stat.key}
                                        onClick={() => setActiveFilter(stat.key)}
                                        className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                                            activeFilter === stat.key 
                                                ? stat.color + ' border-opacity-100 shadow-md' 
                                                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <div className="text-2xl font-bold">{stat.count}</div>
                                        <div className="text-sm font-medium">{stat.label}</div>
                                    </button>
                                ))}
                            </div>

                            {/* Requests List */}
                            {filteredRequests.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {activeFilter === 'all' ? 'No requests yet' : `No ${activeFilter} requests`}
                            </h3>
                            <p className="text-gray-600 mb-6">
                                {activeFilter === 'all' 
                                    ? 'You haven\'t submitted any requests yet. Start by listing your car or renting one!'
                                    : `You don't have any ${activeFilter} requests at the moment.`
                                }
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Link
                                    to="/list-your-car"
                                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                    List Your Car
                                </Link>
                                <Link
                                    to="/rent-cars"
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Rent a Car
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredRequests.map(request => (
                                <div key={request.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-start space-x-4">
                                                <div className="flex-shrink-0">
                                                    {getStatusIcon(request.status)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center space-x-3 mb-2">
                                                        <h3 className="text-lg font-semibold text-gray-900">
                                                            {request.car.year} {request.car.make} {request.car.model}
                                                        </h3>
                                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(request.status)}`}>
                                                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                                        </span>
                                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                                            request.type === 'car_listing' 
                                                                ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                                                                : 'bg-purple-100 text-purple-800 border border-purple-200'
                                                        }`}>
                                                            {request.type === 'car_listing' ? 'Car Listing' : 'Rental Request'}
                                                        </span>
                                                    </div>
                                                    
                                                    <div className="text-sm text-gray-600 space-y-1">
                                                        <div>Request ID: <span className="font-mono text-gray-800">{request.id}</span></div>
                                                        <div>Submitted: {formatDate(request.dateSubmitted)}</div>
                                                        {request.type === 'car_listing' ? (
                                                            <div>Daily Rate: ₦{request.pricing?.dailyRate?.toLocaleString()}</div>
                                                        ) : (
                                                            <div>
                                                                Rental Period: {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()} 
                                                                <span className="ml-2 text-gray-500">({request.totalDays} days)</span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {request.message && (
                                                        <div className={`mt-3 p-3 rounded-lg border ${
                                                            request.status === 'approved' 
                                                                ? 'bg-green-50 border-green-200 text-green-800'
                                                                : 'bg-red-50 border-red-200 text-red-800'
                                                        }`}>
                                                            <div className="text-sm font-medium mb-1">
                                                                {request.status === 'approved' ? 'Approval Message:' : 'Denial Reason:'}
                                                            </div>
                                                            <div className="text-sm">{request.message}</div>
                                                        </div>
                                                    )}

                                                    {/* Show if there are unread admin messages */}
                                                    {request.messages && request.hasUnreadAdminMessages && (
                                                        <div className="mt-2">
                                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200">
                                                                New message from admin
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col space-y-2 ml-4">
                                            <button
                                                onClick={() => {
                                                    markAdminMessagesAsRead(request.id);
                                                    setSelectedRequest(request);
                                                }}
                                                className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
                                            >
                                                View Details
                                            </button>
                                            {request.status === 'pending' && (
                                                <button
                                                    onClick={() => handleCancelRequest(request.id)}
                                                    className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
                                                >
                                                    Cancel Request
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                        </>
                    )}

                    {/* Messages Tab Content */}
                    {activeTab === 'messages' && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-medium text-gray-900">Your Conversations</h3>
                            {userRequests.filter(req => req.messages && req.messages.length > 0).length === 0 ? (
                                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        No messages yet
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        You don't have any message threads with admin at the moment.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {userRequests
                                        .filter(req => req.messages && req.messages.length > 0)
                                        .map(request => (
                                            <div key={request.id} 
                                                className={`bg-white rounded-lg shadow-sm border p-5 hover:shadow-md transition-shadow duration-200 
                                                    ${request.hasUnreadAdminMessages ? 'border-red-300' : 'border-gray-200'}`}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-3 mb-3">
                                                            <h3 className="text-base font-medium text-gray-900">
                                                                {request.car.year} {request.car.make} {request.car.model}
                                                            </h3>
                                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(request.status)}`}>
                                                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                                            </span>
                                                            {request.hasUnreadAdminMessages && (
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200">
                                                                    New message
                                                                </span>
                                                            )}
                                                        </div>
                                                        
                                                        {/* Preview of the most recent message */}
                                                        {request.messages && request.messages.length > 0 && (
                                                            <div className="text-sm text-gray-600">
                                                                <span className="font-medium">
                                                                    {request.messages[request.messages.length - 1].sender === 'admin' ? 'Admin' : 'You'}:
                                                                </span>{' '}
                                                                {request.messages[request.messages.length - 1].message.length > 60 
                                                                    ? request.messages[request.messages.length - 1].message.substring(0, 60) + '...' 
                                                                    : request.messages[request.messages.length - 1].message
                                                                }
                                                                <div className="text-xs text-gray-500 mt-1">
                                                                    {formatDate(request.messages[request.messages.length - 1].timestamp)}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <button
                                                        onClick={() => {
                                                            markAdminMessagesAsRead(request.id);
                                                            setSelectedRequest(request);
                                                        }}
                                                        className="ml-4 text-sm text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
                                                    >
                                                        View Conversation
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Request Details Modal */}
            {selectedRequest && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Request Details</h3>
                            <button
                                onClick={() => setSelectedRequest(null)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="border-b border-gray-200 pb-4">
                                <h4 className="font-semibold text-gray-900 mb-2">
                                    {selectedRequest.car.year} {selectedRequest.car.make} {selectedRequest.car.model}
                                </h4>
                                <div className="flex space-x-3">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(selectedRequest.status)}`}>
                                        {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                                    </span>
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                        selectedRequest.type === 'car_listing' 
                                            ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                                            : 'bg-purple-100 text-purple-800 border border-purple-200'
                                    }`}>
                                        {selectedRequest.type === 'car_listing' ? 'Car Listing' : 'Rental Request'}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="font-medium text-gray-600">Request ID:</span>
                                    <div className="font-mono text-gray-800">{selectedRequest.id}</div>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-600">Date Submitted:</span>
                                    <div>{formatDate(selectedRequest.dateSubmitted)}</div>
                                </div>
                                
                                {selectedRequest.type === 'car_listing' ? (
                                    <>
                                        <div>
                                            <span className="font-medium text-gray-600">Daily Rate:</span>
                                            <div>₦{selectedRequest.pricing?.dailyRate?.toLocaleString()}</div>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-600">License Plate:</span>
                                            <div>{selectedRequest.car.licensePlate}</div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <span className="font-medium text-gray-600">Rental Period:</span>
                                            <div>{new Date(selectedRequest.startDate).toLocaleDateString()} - {new Date(selectedRequest.endDate).toLocaleDateString()}</div>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-600">Total Amount:</span>
                                            <div>₦{selectedRequest.totalAmount?.toLocaleString()}</div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {selectedRequest.message && (
                                <div className={`p-3 rounded-lg border ${
                                    selectedRequest.status === 'approved' 
                                        ? 'bg-green-50 border-green-200'
                                        : 'bg-red-50 border-red-200'
                                }`}>
                                    <div className={`text-sm font-medium mb-1 ${
                                        selectedRequest.status === 'approved' ? 'text-green-800' : 'text-red-800'
                                    }`}>
                                        {selectedRequest.status === 'approved' ? 'Approval Message:' : 'Denial Reason:'}
                                    </div>
                                    <div className={`text-sm ${
                                        selectedRequest.status === 'approved' ? 'text-green-700' : 'text-red-700'
                                    }`}>
                                        {selectedRequest.message}
                                    </div>
                                </div>
                            )}
                            
                            {/* Messages section */}
                            {selectedRequest.messages && selectedRequest.messages.length > 0 && (
                                <div className="mt-6">
                                    <h4 className="text-base font-medium text-gray-800 mb-3">Messages</h4>
                                    <div className="border rounded-lg overflow-hidden bg-gray-50">
                                        <div className="max-h-64 overflow-y-auto p-3 space-y-3">
                                            {selectedRequest.messages.map((msg, index) => (
                                                <div 
                                                    key={index} 
                                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                                >
                                                    <div className={`max-w-[80%] rounded-lg p-3 ${
                                                        msg.sender === 'user' 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-white border border-gray-200 text-gray-800'
                                                    }`}>
                                                        <div className="text-xs font-medium mb-1">
                                                            {msg.sender === 'user' ? 'You' : 'Admin'}
                                                        </div>
                                                        <div className="text-sm">{msg.message}</div>
                                                        <div className="text-right text-xs text-gray-500 mt-1">
                                                            {formatDate(msg.timestamp)}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        
                                        {/* Reply form */}
                                        <div className="border-t p-3 bg-white">
                                            <div className="flex items-end space-x-2">
                                                <div className="flex-1">
                                                    <label htmlFor="messageInput" className="sr-only">Your message</label>
                                                    <textarea
                                                        id="messageInput"
                                                        rows="2"
                                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-green-500 focus:border-green-500 text-sm"
                                                        placeholder="Type your message here..."
                                                        value={userMessage}
                                                        onChange={(e) => setUserMessage(e.target.value)}
                                                    ></textarea>
                                                </div>
                                                <button
                                                    onClick={() => handleSubmitResponse(selectedRequest.id)}
                                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                >
                                                    Send
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {/* If no messages yet but we want to send one */}
                            {(!selectedRequest.messages || selectedRequest.messages.length === 0) && (
                                <div className="mt-6">
                                    <h4 className="text-base font-medium text-gray-800 mb-3">Send a Message</h4>
                                    <div className="border rounded-lg overflow-hidden bg-white">
                                        <div className="p-3">
                                            <label htmlFor="messageInput" className="sr-only">Your message</label>
                                            <textarea
                                                id="messageInput"
                                                rows="3"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-green-500 focus:border-green-500 text-sm"
                                                placeholder="Type your message to admin here..."
                                                value={userMessage}
                                                onChange={(e) => setUserMessage(e.target.value)}
                                            ></textarea>
                                        </div>
                                        <div className="bg-gray-50 px-3 py-2 border-t">
                                            <button
                                                onClick={() => handleSubmitResponse(selectedRequest.id)}
                                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                            >
                                                Send Message
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 mt-6">
                                {selectedRequest.status === 'pending' && (
                                    <button
                                        onClick={() => {
                                            handleCancelRequest(selectedRequest.id);
                                            setSelectedRequest(null);
                                        }}
                                        className="px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
                                    >
                                        Cancel Request
                                    </button>
                                )}
                                <button
                                    onClick={() => setSelectedRequest(null)}
                                    className="px-4 py-2 bg-gray-100 text-gray-800 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Footer */}
            <Footer />
        </div>
        </ErrorBoundary>
    );
}
