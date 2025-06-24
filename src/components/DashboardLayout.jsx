import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // requires lucide-react

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile header with toggle */}
      <div className="flex items-center justify-between px-4 py-3 bg-white shadow md:hidden">
        <Link to="/" className="text-lg font-bold text-blue-600">
          DevConnect
        </Link>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-white shadow md:h-auto h-screen z-50 absolute md:relative`}
      >
        <div className="p-6 font-bold text-blue-600 border-b text-lg md:block hidden">
          DevConnect
        </div>
        <nav className="p-4 space-y-2">
          <Link to="/dashboard" className="block hover:underline">
            📄 My Subscriptions
          </Link>
          <Link to="/api-catalogue" className="block hover:underline">
            📚 API Catalogue
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-50 p-6">{children}</main>
    </div>
  );
}
