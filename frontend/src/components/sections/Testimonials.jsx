const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      role: "Content Creator",
      image: "https://via.placeholder.com/100",
      quote: "This tool has revolutionized my content creation workflow. The accuracy is impressive!"
    },
    {
      name: "Jane Smith",
      role: "Journalist",
      image: "https://via.placeholder.com/100",
      quote: "I use it daily for my interviews. It saves me hours of transcription time."
    },
    {
      name: "Mike Johnson",
      role: "Student",
      image: "https://via.placeholder.com/100",
      quote: "Perfect for taking lecture notes. The multi-language support is fantastic!"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 