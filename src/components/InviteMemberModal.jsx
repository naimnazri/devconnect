import { useState } from "react";

export default function InviteMemberModal({ onClose, onInvite }) {
  const [email, setEmail] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Invite Team Member</h2>
        <input
          type="email"
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="text-gray-500 hover:underline">
            Cancel
          </button>
          <button
            onClick={() => onInvite(email)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Invite
          </button>
        </div>
      </div>
    </div>
  );
}
