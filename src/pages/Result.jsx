import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const wineCategory = location.state?.wineCategory;
  const selectedWineId = location.state?.selectedWineId;

  const [wineData, setWineData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchWine() {
      if (!selectedWineId) {
        setError("No wine selected.");
        setLoading(false);
        return;
      }

      try {
        const wineRef = doc(db, "wineResults", selectedWineId);
        const wineSnap = await getDoc(wineRef);

        if (wineSnap.exists()) {
          const data = wineSnap.data();
          console.log("Fetched wine data:", data);
          setWineData(data);
        } else {
          setError("Wine not found.");
        }
      } catch (err) {
        console.error("Error fetching wine:", err);
        setError("Something went wrong while loading the wine.");
      } finally {
        setLoading(false);
      }
    }

    fetchWine();
  }, [selectedWineId]);

  if (loading) {
    return (
      <div className="page result-page">
        <p>Loading selected wine...</p>
      </div>
    );
  }

  if (error || !wineData) {
    return (
      <div className="page result-page">
        <p>{error || "Wine not found."}</p>
        <button onClick={() => navigate("/category")}>Back to categories</button>
      </div>
    );
  }

  const regionImagePath = `/src/assets/regions/${wineData.region}.png`;

  return (
    <div className={`page result-page result-page--${wineData.category}`}>
      <div className="wine-result-card">
        {/* <div className="wine-hero-circle">
          <div className="wine-category-label">{wineData.category}</div>

          <img
            src={wineData.imageUrl}
            alt={wineData.name}
            className="wine-bottle-image"
          />
        </div>

        <div className="wine-result-dot" /> */}

        <div className="wine-result-content">
          <h1 className="wine-result-title">{wineData.name}</h1>

          <div className="wine-result-meta">
            <p className="wine-result-appellation">
              {wineData.appellation || ""}
            </p>
            <p className="wine-result-vintage">
              {wineData.vintage || ""}
            </p>
          </div>

          <div className="wine-result-region-block">
            <img
              src={regionImagePath}
              alt={wineData.region}
              className="wine-result-region-image"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <p className="wine-result-region-name">{wineData.region}</p>
          </div>
        </div>

        <button
          className="wine-result-back-button"
          onClick={() => navigate("/category")}
        >
          Next tasting
        </button>
      </div>
    </div>
  );
}