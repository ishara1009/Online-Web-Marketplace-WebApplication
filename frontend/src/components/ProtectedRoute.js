import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import apiClient from '../services/apiClient';

export default function ProtectedRoute({ children, roles }) {
  const location = useLocation();
  const [state, setState] = useState({ loading: true, user: null });

  useEffect(() => {
    let active = true;
    apiClient.get('/auth/me')
      .then(({ data }) => {
        if (!active) return;
        localStorage.setItem('user', JSON.stringify(data.user));
        setState({ loading: false, user: data.user });
      })
      .catch(() => {
        if (!active) return;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setState({ loading: false, user: null });
      });
    return () => { active = false; };
  }, []);

  if (state.loading) return <main className="route-loading"><span aria-hidden="true"/><p>Checking your account…</p></main>;
  if (!state.user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (roles?.length && !roles.includes(state.user.role)) {
    const destination = state.user.role === 'admin' ? '/admin/dashboard' : state.user.role === 'seller' ? '/seller/dashboard' : '/user/dashboard';
    return <Navigate to={destination} replace />;
  }
  return children;
}
