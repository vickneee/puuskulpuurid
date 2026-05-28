import { type ReactNode, useEffect, useState } from "react";
import {onAuthStateChanged, signOut, type User} from "firebase/auth";
import {auth} from "../lib/firebase";
import { AdminContext } from "./admin-context";

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  // Initialize loading based on whether Firebase auth is available to avoid
  // calling setState synchronously inside the effect when Firebase is
  // disabled. This prevents the "Calling setState synchronously within an effect"
  // warning.
  const [loading, setLoading] = useState<boolean>(() => (auth ? true : false));

  useEffect(() => {
    if (!auth) {
      // Firebase disabled: nothing to subscribe to
      // `loading` was initialized accordingly so no setState is needed here.
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
