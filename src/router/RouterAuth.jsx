import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export const RouterAuth = ({ children }) => {
  const { currentUser } = useAuthStore((state) => ({
    currentUser: state.currentUser || null,
  }));

  if (currentUser === undefined) {
    return null;
  }

  if (!currentUser) {
    return <Navigate to="/" />;
  }
  return children;
};
