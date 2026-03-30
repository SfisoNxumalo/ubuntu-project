import { create } from "zustand";
import type { AuthUser } from "../interfaces/AuthUser";

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;

  login: (user: AuthUser) => void;
  logout: () => void;
}

//Stores our login details in memory, this can be persisted however the down side is that it uses local storage :(
export const useAuthStore = create<AuthState>()(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (user) =>
        set({
          user,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    })
);
