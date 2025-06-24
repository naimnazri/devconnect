import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import Spinner from "../components/Spinner";

export default function ApiCatalogue() {
  const [apis, setApis] = useState([]);

  useEffect(() => {
    axios
      .get("/apis")
      .then((res) => setApis(res.data))
      .catch((err) => console.error("Error fetching APIs:", err));
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📚 API Catalogue</h1>

      {apis.length === 0 ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {apis.map((api) => (
            <Link
              key={api.id}
              to={`/api/${api.slug}`}
              className="border rounded-lg p-4 shadow hover:shadow-md transition block cursor-pointer"
            >
              <h2 className="text-xl font-semibold">{api.name}</h2>
              <p className="text-sm text-gray-600">{api.description}</p>
              <p className="text-xs text-gray-400 mt-2">
                Version: {api.version}
              </p>
              <div className="flex gap-2 mt-2">
                {api.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
