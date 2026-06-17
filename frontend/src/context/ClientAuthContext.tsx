import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: number;
  username: string;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  bio: string | null;
  is_admin: boolean;
}

interface ClientAuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
  loading: boolean;
}

const ClientAuthContext = createContext<ClientAuthContextType | undefined>(undefined);

export const ClientAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('client_token'));
  const [loading, setLoading] = useState(true);

  const fetchUser = async (authToken: string) => {
    try {
      const res = await axios.get('http://localhost:8000/api/auth/me', {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setUser(res.data);
    } catch (error) {
      console.error("Failed to fetch user", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser(token);
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = (newToken: string) => {
    localStorage.setItem('client_token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('client_token');
    setToken(null);
    setUser(null);
  };

  const refreshUser = async () => {
    if (token) {
      await fetchUser(token);
    }
  };

  return (
    <ClientAuthContext.Provider value={{ user, token, login, logout, refreshUser, loading }}>
      {children}
    </ClientAuthContext.Provider>
  );
};

export const useClientAuth = () => {
  const context = useContext(ClientAuthContext);
  if (context === undefined) {
    throw new Error('useClientAuth must be used within a ClientAuthProvider');
  }
  return context;
};
