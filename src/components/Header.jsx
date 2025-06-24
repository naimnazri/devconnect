import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import useTheme from "../hooks/useTheme";

export default function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [theme, setTheme] = useTheme();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!isAuthenticated) return null;

  return (
    <header className="bg-white dark:bg-gray-800 shadow px-6 py-3 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-blue-600">
        DevConnect
      </Link>

      <nav className="flex gap-4 text-sm items-center">
        <Link to="/api-catalogue" className="hover:underline">
          API Catalogue
        </Link>
        <Link to="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="hover:underline"
        >
          {theme === "dark" ? "Light" : "Dark"} Mode
        </button>
        <button onClick={handleLogout} className="text-red-600 hover:underline">
          Logout
        </button>
      </nav>
    </header>
  );
}
