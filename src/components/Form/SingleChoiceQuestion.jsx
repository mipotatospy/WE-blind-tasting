export default function SingleChoiceQuestion({ question, value, onChange }) {
    return (
      <div className="question-content">
        <h2 className="question-title">{question.label}</h2>
  
        <div className="choice-options">
          {question.options.map((option) => {
            const selected = value === option;
  
            return (
              <button
                key={option}
                type="button"
                className={`choice-button ${selected ? "selected" : ""}`}
                onClick={() => onChange(option)}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    );
  }