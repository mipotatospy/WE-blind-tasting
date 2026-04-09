import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { questionSets } from "../data/questionSets";
import QuestionRenderer from "../components/Form/QuestionRenderer";
import { saveSubmission } from "../services/saveSubmission";

export default function Form() {
  const location = useLocation();
  const navigate = useNavigate();

  const wineCategory = location.state?.category;

  const questions = useMemo(() => {
    if (!wineCategory) return [];
    return questionSets[wineCategory] || [];
  }, [wineCategory]);

  const [answers, setAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  if (!wineCategory) {
    return (
      <div className="page form-page">
        <h1>No wineCategory selected</h1>
        <button onClick={() => navigate("/wineCategory")}>Go back</button>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="page form-page">
        <h1>{wineCategory.charAt(0).toUpperCase() + wineCategory.slice(1)} Wine Form</h1>
        <p>This wineCategory has no questions yet.</p>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === questions.length - 1;

  function updateAnswer(questionId, value) {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  }

  function isCurrentQuestionAnswered() {
    const value = answers[currentQuestion.id];

    if (!currentQuestion.required) return true;

    if (currentQuestion.type === "multi") {
      return Array.isArray(value) && value.length > 0;
    }

    return value !== undefined && value !== null && value !== "";
  }

  function handlePrevious() {
    setError("");
    setCurrentStep((prev) => prev - 1);
  }

  function handleNext() {
    if (!isCurrentQuestionAnswered()) {
      setError("Please answer this question before continuing.");
      return;
    }

    setError("");
    setCurrentStep((prev) => prev + 1);
  }

  async function handleSubmit() {
    if (!isCurrentQuestionAnswered()) {
      setError("Please answer this question before submitting.");
      return;
    }

    setError("");
    setIsSaving(true);

    try {
      const submissionId = await saveSubmission({
        category: wineCategory,
        answers,
      });

      // navigate("/result", {
      //   state: {
      //     wineCategory,
      //     answers,
      //     submissionId,
      //   },
      // });
      console.log("Submitting answers:", answers);
      console.log("Wine-related values:", {
        wineIdInput: answers.wineIdInput,
        wineId: answers.wineId,
        selectedWine: answers.selectedWine,
      });
      navigate("/result", {
        state: {
          wineCategory,
          selectedWineId: answers.wine_id,
          submissionId,
        },
      });
    } catch (err) {
      console.error("Error saving submission:", err);
      setError("Something went wrong while saving your submission.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="page form-page">
      <div className="content-container">

        
      <button onClick={() => navigate("/category")} className="back-button">Back to Categories</button>
        <div className="question-panel">
          <div className="progress-bar">
            {questions.map((_, index) => (
              <span
                key={index}
                className={`progress-segment ${
                  index === currentStep
                    ? "active"
                    : index < currentStep
                    ? "completed"
                    : ""
                }`}
              />
            ))}
          </div>

          <QuestionRenderer
            question={currentQuestion}
            value={answers[currentQuestion.id]}
            onChange={(value) => updateAnswer(currentQuestion.id, value)}
          />

          {error && <p className="form-error">{error}</p>}

          <div className="question-nav">
            <button
              type="button"
              className="nav-button secondary"
              onClick={handlePrevious}
              disabled={isFirstStep || isSaving}
            >
              Previous
            </button>

            {isLastStep ? (
              <button
                type="button"
                className="nav-button primary"
                onClick={handleSubmit}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Submit"}
              </button>
            ) : (
              <button
                type="button"
                className="nav-button primary"
                onClick={handleNext}
                disabled={isSaving}
              >
                Next
              </button>
            )}
          </div>
        </div>
        </div>
      </div>
  );
}