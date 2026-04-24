// import { useState } from "react";
// import { sendEmailLink, signInWithGoogle } from "../../services/authService";

// export default function AuthForm() {
//   const [mode, setMode] = useState("login");
//   const [email, setEmail] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setErrorMessage("");
//     setSuccessMessage("");

//     try {
//       setIsSubmitting(true);

//       await sendEmailLink(email);

//       setSuccessMessage(
//         "Check your inbox for the sign-in link. On mobile, if the link opens in a different browser, you may need to enter your email again."
//       );
//     } catch (error) {
//       setErrorMessage(error.message || "Could not send email link.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   async function handleGoogleSignIn() {
//     setErrorMessage("");
//     setSuccessMessage("");
  
//     try {
//       setIsSubmitting(true);
  
//       await signInWithGoogle();
  
//       // ❌ NON navigare qui
//       // Firebase aggiorna lo stato auth da solo
//     } catch (error) {
//       setErrorMessage(error.message || "Google sign-in failed.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   }
//   // async function handleGoogleSignIn() {
//   //   setErrorMessage("");
//   //   setSuccessMessage("");

//   //   try {
//   //     setIsSubmitting(true);
//   //     await signInWithGoogle();
//   //     // window.location.href = "/category";
//   //     onAuthStateChanged(auth, (user) => {
//   //       if (user) navigate("/category");
//   //     });
//   //   } catch (error) {
//   //     setErrorMessage(error.message || "Google sign-in failed.");
//   //   } finally {
//   //     setIsSubmitting(false);
//   //   }
//   // }

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

//         {errorMessage && <p className="error-text">{errorMessage}</p>}
//         {successMessage && <p className="success-text">{successMessage}</p>}

//         <button type="submit" disabled={isSubmitting}>
//           {isSubmitting
//             ? "Please wait..."
//             : mode === "login"
//             ? "Send Login Link"
//             : "Send Signup Link"}
//         </button>
//       </form>

//       <button
//         className="secondary-button"
//         type="button"
//         onClick={handleGoogleSignIn}
//         disabled={isSubmitting}
//       >
//         Continue with Google
//       </button>

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

import { useNavigate } from "react-router-dom";  // Import useNavigate
import { useState } from "react";
import { sendEmailLink, signInWithGoogle } from "../../services/authService";

export default function AuthForm() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();  // Initialize navigate function

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      setIsSubmitting(true);

      await sendEmailLink(email);

      setSuccessMessage(
        "Check your inbox for the sign-in link. On mobile, if the link opens in a different browser, you may need to enter your email again."
      );
    } catch (error) {
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

      await signInWithGoogle();  // Sign in with Google

      // Once the user is signed in, navigate to the protected route
      navigate("/category");  // Redirect to the 'category' route
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