import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import ConfirmDialog from "../components/ConfirmDialog";

export default function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  const [subscriptions, setSubscriptions] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`/subscriptions?userEmail=${user.email}`)
      .then((res) => setSubscriptions(res.data))
      .catch((err) => console.error("Failed to fetch subscriptions:", err));
  }, [user?.email]);

  const handleDelete = async () => {
    if (deleteId === null) return;
    try {
      await axios.delete(`/subscriptions/${deleteId}`);
      setSubscriptions((prev) => prev.filter((s) => s.id !== deleteId));
    } catch (err) {
      console.error("Failed to delete:", err);
      alert("Failed to remove subscription.");
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <>
      <DashboardLayout>
        <h1 className="text-2xl font-bold mb-6">👋 Welcome, {user?.name}</h1>
        <h2 className="text-lg font-semibold mb-4">📄 Your Subscriptions</h2>

      {subscriptions.length === 0 ? (
        <p>You haven’t subscribed to any APIs yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subscriptions.map((sub) => (
            <div
              key={sub.id}
              className="border rounded-lg p-4 shadow hover:shadow-md transition block"
            >
              <h3 className="text-lg font-bold">{sub.appName}</h3>
              <p className="text-sm text-gray-600">{sub.appDescription}</p>
              <p className="text-xs text-gray-400 mt-2">API: {sub.apiSlug}</p>

              <div className="mt-4 flex justify-between">
                <Link
                  to={`/api/${sub.apiSlug}`}
                  className="text-blue-600 text-sm underline"
                >
                  View Details
                </Link>
                <Link
                  to={`/subscription/${sub.id}`}
                  className="text-sm text-blue-600 underline"
                >
                  View Credentials
                </Link>

                <button
                  onClick={() => setDeleteId(sub.id)}
                  className="text-red-600 text-sm underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      </DashboardLayout>
      {deleteId !== null && (
        <ConfirmDialog
          title="Remove Subscription"
          message="Are you sure you want to remove this subscription?"
          confirmText="Remove"
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </>
  );
}
