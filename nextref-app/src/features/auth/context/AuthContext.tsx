import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';

type AuthContextType = {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
    role: string | null;
    userId: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [role, setRole] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const logoutTimeout = useRef<number | null>(null);

    useEffect(() => {
        if (logoutTimeout.current) {
            clearTimeout(logoutTimeout.current);
        }

        if (token) {
            const tokenPayload: any = jwtDecode(token);
            setRole(tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
            setUserId(tokenPayload['sub']);

            // TODO : Gérer un refreshToken, commencer par créer un endpoint pour le récupérer
            // Gestion de l'expiration
            if (tokenPayload.exp) {
                const exp = tokenPayload.exp * 1000; // exp est en secondes
                const now = Date.now();
                const timeout = exp - now;
                if (timeout > 0) {
                    logoutTimeout.current = window.setTimeout(() => {
                        logout();
                    }, timeout);
                } else {
                    logout();
                }
            }
        }
        return () => {
            if (logoutTimeout.current) {
                clearTimeout(logoutTimeout.current);
            }
        };
    }, [token]);

    const login = (token: string) => {
        localStorage.setItem('token', token);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setRole(null);
        setUserId(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!token, login, logout, role, userId }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
