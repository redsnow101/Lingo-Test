const Features = () => {
  const features = [
    {
      title: "AI-Powered Assessment",
      description: "Get instant, accurate feedback on pronunciation, rhythm, and fluency using advanced AI technology",
      icon: "🎯"
    },
    {
      title: "Comprehensive Analysis",
      description: "Detailed scoring on pronunciation, stress, intonation, and overall speaking proficiency",
      icon: "📊"
    },
    {
      title: "Practice Exercises",
      description: "Access a wide range of speaking exercises designed by language experts",
      icon: "🗣️"
    },
    {
      title: "Progress Tracking",
      description: "Monitor your improvement over time with detailed performance analytics",
      icon: "📈"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Why Choose Speechace
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Advanced technology meets expert language assessment for the most accurate speaking evaluation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100"
            >
              <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 