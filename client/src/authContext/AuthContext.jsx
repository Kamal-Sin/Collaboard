
import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const useAuthContext = ()=>{
    return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check authentication status on app load
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
            
            // Try to validate user session first
            const userRes = await fetch(`${API_URL}/auth/user/validate`, {
                method: 'GET',
                credentials: 'include'
            });
            
            if (userRes.ok) {
                const userData = await userRes.json();
                setAuthUser("user");
                setUser({ userType: "user", ...userData });
                setLoading(false);
                return;
            }
            
            // Try to validate admin session
            const adminRes = await fetch(`${API_URL}/auth/admin/validate`, {
                method: 'GET',
                credentials: 'include'
            });
            
            if (adminRes.ok) {
                const adminData = await adminRes.json();
                setAuthUser("admin");
                setUser({ userType: "admin", ...adminData });
                setLoading(false);
                return;
            }
            
            // No valid session found
            setAuthUser(null);
            setUser(null);
            setLoading(false);
            
        } catch (error) {
            console.error('Auth check failed:', error);
            setAuthUser(null);
            setUser(null);
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
            
            // Call logout endpoint to invalidate session
            await fetch(`${API_URL}/auth/${authUser}/logout`, {
                method: 'GET',
                credentials: 'include'
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setAuthUser(null);
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{
            authUser, 
            setAuthUser, 
            user, 
            setUser, 
            loading, 
            checkAuthStatus,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};