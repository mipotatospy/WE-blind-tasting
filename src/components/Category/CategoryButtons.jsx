
// import { useNavigate } from "react-router-dom";

// const categories = [
//   { label: "White", value: "white" },
//   { label: "Red", value: "red" },
//   { label: "Rosé", value: "rose" },
//   { label: "Sparkling", value: "sparkling" },
//   { label: "Special", value: "special" },
// ];

// export default function CategoryButtons() {
//   const navigate = useNavigate();

//   function handleSelect(categoryValue) {
//     navigate("/form", {
//       state: { category: categoryValue },
//     });
//   }

//   return (
//     <div className="category-grid">
//       {categories.map((category) => (
//         <button
//           key={category.value}
//           className={`category-button ${category.value}`}
//           onClick={() => handleSelect(category.value)}
//         >
//           {category.label}
//         </button>
//       ))}
//     </div>
//   );
// }

import { useNavigate } from "react-router-dom";

const categories = [
  { label: "White", value: "white" },
  { label: "Red", value: "red" },
  { label: "Sparkling", value: "sparkling" },
];

export default function CategoryButtons() {
  const navigate = useNavigate();

  function handleSelect(categoryValue) {
    navigate("/form", {
      state: { category: categoryValue },
    });
  }

  return (
    <div className="category-grid">
      {categories.map((category) => (
        <button
          key={category.value}
          className={`category-button ${category.value}`}
          onClick={() => handleSelect(category.value)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}