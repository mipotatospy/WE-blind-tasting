import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWineResultById } from "../../services/submissionService";

export default function ResultCard({ wineId, category }) {
  const navigate = useNavigate();

  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchResult() {
      try {
        setIsLoading(true);
        const data = await getWineResultById(wineId);

        if (!data) {
          setErrorMessage(`No wine result found for ID ${wineId}.`);
          setResult(null);
          return;
        }

        setResult(data);
      } catch (error) {
        setErrorMessage(error.message || "Could not load result.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchResult();
  }, [wineId]);

  function handleStartOver() {
    navigate("/category");
  }

  if (isLoading) {
    return <p>Loading result...</p>;
  }

  if (errorMessage) {
    return (
      <div className="result-card">
        <h2>Result</h2>
        <p className="error-text">{errorMessage}</p>
        <button onClick={handleStartOver}>Back to Category</button>
      </div>
    );
  }

  return (
    <div className="result-card">
      <h1>Your Result</h1>

      {category && (
        <p>
          <strong>Selected category:</strong> {category}
        </p>
      )}

      <p>
        <strong>Wine ID:</strong> {result.id}
      </p>

      <p>
        <strong>Name:</strong> {result.name || "—"}
      </p>

      <p>
        <strong>Type:</strong> {result.type || "—"}
      </p>

      <p>
        <strong>Description:</strong> {result.description || "—"}
      </p>

      <p>
        <strong>Origin:</strong> {result.origin || "—"}
      </p>

      <button onClick={handleStartOver}>Back to Category</button>
    </div>
  );
}