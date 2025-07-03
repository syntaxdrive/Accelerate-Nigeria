import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import an from '../assets/an.png';
import Footer from '../components/Footer';

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                newErrors.email = 'Please enter a valid email address';
            }
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // For demo purposes, any valid email/password combination works
            // In a real app, this would verify credentials with the backend
            const userData = {
                email: formData.email,
                name: formData.email.split('@')[0], // Use email prefix as name for demo
                isAuthenticated: true,
                loginTime: new Date().toISOString()
            };
            
            // Store user data in localStorage
            localStorage.setItem('currentUser', JSON.stringify(userData));
            
            alert(`Welcome back! Login successful.`);
            
            // Redirect to the page they were trying to access, or home
            navigate(from, { replace: true });
            
        } catch (error) {
            setErrors({ general: 'Login failed. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-gradient-to-b from-green-50 to-green-100 min-h-screen">
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

                        <div className="hidden ml-auto lg:flex lg:items-center lg:justify-center lg:space-x-10">
                            <Link to="/" className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80">Home</Link>
                            <Link to="/solutions" className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80">Solutions</Link>
                            <Link to="/rent-cars" className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80">Rent a Car</Link>
                            <Link to="/list-your-car" className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80">List Your Car</Link>
                            <Link to="/my-requests" className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80">My Requests</Link>
                            <Link to="/partner-with-us" className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80">Partner with us</Link>
                            <Link to="/contact-us" className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80">Contact Us</Link>
                            <div className="w-px h-5 bg-black/20"></div>
                            <Link to="/register" className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-black border-2 border-black hover:bg-black hover:text-white transition-all duration-200 rounded-lg">Register</Link>
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
                                <Link to="/contact-us" className="block px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md">Contact Us</Link>
                                <div className="border-t border-gray-200 pt-2 mt-2">
                                    <Link to="/register" className="block px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md">Register</Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            <section className="py-10 sm:py-16 lg:py-24">
                <div className="px-4 mx-auto max-w-md sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-black sm:text-5xl">
                            Welcome Back
                        </h1>
                        <p className="mt-4 text-lg text-gray-600">
                            Sign in to your account to continue
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {errors.general && (
                                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-sm text-red-600">{errors.general}</p>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                                        errors.email ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="your.email@example.com"
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                                        errors.password ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="Enter your password"
                                />
                                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleInputChange}
                                        className="mr-2 text-green-600 focus:ring-green-500"
                                    />
                                    <span className="text-sm text-gray-700">Remember me</span>
                                </label>
                                
                                <Link to="/forgot-password" className="text-sm text-green-600 hover:text-green-700">
                                    Forgot password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full px-8 py-4 text-base font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing In...
                                    </div>
                                ) : (
                                    'Sign In'
                                )}
                            </button>

                            <div className="text-center pt-4">
                                <p className="text-sm text-gray-600">
                                    Don't have an account? <Link to="/register" className="text-green-600 hover:text-green-700 font-medium">Create account</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
