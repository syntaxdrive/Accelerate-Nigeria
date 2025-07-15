import React, { createContext, useContext, useState, useEffect } from 'react';

const CarContext = createContext();

export const useCarContext = () => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error('useCarContext must be used within a CarProvider');
  }
  return context;
};

// Initial rental cars data
const INITIAL_RENTAL_CARS = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    year: 2023,
    category: 'Sedan',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 5,
    pricePerDay: 15000,
    location: 'Lagos',
    image: '/api/placeholder/400/300',
    available: true,
    features: ['Air Conditioning', 'GPS', 'Bluetooth', 'USB Ports'],
    description: 'Comfortable and reliable sedan perfect for business trips and daily commuting.',
    dateAdded: '2024-01-15T10:00:00.000Z'
  },
  {
    id: '2',
    make: 'Honda',
    model: 'CR-V',
    year: 2022,
    category: 'SUV',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 7,
    pricePerDay: 20000,
    location: 'Abuja',
    image: '/api/placeholder/400/300',
    available: true,
    features: ['4WD', 'Air Conditioning', 'GPS', 'Backup Camera'],
    description: 'Spacious SUV ideal for family trips and off-road adventures.',
    dateAdded: '2024-01-16T11:30:00.000Z'
  },
  {
    id: '3',
    make: 'Hyundai',
    model: 'Elantra',
    year: 2023,
    category: 'Sedan',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 5,
    pricePerDay: 12000,
    location: 'Port Harcourt',
    image: '/api/placeholder/400/300',
    available: true,
    features: ['Air Conditioning', 'Bluetooth', 'USB Ports', 'Cruise Control'],
    description: 'Economical and stylish sedan with excellent fuel efficiency.',
    dateAdded: '2024-01-17T09:15:00.000Z'
  }
];

