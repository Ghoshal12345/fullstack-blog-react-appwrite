import React, { useEffect, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from './components/index';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    // A variable to track whether the component is still mounted
    let isMounted = true;

    authService.getCurrentUser().then((userData) => {
      if (isMounted) {
        dispatch(userData ? login(userData) : logout());
      }
    }).finally(() => isMounted && setLoading(false));

    return () => { isMounted = false; };
  }, [authStatus, dispatch]);

  if (loading) {
    return (
      <div className="loading-page">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="inset-0 absolute min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
