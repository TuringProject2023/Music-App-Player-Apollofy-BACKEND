import { User } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
interface ProtectedRoutesInterface {
  user?: User | undefined;
  redirectPath: string;
  children: React.ReactNode;
}

export const ProtectedRoutes = ({ user, redirectPath, children }: ProtectedRoutesInterface) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};
