import { Navigate, Outlet } from "react-router-dom";
import  userAuth  from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { session } = userAuth();
  
  if (session === null) {
    return <div>Loading...</div>; 
  }

  return session ? <Outlet /> : <Navigate to="/"  replace/>; 
};

export default PrivateRoute;


