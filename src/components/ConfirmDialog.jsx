import React from "react";

export default function ConfirmDialog({
  title = "Confirm",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        {title && <h2 className="text-lg font-bold mb-4">{title}</h2>}
        {message && <p className="mb-4">{message}</p>}
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="text-gray-500 hover:underline">
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
