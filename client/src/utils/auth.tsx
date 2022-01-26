import { useEffect, useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const AUTH_QUERY = `
query Query {
  isAuth 
}
`;
export const ProtectedRoute: React.FC = () => {
  const [isAuth, setIsAuth] = useState(true);

  useEffect(() => {
    fetch("https://trueorfalseapp.herokuapp.com/graphql", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query: AUTH_QUERY }),
    })
      .then((r) => r.json())
      .then((data) => setIsAuth(data.data.isAuth));
  }, []);

  const location = useLocation();
  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
