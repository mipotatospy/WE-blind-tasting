// export default function RatingQuestion({ question, value, onChange }) {
//     const numbers = Array.from(
//       { length: question.max - question.min + 1 },
//       (_, index) => question.min + index
//     );
  
//     return (
//       <div className="question-content">
//         <h2 className="question-title">{question.label}</h2>
  
//         <p className="question-subtitle">
//           Where {question.min} corresponds to “{question.minLabel}” and{" "}
//           {question.max} to “{question.maxLabel}”.
//         </p>
  
//         <div className="rating-options">
//           {numbers.map((number) => (
//             <button
//               key={number}
//               type="button"
//               className={`rating-button ${value === number ? "selected" : ""}`}
//               onClick={() => onChange(number)}
//             >
//               <span className="rating-star">☆</span>
//               <span className="rating-number">{number}</span>
//             </button>
//           ))}
//         </div>
//       </div>
//     );
//   }

export default function RatingQuestion({ question, value, onChange }) {
  const numbers = Array.from(
    { length: question.max - question.min + 1 },
    (_, index) => question.min + index
  );

  return (
    <div className="question-content">
      <h2 className="question-title">{question.label}</h2>

      <p className="question-subtitle">
        Where {question.min} corresponds to “{question.minLabel}” and{" "}
        {question.max} to “{question.maxLabel}”.
      </p>

      <div className="rating-options">
        {numbers.map((number) => {
          const isSelected = value === number;
          const isFilled = value != null && number <= value;

          return (
            <button
              key={number}
              type="button"
              className={`rating-button ${isSelected ? "selected" : ""} ${isFilled ? "filled" : ""}`}
              onClick={() => onChange(number)}
            >
              <span className="rating-star">
                {isFilled ? "★" : "☆"}
              </span>
              <span className="rating-number">{number}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}