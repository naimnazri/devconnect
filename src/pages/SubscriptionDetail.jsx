import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { toast } from "react-hot-toast";
import UploadCertModal from "../components/UploadCertModal";
import InviteMemberModal from "../components/InviteMemberModal";

export default function SubscriptionDetail() {
  const { id } = useParams();
  const [subscription, setSubscription] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showInvite, setShowInvite] = useState(false);

  useEffect(() => {
    axios.get(`/subscriptions/${id}`).then((res) => {
      setSubscription(res.data);
    });
  }, [id]);

  if (!subscription) return <div className="p-6">Loading credentials...</div>;

  const handleInvite = async (email) => {
    try {
      const updated = {
        ...subscription,
        members: [...subscription.members, { email, role: "Member" }],
      };
      await axios.put(`/subscriptions/${subscription.id}`, updated);
      setSubscription(updated);
      setShowInvite(false);
      toast.success("Member invited!");
    } catch (err) {
      toast.error("Failed to invite.");
      console.error(err);
    }
  };

  const handleCertUpload = async (certInfo) => {
    try {
      const updated = {
        ...subscription,
        credentials: {
          ...subscription.credentials,
          certificate: certInfo,
        },
      };

      await axios.put(`/subscriptions/${subscription.id}`, updated);
      setSubscription(updated);
      toast.success("Certificate uploaded!");
      setShowModal(false);
    } catch (err) {
      toast.error("Failed to upload cert");
      console.error(err);
    }
  };

  const generateNewApiKey = async () => {
    const newKey = "api_" + Math.random().toString(36).slice(2, 12);
    const newClientId = "clientId_" + Math.random().toString(36).slice(2, 12);
    const newClientSecret =
      "clientSecret_" + Math.random().toString(36).slice(2, 12);

    try {
      const updated = {
        ...subscription,
        credentials: {
          ...subscription.credentials,
          apiKey: newKey,
          clientId: newClientId,
          clientSecret: newClientSecret,
        },
      };

      await axios.put(`/subscriptions/${subscription.id}`, updated);
      setSubscription(updated); // update UI
      toast.success("New API Key generated!");
    } catch (err) {
      console.error("Failed to update API key:", err);
      toast.error("Failed to generate new key.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">🔑 My Credentials</h1>
      <p className="mb-4 text-sm text-gray-500">
        API: <strong>{subscription.apiSlug}</strong>
      </p>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-semibold">API Key</label>
          <input
            readOnly
            value={subscription.credentials?.apiKey || ""}
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold">Client ID</label>
          <input
            readOnly
            value={subscription.credentials?.clientId || ""}
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold">Client Secret</label>
          <input
            readOnly
            value={subscription.credentials?.clientSecret || ""}
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={generateNewApiKey}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Generate New API Key
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
        >
          Upload Certificate
        </button>

        <button
          onClick={() => setShowInvite(true)}
          className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded"
        >
          Invite Member
        </button>
      </div>

      {showInvite && (
        <InviteMemberModal
          onClose={() => setShowInvite(false)}
          onInvite={handleInvite}
        />
      )}

      {showModal && (
        <UploadCertModal
          onClose={() => setShowModal(false)}
          onUpload={handleCertUpload}
        />
      )}

      {subscription.credentials?.certificate && (
        <div className="mt-6 text-sm bg-gray-100 p-4 rounded">
          <p>
            <strong>Subject:</strong>{" "}
            {subscription.credentials.certificate.subject}
          </p>
          <p>
            <strong>Issuer:</strong>{" "}
            {subscription.credentials.certificate.issuer}
          </p>
          <p>
            <strong>Valid To:</strong>{" "}
            {new Date(
              subscription.credentials.certificate.validTo
            ).toLocaleString()}
          </p>
        </div>
      )}
      <h2 className="text-lg font-semibold mt-8 mb-2">👥 Team Members</h2>
      <ul className="space-y-1">
        {subscription.members?.map((m, idx) => (
          <li key={idx} className="text-sm flex justify-between border-b py-1">
            <span>{m.email}</span>
            <span className="text-gray-500 text-xs">{m.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
