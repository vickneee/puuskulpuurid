import { useContext } from "react";
import { AdminContext } from "./admin-context";

export const useAdmin = () => useContext(AdminContext);
