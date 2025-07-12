/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { Factory, Package, Cog, Zap, Car, Warehouse } from 'lucide-react';
import industriesBgImg from '../../assets/landingPage/industries.jpg';


const industries = [
  { icon: Factory, name: "Manufacturing & Assembly" },
  { icon: Package, name: "Packaging & Material Handling" },
  { icon: Cog, name: "Process Automation" },
  { icon: Zap, name: "Energy Management" },
  { icon: Car, name: "Automotive" },
  { icon: Warehouse, name: "Water Treatment Plants" },
];

// Animation variants for the container and items
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
};

const IndustriesServed = () => {
  return (
    <section
      className="relative bg-cover bg-center py-20 sm:py-28"
      style={{ backgroundImage: `url(${industriesBgImg})` }}
    >
      {/* Dark overlay to ensure text is readable */}
      <div className="absolute inset-0 bg-black/80"></div>

      {/* Content container, positioned above the overlay */}
      <div className="relative z-10 container mx-auto px-6">
        {/* Section Title */}
        <motion.h2 
          className="text-3xl sm:text-5xl font-bold text-center text-white mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Industries Served
        </motion.h2>

        {/* Responsive Grid Container */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto auto-rows-fr"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {industries.map((industry, index) => (
            <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: 'rgba(51, 65, 85, 0.5)', // A slightly lighter slate on hover
                  borderColor: 'rgba(148, 163, 184, 0.6)', // A light gray border on hover
                  y: -5
                }}
                transition={{ duration: 0.2 }}
                // Card background and border now use the slate/zinc theme
                className="group bg-zinc-800/50 backdrop-blur-sm border-2 border-slate-700 rounded-xl py-4 px-5 sm:p-6 flex items-center space-x-4 sm:space-x-5"
              >
                {/*  Icon color is a neutral, bright gray */}
                <industry.icon className="h-9 w-9 text-orange-400 flex-shrink-0" strokeWidth={1.5} />
                <span className="text-white font-semibold text-base sm:text-lg">{industry.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default IndustriesServed;