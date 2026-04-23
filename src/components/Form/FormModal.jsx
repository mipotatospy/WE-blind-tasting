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

// export default function FormModal({ category }) {
//   const navigate = useNavigate();

//   const [step, setStep] = useState(1);
//   const [wineId, setWineId] = useState("");
//   const [rating, setRating] = useState("");
//   const [descriptors, setDescriptors] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

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
//         category,
//         wineId,
//         rating,
//         descriptors,
//       });

//       navigate("/result", {
//         state: {
//           wineId,
//           category,
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
//         <h2>{category} Wine Form</h2>

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
//                 <option value="1">1</option>
//                 <option value="2">2</option>
//                 <option value="3">3</option>
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


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../services/authService";
import { saveSubmission } from "../../services/submissionService";

const descriptorsList = [
  "Fruity",
  "Floral",
  "Dry",
  "Sweet",
  "Fresh",
  "Bold",
];

const wineOptionsByCategory = {
  red: ["red_01", "red_02", "red_03"],
  white: ["white_01", "white_02", "white_03"],
  sparkling: [
    "rose_01",
    "rose_02",
    "sparkling_01",
    "sparkling_02",
    "special_01",
    "special_02",
  ],
};

function getRealCategoryFromWineId(wineId) {
  if (!wineId) return "";
  return wineId.split("_")[0];
}

export default function FormModal({ category }) {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [wineId, setWineId] = useState("");
  const [rating, setRating] = useState("");
  const [descriptors, setDescriptors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const wineOptions = wineOptionsByCategory[category] || [];
  const realCategory = getRealCategoryFromWineId(wineId);

  function toggleDescriptor(value) {
    setDescriptors((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  }

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
        category: realCategory || category,
        answers: {
          wine_id: wineId,
          overall_enjoyment: rating,
          descriptors,
        },
      });

      navigate("/result", {
        state: {
          wineId,
          category: realCategory || category,
        },
      });
    } catch (error) {
      setErrorMessage(error.message || "Could not save the answers.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-window">
        <h2>{(realCategory || category)} Wine Form</h2>

        {step === 1 && (
          <div className="step-block">
            <label>
              Select Wine ID
              <select
                value={wineId}
                onChange={(e) => setWineId(e.target.value)}
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