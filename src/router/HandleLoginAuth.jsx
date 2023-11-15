import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export const HandleLoginAuth = ({ children }) => {
  const { currentUser } = useAuthStore((state) => ({
    currentUser: state.currentUser || null,
  }));

  if (currentUser) {
    // Redirect to "/" if the user is logged in
    return <Navigate to="/" />;
  }

  // Render the component's children if the user is not logged in
  return children;
};
