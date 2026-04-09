import RatingQuestion from "./RatingQuestion";
import MultiChoiceQuestion from "./MultiChoiceQuestion";
import SingleChoiceQuestion from "./SingleChoiceQuestion";

export default function QuestionRenderer({ question, value, onChange }) {
  switch (question.type) {
    case "rating":
      return (
        <RatingQuestion
          question={question}
          value={value}
          onChange={onChange}
        />
      );

    case "multi":
      return (
        <MultiChoiceQuestion
          question={question}
          value={value || []}
          onChange={onChange}
        />
      );

    case "single":
      return (
        <SingleChoiceQuestion
          question={question}
          value={value || ""}
          onChange={onChange}
        />
      );

    default:
      return null;
  }
}