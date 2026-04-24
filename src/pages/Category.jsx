// import { useNavigate } from "react-router-dom";
// import logo from "../assets/WE_Logo_white@4x.png";

// export default function Category() {
//   const navigate = useNavigate();

//   const categories = [
//     { label: "White", value: "white" },
//     { label: "Red", value: "red" },
//     { label: "Sparkling", value: "sparkling" },
//   ];

//   function handleSelect(categoryValue) {
//     navigate("/form", {
//       state: { category: categoryValue }, // Passing category to form modal
//     });
//   }

//   return (
//     <div className="page category-page">
//       <img
//         src={logo}
//         alt="Wines Experience Logo"
//         style={{
//           display: "block",
//           width: "64px",
//           height: "auto",
//         }}
//       />
//       <h1>Select a Wine Category</h1>
//       <div className="category-grid">
//         {categories.map((category) => (
//           <button
//             key={category.value}
//             className={`category-button ${category.value}`}
//             onClick={() => handleSelect(category.value)}
//           >
//             {category.label}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }


// Category Component (Handles Category Selection)
import { useNavigate } from "react-router-dom";
import logo from "../assets/WE_Logo_white@4x.png";

export default function Category() {
  const navigate = useNavigate();

  const categories = [
    { label: "White", value: "white" },
    { label: "Red", value: "red" },
    { label: "Sparkling", value: "sparkling" },
  ];

  function handleSelect(categoryValue) {
    navigate("/form", {
      state: { category: categoryValue }, // Passing category to form modal
    });
  }

  return (
    <div className="page category-page">
      <img
        src={logo}
        alt="Wines Experience Logo"
        style={{
          display: "block",
          width: "64px",
          height: "auto",
        }}
      />
      <h1>Select a Wine Category</h1>
      <div className="category-grid">
        {categories.map((category) => (
          <button
            key={category.value}
            className={`category-button ${category.value}`}
            onClick={() => handleSelect(category.value)} // Handling category selection
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}