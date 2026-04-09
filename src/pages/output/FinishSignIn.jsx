import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { completeEmailLinkSignIn } from "../../services/authService.js";

export default function FinishSignIn() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Signing you in...");
  const [error, setError] = useState("");

  useEffect(() => {
    async function finishSignIn() {
      try {
        await completeEmailLinkSignIn();
        navigate("/category");
      } catch (err) {
        setError(err.message || "Could not complete sign-in.");
        setMessage("");
      }
    }

    finishSignIn();
  }, [navigate]);

  return (
    <div className="auth-card">
      {message && <p>{message}</p>}
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}