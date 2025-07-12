// src/pages/OurBusinessCardPage.jsx

// --- Imports ---
import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, Globe, MapPin, Twitter, Mail, Linkedin, Facebook, Youtube, QrCode, Share2, Save, HelpCircle, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import profilePic from '../assets/digital-card/profile-pic.jpg';
import techAsiaLogo from '../assets/general/logo.png';

// --- Data ---
const socialLinksData = [
  { name: 'WhatsApp', icon: FaWhatsapp, href: 'https://api.whatsapp.com/send/?phone=917666308198&text&type=phone_number&app_absent=0' },
  { name: 'Twitter', icon: Twitter, href: 'https://x.com/priyesh287' },
  { name: 'Email', icon: Mail, href: 'mailto:info@techasiamechatronics.com' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/priyesh-chiplunkar-a4393366/?originalSubdomain=in' },
  { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/techAsiaMechatronics' },
  { name: 'YouTube', icon: Youtube, href: 'http://www.youtube.com/@techasiamechatronicspvt.lt2051' },
];

// --- Main Page Component ---
const OurBusinessCardPage = () => {
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const handleShare = async () => {
const shareData = {
title: 'TechAsia Mechatronics vCard',
text: 'Here is the digital business card for Priyesh Chiplunkar from TechAsia Mechatronics.',
url: window.location.href,
};
try {
if (navigator.share) {
await navigator.share(shareData);
} else {
throw new Error('Web Share API not supported');
}
// eslint-disable-next-line no-unused-vars
} catch (err) {
// Fallback for desktop or unsupported browsers
navigator.clipboard.writeText(window.location.href);
alert('Link copied to clipboard!');
}
};

  return (
    <div className="bg-[#2a2b2a] min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-1/4 -left-1/4 w-96 h-96 bg-gradient-to-br from-orange-200 to-transparent rounded-full opacity-50 blur-3xl" aria-hidden="true"></div>
      <div className="absolute -bottom-1/4 -right-1/4 w-96 h-96 bg-gradient-to-tl from-red-200 to-transparent rounded-full opacity-50 blur-3xl" aria-hidden="true"></div>
      
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative max-w-sm w-full mx-auto">
        <div 
            className="absolute -inset-2 bg-gradient-to-tr from-orange-300 to-red-200 rounded-[32px] blur-xl opacity-20"
            aria-hidden="true"
        ></div>
        <div className="relative bg-zinc-800 text-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-6 space-y-6">
            <div className="text-center">
              <div className="relative group w-32 h-32 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 to-red-600 rounded-full blur-xl opacity-0 group-hover:opacity-75 group-hover:scale-110 transition-all duration-300" aria-hidden="true"></div>
                <img src={profilePic} alt="Priyesh Ramesh Chiplunkar" className="relative w-full h-full rounded-full border-4 border-zinc-700 ring-2 ring-orange-500 transition-transform duration-300 group-hover:scale-105" />
              </div>
              <h1 className="mt-4 text-2xl font-bold text-orange-400">Priyesh Ramesh Chiplunkar</h1>
              <p className="text-slate-400">Director, BE. Electronics</p>
            </div>
            <div className="space-y-4">
              <ContactItem icon={Phone} text="+91 7666308198" href="tel:+917666308198" />
              <ContactItem icon={Globe} text="www.techasiamechatronics.com" href="https://www.techasiamechatronics.com" />
              <ContactItem icon={MapPin} text="302- Pandurang Smruti C.H.S., Dawadi, Dombivli(E)-421203" />
            </div>
            <div className="flex justify-around items-center pt-4 border-t border-zinc-700">
              {socialLinksData.map(social => (
                <SocialLink key={social.name} icon={social.icon} href={social.href} />
              ))}
            </div>
            <div className="text-center space-y-3 pt-4 border-t border-zinc-700">
              <img src={techAsiaLogo} alt="TechAsia Logo" className="h-14 mx-auto" />
              <p className="text-slate-400 text-sm leading-relaxed">
                Electronic Controllers, PLC Automation, APFC Panels, LED Lights & Digital vCards
              </p>
            </div>
          </div>
          
          <div className="bg-orange-500 grid grid-cols-4">
            <FooterAction icon={QrCode} text="QR" onClick={() => setIsQrModalOpen(true)} />
            <FooterAction icon={Share2} text="Share" onClick={handleShare} />
            <a href="/TechAsia_Mechatronics.vcf" download className="flex flex-col items-center justify-center py-3 text-white hover:bg-orange-600 transition-colors duration-200">
              <Save className="w-6 h-6" /><span className="text-xs mt-1">Save</span>
            </a>
            <Link to="/contact" className="flex flex-col items-center justify-center py-3 text-white hover:bg-orange-600 transition-colors duration-200">
              <HelpCircle className="w-6 h-6" /><span className="text-xs mt-1">Help</span>
            </Link>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isQrModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsQrModalOpen(false)} className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={(e) => e.stopPropagation()} className="relative bg-white p-6 rounded-lg shadow-xl">
              <img src="https://techasiamechatronics.com/vcard/qr.png" alt="TechAsia QR Code" className="w-64 h-64" />
              <button onClick={() => setIsQrModalOpen(false)} className="absolute -top-4 -right-4 bg-white rounded-full p-1 shadow-lg">
                <X className="w-6 h-6 text-zinc-800" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Helper Components ---

// eslint-disable-next-line no-unused-vars
const ContactItem = ({ icon: Icon, text, href }) => ( <div className="flex items-center gap-4 group"><div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"><Icon className="w-5 h-5 text-black" /></div>{href ? (<a href={href} target="_blank" rel="noopener noreferrer" className="text-slate-200 group-hover:underline">{text}</a>) : (<p className="text-slate-200">{text}</p>)}</div> );

// eslint-disable-next-line no-unused-vars
const SocialLink = ({ icon: Icon, href }) => ( <a href={href} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transform transition-transform duration-200 hover:scale-125"><Icon className="w-6 h-6" /></a> );

// eslint-disable-next-line no-unused-vars
const FooterAction = ({ icon: Icon, text, onClick }) => ( <button onClick={onClick} className="flex flex-col items-center justify-center py-3 text-white hover:bg-orange-600 transition-colors duration-200"><Icon className="w-6 h-6" /><span className="text-xs mt-1">{text}</span></button> );

export default OurBusinessCardPage;