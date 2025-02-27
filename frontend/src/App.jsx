import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Landing from './pages/Landing';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <Header onLoginClick={() => setIsModalOpen(true)} />
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;