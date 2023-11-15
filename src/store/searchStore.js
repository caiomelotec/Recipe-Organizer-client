import { create } from "zustand";

export const useSearch = create((set) => ({
  searchString: "",
  setSearchString: (searchString) => set({ searchString }),
}));
