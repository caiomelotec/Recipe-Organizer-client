import axios from "axios";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
  login: async (inputs) => {
    const res = await axios.post(
      "https://koch-8dbe7c0d957c.herokuapp.com/api/login",
      inputs,
      {
        withCredentials: true,
      }
    );
    set({ currentUser: res.data });
    localStorage.setItem("user", JSON.stringify(res.data));
  },
  logout: async () => {
    await axios.post(
      "https://koch-8dbe7c0d957c.herokuapp.com/api/logout",
      null,
      {
        withCredentials: true,
      }
    );
    set({ currentUser: null });
    localStorage.removeItem("user");
  },
}));

// export default useAuthStore;
