// import CategoryButtons from "../components/Category/CategoryButtons";
// import logo from "../assets/WE_Logo_white@4x.png"

// export default function Category() {
//   return (
//     <div className="page category-page">
//       <img 
//         src={logo} 
//         alt="Wines Experience Logo" 
//         style={{
//           display: "block",
//           width: "64px",
//           height: "auto",
//           marginBottom: "100px",
//         }}
//       />
//       <h1>Select a Wine Category</h1>
//       <CategoryButtons />
//     </div>
//   );
// }

import CategoryButtons from "../components/Category/CategoryButtons";
import logo from "../assets/WE_Logo_white@4x.png";

export default function Category() {
  return (
    <div className="page category-page">
      <img
        src={logo}
        alt="Wines Experience Logo"
        style={{
          display: "block",
          width: "64px",
          height: "auto",
          marginBottom: "100px",
        }}
      />
      <h1>Select a Wine Category</h1>
      <CategoryButtons />
    </div>
  );
}