import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/LoginPage";
import { NotFound } from "./components/custom/NotFound";
import { HomePage } from "./pages/HomePage";
import { ProtectedRoute } from "./components/custom/ProtectedRoute";
import { Dashboard } from "./pages/DashboardPage";
import { Toaster } from "./components/ui/sonner";
import { PublicRoute } from "./components/custom/PublicRoute";

function App() {
  return (
    <>
      <Toaster richColors position="top-right" />
      <Router>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={ <PublicRoute children={ <Login /> } /> } />

          <Route path="/dashboard" element={ <ProtectedRoute children={<Dashboard />} /> } /> {/* <ProtectedRoute children={<Dashboard />} /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App