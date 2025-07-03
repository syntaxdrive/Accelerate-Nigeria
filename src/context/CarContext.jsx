import React, { createContext, useContext, useState } from 'react';

const CarContext = createContext();

export const useCarContext = () => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error('useCarContext must be used within a CarProvider');
  }
  return context;
};

export const CarProvider = ({ children }) => {
  console.log('🏭 CarProvider instance created/re-rendered');
  
  // Initial rental cars data
  const [rentalCars, setRentalCars] = useState([
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
      rating: 4.8,
      reviews: 24
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
      rating: 4.6,
      reviews: 18
    },
    {
      id: 3,
      make: 'Mercedes-Benz',
      model: 'C-Class',
      year: 2024,
      type: 'Luxury',
      fuelType: 'Petrol',
      transmission: 'Automatic',
      pricePerDay: 35000,
      features: ['Leather Seats', 'Premium Sound System', 'Sunroof', 'Navigation System', 'Heated Seats'],
      imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400',
      available: true,
      location: 'Lagos',
      description: 'Luxury sedan with premium features and exceptional comfort for executive travel.',
      mileage: 5000,
      color: 'Black',
      seats: 5,
      licensePlate: 'LAG-789-EF',
      addedDate: '2024-02-01',
      rating: 4.9,
      reviews: 12
    },
    {
      id: 4,
      make: 'Hyundai',
      model: 'Elantra',
      year: 2023,
      type: 'Sedan',
      fuelType: 'Petrol',
      transmission: 'Manual',
      pricePerDay: 12000,
      features: ['Air Conditioning', 'Bluetooth', 'USB Ports'],
      imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
      available: true,
      location: 'Port Harcourt',
      description: 'Affordable and reliable sedan perfect for budget-conscious travelers.',
      mileage: 22000,
      color: 'Blue',
      seats: 5,
      licensePlate: 'PH-321-GH',
      addedDate: '2024-01-10',
      rating: 4.3,
      reviews: 31
    },
    {
      id: 5,
      make: 'Ford',
      model: 'Explorer',
      year: 2023,
      type: 'SUV',
      fuelType: 'Petrol',
      transmission: 'Automatic',
      pricePerDay: 25000,
      features: ['Air Conditioning', 'Bluetooth', 'Third Row Seating', 'Cargo Space'],
      imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400',
      available: false,
      location: 'Kano',
      description: 'Large SUV with ample space for big families and group travel.',
      mileage: 15000,
      color: 'Red',
      seats: 8,
      licensePlate: 'KN-654-IJ',
      addedDate: '2024-01-25',
      rating: 4.5,
      reviews: 19
    },
    {
      id: 6,
      make: 'Nissan',
      model: 'Altima',
      year: 2022,
      type: 'Sedan',
      fuelType: 'Petrol',
      transmission: 'CVT',
      pricePerDay: 14000,
      features: ['Air Conditioning', 'Bluetooth', 'Backup Camera', 'Keyless Entry'],
      imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400',
      available: true,
      location: 'Ibadan',
      description: 'Modern sedan with advanced safety features and smooth CVT transmission.',
      mileage: 25000,
      color: 'Gray',
      seats: 5,
      licensePlate: 'OY-987-KL',
      addedDate: '2024-02-05',
      rating: 4.4,
      reviews: 22
    }
  ]);

  // Rental requests state with localStorage persistence
  const [rentalRequests, setRentalRequests] = useState(() => {
    const stored = localStorage.getItem('rentalRequests');
    return stored ? JSON.parse(stored) : [];
  });

  // Save to localStorage whenever rentalRequests changes
  useEffect(() => {
    localStorage.setItem('rentalRequests', JSON.stringify(rentalRequests));
    console.log('💾 Saved rental requests to localStorage:', rentalRequests);
  }, [rentalRequests]);
  const addRentalCar = (car) => {
    const newCar = {
      ...car,
      id: Date.now(), // Simple ID generation
      addedDate: new Date().toISOString().split('T')[0],
      rating: 0,
      reviews: 0
    };
    setRentalCars(prev => [...prev, newCar]);
  };

  const updateRentalCar = (id, updates) => {
    setRentalCars(prev => 
      prev.map(car => car.id === id ? { ...car, ...updates } : car)
    );
  };

  const deleteRentalCar = (id) => {
    setRentalCars(prev => prev.filter(car => car.id !== id));
  };

  const toggleCarAvailability = (id) => {
    setRentalCars(prev => 
      prev.map(car => 
        car.id === id ? { ...car, available: !car.available } : car
      )
    );
  };

  // Get available cars for user rental page
  const getAvailableCars = () => {
    return rentalCars.filter(car => car.available);
  };

  // Get car by ID
  const getCarById = (id) => {
    return rentalCars.find(car => car.id === parseInt(id));
  };

  // Mock rental function (in real app, this would handle booking logic)
  const submitRentalRequest = (carId, rentalDetails) => {
    const car = getCarById(carId);
    if (!car) {
      return { success: false, message: 'Car not found' };
    }

    const requestId = `REQ${Date.now()}`;
    const newRequest = {
      id: requestId,
      carId: carId,
      car: car,
      renterName: rentalDetails.renterName,
      renterPhone: rentalDetails.renterPhone,
      renterEmail: rentalDetails.renterEmail || 'demo@example.com',
      startDate: rentalDetails.startDate,
      endDate: rentalDetails.endDate,
      totalDays: Math.ceil((new Date(rentalDetails.endDate) - new Date(rentalDetails.startDate)) / (1000 * 60 * 60 * 24)),
      totalAmount: Math.ceil((new Date(rentalDetails.endDate) - new Date(rentalDetails.startDate)) / (1000 * 60 * 60 * 24)) * car.pricePerDay,
      status: 'pending', // pending, approved, denied, cancelled
      dateSubmitted: new Date().toISOString(),
      message: null
    };

    console.log('DEBUG: Submitting rental request:', newRequest);
    setRentalRequests(prev => {
      const updated = [...prev, newRequest];
      console.log('DEBUG: Updated rental requests array:', updated);
      return updated;
    });
    
    return {
      success: true,
      requestId: requestId,
      message: 'Rental request submitted successfully!'
    };
  };

  // Cancel rental request
  const cancelRentalRequest = (requestId) => {
    setRentalRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { ...request, status: 'cancelled' }
          : request
      )
    );
    
    return {
      success: true,
      message: 'Rental request cancelled successfully!'
    };
  };

  // Admin: Approve rental request
  const approveRentalRequest = (requestId, message = 'Your rental request has been approved!') => {
    setRentalRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { ...request, status: 'approved', message: message, approvedDate: new Date().toISOString() }
          : request
      )
    );
    
    return {
      success: true,
      message: 'Rental request approved successfully!'
    };
  };

  // Admin: Deny rental request
  const denyRentalRequest = (requestId, message = 'Your rental request has been denied.') => {
    setRentalRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { ...request, status: 'denied', message: message, deniedDate: new Date().toISOString() }
          : request
      )
    );
    
    return {
      success: true,
      message: 'Rental request denied.'
    };
  };

  // Get rental requests for admin
  const getRentalRequests = () => {
    console.log('DEBUG: Getting rental requests:', rentalRequests);
    return rentalRequests;
  };

  // Get user's rental requests (by phone number for demo)
  const getUserRentalRequests = (renterPhone) => {
    return rentalRequests.filter(request => request.renterPhone === renterPhone);
  };

  // Get pending rental requests count
  const getPendingRequestsCount = () => {
    return rentalRequests.filter(request => request.status === 'pending').length;
  };

  // Convert approved car listing request to rental fleet car
  const addApprovedCarToFleet = (carRequest) => {
    const fleetCar = {
      id: Math.max(...rentalCars.map(car => car.id)) + 1,
      make: carRequest.car.make,
      model: carRequest.car.model,
      year: carRequest.car.year,
      type: carRequest.car.category || carRequest.car.type,
      fuelType: carRequest.car.fuelType,
      transmission: carRequest.car.transmission,
      pricePerDay: carRequest.pricing.dailyRate,
      features: carRequest.car.features || ['Air Conditioning', 'Bluetooth'],
      imageUrl: carRequest.images?.[0] || 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
      available: true,
      location: `${carRequest.owner.city}, ${carRequest.owner.state}`,
      description: carRequest.car.description || `${carRequest.car.year} ${carRequest.car.make} ${carRequest.car.model} available for rent.`,
      mileage: carRequest.car.mileage || 0,
      color: carRequest.car.color,
      seats: carRequest.car.seats || 5,
      licensePlate: carRequest.car.licensePlate,
      addedDate: new Date().toISOString().split('T')[0],
      rating: 4.5, // Default rating for new cars
      reviews: 0,
      ownerInfo: {
        name: carRequest.owner.name,
        email: carRequest.owner.email,
        phone: carRequest.owner.phone,
        city: carRequest.owner.city,
        state: carRequest.owner.state
      }
    };

    setRentalCars(prev => [...prev, fleetCar]);
    return fleetCar;
  };

  const value = {
    // Cars
    rentalCars,
    addRentalCar,
    updateRentalCar,
    deleteRentalCar,
    toggleCarAvailability,
    getAvailableCars,
    getCarById,
    
    // Rental Requests
    rentalRequests,
    submitRentalRequest,
    cancelRentalRequest,
    approveRentalRequest,
    denyRentalRequest,
    getRentalRequests,
    getUserRentalRequests,
    getPendingRequestsCount,
    addApprovedCarToFleet
  };

  return (
    <CarContext.Provider value={value}>
      {children}
    </CarContext.Provider>
  );
};
