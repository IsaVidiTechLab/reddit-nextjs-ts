"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

type authContextType = {
  user: boolean | null;
  setUser: React.Dispatch<React.SetStateAction<boolean | null>>;
};

const authContextDefaultValues: authContextType = {
  user: false,
  setUser: () => false,
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<boolean | null>(() => {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  const value: authContextType = {
    user,
    setUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}


