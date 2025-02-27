const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-600 hover:text-blue-600">Features</a></li>
              <li><a href="#pricing" className="text-gray-600 hover:text-blue-600">Pricing</a></li>
              <li><a href="#demo" className="text-gray-600 hover:text-blue-600">Demo</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Company</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-600 hover:text-blue-600">About</a></li>
              <li><a href="#careers" className="text-gray-600 hover:text-blue-600">Careers</a></li>
              <li><a href="#contact" className="text-gray-600 hover:text-blue-600">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#blog" className="text-gray-600 hover:text-blue-600">Blog</a></li>
              <li><a href="#docs" className="text-gray-600 hover:text-blue-600">Documentation</a></li>
              <li><a href="#help" className="text-gray-600 hover:text-blue-600">Help Center</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#privacy" className="text-gray-600 hover:text-blue-600">Privacy</a></li>
              <li><a href="#terms" className="text-gray-600 hover:text-blue-600">Terms</a></li>
              <li><a href="#security" className="text-gray-600 hover:text-blue-600">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-gray-600">
          <p>© 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 