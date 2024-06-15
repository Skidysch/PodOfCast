import { IAuthState, User } from "@/types/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist<IAuthState>(
    (set, get) => ({
      access: null,
      refresh: null,
      user: null,
      isAuthenticated: false,
      confirmationEmail: null,
      errorMessage: null,
      provider: null,

      // Setter functions
      setAccess: (access: string) => set({ access }),
      setRefresh: (refresh: string) => set({ refresh }),
      setUser: (user: User) => set({ user }),
      setIsAuthenticated: (isAuthenticated: boolean) =>
        set({ isAuthenticated }),
      setConfirmationEmail: (confirmationEmail: string) =>
        set({ confirmationEmail }),
      setErrorMessage: (errorMessage: string) => set({ errorMessage }),
      setProvider: (provider: "google-oauth2" | "spotify") => set({ provider }),
      clearUser: () => set({ user: null }),
      clearAccess: () => set({ access: null }),
      clearRefresh: () => set({ refresh: null }),
      clearState: () =>
        set({
          errorMessage: null,
        }),
      clearProvider: () => set({ provider: null }),

      // Hydrate state from localStorage or cookies
      hydrate: () => {
        const access = localStorage.getItem("access");
        const refresh = localStorage.getItem("refresh");
        const user = localStorage.getItem("user");

        if (access && refresh && user) {
          set({
            access,
            refresh,
            user: JSON.parse(user),
            isAuthenticated: true,
          });
        }
      },
    }),
    {
      name: "auth",
    }
  )
);

// Hydrate state immediately upon store creation
useAuthStore.getState().hydrate();

export default useAuthStore;
