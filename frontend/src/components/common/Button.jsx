const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition-all duration-300 ease-in-out';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 