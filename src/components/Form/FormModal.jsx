// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getCurrentUser } from "../../services/authService";
// import { saveSubmission } from "../../services/submissionService";

// const descriptorsList = [
//   "Fruity",
//   "Floral",
//   "Dry",
//   "Sweet",
//   "Fresh",
//   "Bold",
// ];

// const wineOptionsByCategory = {
//   red: ["red_01", "red_02", "red_03"],
//   white: ["white_01", "white_02", "white_03"],
//   sparkling: [
//     "rose_01",
//     "rose_02",
//     "sparkling_01",
//     "sparkling_02",
//     "special_01",
//     "special_02",
//   ],
// };

// function getRealCategoryFromWineId(wineId) {
//   if (!wineId) return "";
//   return wineId.split("_")[0];
// }

// export default function FormModal({ category }) {
//   const navigate = useNavigate();

//   const [step, setStep] = useState(1);
//   const [wineId, setWineId] = useState("");
//   const [rating, setRating] = useState("");
//   const [descriptors, setDescriptors] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const wineOptions = wineOptionsByCategory[category] || [];
//   const realCategory = getRealCategoryFromWineId(wineId);

//   function toggleDescriptor(value) {
//     setDescriptors((prev) =>
//       prev.includes(value)
//         ? prev.filter((item) => item !== value)
//         : [...prev, value]
//     );
//   }

//   async function handleFinalSubmit() {
//     setErrorMessage("");

//     if (!wineId || !rating || descriptors.length === 0) {
//       setErrorMessage("Please answer all questions.");
//       return;
//     }

//     try {
//       setIsSubmitting(true);

//       const user = getCurrentUser();

//       await saveSubmission({
//         uid: user?.uid || null,
//         category: realCategory || category,
//         answers: {
//           wine_id: wineId,
//           overall_enjoyment: rating,
//           descriptors,
//         },
//       });

//       navigate("/result", {
//         state: {
//           wineId,
//           category: realCategory || category,
//         },
//       });
//     } catch (error) {
//       setErrorMessage(error.message || "Could not save the answers.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   return (
//     <div className="modal-overlay">
//       <div className="modal-window">
//         <h2>{(realCategory || category)} Wine Form</h2>

//         {step === 1 && (
//           <div className="step-block">
//             <label>
//               Select Wine ID
//               <select
//                 value={wineId}
//                 onChange={(e) => setWineId(e.target.value)}
//                 required
//               >
//                 <option value="">Choose one</option>
//                 {wineOptions.map((option) => (
//                   <option key={option} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             </label>

//             <div className="step-actions">
//               <button
//                 onClick={() => setStep(2)}
//                 disabled={!wineId}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}

//         {step === 2 && (
//           <div className="step-block">
//             <label>
//               Rate from 1 to 7
//               <select
//                 value={rating}
//                 onChange={(e) => setRating(e.target.value)}
//                 required
//               >
//                 <option value="">Choose one</option>
//                 {[1, 2, 3, 4, 5, 6, 7].map((num) => (
//                   <option key={num} value={num}>
//                     {num}
//                   </option>
//                 ))}
//               </select>
//             </label>

//             <div className="step-actions">
//               <button
//                 className="secondary-button"
//                 onClick={() => setStep(1)}
//               >
//                 Back
//               </button>
//               <button
//                 onClick={() => setStep(3)}
//                 disabled={!rating}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}

//         {step === 3 && (
//           <div className="step-block">
//             <p>Select one or more descriptors</p>

//             <div className="checkbox-grid">
//               {descriptorsList.map((item) => (
//                 <label key={item} className="checkbox-item">
//                   <input
//                     type="checkbox"
//                     checked={descriptors.includes(item)}
//                     onChange={() => toggleDescriptor(item)}
//                   />
//                   <span>{item}</span>
//                 </label>
//               ))}
//             </div>

//             {errorMessage && <p className="error-text">{errorMessage}</p>}

