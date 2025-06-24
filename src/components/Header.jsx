import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

export default function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!isAuthenticated) return null;

  return (
    <header className="bg-white shadow px-6 py-3 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-blue-600">
        DevConnect
      </Link>

      <nav className="flex gap-4 text-sm">
        <Link to="/api-catalogue" className="hover:underline">
          API Catalogue
        </Link>
        <Link to="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <button onClick={handleLogout} className="text-red-600 hover:underline">
          Logout
        </button>
      </nav>
    </header>
  );
}
