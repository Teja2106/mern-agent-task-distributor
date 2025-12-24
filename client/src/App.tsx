import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/LoginPage";
import { NotFound } from "./components/custom/NotFound";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={ <NotFound /> } />
          <Route path="/" element={ <HomePage /> } />
          <Route path="/login" element={ <Login /> } />
        </Routes>
      </Router>
    </>
  )
}

export default App