//             <div className="step-actions">
//               <button
//                 className="secondary-button"
//                 onClick={() => setStep(2)}
//               >
//                 Back
//               </button>
//               <button
//                 onClick={handleFinalSubmit}
//                 disabled={isSubmitting || descriptors.length === 0}
//               >
//                 {isSubmitting ? "Saving..." : "Submit"}
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "../../services/authService";
import { saveSubmission } from "../../services/submissionService";
import { questionSets } from "../../services/questionSets";

// Function to get the real category (e.g., "rose", "sparkling", etc.)
function getRealCategoryFromWineId(wineId) {
  if (!wineId) return "";
  return wineId.split("_")[0]; // Extract category (e.g., "rose", "sparkling", etc.)
}

export default function FormModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const { category } = location.state || {};  // Get the category passed from Category component

  const [step, setStep] = useState(1);
  const [wineId, setWineId] = useState("");
  const [rating, setRating] = useState("");
  const [descriptors, setDescriptors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(category);

  // Dynamically select the correct wine options based on category
  const wineOptions = category === "sparkling"
    ? [
        "sparkling_01",
        "sparkling_02",
        "sparkling_03",
        "sparkling_04",
        "sparkling_05",
        "sparkling_06",
        "sparkling_07",
        "rose_01",
        "rose_02",
        "rose_03",
        "rose_04",
        "rose_05",
        "rose_06",
        "special_01",
      ]
    : (category && questionSets[category] && questionSets[category][0]?.options) || [];

  // Handle the wineId selection and update the real category (rose, sparkling, etc.)
  function handleWineSelection(wineId) {
    const realCategory = getRealCategoryFromWineId(wineId);
    setWineId(wineId);
    setSelectedCategory(realCategory);  // Update selected category
  }

  // Handle descriptor toggle
  function toggleDescriptor(value) {
    setDescriptors((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  }

  // Handle final submit of the form
  async function handleFinalSubmit() {
    setErrorMessage("");

    if (!wineId || !rating || descriptors.length === 0) {
      setErrorMessage("Please answer all questions.");
      return;
    }

    try {
      setIsSubmitting(true);

      const user = getCurrentUser();

      await saveSubmission({
        uid: user?.uid || null,
        category: selectedCategory || category,  // Save the correct category (rose, sparkling, etc.)
        answers: {
          wine_id: wineId,
          overall_enjoyment: rating,
          descriptors,
        },
      });

      navigate("/result", {
        state: {
          wineId,
          category: selectedCategory || category,  // Pass the correct category to result page
        },
      });
    } catch (error) {
      setErrorMessage(error.message || "Could not save the answers.");
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    console.log("Wine Options:", wineOptions);
    console.log("Real Category:", selectedCategory);
  }, [wineId]);

  return (
    <div className="modal-overlay">
      <div className="modal-window">
        <h2>{(selectedCategory || category)} Wine Form</h2>

        {step === 1 && (
          <div className="step-block">
            <label>
              Select Wine ID
              <select
                value={wineId}
                onChange={(e) => handleWineSelection(e.target.value)}
                required
              >
                <option value="">Choose one</option>
                {wineOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <div className="step-actions">
              <button
                onClick={() => setStep(2)}
                disabled={!wineId}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step-block">
            <label>
              Rate from 1 to 7
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
              >
                <option value="">Choose one</option>
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </label>

            <div className="step-actions">
              <button
                className="secondary-button"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!rating}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-block">
            <p>Select one or more descriptors</p>

            <div className="checkbox-grid">
              {descriptorsList.map((item) => (
                <label key={item} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={descriptors.includes(item)}
                    onChange={() => toggleDescriptor(item)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>

            {errorMessage && <p className="error-text">{errorMessage}</p>}

            <div className="step-actions">
              <button
                className="secondary-button"
                onClick={() => setStep(2)}
              >
                Back
              </button>
              <button
                onClick={handleFinalSubmit}
                disabled={isSubmitting || descriptors.length === 0}
              >
                {isSubmitting ? "Saving..." : "Submit"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}