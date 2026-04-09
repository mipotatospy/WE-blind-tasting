import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Authentication from "./pages/Authentication";
import Category from "./pages/Category";
import Form from "./pages/Form";
import Result from "./pages/Result";
import FinishSignIn from "./pages/output/FinishSignIn.jsx";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/auth/finish" element={<FinishSignIn />} />

        <Route
          path="/category"
          element={
            <ProtectedRoute>
              <Category />
            </ProtectedRoute>
          }
        />

        <Route
          path="/form"
          element={
            <ProtectedRoute>
              <Form />
            </ProtectedRoute>
          }
        />

        <Route
          path="/result"
          element={
            <ProtectedRoute>
              <Result />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;