export const CarProvider = ({ children }) => {
  const [rentalCars, setRentalCars] = useState([]);
  const [rentalRequests, setRentalRequests] = useState([]);
  const [carListingRequests, setCarListingRequests] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadStoredData = () => {
      try {
        // Load rental cars
        const storedCars = localStorage.getItem('rentalCars');
        if (storedCars) {
          setRentalCars(JSON.parse(storedCars));
        } else {
          // Initialize with default cars if none exist
          setRentalCars(INITIAL_RENTAL_CARS);
          localStorage.setItem('rentalCars', JSON.stringify(INITIAL_RENTAL_CARS));
        }

        // Load rental requests
        const storedRentalRequests = localStorage.getItem('rentalRequests');
        if (storedRentalRequests) {
          setRentalRequests(JSON.parse(storedRentalRequests));
        }

        // Load car listing requests
        const storedCarListingRequests = localStorage.getItem('carListingRequests');
        if (storedCarListingRequests) {
          setCarListingRequests(JSON.parse(storedCarListingRequests));
        }
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
        // Initialize with default data if error occurs
        setRentalCars(INITIAL_RENTAL_CARS);
      }
    };

    loadStoredData();
  }, []);

  // Simple localStorage save function
  const saveToStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  // Car management functions
  const addRentalCar = (carData) => {
    const newCar = {
      ...carData,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString(),
      available: true
    };
    
    const updatedCars = [...rentalCars, newCar];
    setRentalCars(updatedCars);
    saveToStorage('rentalCars', updatedCars);
  };

  const updateRentalCar = (carId, updates) => {
    const updatedCars = rentalCars.map(car => 
      car.id === carId ? { ...car, ...updates } : car
    );
    setRentalCars(updatedCars);
    saveToStorage('rentalCars', updatedCars);
  };

  const deleteRentalCar = (carId) => {
    const updatedCars = rentalCars.filter(car => car.id !== carId);
    setRentalCars(updatedCars);
    saveToStorage('rentalCars', updatedCars);
  };

  const toggleCarAvailability = (carId) => {
    const updatedCars = rentalCars.map(car => 
      car.id === carId ? { ...car, available: !car.available } : car
    );
    setRentalCars(updatedCars);
    saveToStorage('rentalCars', updatedCars);
  };

  const getAvailableCars = () => {
    return rentalCars.filter(car => car.available);
  };

  const getCarById = (carId) => {
    return rentalCars.find(car => car.id === carId);
  };

  // Rental request functions
  const submitRentalRequest = (requestData) => {
    const newRequest = {
      ...requestData,
      id: Date.now().toString(),
      status: 'pending',
      dateSubmitted: new Date().toISOString(),
      type: 'rental_request',
      messages: []
    };
    
    const updatedRequests = [...rentalRequests, newRequest];
    setRentalRequests(updatedRequests);
    saveToStorage('rentalRequests', updatedRequests);
  };

  const cancelRentalRequest = (requestId) => {
    const updatedRequests = rentalRequests.filter(req => req.id !== requestId);
    setRentalRequests(updatedRequests);
    saveToStorage('rentalRequests', updatedRequests);
  };

  const approveRentalRequest = (requestId, message = '') => {
    const updatedRequests = rentalRequests.map(request => 
      request.id === requestId 
        ? { 
            ...request, 
            status: 'approved', 
            adminMessage: message,
            dateProcessed: new Date().toISOString() 
          }
        : request
    );
    setRentalRequests(updatedRequests);
    saveToStorage('rentalRequests', updatedRequests);
  };

  const denyRentalRequest = (requestId, message = '') => {
    const updatedRequests = rentalRequests.map(request => 
      request.id === requestId 
        ? { 
            ...request, 
            status: 'denied', 
            adminMessage: message,
            dateProcessed: new Date().toISOString() 
          }
        : request
    );
    setRentalRequests(updatedRequests);
    saveToStorage('rentalRequests', updatedRequests);
  };

  const addMessageToRequest = (requestId, message, sender = 'user') => {
    const messageData = {
      id: Date.now().toString(),
      message,
      sender,
      timestamp: new Date().toISOString()
    };

    const updatedRequests = rentalRequests.map(request => {
      if (request.id === requestId) {
        return {
          ...request,
          messages: [...(request.messages || []), messageData],
          hasUnreadAdminMessages: sender === 'admin'
        };
      }
      return request;
    });

    setRentalRequests(updatedRequests);
    saveToStorage('rentalRequests', updatedRequests);
  };

  const markMessagesAsRead = (requestId) => {
    const updatedRequests = rentalRequests.map(request => 
      request.id === requestId 
        ? { ...request, hasUnreadAdminMessages: false }
        : request
    );
    setRentalRequests(updatedRequests);
    saveToStorage('rentalRequests', updatedRequests);
  };

  const getRentalRequests = () => {
    return rentalRequests;
  };

  const getUserRentalRequests = (userEmail) => {
    return rentalRequests.filter(req => req.user?.email === userEmail);
  };

  const getPendingRequestsCount = () => {
    return rentalRequests.filter(req => req.status === 'pending').length;
  };

  // Car listing request functions
  const addCarListingRequest = (requestData) => {
    const newRequest = {
      ...requestData,
      id: Date.now().toString(),
      status: 'pending',
      dateSubmitted: new Date().toISOString(),
      type: 'car_listing',
      messages: []
    };
    
    const updatedRequests = [...carListingRequests, newRequest];
    setCarListingRequests(updatedRequests);
    saveToStorage('carListingRequests', updatedRequests);
  };

  const updateCarListingRequestStatus = (requestId, status, message = '') => {
    const updatedRequests = carListingRequests.map(request => {
      if (request.id === requestId) {
        const updatedRequest = {
          ...request,
          status,
          adminMessage: message,
          dateProcessed: new Date().toISOString()
        };

        // If approved, add the car to rental fleet
        if (status === 'approved') {
          addApprovedCarToFleet(request);
        }

        return updatedRequest;
      }
      return request;
    });

    setCarListingRequests(updatedRequests);
    saveToStorage('carListingRequests', updatedRequests);
  };

  const getCarListingRequests = () => {
    return carListingRequests;
  };

  const getPendingCarListingRequestsCount = () => {
    return carListingRequests.filter(req => req.status === 'pending').length;
  };

  const addApprovedCarToFleet = (listingRequest) => {
    const newCar = {
      id: Date.now().toString(),
      make: listingRequest.car.make,
      model: listingRequest.car.model,
      year: listingRequest.car.year,
      category: listingRequest.car.category,
      transmission: listingRequest.car.transmission,
      fuelType: listingRequest.car.fuelType,
      seats: listingRequest.car.seats,
      pricePerDay: listingRequest.pricing.pricePerDay,
      location: listingRequest.car.location,
      image: listingRequest.car.image || '/api/placeholder/400/300',
      available: true,
      features: listingRequest.car.features || [],
      description: listingRequest.car.description,
      dateAdded: new Date().toISOString(),
      owner: listingRequest.owner
    };

    const updatedCars = [...rentalCars, newCar];
    setRentalCars(updatedCars);
    saveToStorage('rentalCars', updatedCars);
  };

  const value = {
    // State
    rentalCars,
    rentalRequests,
    carListingRequests,
    
    // Car management
    addRentalCar,
    updateRentalCar,
    deleteRentalCar,
    toggleCarAvailability,
    getAvailableCars,
    getCarById,
    
    // Rental request management
    submitRentalRequest,
    cancelRentalRequest,
    approveRentalRequest,
    denyRentalRequest,
    addMessageToRequest,
    markMessagesAsRead,
    getRentalRequests,
    getUserRentalRequests,
    getPendingRequestsCount,
    
    // Car listing request management
    addCarListingRequest,
    updateCarListingRequestStatus,
    getCarListingRequests,
    getPendingCarListingRequestsCount,
    addApprovedCarToFleet
  };

  return (
    <CarContext.Provider value={value}>
      {children}
    </CarContext.Provider>
  );
};