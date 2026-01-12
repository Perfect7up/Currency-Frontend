// src/components/auth/protected-route.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../modules/account/store/auth.store';

export const ProtectedRoute = () => {
  const { isAuthenticated, tokens } = useAuthStore();

  // Debug to see if store is updating
  console.log('Protected Route Check:', { isAuthenticated, hasToken: !!tokens?.accessToken });

  if (!isAuthenticated && !tokens?.accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
