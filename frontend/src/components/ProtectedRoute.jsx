import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  if (localStorage.getItem('isAdminLoggedIn') === 'true') {
    return children;
  }
  return <Navigate to="/admin/login" replace />;
}
