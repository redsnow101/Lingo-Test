import Button from '../common/Button';

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      features: [
        "10 speaking assessments/month",
        "Basic pronunciation feedback",
        "Core exercise library",
        "Email support"
      ]
    },
    {
      name: "Pro",
      price: "$29/mo",
      features: [
        "Unlimited assessments",
        "Advanced pronunciation analysis",
        "Full exercise library",
        "Priority support",
        "Progress tracking"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Custom assessment modules",
        "Bulk user management",
        "API integration",
        "Dedicated support",
        "Custom reporting"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Simple Pricing
          </h2>
          <p className="text-xl text-gray-600">Choose the plan that works best for you</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`relative bg-white rounded-2xl p-8 transform hover:-translate-y-1 transition-all duration-300
                ${plan.name === "Pro" ? 
                  "shadow-2xl border-2 border-blue-500" : 
                  "shadow-lg hover:shadow-xl border border-gray-100"
                }`}
            >
              {plan.name === "Pro" && (
                <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {plan.price}
              </p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-600 group">
                    <svg className="w-5 h-5 text-green-500 mr-3 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="group-hover:text-gray-800 transition-colors duration-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                variant={plan.name === "Pro" ? "primary" : "outline"} 
                className={`w-full py-4 ${plan.name === "Pro" ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" : ""}`}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing; 