/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Cog, Wrench, GitMerge } from 'lucide-react';

import competencyImg1 from '../../assets/landingPage/competencyImg1.jpg';
import competencyImg2 from '../../assets/landingPage/competencyImg2.jpg';
import competencyImg3 from '../../assets/landingPage/competencyImg3.jpg';
import competencyImg4 from '../../assets/landingPage/competencyImg4.jpg';

const competencies = [
  { icon: Cpu, title: "Electronics Manufacturing", description: "PCB design, assembly, testing, and prototyping of electronic systems with high quality standards.", image: competencyImg1 },
  { icon: Cog, title: "PLC Automation", description: "Industrial automation solutions using PLCs, HMIs, and SCADA systems for process and machine control.", image: competencyImg2 },
  { icon: Wrench, title: "Custom Control Panel", description: "Design and fabrication of control panels for industrial and commercial applications.", image: competencyImg3 },
  { icon: GitMerge, title: "System Integration", description: "Seamless integration of automation solutions with existing machinery and IT infrastructure.", image: competencyImg4 }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

const CoreCompetencies = () => {
  return (
    <section className="bg-[#1a1a1a] text-white py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.h2
          className="text-3xl sm:text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Core</span>{' '}
          <span className="text-white">Competencies</span>
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8  max-w-[20rem] mx-auto md:max-w-none"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {competencies.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.03, y: -8, transition: { duration: 0.3 } }}
              className="group"
            >
              <motion.div
                className="bg-[#2C2C2C]  rounded-xl overflow-hidden shadow-xl h-full border border-transparent min-h-[400px] flex flex-col"
                whileHover={{ borderColor: "rgba(251, 191, 36, 0.4)", boxShadow: "0 25px 50px rgba(255, 255, 255, 0.15)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="h-48 overflow-hidden relative">
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                    initial={{ opacity: 0.5 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <motion.div
                  className="p-6 flex-grow flex flex-col"
                  whileHover={{ backgroundColor: "#111111" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center mb-4">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      transition={{ duration: 0.3 }}
                      className="mr-3"
                    >
                      <item.icon className="h-6 w-6 text-orange-400" strokeWidth={1.5} />
                    </motion.div>
                    <motion.h3
                      className="text-lg font-bold text-white"
                      whileHover={{ color: "#fbbf24" }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.title}
                    </motion.h3>
                  </div>
                  <motion.p
                    className="text-gray-400 leading-relaxed text-sm flex-grow"
                    whileHover={{ color: "#d1d5db", x: 4 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.description}
                  </motion.p>
                  <motion.div
                    className="mt-4 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                    initial={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CoreCompetencies;