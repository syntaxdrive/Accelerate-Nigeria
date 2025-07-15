import Drive from '../assets/drive.png';
import an from '../assets/an.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../utils/auth.js';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar.jsx';

export default function Solutions() {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
       <div>
        <Navbar />

            <section className="py-10 sm:py-16 lg:py-24">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-black sm:text-6xl lg:text-7xl">
                            Our
                            <div className="relative inline-flex ml-4">
                                <span className="absolute inset-x-0 bottom-0 border-b-[30px] border-blue-400"></span>
                                <span className="relative text-4xl font-bold text-black sm:text-6xl lg:text-7xl">Solutions</span>
                            </div>
                        </h1>
                        <p className="mt-8 text-base text-gray-700 sm:text-xl max-w-3xl mx-auto">
                            Accelerate Nigeria provides comprehensive solutions to drive economic growth and technological advancement across the nation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                        {/* Solution 1 */}
                        <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-black mb-4">Digital Innovation</h3>
                            <p className="text-gray-600 mb-6">
                                Empowering businesses with cutting-edge digital solutions and innovative technologies to stay competitive in the modern market.
                            </p>
                            <a href="#" className="text-blue-600 font-semibold hover:text-blue-800 transition-colors">Learn More →</a>
                        </div>

                        {/* Solution 2 */}
                        <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-black mb-4">Economic Acceleration</h3>
                            <p className="text-gray-600 mb-6">
                                Strategic programs designed to accelerate economic growth, create jobs, and foster sustainable development across Nigeria.
                            </p>
                            <a href="#" className="text-green-600 font-semibold hover:text-green-800 transition-colors">Learn More →</a>
                        </div>

                        {/* Solution 3 */}
                        <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-black mb-4">Capacity Building</h3>
                            <p className="text-gray-600 mb-6">
                                Comprehensive training and development programs to build local capacity and expertise in emerging technologies and business practices.
                            </p>
                            <a href="#" className="text-orange-600 font-semibold hover:text-orange-800 transition-colors">Learn More →</a>
                        </div>

                        {/* Solution 4 */}
                        <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-black mb-4">Infrastructure Development</h3>
                            <p className="text-gray-600 mb-6">
                                Building robust infrastructure to support technological advancement and economic growth across urban and rural areas.
                            </p>
                            <a href="#" className="text-purple-600 font-semibold hover:text-purple-800 transition-colors">Learn More →</a>
                        </div>

                        {/* Solution 5 */}
                        <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-black mb-4">Quality Assurance</h3>
                            <p className="text-gray-600 mb-6">
                                Ensuring the highest standards of quality in all our solutions and services through rigorous testing and continuous improvement.
                            </p>
                            <a href="#" className="text-red-600 font-semibold hover:text-red-800 transition-colors">Learn More →</a>
                        </div>

                        {/* Solution 6 */}
                        <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-black mb-4">Strategic Consulting</h3>
                            <p className="text-gray-600 mb-6">
                                Expert consulting services to help organizations develop and implement effective strategies for growth and transformation.
                            </p>
                            <a href="#" className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">Learn More →</a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
