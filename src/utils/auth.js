import { useState, useEffect } from 'react';

export function useAuth() {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const userData = JSON.parse(currentUser);
            if (userData.isAuthenticated) {
                setUser(userData);
                setIsAuthenticated(true);
            }
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('currentUser');
        setUser(null);
        setIsAuthenticated(false);
    };

    return { user, isAuthenticated, logout };
}

export function getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
}

export function isUserAuthenticated() {
    const user = getCurrentUser();
    return user && user.isAuthenticated;
}
