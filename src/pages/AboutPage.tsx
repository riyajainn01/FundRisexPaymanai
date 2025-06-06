import React from 'react';
import { motion } from 'framer-motion';
import { Check, Heart, Shield, Users, Globe, TrendingUp } from 'lucide-react';

const AboutPage: React.FC = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="glass p-12 rounded-xl mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 
            className="mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About FundRise
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-700 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We're on a mission to empower individuals and organizations to make a positive
            impact through collective giving. Our platform connects passionate creators with
            generous donors to fund projects that matter.
          </motion.p>
        </div>
      </div>

      {/* Our Mission */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <motion.h2 
            className="mb-4"
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            Our Mission
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            Creating a world where funding barriers don't stand in the way of positive change
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            className="glass p-8 rounded-xl"
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Empower</h3>
            <p className="text-gray-600">
              We empower individuals and organizations to fund their projects and causes,
              regardless of their background or connections.
            </p>
          </motion.div>

          <motion.div 
            className="glass p-8 rounded-xl"
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
              <Globe className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Connect</h3>
            <p className="text-gray-600">
              We connect passionate creators with generous donors who share their values and
              want to contribute to meaningful causes.
            </p>
          </motion.div>

          <motion.div 
            className="glass p-8 rounded-xl"
            custom={4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Amplify</h3>
            <p className="text-gray-600">
              We amplify the impact of every donation through our platform, making it easier
              for important projects to gain visibility and support.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Our Values */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <motion.h2 
            className="mb-4"
            custom={5}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            Our Core Values
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            custom={6}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            The principles that guide every decision we make at FundRise
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            className="flex items-start"
            custom={7}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="w-10 h-10 bg-green-100 rounded-full flex-shrink-0 flex items-center justify-center mr-4">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Transparency</h3>
              <p className="text-gray-600">
                We believe in complete transparency in all aspects of our platform. From fees to fund
                usage, we ensure that both creators and donors have full visibility.
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="flex items-start"
            custom={8}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="w-10 h-10 bg-green-100 rounded-full flex-shrink-0 flex items-center justify-center mr-4">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Integrity</h3>
              <p className="text-gray-600">
                We uphold the highest standards of integrity in every interaction. We verify campaigns,
                protect donor information, and ensure funds reach their intended destination.
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="flex items-start"
            custom={9}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="w-10 h-10 bg-green-100 rounded-full flex-shrink-0 flex items-center justify-center mr-4">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Accessibility</h3>
              <p className="text-gray-600">
                We make fundraising accessible to everyone. Our platform is designed to be intuitive,
                with resources and support available to help creators succeed.
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="flex items-start"
            custom={10}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="w-10 h-10 bg-green-100 rounded-full flex-shrink-0 flex items-center justify-center mr-4">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p className="text-gray-600">
                We foster a supportive community where creators and donors can connect, share stories,
                and celebrate the impact they're making together.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Our Team */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <motion.h2 
            className="mb-4"
            custom={11}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            The Team Behind FundRise
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            custom={12}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            Meet the passionate individuals dedicated to helping worthy causes get funded
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Emily Rodriguez',
              role: 'Founder & CEO',
              bio: 'With over 10 years of experience in the nonprofit sector, Emily founded FundRise to democratize fundraising for all.',
              image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600',
            },
            {
              name: 'Michael Chen',
              role: 'CTO',
              bio: 'Michael leads our technology team, ensuring our platform is secure, scalable, and accessible to all users.',
              image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
            },
            {
              name: 'Sarah Johnson',
              role: 'Head of Community',
              bio: 'Sarah works directly with campaign creators and donors to foster meaningful connections and maximize impact.',
              image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
            },
          ].map((member, index) => (
            <motion.div 
              key={member.name}
              className="glass p-6 rounded-xl text-center"
              custom={13 + index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-blue-600 font-medium mb-4">{member.role}</p>
              <p className="text-gray-600">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div 
        className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-12 text-center text-white"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-white mb-6">Join the FundRise Community</h2>
        <p className="text-blue-100 max-w-2xl mx-auto mb-8">
          Whether you're looking to fund a project or support a cause, FundRise is here to help
          you make a difference. Join our community today and be a part of something bigger.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/create" className="btn bg-white text-blue-600 hover:bg-blue-50">
            Start a Campaign
          </a>
          <a href="/explore" className="btn bg-blue-500 text-white hover:bg-blue-400">
            Support a Cause
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;