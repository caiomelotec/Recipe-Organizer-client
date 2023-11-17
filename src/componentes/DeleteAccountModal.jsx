import axios from "axios";
import React from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export const DeleteAccountModal = ({ deletemodal, setDeleteModal }) => {
  const { currentUser, logout } = useAuthStore((state) => ({
    currentUser: state.currentUser || null,
    logout: state.logout,
  }));

  // const { logout } = useAuthStore((state) => state);
  const navigate = useNavigate();

  const deleteUserById = async () => {
    const authToken = currentUser.token;
    try {
      await axios.delete("https://koch-8dbe7c0d957c.herokuapp.com/deleteuser", {
        withCredentials: true,
        headers: {
          Authorization: authToken,
        },
      });
      await logout();
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      className="delete-modal-container"
      style={deletemodal ? { top: "40%" } : { top: "-20rem" }}
    >
      <h3>Sind Sie sicher, dass Sie Ihr Konto löschen wollen?😭</h3>
      <button className="ja-btn" onClick={deleteUserById}>
        Ja
      </button>
      <button className="nein-btn" onClick={() => setDeleteModal(false)}>
        Nein
      </button>
    </div>
  );
};
