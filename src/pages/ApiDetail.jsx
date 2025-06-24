import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

export default function ApiDetail() {
  const { slug } = useParams();
  const [api, setApi] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/apis?slug=${slug}`)
      .then((res) => {
        if (res.data.length > 0) {
          setApi(res.data[0]);
        }
      })
      .catch((err) => console.error("Error fetching API detail:", err));
  }, [slug]);

  if (!api) return <Spinner />;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{api.name}</h1>
      <p className="text-sm text-gray-600">{api.description}</p>
      <div className="text-xs text-gray-400 mb-4">Version: {api.version}</div>
      <div className="flex gap-2 mb-6">
        {api.tags.map((tag, idx) => (
          <span
            key={idx}
            className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
      <h2 className="text-lg font-semibold mb-2">📖 API Documentation</h2>
      <SwaggerUI url={api.swaggerUrl} />{" "}
      <button
        onClick={() => navigate(`/subscribe/${slug}`)}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Subscribe to This API
      </button>
    </div>
  );
}
