import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import an from '../assets/an.png';
import ErrorBoundary from '../components/ErrorBoundary';

// Add Car Form Component
function AddCarForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    licensePlate: '',
    color: '',
    category: '',
    location: '',
    dailyRate: '',
    weeklyRate: '',
    monthlyRate: '',
    features: [],
    description: '',
    fuelType: '',
    transmission: '',
    seats: '',
    mileage: '',
    images: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFeatureToggle = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = [];
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        imageUrls.push(event.target.result);
        if (imageUrls.length === files.length) {
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, ...imageUrls]
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const availableFeatures = [
    'Air Conditioning', 'Bluetooth', 'GPS Navigation', 'Backup Camera',
    'Heated Seats', 'Sunroof', 'Leather Seats', 'USB Ports',
    'Automatic Windows', 'Central Locking', 'ABS Brakes', 'Airbags'
  ];

  return (
    <>
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Add New Rental Car</h1>
          <button
            onClick={onCancel}
            className="text-gray-600 hover:text-gray-800"
          >
            ✕
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Make</label>
            <input
              type="text"
              name="make"
              value={formData.make}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">License Plate</label>
            <input
              type="text"
              name="licensePlate"
              value={formData.licensePlate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              required
            >
              <option value="">Select Category</option>
              <option value="Economy">Economy</option>
              <option value="Compact">Compact</option>
              <option value="Mid-size">Mid-size</option>
              <option value="Luxury">Luxury</option>
              <option value="SUV">SUV</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              required
            >
              <option value="">Select Location</option>
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja</option>
              <option value="Port Harcourt">Port Harcourt</option>
              <option value="Kano">Kano</option>
              <option value="Ibadan">Ibadan</option>
              <option value="Enugu">Enugu</option>
              <option value="Kaduna">Kaduna</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Daily Rate (₦)</label>
            <input
              type="number"
              name="dailyRate"
              value={formData.dailyRate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Weekly Rate (₦)</label>
            <input
              type="number"
              name="weeklyRate"
              value={formData.weeklyRate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Rate (₦)</label>
            <input
              type="number"
              name="monthlyRate"
              value={formData.monthlyRate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
            <select
              name="fuelType"
              value={formData.fuelType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              required
            >
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
            <select
              name="transmission"
              value={formData.transmission}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              required
            >
              <option value="">Select Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Seats</label>
            <input
              type="number"
              name="seats"
              value={formData.seats}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Car Images</label>
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> car images
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            
            {formData.images.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Images ({formData.images.length})</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Car image ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Mileage (km)</label>
          <input
            type="number"
            name="mileage"
            value={formData.mileage}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            placeholder="e.g., 25000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {availableFeatures.map(feature => (
              <label key={feature} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.features.includes(feature)}
                  onChange={() => handleFeatureToggle(feature)}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="ml-2 text-sm text-gray-700">{feature}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            placeholder="Describe the car's condition, special features, etc."
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Add Car
          </button>
        </div>
      </form>
    </div>
    </>
  );
}

// Car Details View Component
function CarDetailsView({ car, onBack, onEdit }) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <button
          onClick={onBack}
          className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-700 mb-4 transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Fleet
        </button>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{car.year} {car.make} {car.model}</h1>
            <p className="text-gray-600 mt-1">License Plate: {car.licensePlate}</p>
          </div>
          <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
            car.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {car.available ? 'Available' : 'Unavailable'}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Car Images */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Photos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {(car.images && car.images.length > 0) ? (
              car.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${car.make} ${car.model} ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border"
                />
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500">No photos available</p>
              </div>
            )}
          </div>
        </div>

        {/* Car Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Vehicle Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium">{car.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Color:</span>
                <span className="font-medium">{car.color}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fuel Type:</span>
                <span className="font-medium">{car.fuelType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transmission:</span>
                <span className="font-medium">{car.transmission}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Seats:</span>
                <span className="font-medium">{car.seats}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Pricing</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Daily Rate:</span>
                <span className="font-medium">₦{car.dailyRate?.toLocaleString()}</span>
              </div>
              {car.weeklyRate && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Weekly Rate:</span>
                  <span className="font-medium">₦{car.weeklyRate?.toLocaleString()}</span>
                </div>
              )}
              {car.monthlyRate && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Rate:</span>
                  <span className="font-medium">₦{car.monthlyRate?.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
          <div className="flex flex-wrap gap-2">
            {car.features.map((feature, index) => (
              <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        {car.description && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700">{car.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  // Load rental cars from localStorage with auto-refresh
  const [rentalCars, setRentalCars] = useState(() => {
    const stored = localStorage.getItem('rentalCars');
    return stored ? JSON.parse(stored) : [
      {
        id: 1,
        make: 'Toyota',
        model: 'Camry',
        year: 2023,
        type: 'Sedan',
        fuelType: 'Hybrid',
        transmission: 'Automatic',
        pricePerDay: 15000,
        features: ['Air Conditioning', 'Bluetooth', 'Backup Camera', 'Cruise Control'],
        imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400',
        available: true,
        location: 'Lagos',
        description: 'Comfortable and fuel-efficient sedan perfect for city driving and long trips.',
        mileage: 12000,
        color: 'Silver',
        seats: 5,
        licensePlate: 'LAG-123-AB',
        addedDate: '2024-01-15',
      },
      {
        id: 2,
        make: 'Honda',
        model: 'CR-V',
        year: 2022,
        type: 'SUV',
        fuelType: 'Petrol',
        transmission: 'Automatic',
        pricePerDay: 20000,
        features: ['Air Conditioning', 'Bluetooth', 'All-Wheel Drive', 'Navigation System'],
        imageUrl: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400',
        available: true,
        location: 'Abuja',
        description: 'Spacious SUV ideal for families and adventure trips with excellent safety ratings.',
        mileage: 18000,
        color: 'White',
        seats: 7,
        licensePlate: 'ABJ-456-CD',
        addedDate: '2024-01-20',
      }
    ];
  });
  
  // Save rental cars to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('rentalCars', JSON.stringify(rentalCars));
  }, [rentalCars]);
  
  const [activeTab, setActiveTab] = useState('rental-requests');
  const [trackingData, setTrackingData] = useState([]);
  const [selectedTracking, setSelectedTracking] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isAddingCar, setIsAddingCar] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Simple localStorage-based rental requests
  const [rentalRequestsData, setRentalRequestsData] = useState(() => {
    const stored = localStorage.getItem('rentalRequests');
    return stored ? JSON.parse(stored) : [];
  });
  
  /* Fixed duplicate state declaration */
  const [selectedRentalRequest, setSelectedRentalRequest] = useState(null);
  const [rentalRequestFilter, setRentalRequestFilter] = useState('pending');
  
  // Auto-refresh from localStorage every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem('rentalRequests');
      const requests = stored ? JSON.parse(stored) : [];
      setRentalRequestsData(requests);
      console.log('📑 AdminDashboard: Loaded rental requests from localStorage:', requests);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Initialize mock tracking data
  useEffect(() => {
    const mockTrackingData = [
      {
        id: 1,
        carId: 'ABC-123-DE',
        carDetails: '2020 Toyota Camry',
        renterName: 'Olumide Adebayo',
        renterPhone: '+234 801 111 2222',
        status: 'active',
        currentLocation: { 
          address: 'Victoria Island, Lagos',
          lat: 6.5244,
          lng: 3.3792
        },
        gpsEnabled: true,
        lastUpdate: new Date().toISOString(),
        alerts: [{ type: 'speed', message: 'Exceeded speed limit', time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() }],
        startLocation: { 
          address: 'Victoria Island, Lagos',
          lat: 6.5244,
          lng: 3.3792
        },
        totalDistance: 245.7,
        averageSpeed: 45,
        maxSpeed: 85,
        rentalPeriod: '2024-01-20 to 2024-01-25',
        ownerName: 'John Adebayo',
        route: [
          { lat: 6.5244, lng: 3.3792, time: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), address: 'Victoria Island, Lagos' },
          { lat: 6.5344, lng: 3.3892, time: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), address: 'Ikoyi, Lagos' },
          { lat: 6.5444, lng: 3.3992, time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), address: 'Lekki, Lagos' },
          { lat: 6.5544, lng: 3.4092, time: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), address: 'Ajah, Lagos' }
        ]
      },
      {
        id: 2,
        carId: 'XYZ-456-FG',
        carDetails: '2019 Honda Accord',
        renterName: 'Chioma Nwosu',
        renterPhone: '+234 802 222 3333',
        status: 'active',
        currentLocation: { 
          address: 'Wuse 2, Abuja',
          lat: 9.0579,
          lng: 7.4951
        },
        gpsEnabled: true,
        lastUpdate: new Date().toISOString(),
        alerts: [],
        startLocation: { 
          address: 'Wuse 2, Abuja',
          lat: 9.0579,
          lng: 7.4951
        },
        totalDistance: 120.3,
        averageSpeed: 35,
        maxSpeed: 70,
        rentalPeriod: '2024-01-21 to 2024-01-23',
        ownerName: 'Sarah Okafor',
        route: [
          { lat: 9.0579, lng: 7.4951, time: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), address: 'Wuse 2, Abuja' },
          { lat: 9.0679, lng: 7.5051, time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), address: 'Maitama, Abuja' },
          { lat: 9.0779, lng: 7.5151, time: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), address: 'Garki, Abuja' }
        ]
      }
    ];

    setTrackingData(mockTrackingData);
  }, []);

  // Simulate real-time updates for tracking data
  useEffect(() => {
    const interval = setInterval(() => {
      setTrackingData(prevData => 
        prevData.map(item => {
          if (item.status === 'active') {
            // Simulate GPS movement
            const lastRoute = item.route[item.route.length - 1];
            const newLat = lastRoute.lat + (Math.random() - 0.5) * 0.01;
            const newLng = lastRoute.lng + (Math.random() - 0.5) * 0.01;
            
            return {
              ...item,
              currentLocation: {
                ...item.currentLocation,
                lat: newLat,
                lng: newLng
              },
              lastUpdate: new Date().toISOString(),
              route: [...item.route, {
                lat: newLat,
                lng: newLng,
                time: new Date().toISOString(),
                address: `Moving location near ${item.currentLocation.address}`
              }],
              totalDistance: item.totalDistance + Math.random() * 5
            };
          }
          return item;
        })
      );
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Simulate new requests coming in periodically
  useEffect(() => {
    const newRequestsPool = [
      {
        owner: { name: 'Kemi Adeboye', email: 'kemi@example.com', phone: '+234 804 567 8901', city: 'Ibadan', state: 'Oyo', address: '321 Bodija, Ibadan, Oyo State' },
        car: { make: 'Nissan', model: 'Altima', year: 2021, licensePlate: 'NIB-789-GH', color: 'Blue', mileage: 25000, transmission: 'Automatic', fuelType: 'Petrol', seats: 5, category: 'Economy', features: ['Air Conditioning', 'Bluetooth', 'USB Ports'], description: 'Almost new car with low mileage. Perfect for long trips.', insuranceValid: true, roadWorthyValid: true },
        pricing: { dailyRate: 15000, weeklyRate: 90000, monthlyRate: 320000, availability: 'Always Available', deliveryOption: true },
        images: ['https://via.placeholder.com/400x300?text=Nissan+Front']
      },
      {
        owner: { name: 'Ibrahim Suleiman', email: 'ibrahim@example.com', phone: '+234 805 678 9012', city: 'Kano', state: 'Kano', address: '456 Fagge, Kano, Kano State' },
        car: { make: 'Hyundai', model: 'Elantra', year: 2020, licensePlate: 'KNO-012-JK', color: 'Red', mileage: 40000, transmission: 'Manual', fuelType: 'Petrol', seats: 5, category: 'Compact', features: ['Air Conditioning', 'Radio'], description: 'Reliable car for city driving.', insuranceValid: true, roadWorthyValid: true },
        pricing: { dailyRate: 10000, weeklyRate: 60000, monthlyRate: 200000, availability: 'Weekdays Only', deliveryOption: false },
        images: ['https://via.placeholder.com/400x300?text=Hyundai+Front']
      }
    ];

    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance of new request
        const newRequest = newRequestsPool[Math.floor(Math.random() * newRequestsPool.length)];
        setCarRequests(prev => [...prev, {
          ...newRequest,
          id: Date.now(),
          status: 'pending',
          dateSubmitted: new Date().toISOString().split('T')[0]
        }]);
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  // Car management helpers
  const handleAddCar = (carData) => {
    const newCar = {
      ...carData,
      id: Date.now(),
      pricePerDay: parseInt(carData.dailyRate),
      type: carData.category,
      imageUrl: carData.images.length > 0 ? carData.images[0] : 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400',
      images: carData.images.length > 0 ? carData.images : ['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400'],
      available: true,
      addedDate: new Date().toISOString().split('T')[0],
    };
    setRentalCars(prev => [...prev, newCar]);
    setIsAddingCar(false);
    alert('Car added successfully!');
  };

  const handleToggleAvailability = (id) => {
    setRentalCars(prev => 
      prev.map(car => 
        car.id === id ? { ...car, available: !car.available } : car
      )
    );
  };

  const handleDeleteCar = (id) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      setRentalCars(prev => prev.filter(car => car.id !== id));
    }
  };

  // Rental request handlers
  const handleApproveRentalRequest = (requestId) => {
    const request = rentalRequestsData.find(r => r.id === requestId);
    
    if (request.type === 'car_listing') {
      // Handle car listing approval - add to rental fleet
      const message = prompt('Enter approval message (optional):') || 'Your car listing has been approved and added to our rental fleet!';
      
      // Add car to rental fleet
      const newFleetCar = {
        id: Date.now(),
        make: request.car?.make || '',
        model: request.car?.model || '',
        year: request.car?.year || new Date().getFullYear(),
        type: request.car?.category || '',
        fuelType: request.car?.fuelType || '',
        transmission: request.car?.transmission || '',
        pricePerDay: request.pricing?.dailyRate || 0,
        features: request.car?.features || [],
        imageUrl: (request.images && request.images.length > 0) ? request.images[0] : 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400',
        available: true,
        location: request.owner?.city || '',
        description: request.car?.description || '',
        mileage: request.car?.mileage || 0,
        color: request.car?.color || '',
        seats: request.car?.seats || '',
        licensePlate: request.car?.licensePlate || '',
        addedDate: new Date().toISOString().split('T')[0],
        owner: request.owner || {}
      };
      
      setRentalCars(prev => [...prev, newFleetCar]);
      
      // Update request status
      const updatedRequests = rentalRequestsData.map(req => 
        req.id === requestId 
          ? { ...req, status: 'approved', message: message, approvedDate: new Date().toISOString() }
          : req
      );
      
      localStorage.setItem('rentalRequests', JSON.stringify(updatedRequests));
      setRentalRequestsData(updatedRequests);
      alert('Car listing approved and added to rental fleet successfully!');
      
    } else {
      // Handle regular rental request approval
      const message = prompt('Enter approval message (optional):') || 'Your rental request has been approved!';
      
      const updatedRequests = rentalRequestsData.map(req => 
        req.id === requestId 
          ? { ...req, status: 'approved', message: message, approvedDate: new Date().toISOString() }
          : req
      );
      
      localStorage.setItem('rentalRequests', JSON.stringify(updatedRequests));
      setRentalRequestsData(updatedRequests);
      alert('Rental request approved successfully!');
    }
  };

  const handleDenyRentalRequest = (requestId) => {
    const request = rentalRequestsData.find(r => r.id === requestId);
    const message = prompt('Enter denial reason:') || 
      (request.type === 'car_listing' ? 'Your car listing has been denied.' : 'Your rental request has been denied.');
    
    const updatedRequests = rentalRequestsData.map(req => 
      req.id === requestId 
        ? { ...req, status: 'denied', message: message, deniedDate: new Date().toISOString() }
        : req
    );
    
    localStorage.setItem('rentalRequests', JSON.stringify(updatedRequests));
    setRentalRequestsData(updatedRequests);
    alert(request.type === 'car_listing' ? 'Car listing denied.' : 'Rental request denied.');
  };

  // Filter rental requests
  const filteredRentalRequests = rentalRequestsData.filter(request => {
    if (rentalRequestFilter === 'all') return true;
    return request.status === rentalRequestFilter;
  });
  
  // Log filtered requests
  console.log('📊 AdminDashboard: Filtered rental requests:', { 
    total: rentalRequestsData.length, 
    filtered: filteredRentalRequests.length,
    filter: rentalRequestFilter
  });
  
  // Helper function to get full car details when available
  const getFullCarDetails = (request) => {
    if (!request.car) return null;
    
    // If this is a rental request with minimal car data, try to find the full car object
    if (!request.type && request.carId) {
      const fullCar = rentalCars.find(car => car.id === request.carId);
      if (fullCar) {
        // Return a merged object with the full car details plus any request-specific car details
        return { ...fullCar, ...request.car };
      }
    }
    
    // Return whatever car data is available in the request
    return request.car;
  };

  const getStatusColor = s => ({ pending:'bg-yellow-100 text-yellow-800', approved:'bg-green-100 text-green-800', denied:'bg-red-100 text-red-800' }[s] || 'bg-gray-100 text-gray-800');
  const getTrackingStatusColor = s => ({ active:'bg-green-100 text-green-800', completed:'bg-blue-100 text-blue-800', overdue:'bg-red-100 text-red-800' }[s] || 'bg-gray-100 text-gray-800');
  const getAlertColor = t => ({ speed:'bg-yellow-100 text-yellow-800', overdue:'bg-red-100 text-red-800', gps:'bg-orange-100 text-orange-800', maintenance:'bg-blue-100 text-blue-800' }[t] || 'bg-gray-100 text-gray-800');

  return (
    <ErrorBoundary>
      <div className="bg-gradient-to-b from-green-50 to-green-100 min-h-screen">
      {/* Header matching other pages */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex-shrink-0">
              <Link to="/" title="" className="flex">
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
              <Link to="/" className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"> Home </Link>
              <Link to="/solutions" className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"> Solutions </Link>
              <Link to="/partner-with-us" className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"> Partner with us </Link>
              <Link to="/contact-us" className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"> Contact Us </Link>
              <div className="w-px h-5 bg-black/20"></div>
              <span className="text-base font-semibold text-black border-b-2 border-green-500 pb-1">Admin Dashboard</span>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                <Link to="/" className="block px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md">Home</Link>
                <Link to="/solutions" className="block px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md">Solutions</Link>
                <Link to="/partner-with-us" className="block px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md">Partner with us</Link>
                <Link to="/contact-us" className="block px-3 py-2 text-base font-medium text-black hover:bg-gray-100 rounded-md">Contact Us</Link>
                <div className="border-t border-gray-200 pt-2">
                  <span className="block px-3 py-2 text-base font-medium text-black bg-gray-100 rounded-md border-l-4 border-green-500">Admin Dashboard</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="sticky top-16 lg:top-20 z-40 bg-gradient-to-b from-green-50 to-green-100 px-4 mx-auto sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex justify-center space-x-1 bg-white p-1 rounded-lg shadow-sm max-w-lg mx-auto">
          <button
            onClick={() => {setActiveTab('rental-requests'); setSelectedTracking(null); setSelectedCar(null); setIsAddingCar(false); setSelectedRentalRequest(null);}}
            className={`group relative flex-1 px-3 py-3 text-sm font-semibold rounded-md transition-all duration-200 ${
              activeTab === 'rental-requests'
                ? 'bg-green-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
            title="Rental Requests"
          >
            <div className="flex flex-col items-center space-y-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <span className="text-xs hidden sm:block">Requests</span>
            </div>
            {rentalRequestsData.filter(r => r.status === 'pending').length > 0 && (
              <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                {rentalRequestsData.filter(r => r.status === 'pending').length}
              </span>
            )}
          </button>
          <button
            onClick={() => {setActiveTab('rental-cars'); setSelectedTracking(null); setSelectedCar(null); setIsAddingCar(false); setSelectedRentalRequest(null);}}
            className={`group flex-1 px-3 py-3 text-sm font-semibold rounded-md transition-all duration-200 ${
              activeTab === 'rental-cars'
                ? 'bg-green-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
            title="Rental Fleet"
          >
            <div className="flex flex-col items-center space-y-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <span className="text-xs hidden sm:block">Fleet</span>
            </div>
          </button>
          <button
            onClick={() => {setActiveTab('tracking'); setSelectedTracking(null); setSelectedCar(null); setIsAddingCar(false); setSelectedRentalRequest(null);}}
            className={`group flex-1 px-3 py-3 text-sm font-semibold rounded-md transition-all duration-200 ${
              activeTab === 'tracking'
                ? 'bg-green-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
            title="Car Tracking"
          >
            <div className="flex flex-col items-center space-y-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-xs hidden sm:block">Tracking</span>
            </div>
          </button>
        </div>
      </div>
      <div className="px-4 mx-auto sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          {/* Sidebar */}
          <aside className="lg:w-64 mb-8 lg:mb-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {activeTab === 'rental-requests' ? (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Rental Requests</h3>
                  <div className="space-y-2">
                    {[
                      {key: 'pending', label: 'Pending', count: filteredRentalRequests.filter(r => r.status === 'pending').length},
                      {key: 'approved', label: 'Approved', count: filteredRentalRequests.filter(r => r.status === 'approved').length},
                      {key: 'denied', label: 'Denied', count: filteredRentalRequests.filter(r => r.status === 'denied').length},
                      {key: 'all', label: 'All Requests', count: rentalRequestsData.length}
                    ].map(item => (
                      <button 
                        key={item.key}
                        onClick={() => setRentalRequestFilter(item.key)} 
                        className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                          rentalRequestFilter === item.key 
                            ? 'bg-green-600 text-white shadow-sm' 
                            : 'text-gray-700 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{item.label}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            rentalRequestFilter === item.key ? 'bg-white/20' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {item.count}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-600 mb-3">Quick Actions</h4>
                    <div className="space-y-2">
                      <button 
                        onClick={() => setActiveTab('rental-cars')}
                        className="w-full text-left px-3 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-sm font-medium transition-colors duration-200"
                      >
                        View Rental Fleet
                      </button>
                      <button 
                        onClick={() => setActiveTab('tracking')}
                        className="w-full text-left px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors duration-200"
                      >
                        Track Active Rentals
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Fleet Overview</h3>
                  <div className="space-y-3">
                    {[
                      {key: 'available', label: 'Available Cars', count: rentalCars.filter(c => c.available).length},
                      {key: 'unavailable', label: 'Unavailable', count: rentalCars.filter(c => !c.available).length},
                      {key: 'total', label: 'Total Fleet', count: rentalCars.length}
                    ].map(item => (
                      <div key={item.key} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                        <span className="font-medium text-gray-700">{item.label}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          item.key === 'available' ? 'bg-green-100 text-green-800' :
                          item.key === 'unavailable' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {item.count}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setIsAddingCar(true)}
                    className="w-full mt-4 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    Add New Car
                  </button>
                </div>
              )}
            </div>
          </aside>
          {/* Main Content */}
          <main className="flex-1">
            {activeTab === 'rental-requests' ? (
              !selectedRentalRequest ? (
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-900">Rental Requests</h1>
                    <p className="text-gray-600 mt-1">Review and manage car rental requests from customers</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Renter</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rental Period</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredRentalRequests.map(request => (
                          <tr key={request.id} className="hover:bg-gray-50 transition-colors duration-200">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {request.type === 'car_listing' ? request.owner.name : request.renterName}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {request.type === 'car_listing' ? request.owner.email : request.renterEmail}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {request.type === 'car_listing' ? request.owner.phone : request.renterPhone}
                                </div>
                                {request.type === 'car_listing' && (
                                  <div className="text-xs text-blue-600 font-medium mt-1">Car Listing</div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {request.car ? `${request.car.year || ''} ${request.car.make || ''} ${request.car.model || ''}` : 'Vehicle information unavailable'}
                              </div>
                              <div className="text-sm text-gray-500">
                                Daily Rate: ₦{(request.type === 'car_listing' ? request.pricing?.dailyRate : request.car?.pricePerDay)?.toLocaleString() || 'N/A'}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {request.type === 'car_listing' ? (
                                <div className="text-sm text-gray-900">Car Listing Request</div>
                              ) : (
                                <div>
                                  <div className="text-sm text-gray-900">
                                    {new Date(request.startDate).toLocaleDateString()} to {new Date(request.endDate).toLocaleDateString()}
                                  </div>
                                  <div className="text-sm text-gray-500">{request.totalDays} days</div>
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {request.type === 'car_listing' ? 'N/A' : `₦${request.totalAmount?.toLocaleString()}`}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(request.dateSubmitted).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                              <button
                                onClick={() => setSelectedRentalRequest(request)}
                                className="text-green-600 hover:text-green-900 font-medium transition-colors duration-200"
                              >
                                View Details
                              </button>
                              {request.status === 'pending' && (
                                <div className="inline-flex space-x-2">
                                  <button
                                    onClick={() => handleApproveRentalRequest(request.id)}
                                    className="text-green-600 hover:text-green-900 font-medium transition-colors duration-200"
                                  >
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => handleDenyRentalRequest(request.id)}
                                    className="text-red-600 hover:text-red-900 font-medium transition-colors duration-200"
                                  >
                                    Deny
                                  </button>
                                </div>
                              )}
                              {request.status === 'approved' && (
                                <span className="text-xs text-green-600 font-medium">Approved</span>
                              )}
                              {request.status === 'denied' && (
                                <span className="text-xs text-red-600 font-medium">Denied</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                // Enhanced Request Detail View
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6 border-b border-gray-200">
                    <button
                      onClick={() => setSelectedRentalRequest(null)}
                      className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-700 mb-4 transition-colors duration-200"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                      Back to Requests
                    </button>
                    <div className="flex justify-between items-start">
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900">Rental Request Details</h1>
                        <p className="text-gray-600 mt-1">Submitted on {new Date(selectedRentalRequest.dateSubmitted).toLocaleDateString()}</p>
                      </div>
                      <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedRentalRequest.status)}`}>
                        {selectedRentalRequest.status.charAt(0).toUpperCase() + selectedRentalRequest.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-8">
                    {/* Owner Information */}
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Customer Information
                      </h2>
                      <div className="bg-gray-50 rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div>
                              <label className="text-sm font-medium text-gray-500">Full Name</label>
                              <p className="text-sm text-gray-900 mt-1">{selectedRentalRequest.renterName}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-500">Email Address</label>
                              <p className="text-sm text-gray-900 mt-1">{selectedRentalRequest.renterEmail}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-500">Phone Number</label>
                              <p className="text-sm text-gray-900 mt-1">{selectedRentalRequest.renterPhone}</p>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <label className="text-sm font-medium text-gray-500">Rental Period</label>
                              <p className="text-sm text-gray-900 mt-1">
                                {new Date(selectedRentalRequest.startDate).toLocaleDateString()} to {new Date(selectedRentalRequest.endDate).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-500">Total Days</label>
                              <p className="text-sm text-gray-900 mt-1">{selectedRentalRequest.totalDays} days</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-500">Total Amount</label>
                              <p className="text-sm text-gray-900 mt-1 font-semibold text-green-600">₦{selectedRentalRequest.totalAmount?.toLocaleString()}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-500">State</label>
                              <p className="text-sm text-gray-900 mt-1">{selectedRentalRequest.owner.state}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Vehicle Information */}
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                        Vehicle Information
                      </h2>
                      <div className="bg-gray-50 rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-500">Make & Model</label>
                            <p className="text-sm text-gray-900 mt-1">{selectedRentalRequest.car?.make || 'N/A'} {selectedRentalRequest.car?.model || ''}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Year</label>
                            <p className="text-sm text-gray-900 mt-1">{selectedRentalRequest.car?.year || 'N/A'}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">License Plate</label>
                            <p className="text-sm text-gray-900 mt-1 font-mono bg-white px-2 py-1 rounded border">{selectedRentalRequest.car?.licensePlate || 'N/A'}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Color</label>
                            <p className="text-sm text-gray-900 mt-1">{selectedRentalRequest.car?.color || 'N/A'}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Mileage</label>
                            <p className="text-sm text-gray-900 mt-1">{selectedRentalRequest.car?.mileage ? selectedRentalRequest.car.mileage.toLocaleString() + ' km' : 'N/A'}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Transmission</label>
                            <p className="text-sm text-gray-900 mt-1">{selectedRentalRequest.car?.transmission || 'N/A'}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Fuel Type</label>
                            <p className="text-sm text-gray-900 mt-1">{selectedRentalRequest.car?.fuelType || 'N/A'}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Seats</label>
                            <p className="text-sm text-gray-900 mt-1">{selectedRentalRequest.car?.seats ? `${selectedRentalRequest.car.seats} passengers` : 'N/A'}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Category</label>
                            <p className="text-sm text-gray-900 mt-1">{selectedRentalRequest.car?.type || selectedRentalRequest.car?.category || 'N/A'}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <label className="text-sm font-medium text-gray-500">Features</label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {selectedRentalRequest.car?.features?.length > 0 ? (
                              selectedRentalRequest.car.features.map((feature, index) => (
                                <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  {feature}
                                </span>
                              ))
                            ) : (
                              <span className="text-sm text-gray-500">No features listed</span>
                            )}
                          </div>
                        </div>

                        <div className="mt-4">
                          <label className="text-sm font-medium text-gray-500">Description</label>
                          <p className="text-sm text-gray-900 mt-1 bg-white p-3 rounded border">{selectedRentalRequest.car?.description || 'No description available'}</p>
                        </div>

                        {selectedRentalRequest.car?.insuranceValid !== undefined && (
                          <div className="mt-4 flex space-x-4">
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full mr-2 ${selectedRentalRequest.car.insuranceValid ? 'bg-green-400' : 'bg-red-400'}`}></div>
                              <span className="text-sm text-gray-700">
                                Insurance {selectedRentalRequest.car.insuranceValid ? 'Valid' : 'Invalid'}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full mr-2 ${selectedRentalRequest.car?.roadWorthyValid ? 'bg-green-400' : 'bg-red-400'}`}></div>
                              <span className="text-sm text-gray-700">
                                Road Worthy {selectedRentalRequest.car?.roadWorthyValid ? 'Valid' : 'Invalid'}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Rental Summary */}
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        Rental Summary
                      </h2>
                      <div className="bg-gray-50 rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-500">Daily Rate</label>
                            <p className="text-lg font-bold text-gray-900 mt-1">₦{selectedRentalRequest.car?.pricePerDay?.toLocaleString() || 'N/A'}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Rental Duration</label>
                            <p className="text-lg font-bold text-gray-900 mt-1">{selectedRentalRequest.totalDays} days</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Total Amount</label>
                            <p className="text-lg font-bold text-green-600 mt-1">₦{selectedRentalRequest.totalAmount?.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div>
                            <label className="text-sm font-medium text-gray-500">Start Date</label>
                            <p className="text-sm text-gray-900 mt-1">{new Date(selectedRentalRequest.startDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">End Date</label>
                            <p className="text-sm text-gray-900 mt-1">{new Date(selectedRentalRequest.endDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                        {selectedRentalRequest.message && (
                          <div className="mt-4">
                            <label className="text-sm font-medium text-gray-500">Admin Message</label>
                            <p className="text-sm text-gray-900 mt-1 bg-white p-3 rounded border">{selectedRentalRequest.message}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Car Photos */}
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Vehicle Photos
                      </h2>
                      <div className="bg-gray-50 rounded-lg p-6">
                        {selectedRentalRequest.car?.imageUrl ? (
                          <div className="max-w-md">
                            <img
                              src={selectedRentalRequest.car.imageUrl}
                              alt={`${selectedRentalRequest.car?.make || ''} ${selectedRentalRequest.car?.model || ''}`}
                              className="w-full h-48 object-cover rounded-lg border shadow-sm"
                            />
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-gray-500">No photo available</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {selectedRentalRequest.status === 'pending' && (
                      <div className="border-t border-gray-200 pt-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                          <button
                            onClick={() => {handleApproveRentalRequest(selectedRentalRequest.id); setSelectedRentalRequest(null);}}
                            className="flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-sm"
                          >
                            Approve Rental Request
                          </button>
                          <button
                            onClick={() => {handleDenyRentalRequest(selectedRentalRequest.id); setSelectedRentalRequest(null);}}
                            className="flex-1 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-sm"
                          >
                            Deny Rental Request
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Status Message */}
                    {selectedRentalRequest.status !== 'pending' && selectedRentalRequest.message && (
                      <div className="border-t border-gray-200 pt-6">
                        <div className={`border rounded-lg p-4 ${
                          selectedRentalRequest.status === 'approved' 
                            ? 'bg-green-50 border-green-200' 
                            : 'bg-red-50 border-red-200'
                        }`}>
                          <h3 className={`text-lg font-medium mb-2 ${
                            selectedRentalRequest.status === 'approved' 
                              ? 'text-green-800' 
                              : 'text-red-800'
                          }`}>
                            {selectedRentalRequest.status === 'approved' ? 'Approval Message' : 'Denial Reason'}
                          </h3>
                          <p className={selectedRentalRequest.status === 'approved' ? 'text-green-700' : 'text-red-700'}>
                            {selectedRentalRequest.message}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            ) : activeTab === 'rental-cars' ? (
              // Rental Cars Management Tab
              isAddingCar ? (
                <AddCarForm onSubmit={handleAddCar} onCancel={() => setIsAddingCar(false)} />
              ) : selectedCar ? (
                <CarDetailsView car={selectedCar} onBack={() => setSelectedCar(null)} onEdit={() => {}} />
              ) : (
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900">Rental Fleet Management</h1>
                        <p className="text-gray-600 mt-1">Manage cars available for rental</p>
                      </div>
                      <button
                        onClick={() => setIsAddingCar(true)}
                        className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
                      >
                        Add New Car
                      </button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Daily Rate</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {rentalCars.map(car => (
                          <tr key={car.id} className="hover:bg-gray-50 transition-colors duration-200">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <img 
                                  src={car.imageUrl} 
                                  alt={`${car.make} ${car.model}`}
                                  className="w-12 h-12 rounded-lg object-cover mr-3"
                                />
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {car.year} {car.make} {car.model}
                                  </div>
                                  <div className="text-sm text-gray-500">{car.licensePlate}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {car.type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              ₦{car.pricePerDay?.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                car.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {car.available ? 'Available' : 'Unavailable'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(car.addedDate).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                              <button
                                onClick={() => setSelectedCar(car)}
                                className="text-green-600 hover:text-green-900 transition-colors duration-200"
                              >
                                View
                              </button>
                              <button
                                onClick={() => handleToggleAvailability(car.id)}
                                className={`${car.available ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'} transition-colors duration-200`}
                              >
                                {car.available ? 'Disable' : 'Enable'}
                              </button>
                              <button
                                onClick={() => handleDeleteCar(car.id)}
                                className="text-red-600 hover:text-red-900 transition-colors duration-200"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            ) : (
              // Default tracking view
              !selectedTracking ? (
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-900">Car Tracking Dashboard</h1>
                    <p className="text-gray-600 mt-1">Monitor and track all rented vehicles in real-time</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Renter</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alerts</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {trackingData.map(tracking => (
                          <tr key={tracking.id} className="hover:bg-gray-50 transition-colors duration-200">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{tracking.carDetails}</div>
                                <div className="text-sm text-gray-500">{tracking.carId}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{tracking.renterName}</div>
                                <div className="text-sm text-gray-500">{tracking.renterPhone}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTrackingStatusColor(tracking.status)}`}>
                                {tracking.status.charAt(0).toUpperCase() + tracking.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{tracking.currentLocation.address}</div>
                              <div className="text-sm text-gray-500">
                                {tracking.gpsEnabled ? (
                                  <span className="flex items-center">
                                    <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                                    GPS Active
                                  </span>
                                ) : (
                                  <span className="flex items-center">
                                    <span className="w-2 h-2 bg-red-400 rounded-full mr-1"></span>
                                    GPS Inactive
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {tracking.alerts.length > 0 ? (
                                <span className="text-sm text-red-600 font-medium">{tracking.alerts.length} alert(s)</span>
                              ) : (
                                <span className="text-sm text-gray-500">No alerts</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => setSelectedTracking(tracking)}
                                className="text-green-600 hover:text-green-900 font-medium transition-colors duration-200"
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                // Enhanced Tracking Detail View with Map
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6 border-b border-gray-200">
                    <button
                      onClick={() => setSelectedTracking(null)}
                      className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-700 mb-4 transition-colors duration-200"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                      Back to Tracking
                    </button>
                    <div className="flex justify-between items-start">
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900">Vehicle Tracking Details</h1>
                        <p className="text-gray-600 mt-1">{selectedTracking.carDetails} - Real-time monitoring</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getTrackingStatusColor(selectedTracking.status)}`}>
                          {selectedTracking.status.charAt(0).toUpperCase() + selectedTracking.status.slice(1)}
                        </span>
                        {selectedTracking.gpsEnabled && (
                          <span className="flex items-center text-green-600 text-sm">
                            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                            Live GPS
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Vehicle Information */}
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Vehicle Information
                          </h2>
                          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Vehicle:</span>
                              <span className="font-medium">{selectedTracking.carDetails}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">License Plate:</span>
                              <span className="font-medium">{selectedTracking.carId}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Owner:</span>
                              <span className="font-medium">{selectedTracking.ownerName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Rental Period:</span>
                              <span className="font-medium">{selectedTracking.rentalPeriod}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Renter Information
                          </h2>
                          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Name:</span>
                              <span className="font-medium">{selectedTracking.renterName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Phone:</span>
                              <span className="font-medium">{selectedTracking.renterPhone}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Driving Statistics
                          </h2>
                          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Total Distance:</span>
                              <span className="font-medium">{selectedTracking.totalDistance.toFixed(1)} km</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Average Speed:</span>
                              <span className="font-medium">{selectedTracking.averageSpeed} km/h</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Max Speed:</span>
                              <span className="font-medium">{selectedTracking.maxSpeed} km/h</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Last Update:</span>
                              <span className="font-medium">{new Date(selectedTracking.lastUpdate).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        {/* Alerts Section */}
                        <div>
                          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.99-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            Active Alerts
                            {selectedTracking.alerts.length > 0 && (
                              <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                                {selectedTracking.alerts.length}
                              </span>
                            )}
                          </h2>
                          <div className="space-y-2">
                            {selectedTracking.alerts.length > 0 ? (
                              selectedTracking.alerts.map((alert, i) => (
                                <div key={i} className={`p-3 rounded-lg ${getAlertColor(alert.type)}`}>
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <span className="font-medium capitalize">{alert.type} Alert</span>
                                      <p className="text-sm mt-1">{alert.message}</p>
                                    </div>
                                    <span className="text-xs opacity-75">
                                      {new Date(alert.time).toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="p-4 bg-green-50 rounded-lg">
                                <p className="text-green-800">No active alerts - All systems normal</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Map and Route Information */}
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Real-time Location & Route
                          </h2>
                          
                          {/* Mock Map Component */}
                          <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-6 border-2 border-dashed border-gray-300 min-h-[400px] flex flex-col justify-center items-center relative overflow-hidden">
                            {/* Mock Map Background */}
                            <div className="absolute inset-0 opacity-10">
                              <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                                {Array.from({ length: 64 }).map((_, i) => (
                                  <div key={i} className="border border-gray-400"></div>
                                ))}
                              </div>
                            </div>
                            
                            {/* Current Location Marker */}
                            <div className="relative z-10 mb-4">
                              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                </svg>
                              </div>
                              <div className="absolute top-0 left-0 w-12 h-12 bg-red-400 rounded-full animate-ping opacity-30"></div>
                            </div>

                            {/* Route Path */}
                            <div className="absolute inset-0 z-0">
                              <svg className="w-full h-full" viewBox="0 0 400 400">
                                <path 
                                  d="M50 350 Q 150 250 200 200 T 350 50" 
                                  stroke="#10B981" 
                                  strokeWidth="3" 
                                  fill="none" 
                                  strokeDasharray="10,5"
                                  className="animate-pulse"
                                />
                                {/* Route markers */}
                                <circle cx="50" cy="350" r="6" fill="#10B981" opacity="0.7" />
                                <circle cx="150" cy="250" r="4" fill="#10B981" opacity="0.5" />
                                <circle cx="200" cy="200" r="4" fill="#10B981" opacity="0.5" />
                                <circle cx="350" cy="50" r="8" fill="#EF4444" />
                              </svg>
                            </div>

                            <div className="relative z-10 text-center">
                              <h3 className="text-lg font-semibold text-gray-800 mb-2">Live GPS Tracking</h3>
                              <p className="text-gray-600 mb-1">Current Location: {selectedTracking.currentLocation.address}</p>
                              <p className="text-sm text-gray-500">
                                Coordinates: {selectedTracking.currentLocation.lat?.toFixed(4)}, {selectedTracking.currentLocation.lng?.toFixed(4)}
                              </p>
                              <div className="mt-4 inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                                Tracking Active
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Route History */}
                        <div>
                          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Route History
                          </h2>
                          <div className="bg-gray-50 rounded-lg p-4 max-h-80 overflow-y-auto">
                            <div className="space-y-3">
                              {selectedTracking.route.slice(-10).reverse().map((point, i) => (
                                <div key={i} className="flex items-start space-x-3 pb-2 border-b border-gray-200 last:border-b-0">
                                  <div className={`w-3 h-3 rounded-full mt-1 ${i === 0 ? 'bg-red-500 animate-pulse' : 'bg-green-400'}`}></div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900">
                                      {point.address || `Lat: ${point.lat?.toFixed(4)}, Lng: ${point.lng?.toFixed(4)}`}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {new Date(point.time).toLocaleString()}
                                      {i === 0 && <span className="ml-2 text-red-600 font-medium">(Current)</span>}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </main>
        </div>
      </div>
      </div>
    </ErrorBoundary>
  );
}
