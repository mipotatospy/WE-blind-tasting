// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginUser, signupUser } from "../../services/authService";

// export default function AuthForm() {
//   const navigate = useNavigate();

//   const [mode, setMode] = useState("login");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setErrorMessage("");

//     if (mode === "signup" && password !== confirmPassword) {
//       setErrorMessage("Passwords do not match.");
//       return;
//     }

//     try {
//       setIsSubmitting(true);

//       if (mode === "signup") {
//         await signupUser(email, password);
//       } else {
//         await loginUser(email, password);
//       }

//       navigate("/category");
//     } catch (error) {
//       setErrorMessage(error.message || "Authentication failed.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   return (
//     <div className="auth-card">
//       <h1>Wine Experience</h1>
//       <h2>{mode === "login" ? "Login" : "Create Account"}</h2>

//       <form onSubmit={handleSubmit} className="auth-form">
//         <label>
//           Email
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="name@email.com"
//             required
//           />
//         </label>

//         <label>
//           Password
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter password"
//             required
//           />
//         </label>

//         {mode === "signup" && (
//           <label>
//             Confirm Password
//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               placeholder="Repeat password"
//               required
//             />
//           </label>
//         )}

//         {errorMessage && <p className="error-text">{errorMessage}</p>}

//         <button type="submit" disabled={isSubmitting}>
//           {isSubmitting
//             ? "Please wait..."
//             : mode === "login"
//             ? "Login"
//             : "Sign Up"}
//         </button>
//       </form>

//       <button
//         className="secondary-button"
//         type="button"
//         onClick={() =>
//           setMode((prev) => (prev === "login" ? "signup" : "login"))
//         }
//       >
//         {mode === "login"
//           ? "Need an account? Sign up"
//           : "Already have an account? Login"}
//       </button>
//     </div>
//   );
// }

import { useState } from "react";
import { sendEmailLink, signInWithGoogle } from "../../services/authService";

export default function AuthForm() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
  
    try {
      setIsSubmitting(true);
      console.log("Sending email link to:", email);
  
      await sendEmailLink(email);
  
      console.log("Email link request sent successfully");
      setSuccessMessage("Check your inbox for the sign-in link.");
    } catch (error) {
      console.error("Email link error:", error);
      setErrorMessage(error.message || "Could not send email link.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleSignIn() {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      setIsSubmitting(true);
      await signInWithGoogle();
      window.location.href = "/category";
    } catch (error) {
      setErrorMessage(error.message || "Google sign-in failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="auth-card">
      <h1>Wine Experience</h1>
      <h2>{mode === "login" ? "Login" : "Create Account"}</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@email.com"
            required
          />
        </label>

        {errorMessage && <p className="error-text">{errorMessage}</p>}
        {successMessage && <p className="success-text">{successMessage}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Please wait..."
            : mode === "login"
            ? "Send Login Link"
            : "Send Signup Link"}
        </button>
      </form>

      <button
        className="secondary-button"
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isSubmitting}
      >
        Continue with Google
      </button>

      <button
        className="secondary-button"
        type="button"
        onClick={() =>
          setMode((prev) => (prev === "login" ? "signup" : "login"))
        }
      >
        {mode === "login"
          ? "Need an account? Sign up"
          : "Already have an account? Login"}
      </button>
    </div>
  );
}