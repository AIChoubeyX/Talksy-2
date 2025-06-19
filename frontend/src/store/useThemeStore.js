import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("talksy-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("talksy-theme", theme);
    set({ theme });
  },
}));