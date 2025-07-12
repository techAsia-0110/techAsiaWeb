/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';
import leadingForceImg from '../../assets/landingPage/leadingForceImg.jpg';

// Mock image for demonstration
const pcbImage = leadingForceImg;

const features = [
  "Over 8 years of industry experience",
  "Strong in-house engineering and R&D team",
  "Commitment to quality, reliability, and innovation",
  "Flexible and customizable automation solutions",
  "Timely delivery and strong after-sales support"
];

// Animation variants can remain the same
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};
const featureVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const imageVariants = {
  hidden: { opacity: 0, x: -50, scale: 0.95 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};
const checkVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: { scale: 1, rotate: 0, transition: { duration: 0.4, ease: "backOut", delay: 0.2 } },
};

const LeadingForce = () => {
  return (
    // Section with a white background and dark text
    <section className="bg-white text-zinc-800 py-20 sm:py-28 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Image */}
          <motion.div
            className="relative order-2 lg:order-1 lg:col-span-2 max-w-sm mx-auto lg:max-w-none lg:mx-0"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="relative">
              <motion.div 
                className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-300"
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={pcbImage} 
                  alt="Electronic PCB Manufacturing" 
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div 
            className="order-1 lg:order-2 lg:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Title - orange gradient */}
            <motion.h2 
              className="text-4xl sm:text-5xl font-bold mb-4 leading-tight"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Leading Force in{' '}
              <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                Smart Manufacturing
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p 
              className="text-slate-600 text-base md:text-lg leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Since 2016, TechAsia Mechatronics has been at the forefront of electronics manufacturing and industrial automation, 
              delivering innovative solutions that shape the future of industrial efficiency.
            </motion.p>

            {/* Features List with Checkmarks */}
            <motion.div 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={featureVariants}
                  className="flex items-start space-x-4 group"
                >
                  {/* Checkmark - orange gradient */}
                  <motion.div 
                    className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mt-1"
                    variants={checkVariants}
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: "0 0 25px rgba(249, 115, 22, 0.4)"
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <BadgeCheck className="w-6 h-6 text-white" fill="rgba(249, 115, 22, 0.5)" strokeWidth={2} />
                  </motion.div>
                  
                  {/* Text */}
                  <motion.span 
                    className="text-slate-700 font-medium text-base md:text-lg leading-relaxed"
                    whileHover={{ 
                      color: "#0f172a",
                      x: 4
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {feature}
                  </motion.span>
                </motion.div>
              ))}
            </motion.div>

            
            <motion.div 
              className="mt-12 pt-8 border-t border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3">
                <motion.div 
                  className="w-2 h-2 bg-orange-500 rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5] 
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <span className="text-slate-500 text-sm">
                  Trusted by industry leaderships 
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LeadingForce;