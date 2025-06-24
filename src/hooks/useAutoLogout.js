import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

export default function useAutoLogout() {
  const dispatch = useDispatch();

  useEffect(() => {
    const expiry = localStorage.getItem("tokenExpiry");
    if (!expiry) return;

    const expiryTime = parseInt(expiry);
    const now = Date.now();

    if (now >= expiryTime) {
      dispatch(logout());
    } else {
      const timeout = setTimeout(() => dispatch(logout()), expiryTime - now);
      return () => clearTimeout(timeout);
    }
  }, []);
}
