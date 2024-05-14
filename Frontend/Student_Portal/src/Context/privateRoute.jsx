import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

export const PrivateRouter = ({ children }) => {
  const { LoggedIn } = useAuth();
  return (
    <>
      {LoggedIn.isAuth && LoggedIn.isAdmin !== "admin" ? (
        children
      ) : LoggedIn.isAuth ? (
        <Navigate to="/" />
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export const PrivateRouterUser = ({ children }) => {
  const { LoggedIn } = useAuth();
  return (
    <>
      {LoggedIn.isAuth && LoggedIn.isAdmin !== "admin" ? (
        children
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};
