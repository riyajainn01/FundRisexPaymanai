// import React from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   ChevronRight, 
//   Award, 
//   Shield, 
//   Users, 
//   Heart, 
//   TrendingUp, 
//   Clock 
// } from 'lucide-react';
// import FeaturedCampaigns from '../components/campaigns/FeaturedCampaigns';
// import CampaignStats from '../components/campaigns/CampaignStats';
// import Testimonials from '../components/home/Testimonials';
// import Categories from '../components/home/Categories';

// const HomePage: React.FC = () => {
//   return (
//     <div className="flex flex-col space-y-16 py-8">
//       {/* Hero Section */}
//       <section className="relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 mix-blend-multiply" />
//         <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-400 rounded-full filter blur-3xl opacity-20 animate-pulse-slow" />
//         <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-400 rounded-full filter blur-3xl opacity-20 animate-pulse-slow" />
        
//         <div className="container mx-auto px-4 py-16 md:py-28 relative z-10">
//           <div className="max-w-3xl">
//             <h1 className="mb-6 leading-tight">
//               <span className="block text-gray-800">Make a difference with</span>
//               <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//                 every donation
//               </span>
//             </h1>
//             <p className="text-xl text-gray-600 mb-8">
//               Join our community of givers and help fund life-changing projects.
//               Every contribution brings us one step closer to creating a better world.
//             </p>
//             <div className="flex flex-wrap gap-4">
//               <Link to="/explore" className="btn-primary">
//                 Explore Campaigns
//               </Link>
//               <Link to="/create" className="btn-secondary">
//                 Start Fundraising
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Counter */}
//       <CampaignStats />

//       {/* Featured Campaigns */}
//       <section className="container mx-auto px-4">
//         <div className="flex flex-wrap items-center justify-between mb-8">
//           <div>
//             <h2 className="mb-2">Featured Campaigns</h2>
//             <p className="text-gray-600">Support these impactful projects</p>
//           </div>
//           <Link
//             to="/explore"
//             className="flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
//           >
//             <span>View all campaigns</span>
//             <ChevronRight className="w-4 h-4 ml-1" />
//           </Link>
//         </div>

//         <FeaturedCampaigns />
//       </section>

//       {/* Categories */}
//       <Categories />

//       {/* How It Works */}
//       <section className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="mb-4">How It Works</h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Whether you're looking to donate or start your own fundraiser,
//             our platform makes it simple and secure.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div className="glass p-8 rounded-xl text-center">
//             <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <Heart className="w-8 h-8 text-blue-600" />
//             </div>
//             <h3 className="text-xl font-bold mb-4">Find a Cause</h3>
//             <p className="text-gray-600">
//               Browse through our diverse range of campaigns and find causes that
//               resonate with your values and interests.
//             </p>
//           </div>

//           <div className="glass p-8 rounded-xl text-center">
//             <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <TrendingUp className="w-8 h-8 text-indigo-600" />
//             </div>
//             <h3 className="text-xl font-bold mb-4">Make a Donation</h3>
//             <p className="text-gray-600">
//               Contribute any amount to support the campaign. Every donation,
//               no matter how small, makes a meaningful impact.
//             </p>
//           </div>

//           <div className="glass p-8 rounded-xl text-center">
//             <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <Clock className="w-8 h-8 text-purple-600" />
//             </div>
//             <h3 className="text-xl font-bold mb-4">Track Progress</h3>
//             <p className="text-gray-600">
//               Stay updated on the campaign's progress, receive updates,
//               and see the real impact of your contribution.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Trust Indicators */}
//       <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-white mb-4">Why Choose FundRise</h2>
//             <p className="text-blue-100 max-w-2xl mx-auto">
//               We're committed to transparency, security, and maximizing the impact
//               of every donation.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
//               <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-6">
//                 <Shield className="w-6 h-6 text-white" />
//               </div>
//               <h3 className="text-xl font-bold text-white mb-4">Secure Platform</h3>
//               <p className="text-blue-100">
//                 Bank-level encryption and secure payment processing to protect
//                 your information and donations.
//               </p>
//             </div>

//             <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
//               <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-6">
//                 <Award className="w-6 h-6 text-white" />
//               </div>
//               <h3 className="text-xl font-bold text-white mb-4">Verified Campaigns</h3>
//               <p className="text-blue-100">
//                 All campaigns undergo a verification process to ensure
//                 legitimacy and transparency.
//               </p>
//             </div>

//             <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
//               <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-6">
//                 <Users className="w-6 h-6 text-white" />
//               </div>
//               <h3 className="text-xl font-bold text-white mb-4">Community Support</h3>
//               <p className="text-blue-100">
//                 Join thousands of donors making a difference through our
//                 platform every day.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <Testimonials />

//       {/* CTA Section */}
//       <section className="container mx-auto px-4 py-8">
//         <div className="glass p-12 rounded-2xl text-center">
//           <h2 className="mb-6">Ready to Make a Difference?</h2>
//           <p className="text-gray-600 max-w-2xl mx-auto mb-8">
//             Start a campaign today or donate to an existing cause.
//             Every contribution counts towards creating positive change.
//           </p>
//           <div className="flex flex-wrap justify-center gap-4">
//             <Link to="/create" className="btn-primary">
//               Start a Campaign
//             </Link>
//             <Link to="/explore" className="btn-secondary">
//               Donate Now
//             </Link>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HomePage;




import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Award, 
  Shield, 
  Users, 
  Heart, 
  TrendingUp, 
  Clock,
  ArrowRight
} from 'lucide-react';
import FeaturedCampaigns from '../components/campaigns/FeaturedCampaigns';
import CampaignStats from '../components/campaigns/CampaignStats';
import Testimonials from '../components/home/Testimonials';
import Categories from '../components/home/Categories';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col space-y-16">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            className="absolute top-20 right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
            className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-400 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-28 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                <span className="block text-gray-900">Empower Change</span>
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Through Giving
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
                Join our community of changemakers and help fund projects that make a real difference.
                Every contribution brings us closer to a better world.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/explore" 
                  className="btn-primary group flex items-center text-lg"
                >
                  Start Exploring
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/create" 
                  className="btn-secondary text-lg group"
                >
                  Create Campaign
                  <ChevronRight className="inline-block w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <div className="font-bold text-3xl text-blue-600 mb-2">100%</div>
                  <div className="text-gray-600">Secure Platform</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center"
                >
                  <div className="font-bold text-3xl text-indigo-600 mb-2">10k+</div>
                  <div className="text-gray-600">Happy Donors</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-center"
                >
                  <div className="font-bold text-3xl text-purple-600 mb-2">$2M+</div>
                  <div className="text-gray-600">Funds Raised</div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="People helping each other"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Latest Donation</div>
                      <div className="font-bold">$2,500</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 10 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-gray-400 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Rest of the components */}
      <CampaignStats />
      <section className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between mb-8">
          <div>
            <h2 className="mb-2">Featured Campaigns</h2>
            <p className="text-gray-600">Support these impactful projects</p>
          </div>
          <Link
            to="/explore"
            className="flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            <span>View all campaigns</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <FeaturedCampaigns />
      </section>
      <Categories />
      <Testimonials />
    </div>
  );
};

export default HomePage;