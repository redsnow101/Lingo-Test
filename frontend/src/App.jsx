import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/layout/Header";
import Landing from "./pages/Landing";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import AIChat from './components/AIChat';


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

// Create a separate component to access useLocation
function AppContent() {
  const location = useLocation();
  const showHeader = !['/dashboard', '/chat'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {showHeader && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<AIChat />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;