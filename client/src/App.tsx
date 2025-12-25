import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/LoginPage";
import { NotFound } from "./components/custom/NotFound";
import { HomePage } from "./pages/HomePage";
import { ProtectedRoute } from "./components/custom/ProtectedRoute";
import { Dashboard } from "./pages/DashboardPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </>
  )
}

export default App