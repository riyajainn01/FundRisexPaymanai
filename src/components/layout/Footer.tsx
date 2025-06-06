import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Facebook, Twitter, Instagram, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
              <span className="text-xl font-bold">FundRise</span>
            </Link>
            <p className="text-blue-100 mb-4">
              Empowering change through collective giving. Join us in making a difference,
              one donation at a time.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-blue-100 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-blue-100 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-blue-100 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/explore"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Browse Campaigns
                </Link>
              </li>
              <li>
                <Link
                  to="/explore?category=education"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Education
                </Link>
              </li>
              <li>
                <Link
                  to="/explore?category=medical"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Medical
                </Link>
              </li>
              <li>
                <Link
                  to="/explore?category=environment"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Environment
                </Link>
              </li>
              <li>
                <Link
                  to="/explore?category=community"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Community
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Success Stories
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-blue-100 mb-4">
              Subscribe to our newsletter for the latest updates and campaigns.
            </p>
            <form className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 rounded-lg bg-white text-blue-600 font-medium hover:bg-blue-50 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="text-blue-100">
            &copy; {new Date().getFullYear()} FundRise. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6 mt-4">
            <Link
              to="#"
              className="text-blue-100 hover:text-white transition-colors text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              to="#"
              className="text-blue-100 hover:text-white transition-colors text-sm"
            >
              Terms of Service
            </Link>
            <Link
              to="#"
              className="text-blue-100 hover:text-white transition-colors text-sm"
            >
              Cookie Policy
            </Link>
          </div>
          <div className="mt-6 flex items-center justify-center text-blue-100 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 mx-1 text-red-300" />
            <span>by Riya Jain & Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;