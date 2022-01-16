import decode from 'jwt-decode'
import {useLocation, Navigate, Outlet} from 'react-router-dom'

export const isAuth = () => {
  const token = localStorage.getItem('token')
  try {
    decode(token as string)
  } catch (e: any) {
    return false
  }
  return true
}

export const me = () => {
  const token = localStorage.getItem('token')
  try {
    const decoded = decode(token as string)
    return decoded
  } catch (error) {
    return ''
  }
}

export const ProtectedRoute: React.FC = () => {
  const auth = isAuth()
  const location = useLocation()
  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} />
  }
  return <Outlet />
}
