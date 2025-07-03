import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const location = useLocation();
    
    // Check if user is authenticated
    const currentUser = localStorage.getItem('currentUser');
    const isAuthenticated = currentUser && JSON.parse(currentUser).isAuthenticated;
    
    if (!isAuthenticated) {
        // Redirect to login page with return url
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    
    return children;
}
