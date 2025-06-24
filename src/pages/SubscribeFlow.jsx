import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "../api/axios"; // add this at top
import { useSelector } from "react-redux"; // get user info
import { toast } from "react-hot-toast";

export default function SubscribeFlow() {
  const user = useSelector((state) => state.auth.user);
  const { slug } = useParams();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    appName: "",
    appDescription: "",
    agreedToTerms: false,
  });

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  const handleSubmit = async () => {
    try {
      const payload = {
        apiSlug: slug,
        appName: formData.appName,
        appDescription: formData.appDescription,
        userEmail: user?.email || "anonymous@example.com",
        members: [
          {
            email: user?.email || "anonymous@example.com",
            role: "Owner",
          },
        ],
      };

      await axios.post("/subscriptions", payload);
      toast.success("Subscription successful!");

      next(); // go to confirmation
    } catch (err) {
      console.error("Failed to subscribe:", err);
      alert("Something went wrong while subscribing.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Subscribe to {slug}</h1>

      {step === 1 && (
        <>
          <label className="block mb-2">App Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded mb-4"
            value={formData.appName}
            onChange={(e) =>
              setFormData({ ...formData, appName: e.target.value })
            }
          />

          <label className="block mb-2">Description</label>
          <textarea
            className="w-full p-2 border rounded"
            value={formData.appDescription}
            onChange={(e) =>
              setFormData({ ...formData, appDescription: e.target.value })
            }
          ></textarea>

          <div className="flex justify-between mt-4">
            <div />
            <button
              onClick={next}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="font-semibold mb-2">Review Info</h2>
          <p>
            <strong>App Name:</strong> {formData.appName}
          </p>
          <p>
            <strong>Description:</strong> {formData.appDescription}
          </p>
          <div className="flex justify-between mt-4">
            <button onClick={back} className="text-gray-600">
              Back
            </button>
            <button
              onClick={next}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.agreedToTerms}
              onChange={(e) =>
                setFormData({ ...formData, agreedToTerms: e.target.checked })
              }
            />
            I agree to the Terms of Use
          </label>
          <div className="flex justify-between mt-4">
            <button onClick={back} className="text-gray-600">
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded"
              disabled={!formData.agreedToTerms}
            >
              Confirm
            </button>
          </div>
        </>
      )}

      {step === 4 && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            🎉 Subscribed!
          </h2>
          <p>
            Your subscription to <strong>{slug}</strong> is now active.
          </p>
        </div>
      )}
    </div>
  );
}
