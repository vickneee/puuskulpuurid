import { type ReactNode, useEffect, useState } from "react";
import {onAuthStateChanged, signOut, type User} from "firebase/auth";
import {auth} from "../lib/firebase";
import { AdminContext } from "./admin-context";

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      // Firebase disabled: set user to null and stop loading
      setLoading(false);
      return;
    }

    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  const logout = () => {
    if (auth) {
      signOut(auth);
    }
  };

  return (
      <AdminContext.Provider value={{ isAdmin: !!user, loading, user, logout }}>
        {children}
      </AdminContext.Provider>
  );
};

