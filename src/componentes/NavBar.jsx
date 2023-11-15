import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { TfiWrite } from "react-icons/tfi";
import { AiOutlineHome } from "react-icons/ai";
import { useAuthStore } from "../store/authStore";
import { BsCardChecklist } from "react-icons/bs";

export const NavBar = ({ setToggle, currentUser }) => {
  const navigate = useNavigate();
  const { logout } = useAuthStore((state) => state);
  const handleLgout = async () => {
    try {
      setToggle(false);
      await logout();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <nav className="navbar-container">
      <div className="profile nav-item">
        <AiOutlineHome />
        <Link to="/" className="nav-link" onClick={() => setToggle(false)}>
          Home
        </Link>
      </div>
      <div className="profile nav-item">
        <CgProfile />
        <Link
          to={`/profile/${currentUser.id}`}
          className="nav-link"
          onClick={() => setToggle(false)}
        >
          Mein Profil
        </Link>
      </div>
      <div className="profile nav-item">
        <BsCardChecklist size={20} />
        <Link
          to={`/shoppingList/${currentUser.id}`}
          className="nav-link"
          onClick={() => setToggle(false)}
        >
          Meine Einkaufsliste
        </Link>
      </div>
      <div className="add-recipe-nav nav-item">
        <TfiWrite />
        <Link
          to="/addrecipe"
          className="nav-link"
          onClick={() => setToggle(false)}
        >
          Rezept eingeben
        </Link>
      </div>
      <div className="login-logout-nav nav-item">
        <FiLogOut />
        <span className="nav-link" onClick={handleLgout}>
          Ausloggen
        </span>
      </div>
    </nav>
  );
};
