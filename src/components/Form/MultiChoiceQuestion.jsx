export default function MultiChoiceQuestion({ question, value = [], onChange }) {
    function toggleOption(option) {
      const isSelected = value.includes(option);
  
      if (isSelected) {
        onChange(value.filter((item) => item !== option));
        return;
      }
  
      if (value.length >= question.maxSelections) {
        return;
      }
  
      onChange([...value, option]);
    }
  
    return (
      <div className="question-content">
        <h2 className="question-title">{question.label}</h2>
  
        <p className="question-subtitle">
          Select up to {question.maxSelections}.
        </p>
  
        <div className="choice-options">
          {question.options.map((option) => {
            const selected = value.includes(option);
  
            return (
              <button
                key={option}
                type="button"
                className={`choice-button ${selected ? "selected" : ""}`}
                onClick={() => toggleOption(option)}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    );
  }