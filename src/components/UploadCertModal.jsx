import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { X509Certificate } from "@peculiar/x509";

export default function UploadCertModal({ onClose, onUpload }) {
  const [certInfo, setCertInfo] = useState(null);

  const onDrop = (acceptedFiles) => {
    const reader = new FileReader();
    reader.onload = () => {
      const raw = reader.result;
      const cert = new X509Certificate(raw);
      setCertInfo({
        subject: cert.subject,
        issuer: cert.issuer,
        validFrom: cert.notBefore,
        validTo: cert.notAfter,
        rawPem: raw,
      });
    };
    reader.readAsText(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/x-pem-file": [".pem"] },
    maxFiles: 1,
    onDrop,
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">📥 Upload Certificate</h2>
        <div
          {...getRootProps()}
          className="border p-4 rounded cursor-pointer text-center"
        >
          <input {...getInputProps()} />
          <p>Drag and drop a .pem file here, or click to select</p>
        </div>

        {certInfo && (
          <div className="mt-4 text-sm bg-gray-50 dark:bg-gray-700 p-3 rounded border">
            <p>
              <strong>Subject:</strong> {certInfo.subject}
            </p>
            <p>
              <strong>Issuer:</strong> {certInfo.issuer}
            </p>
            <p>
              <strong>Valid From:</strong> {certInfo.validFrom.toString()}
            </p>
            <p>
              <strong>Valid To:</strong> {certInfo.validTo.toString()}
            </p>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="text-gray-500 hover:underline">
            Cancel
          </button>
          <button
            onClick={() => onUpload(certInfo)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={!certInfo}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
