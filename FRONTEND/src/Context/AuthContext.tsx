import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api.ts';
import { getToken, removeToken, saveToken } from '../Context/AuthContext';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    modules: string[];
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    isAuthorized: (module: string) => boolean;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = getToken();
            if (token) {
                try {
                    const { data } = await api.get('/auth/profile');
                    setUser(data);
                } catch (error) {
                    removeToken();
                }
            }
            setLoading(false);
        };
        initAuth();
    }, []);
    

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            setLoading(true);
            // DEV ONLY: Bypass authentication in development
            if (import.meta.env.NODE_ENV === 'development' && (password === 'dev' || email === 'dev@dev.com')) {
                // Mock user for development
                const devUser = {
                    id: '1',
                    name: 'Dev User',
                    email: email || 'dev@dev.com',
                    role: 'admin',
                    modules: ['dashboard', 'users', 'settings']
                };
                setUser(devUser);
                saveToken('dev-token');
                return true;
            }

            // Normal authentication flow
            const { data } = await api.post('/auth/login', { email, password });
            if (data.user && data.token) {
                setUser(data.user);
                saveToken(data.token);
                return true;
            }
            throw new Error('Invalid response format');
        } catch (error) {
            console.error('Login error:', error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        removeToken();
        setUser(null);
    };

    const isAuthorized = (module: string): boolean => {
        return user?.modules.includes(module) || false;
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, isAuthorized }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};