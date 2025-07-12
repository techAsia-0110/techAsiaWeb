import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, CircuitBoard, Smartphone, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/engineeringProjectsData'; 
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay'; 
import img1 from '../assets/EngineeringProjectImages/projectImage1.png'; 
import img2 from '../assets/EngineeringProjectImages/projectImage2.png';
import img3 from '../assets/EngineeringProjectImages/projectImage3.jpg';
import img4 from '../assets/EngineeringProjectImages/projectImage4.png';
import img5 from '../assets/EngineeringProjectImages/projectImage5.png'; 


const headerImages = [
  { src: img1, alt: 'Advanced Automation System' },
  { src: img2, alt: 'Custom PLC Control Panel' },
  { src: img3, alt: 'Internet of Things Device' },
  { src: img4, alt: 'Drone Technology Project' },
  { src: img5, alt: 'Robotic Arm in Action' },
];

// Data for our tabs to keep JSX clean
const tabs = [
  { id: 'embedded', name: 'Embedded Projects', icon: Cpu },
  { id: 'raspberryPi', name: 'Raspberry Pi Projects', icon: CircuitBoard  },
  { id: 'android', name: 'Android App Projects', icon: Smartphone },
];

const EngineeringProjectsPage = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  // --- Initialize Embla Carousel for the header ---
  const [headerEmblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000, stopOnInteraction: false })
  ]);

  return (
    <div className="bg-white text-zinc-800">
      {/* Header Section */}
      <section className="bg-zinc-800 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                Need Ideas & Support In Your{' '}
                <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                  Engineering Projects?
                </span>
              </h1>
              <p className="mt-6 text-slate-300">
                Select from a wide list of BE engineering projects. We provide the best quality self-learning projects kits with Guidance and training to suit your needs.
              </p>
              <p className="mt-4 font-semibold text-orange-400">
                We Provide full support till project Submission.
              </p>
            </motion.div>
            <motion.div 
              className="relative hidden lg:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-orange-600/20 to-zinc-800 rounded-2xl blur-lg"></div>
              {/* Embla Carousel Viewport */}
              <div className="embla rounded-lg overflow-hidden shadow-2xl h-80 lg:h-96" ref={headerEmblaRef}>
                <div className="embla__container flex">
                  {headerImages.map((img, index) => (
                    <div className="embla__slide flex-[0_0_100%] min-w-0" key={index}>
                      <img src={img.src} alt={img.alt} className="w-full h-auto" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Explorer Section */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">Project List</h2>
          <div className="w-20 h-1.5 bg-orange-500 mx-auto rounded-full mb-12"></div>
          
          {/* Tab Navigation */}
          <div className="flex justify-center flex-wrap gap-4 mb-12">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <tab.icon className="w-5 h-5" />
                {tab.name}
              </motion.button>
            ))}
          </div>

          {/* Tab Content with Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-slate-700">
                {projectsData[activeTab].map((project, index) => (
                  <div key={project} className="flex items-start gap-3 py-2">
                    <span className="font-bold text-orange-500 mt-0.5">{index + 1}.</span>
                    <p>{project}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Custom Project CTA Section */}
      <section className="bg-slate-100">
        <div className="container mx-auto px-6 py-16 text-center">
          <h3 className="text-3xl font-bold text-zinc-800">Didn't find your desired project?</h3>
          <p className="mt-3 text-slate-600">Submit your requirement on our Contact page or send us an email.</p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block mt-6"
          >
            <Link to="/contact" className="flex items-center gap-2 px-8 py-3 font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-600 rounded-full shadow-lg">
              Submit Requirement
              <LinkIcon className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EngineeringProjectsPage;