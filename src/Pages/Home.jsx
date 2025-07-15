import Drive from '../assets/drive.png';
import an from '../assets/an.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../utils/auth.js';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar.jsx';

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
        <div>
<Navbar />
       







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