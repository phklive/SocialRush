import {useLocation, Navigate, Outlet} from 'react-router-dom'

export const ProtectedRoute: React.FC = () => {
  const isAuth = true
  const location = useLocation()
  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} />
  }
  return <Outlet />
}

export default ProtectedRoute
