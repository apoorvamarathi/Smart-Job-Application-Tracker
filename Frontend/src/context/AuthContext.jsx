// // src/context/AuthContext.jsx
// import React, { createContext, useState, useEffect, useContext } from 'react';
// import api from '../utils/api';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [token, setToken] = useState(localStorage.getItem('token'));

//   useEffect(() => {
//     if (token) {
//       api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       fetchUser();
//     } else {
//       setLoading(false);
//     }
//   }, [token]);

//   const fetchUser = async () => {
//     try {
//       const { data } = await api.get('/auth/me'); // you need to add this endpoint in backend
//       setUser(data);
//     } catch (error) {
//       console.error(error);
//       logout();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const login = async (email, password) => {
//     const { data } = await api.post('/auth/login', { email, password });
//     localStorage.setItem('token', data.token);
//     setToken(data.token);
//     setUser(data);
//   };

//   const register = async (userData) => {
//     const { data } = await api.post('/auth/register', userData);
//     localStorage.setItem('token', data.token);
//     setToken(data.token);
//     setUser(data);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setToken(null);
//     setUser(null);
//     delete api.defaults.headers.common['Authorization'];
//   };

//   const value = { user, loading, login, register, logout };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };


// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

// ✅ custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};

// ✅ provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // get token from localStorage
  const [token, setToken] = useState(localStorage.getItem('token'));

  // ✅ run when token changes
  useEffect(() => {
    if (token) {
      // set token in axios
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  // ✅ get user from backend
  const fetchUser = async () => {
    try {
      const { data } = await api.get('/auth/me'); // make sure backend has this
      setUser(data);
    } catch (error) {
      console.error('Fetch user error:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // ✅ login
  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });

      localStorage.setItem('token', data.token);
      setToken(data.token);

      setUser(data); // user info
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // ✅ register
  const register = async (userData) => {
    try {
      const { data } = await api.post('/auth/register', userData);

      localStorage.setItem('token', data.token);
      setToken(data.token);

      setUser(data);
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  // ✅ logout
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);

    delete api.defaults.headers.common['Authorization'];
  };

  // ✅ value passed to app
  const value = {
    user,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};