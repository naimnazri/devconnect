import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import ApiCatalogue from "./pages/ApiCatalogue";
import ApiDetail from "./pages/ApiDetail";
import SubscribeFlow from "./pages/SubscribeFlow";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import useAutoLogout from "./hooks/useAutoLogout";
import SubscriptionDetail from "./pages/SubscriptionDetail";

function App() {
  useAutoLogout();
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/api-catalogue" element={<ApiCatalogue />} />
        <Route path="/api/:slug" element={<ApiDetail />} />
        <Route path="/subscribe/:slug" element={<SubscribeFlow />} />
        <Route
          path="/subscription/:id"
          element={
            <PrivateRoute>
              <SubscriptionDetail />
            </PrivateRoute>
          }
        />
      </Routes>
      <Toaster position="top-center" />
    </>
  );
}

export default App;
