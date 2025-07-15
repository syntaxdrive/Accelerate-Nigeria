import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import an from '../assets/an.png';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar';

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        dateOfBirth: '',
        address: '',
        city: '',
        state: '',
        driversLicense: '',
        accountType: 'renter', // renter or owner
        agreeToTerms: false,
        subscribeToNewsletter: false
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

        // Required fields validation
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.driversLicense.trim()) newErrors.driversLicense = 'Driver\'s license number is required';

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Phone validation (Nigerian format)
        const phoneRegex = /^(\+234|0)[789][01]\d{8}$/;
        if (formData.phone && !phoneRegex.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid Nigerian phone number';
        }

        // Password validation
        if (formData.password && formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long';
        }

        // Password confirmation
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        // Age validation (must be 18+)
      if (formData.dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(formData.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    if (age < 18) {
        newErrors.dateOfBirth = 'You must be at least 18 years old to register';
    }
}
        // Terms and conditions
        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the terms and conditions';
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
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Store user data in localStorage
            const userData = {
                email: formData.email,
                name: `${formData.firstName} ${formData.lastName}`,
                phone: formData.phone,
                accountType: formData.accountType,
                isAuthenticated: true,
                registrationDate: new Date().toISOString()
            };
            
            localStorage.setItem('currentUser', JSON.stringify(userData));
            
            alert(`Registration successful! Welcome to Accelerate Nigeria, ${formData.firstName}!`);
            
            // Redirect to home page after successful registration
            navigate('/');
            
        } catch (error) {
            alert('Registration failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const nigerianStates = [
        'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
        'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
        'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
        'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
        'Yobe', 'Zamfara'
    ];

    return (
        <div>
            // Header
      <Navbar />
            <section className="py-10 sm:py-16 lg:py-24">
                <div className="px-4 mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-black sm:text-5xl">
                            Join Accelerate Nigeria
                        </h1>
                        <p className="mt-4 text-lg text-gray-600">
                            Create your account to start renting cars or list your own vehicle for others to rent.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Account Type Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-4">I want to:</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                                        formData.accountType === 'renter' ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'
                                    }`}>
                                        <input
                                            type="radio"
                                            name="accountType"
                                            value="renter"
                                            checked={formData.accountType === 'renter'}
                                            onChange={handleInputChange}
                                            className="sr-only"
                                        />
                                        <div className="flex items-center">
                                            <svg className="w-8 h-8 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                                            </svg>
                                            <div>
                                                <div className="font-semibold text-gray-900">Rent Cars</div>
                                                <div className="text-sm text-gray-600">I want to rent vehicles for my trips</div>
                                            </div>
                                        </div>
                                    </label>
                                    
                                    <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                                        formData.accountType === 'owner' ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'
                                    }`}>
                                        <input
                                            type="radio"
                                            name="accountType"
                                            value="owner"
                                            checked={formData.accountType === 'owner'}
                                            onChange={handleInputChange}
                                            className="sr-only"
                                        />
                                        <div className="flex items-center">
                                            <svg className="w-8 h-8 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                                            </svg>
                                            <div>
                                                <div className="font-semibold text-gray-900">List My Car</div>
                                                <div className="text-sm text-gray-600">I want to earn money by renting out my vehicle</div>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Personal Information */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                                                errors.firstName ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            placeholder="Enter your first name"
                                        />
                                        {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                                                errors.lastName ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            placeholder="Enter your last name"
                                        />
                                        {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
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
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                                                errors.phone ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            placeholder="+234 801 234 5678"
                                        />
                                        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                                        <input
                                            type="date"
                                            name="dateOfBirth"
                                            value={formData.dateOfBirth}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                                                errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        />
                                        {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>}
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Driver's License Number *</label>
                                        <input
                                            type="text"
                                            name="driversLicense"
                                            value={formData.driversLicense}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                                                errors.driversLicense ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            placeholder="Enter your driver's license number"
                                        />
                                        {errors.driversLicense && <p className="mt-1 text-sm text-red-600">{errors.driversLicense}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Address Information */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Address Information</h3>
                                <div className="grid grid-cols-1 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                                                errors.address ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            placeholder="Enter your full address"
                                        />
                                        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                                                    errors.city ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                                placeholder="Enter your city"
                                            />
                                            {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                                            <select
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                                                    errors.state ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            >
                                                <option value="">Select State</option>
                                                {nigerianStates.map(state => (
                                                    <option key={state} value={state}>{state}</option>
                                                ))}
                                            </select>
                                            {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Security Information */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Security Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                                                errors.password ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            placeholder="Create a strong password"
                                        />
                                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                                        <p className="mt-1 text-sm text-gray-500">Password must be at least 8 characters long</p>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                                                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            placeholder="Confirm your password"
                                        />
                                        {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Terms and Conditions */}
                            <div className="space-y-4">
                                <label className="flex items-start">
                                    <input
                                        type="checkbox"
                                        name="agreeToTerms"
                                        checked={formData.agreeToTerms}
                                        onChange={handleInputChange}
                                        className="mt-1 mr-3 text-green-600 focus:ring-green-500"
                                    />
                                    <span className="text-sm text-gray-700">
                                        I agree to the <Link to="/terms" className="text-green-600 hover:text-green-700 underline">Terms and Conditions</Link> and <Link to="/privacy" className="text-green-600 hover:text-green-700 underline">Privacy Policy</Link> *
                                    </span>
                                </label>
                                {errors.agreeToTerms && <p className="text-sm text-red-600">{errors.agreeToTerms}</p>}
                                
                                <label className="flex items-start">
                                    <input
                                        type="checkbox"
                                        name="subscribeToNewsletter"
                                        checked={formData.subscribeToNewsletter}
                                        onChange={handleInputChange}
                                        className="mt-1 mr-3 text-green-600 focus:ring-green-500"
                                    />
                                    <span className="text-sm text-gray-700">
                                        I would like to receive email updates about new features, promotions, and car rental tips
                                    </span>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6">
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
                                            Creating Account...
                                        </div>
                                    ) : (
                                        'Create Account'
                                    )}
                                </button>
                            </div>

                            {/* Login Link */}
                            <div className="text-center pt-4">
                                <p className="text-sm text-gray-600">
                                    Already have an account? <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">Sign in here</Link>
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
