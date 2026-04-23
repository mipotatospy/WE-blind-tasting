// import { useEffect, useState } from "react";
// import {
//   completeEmailLinkSignIn,
//   getStoredEmailForSignIn,
//   isEmailLinkFlow,
// } from "../services/authService";

// export default function AuthFinish() {
//   const [email, setEmail] = useState("");
//   const [needsManualEmail, setNeedsManualEmail] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     async function run() {
//       try {
//         if (!isEmailLinkFlow()) {
//           setErrorMessage("This sign-in link is invalid or expired.");
//           return;
//         }

//         const storedEmail = getStoredEmailForSignIn();

//         if (storedEmail) {
//           await completeEmailLinkSignIn(storedEmail);
//           window.location.href = "/category";
//           return;
//         }

//         setNeedsManualEmail(true);
//       } catch (error) {
//         setNeedsManualEmail(true);
//         setErrorMessage(
//           error.message || "Could not complete sign-in automatically."
//         );
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     run();
//   }, []);

//   async function handleManualComplete(e) {
//     e.preventDefault();
//     setErrorMessage("");

//     try {
//       setIsSubmitting(true);
//       await completeEmailLinkSignIn(email);
//       window.location.href = "/category";
//     } catch (error) {
//       setErrorMessage(error.message || "Could not complete sign-in.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   if (isLoading) {
//     return (
//       <div className="auth-card">
//         <h1>Wine Experience</h1>
//         <h2>Completing sign-in...</h2>
//       </div>
//     );
//   }

//   if (!needsManualEmail && errorMessage) {
//     return (
//       <div className="auth-card">
//         <h1>Wine Experience</h1>
//         <h2>Sign-in Error</h2>
//         <p className="error-text">{errorMessage}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="auth-card">
//       <h1>Wine Experience</h1>
//       <h2>Complete Sign-In</h2>

//       <p>
//         Enter the same email address you used to request the sign-in link.
//       </p>

//       <form onSubmit={handleManualComplete} className="auth-form">
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

//         <button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? "Please wait..." : "Complete Sign-In"}
//         </button>
//       </form>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase";
import {
  completeEmailLinkSignIn,
  getStoredEmailForSignIn,
  isEmailLinkFlow,
} from "../services/authService";

export default function AuthFinish() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState("checking");
  // checking | auto | manual | submitting | error

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        window.location.replace("/category");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        if (!isEmailLinkFlow()) {
          if (!cancelled) {
            setErrorMessage("This sign-in link is invalid or expired.");
            setStatus("error");
          }
          return;
        }

        const storedEmail = getStoredEmailForSignIn();

        if (!storedEmail) {
          setStatus("manual");
          return;
        }

        if (!storedEmail) {
          if (!cancelled) {
            setStatus("manual");
          }
          return;
        }

        if (!cancelled) {
          setStatus("auto");
        }

        await completeEmailLinkSignIn(storedEmail);

        // onAuthStateChanged will redirect
      } catch (error) {
        if (!cancelled) {
          setErrorMessage(
            error?.message || "Could not complete sign-in automatically."
          );
          setStatus("manual");
        }
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    setStatus("submitting");

    try {
      await completeEmailLinkSignIn(email);
      // onAuthStateChanged will redirect
    } catch (error) {
      setErrorMessage(error?.message || "Could not complete sign-in.");
      setStatus("manual");
    }
  }

  if (status === "checking" || status === "auto" || status === "submitting") {
    return (
      <div className="auth-card">
        <h1>Wine Experience</h1>
        <h2>Signing you in...</h2>
        <p>Please keep this page open.</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="auth-card">
        <h1>Wine Experience</h1>
        <h2>Sign-in Error</h2>
        <p className="error-text">{errorMessage}</p>
      </div>
    );
  }

  return (
    <div className="auth-card">
      <h1>Wine Experience</h1>
      <h2>Complete Sign-In</h2>
      <p>Enter the same email address you used to request the sign-in link.</p>

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

        <button type="submit">Complete Sign-In</button>
      </form>
    </div>
  );
}