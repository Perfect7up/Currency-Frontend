import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../modules/account/store/auth.store';

export const ProtectedRoute = () => {
  const { isAuthenticated, tokens } = useAuthStore();
  const location = useLocation();

  const isLogged = isAuthenticated || !!tokens?.accessToken;

  if (!isLogged) {
    return <Navigate to="/account/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
