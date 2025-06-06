import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Stethoscope, 
  BookOpen, 
  Leaf, 
  Building, 
  Dog, 
  Utensils, 
  HeartPulse, 
  Users
} from 'lucide-react';

const categories = [
  {
    id: 'medical',
    name: 'Medical',
    icon: <Stethoscope className="w-6 h-6" />,
    color: 'bg-red-100 text-red-600',
  },
  {
    id: 'education',
    name: 'Education',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 'environment',
    name: 'Environment',
    icon: <Leaf className="w-6 h-6" />,
    color: 'bg-green-100 text-green-600',
  },
  {
    id: 'community',
    name: 'Community',
    icon: <Building className="w-6 h-6" />,
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    id: 'animals',
    name: 'Animals',
    icon: <Dog className="w-6 h-6" />,
    color: 'bg-orange-100 text-orange-600',
  },
  {
    id: 'food',
    name: 'Food & Hunger',
    icon: <Utensils className="w-6 h-6" />,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    id: 'emergency',
    name: 'Emergency Relief',
    icon: <HeartPulse className="w-6 h-6" />,
    color: 'bg-pink-100 text-pink-600',
  },
  {
    id: 'nonprofit',
    name: 'Nonprofit',
    icon: <Users className="w-6 h-6" />,
    color: 'bg-indigo-100 text-indigo-600',
  },
];

const Categories: React.FC = () => {
  return (
    <section className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="mb-4">Browse by Category</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover campaigns across various causes and find the ones that match your interests
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/explore?category=${category.id}`}
            className="glass hover:shadow-lg group transition-all duration-300 p-6 rounded-xl flex flex-col items-center text-center"
          >
            <div className={`w-14 h-14 rounded-full ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
              {category.icon}
            </div>
            <h3 className="font-semibold text-gray-800">{category.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;