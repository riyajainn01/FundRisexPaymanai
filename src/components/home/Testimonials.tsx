import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content:
      "FundRise made it incredibly easy to raise funds for my mother's medical treatment. The support we received was overwhelming and the platform's features helped us reach our goal faster than expected.",
    author: 'Sarah Johnson',
    role: 'Campaign Creator',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 2,
    content:
      "I've donated to several campaigns on FundRise and I love how transparent the platform is. I can see exactly where my money is going and follow the progress of the projects I support.",
    author: 'Michael Chen',
    role: 'Regular Donor',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 3,
    content:
      "Our school was able to fund a new computer lab thanks to the generous donors we connected with through FundRise. The campaign tools made it simple to share our story and engage our community.",
    author: 'Emily Rodriguez',
    role: 'School Principal',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="mb-4">What People Say</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Hear from campaign creators and donors who have experienced the impact of our platform
        </p>
      </div>

      <div className="max-w-4xl mx-auto relative">
        <div className="absolute -top-6 left-0 text-accent-300 opacity-30">
          <Quote size={80} />
        </div>

        <div className="glass p-12 rounded-xl relative z-10">
          <p className="text-lg text-gray-700 italic mb-8">
            {testimonials[currentIndex].content}
          </p>
          <div className="flex items-center">
            <img
              src={testimonials[currentIndex].avatar}
              alt={testimonials[currentIndex].author}
              className="w-14 h-14 rounded-full object-cover mr-4"
            />
            <div>
              <h4 className="font-bold text-gray-800">
                {testimonials[currentIndex].author}
              </h4>
              <p className="text-gray-600">{testimonials[currentIndex].role}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 left-0 -ml-4 md:-ml-6">
          <button
            onClick={prevTestimonial}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 right-0 -mr-4 md:-mr-6">
          <button
            onClick={nextTestimonial}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;