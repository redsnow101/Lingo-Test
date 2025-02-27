import Button from '../common/Button';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-blue-50 via-white to-white">
      <div className="container mx-auto text-center relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        {/* Content */}
        <div className="relative">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Master Your English
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Speaking Skills</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience AI-powered spoken English assessment that provides instant, unbiased feedback 
            to help you improve your pronunciation, fluency, and confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Button className="text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl bg-gradient-to-r from-blue-600 to-blue-700">
              Take Free Test
            </Button>
            <Button variant="outline" className="text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300 border-2">
              See How It Works
            </Button>
          </div>
        </div>
        
        <div className="relative mt-32 pt-16 border-t border-gray-100">
          <p className="text-gray-500 mb-10 text-lg">Trusted by leading educational institutions worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {['Universities', 'Language Schools', 'Corporate Training', 'Test Centers'].map((partner) => (
              <div 
                key={partner} 
                className="text-xl font-semibold text-gray-400 hover:text-gray-600 transition-colors duration-300 flex items-center"
              >
                <span className="w-3 h-3 rounded-full bg-blue-500 mr-3 opacity-75"></span>
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 