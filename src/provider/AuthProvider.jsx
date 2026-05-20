import { useUser } from "@clerk/react";
import { Navigate, useLocation } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const location = useLocation();
  const { isSignedIn } = useUser();
  console.log(isSignedIn);
  if (!isSignedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return children;
};

export default AuthProvider;
