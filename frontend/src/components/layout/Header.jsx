import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'Demo', href: '#demo' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Testimonials', href: '#testimonials' },
  ];

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-40 shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-blue-600">
            Lingo Test
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <Button variant="outline" onClick={handleLoginClick}>
              Log In
            </Button>
            <Button onClick={handleSignUpClick}>Sign Up</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block py-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-4 space-y-2">
              <Button variant="outline" onClick={handleLoginClick} className="w-full">
                Log In
              </Button>
              <Button onClick={handleSignUpClick} className="w-full">Sign Up</Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;