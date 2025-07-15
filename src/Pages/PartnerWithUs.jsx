import Drive from '../assets/drive.png';
import an from '../assets/an.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../utils/auth.js';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar.jsx';

export default function PartnerWithUs() {
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
