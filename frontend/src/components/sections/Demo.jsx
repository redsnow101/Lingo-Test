import Button from '../common/Button';

const Demo = () => {
  return (
    <section id="demo" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">See It in Action</h2>
          <div className="aspect-video bg-gray-200 rounded-xl shadow-lg mb-8">
            {/* Placeholder for demo video/animation */}
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-600">Demo Video</p>
            </div>
          </div>
          <div className="space-y-4">
            <Button className="w-full sm:w-auto">Try Live Demo</Button>
            <p className="text-gray-600">No sign-up required for demo</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo; 