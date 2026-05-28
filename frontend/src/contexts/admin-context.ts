import { createContext } from "react";
import type { User } from "firebase/auth";

export interface AdminContextType {
  isAdmin: boolean;
  loading: boolean;
  logout: () => void;
  user: User | null;
}

export const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  loading: true,
  logout: () => {},
  user: null,
});
