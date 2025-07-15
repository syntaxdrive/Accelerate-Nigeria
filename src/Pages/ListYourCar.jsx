import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import an from '../assets/an.png';
import { useAuth } from '../utils/auth.js';
import { useCarContext } from '../context/CarContext.jsx';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar.jsx';

export default function ListYourCar() {
    const { user } = useAuth();
    const { addCarListingRequest } = useCarContext();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        // Owner Details
        ownerName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        
        // Car Details
        carMake: '',
        carModel: '',
        carYear: '',
        licensePlate: '',
        color: '',
        mileage: '',
        transmission: '',
        fuelType: '',
        seats: '',
        category: '',
        
        // Rental Details
        dailyRate: '',
        weeklyRate: '',
        monthlyRate: '',
        availability: '',
        deliveryOption: false,
        
        // Additional Info
        description: '',
        features: [],
        insuranceValid: false,
        roadWorthyValid: false,
        
        // Images
        images: []
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFeatureChange = (feature) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.includes(feature)
                ? prev.features.filter(f => f !== feature)
                : [...prev.features, feature]
        }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prev => ({
            ...prev,
            images: [...prev.images, ...files]
        }));
    };

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (currentStep !== 4) {
            nextStep();
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            console.log('📝 Submitting car listing request via CarContext...', formData);
            
            // Submit car listing request via CarContext - this will auto-sync to admin
            const result = addCarListingRequest({
                owner: {
                    name: formData.ownerName,
                    email: formData.email || user?.email,
                    phone: formData.phone || user?.phone,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state
                },
                car: {
                    make: formData.carMake,
                    model: formData.carModel,
                    year: parseInt(formData.carYear),
                    licensePlate: formData.licensePlate,
                    color: formData.color,
                    mileage: parseInt(formData.mileage),
                    transmission: formData.transmission,
                    fuelType: formData.fuelType,
                    seats: parseInt(formData.seats),
                    category: formData.category,
                    description: formData.description,
                    features: formData.features
                },
                pricing: {
                    dailyRate: parseInt(formData.dailyRate),
                    weeklyRate: parseInt(formData.weeklyRate) || (parseInt(formData.dailyRate) * 6),
                    monthlyRate: parseInt(formData.monthlyRate) || (parseInt(formData.dailyRate) * 25)
                },
                images: formData.images.length > 0 ? formData.images : ['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400'],
                availability: formData.availability,
                deliveryOption: formData.deliveryOption,
                insuranceValid: formData.insuranceValid,
                roadWorthyValid: formData.roadWorthyValid
            });
            
            if (result.success) {
                alert(` Car listing request submitted successfully!\n\nRequest ID: ${result.requestId}\n\nYour car listing will be reviewed by our team and you'll be notified once approved. You can track the status in "My Requests" page.`);
                console.log(' Car listing request submitted:', result);
                
                // Navigate to My Requests page
                navigate('/my-requests');
            } else {
                throw new Error(result.message || 'Failed to submit request');
            }
            
        } catch (error) {
            console.error(' Error submitting car listing request:', error);
            alert(` Error submitting car listing request: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextStep = () => setCurrentStep(prev => prev + 1);
    const prevStep = () => setCurrentStep(prev => prev - 1);

    const carFeatures = [
        'Air Conditioning', 'Bluetooth', 'GPS Navigation', 'Backup Camera',
        'Heated Seats', 'Sunroof', 'Leather Seats', 'USB Charging Ports',
        'Automatic Windows', 'Central Locking', 'ABS Brakes', 'Airbags'
    ];

    return (
        <div>
      <Navbar />

            <section className="py-10 sm:py-16 lg:py-24">
                <div className="px-4 mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-black sm:text-5xl">List Your Car</h1>
                        <p className="mt-4 text-lg text-gray-600">
                            Fill out the form below to list your car for rental. Our team will review and approve your listing.
                        </p>
                    </div>

                    {/* Progress Steps */}
                    <div className="mb-12">
                        <div className="flex items-center justify-center space-x-8">
                            {[1, 2, 3, 4].map((step) => (
                                <div key={step} className="flex items-center">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                                        currentStep >= step ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
                                    }`}>
                                        {step}
                                    </div>
                                    {step < 4 && (
                                        <div className={`w-16 h-1 ml-4 ${
                                            currentStep > step ? 'bg-green-600' : 'bg-gray-300'
                                        }`}></div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center space-x-8 mt-4">
                            <span className="text-sm font-medium text-gray-600">Owner Info</span>
                            <span className="text-sm font-medium text-gray-600 ml-8">Car Details</span>
                            <span className="text-sm font-medium text-gray-600 ml-8">Pricing</span>
                            <span className="text-sm font-medium text-gray-600 ml-8">Photos</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
                        {/* Step 1: Owner Information */}
                        {currentStep === 1 && (
                            <div>
                                <h2 className="text-2xl font-bold text-black mb-6">Owner Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                        <input
                                            type="text"
                                            name="ownerName"
                                            value={formData.ownerName}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                                        <select
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        >
                                            <option value="">Select State</option>
                                            <option value="Lagos">Lagos</option>
                                            <option value="Abuja">Abuja</option>
                                            <option value="Kano">Kano</option>
                                            <option value="Rivers">Rivers</option>
                                            <option value="Oyo">Oyo</option>
                                            {/* Add more states */}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Car Details */}
                        {currentStep === 2 && (
                            <div>
                                <h2 className="text-2xl font-bold text-black mb-6">Car Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Car Make *</label>
                                        <input
                                            type="text"
                                            name="carMake"
                                            value={formData.carMake}
                                            onChange={handleInputChange}
                                            placeholder="e.g., Toyota"
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Car Model *</label>
                                        <input
                                            type="text"
                                            name="carModel"
                                            value={formData.carModel}
                                            onChange={handleInputChange}
                                            placeholder="e.g., Camry"
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Year *</label>
                                        <input
                                            type="number"
                                            name="carYear"
                                            value={formData.carYear}
                                            onChange={handleInputChange}
                                            min="2000"
                                            max="2025"
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">License Plate *</label>
                                        <input
                                            type="text"
                                            name="licensePlate"
                                            value={formData.licensePlate}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Color *</label>
                                        <input
                                            type="text"
                                            name="color"
                                            value={formData.color}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Mileage (km) *</label>
                                        <input
                                            type="number"
                                            name="mileage"
                                            value={formData.mileage}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Transmission *</label>
                                        <select
                                            name="transmission"
                                            value={formData.transmission}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        >
                                            <option value="">Select Transmission</option>
                                            <option value="Automatic">Automatic</option>
                                            <option value="Manual">Manual</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type *</label>
                                        <select
                                            name="fuelType"
                                            value={formData.fuelType}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        >
                                            <option value="">Select Fuel Type</option>
                                            <option value="Petrol">Petrol</option>
                                            <option value="Diesel">Diesel</option>
                                            <option value="Hybrid">Hybrid</option>
                                            <option value="Electric">Electric</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Number of Seats *</label>
                                        <select
                                            name="seats"
                                            value={formData.seats}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        >
                                            <option value="">Select Seats</option>
                                            <option value="2">2 Seats</option>
                                            <option value="4">4 Seats</option>
                                            <option value="5">5 Seats</option>
                                            <option value="7">7 Seats</option>
                                            <option value="8+">8+ Seats</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        >
                                            <option value="">Select Category</option>
                                            <option value="Economy">Economy</option>
                                            <option value="Luxury">Luxury</option>
                                            <option value="SUV">SUV</option>
                                            <option value="Truck">Truck</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Car Features</label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {carFeatures.map((feature) => (
                                            <label key={feature} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.features.includes(feature)}
                                                    onChange={() => handleFeatureChange(feature)}
                                                    className="mr-2 text-green-600 focus:ring-green-500"
                                                />
                                                <span className="text-sm text-gray-700">{feature}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows="4"
                                        placeholder="Describe your car's condition, special features, or any additional information..."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    ></textarea>
                                </div>

                                <div className="mt-6 space-y-4">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="insuranceValid"
                                            checked={formData.insuranceValid}
                                            onChange={handleInputChange}
                                            required
                                            className="mr-2 text-green-600 focus:ring-green-500"
                                        />
                                        <span className="text-sm text-gray-700">I confirm that my car has valid insurance *</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="roadWorthyValid"
                                            checked={formData.roadWorthyValid}
                                            onChange={handleInputChange}
                                            required
                                            className="mr-2 text-green-600 focus:ring-green-500"
                                        />
                                        <span className="text-sm text-gray-700">I confirm that my car has valid road worthiness certificate *</span>
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Pricing & Availability */}
                        {currentStep === 3 && (
                            <div>
                                <h2 className="text-2xl font-bold text-black mb-6">Pricing & Availability</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Daily Rate (₦) *</label>
                                        <input
                                            type="number"
                                            name="dailyRate"
                                            value={formData.dailyRate}
                                            onChange={handleInputChange}
                                            min="0"
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Weekly Rate (₦)</label>
                                        <input
                                            type="number"
                                            name="weeklyRate"
                                            value={formData.weeklyRate}
                                            onChange={handleInputChange}
                                            min="0"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Rate (₦)</label>
                                        <input
                                            type="number"
                                            name="monthlyRate"
                                            value={formData.monthlyRate}
                                            onChange={handleInputChange}
                                            min="0"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Availability *</label>
                                    <select
                                        name="availability"
                                        value={formData.availability}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    >
                                        <option value="">Select Availability</option>
                                        <option value="Always Available">Always Available</option>
                                        <option value="Weekdays Only">Weekdays Only</option>
                                        <option value="Weekends Only">Weekends Only</option>
                                        <option value="Custom Schedule">Custom Schedule</option>
                                    </select>
                                </div>

                                <div className="mt-6">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="deliveryOption"
                                            checked={formData.deliveryOption}
                                            onChange={handleInputChange}
                                            className="mr-2 text-green-600 focus:ring-green-500"
                                        />
                                        <span className="text-sm text-gray-700">I offer car delivery service (additional charges may apply)</span>
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Photos */}
                        {currentStep === 4 && (
                            <div>
                                <h2 className="text-2xl font-bold text-black mb-6">Car Photos</h2>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Upload Photos of Your Car * (Minimum 1 photo required)
                                    </label>
                                    <p className="text-sm text-gray-500 mb-4">
                                        Include exterior, interior, engine bay, and any damage photos. High-quality photos increase booking chances.
                                    </p>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>

                                {formData.images.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-700 mb-4">Uploaded Photos ({formData.images.length})</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {formData.images.map((image, index) => (
                                                <div key={index} className="relative">
                                                    <img
                                                        src={URL.createObjectURL(image)}
                                                        alt={`Car photo ${index + 1}`}
                                                        className="w-full h-32 object-cover rounded-lg"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(index)}
                                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-8">
                            {currentStep > 1 && (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Previous
                                </button>
                            )}
                            
                            {currentStep < 4 ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="ml-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={isSubmitting || formData.images.length < 1}
                                    className="ml-auto px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit for Approval'}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </section>
            
            {/* Footer */}
            <Footer />
        </div>
    );
}
