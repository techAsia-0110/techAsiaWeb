import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../config/api';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', message: '' });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    const toastId = toast.loading('Sending your message...');

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Something went wrong');
      
      toast.success('Message sent! We will get back to you soon.', { id: toastId });
      setFormData({ name: '', email: '', mobile: '', message: '' }); // Clear form
    } catch (error) {
      toast.error(error.message, { id: toastId });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 pt-12 pb-16 sm:pt-16 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            {/* Left Column Content is unchanged */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-zinc-800 mb-4">About TechAsia</h2>
                <p className="text-slate-600 leading-relaxed">
                  TechAsia Mechatronics Pvt. Ltd. is a trusted name in electronics manufacturing and industrial automation. Since 2016, we have delivered cutting-edge solutions across various industries, specializing in the design, development, and production of electronic systems that increase productivity and reduce operational costs.
                </p>
              </div>
              <div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-zinc-800 mb-2">Our Vision</h3>
                    <p className="text-slate-600 leading-relaxed border-l-4 border-orange-400 pl-4">
                      To be a leading force in smart manufacturing and automation, shaping the future of industrial efficiency and innovation.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-zinc-800 mb-2">Our Mission</h3>
                    <p className="text-slate-600 leading-relaxed border-l-4 border-orange-400 pl-4">
                      To provide reliable, scalable, and innovative electronic and automation solutions that empower industries to perform at their best.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-zinc-800 mb-4">Our Office</h3>
                <div className="space-y-4 text-slate-600">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 mt-1 text-orange-500 flex-shrink-0" />
                    <span>302, Pandurang Smruti C, H.S, Dawadi Gaon Rd, near Regency Estate, Shivshakti Nagar, Sonar Pada, Dombivli East, Dombivli, Maharashtra 421203</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail className="h-5 w-5 text-orange-500 flex-shrink-0" />
                    <a href="mailto:info@techasiamechatronics.com" className="hover:text-orange-600">info@techasiamechatronics.com</a>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="h-5 w-5 text-orange-500 flex-shrink-0" />
                    <a href="tel:+917666308198" className="hover:text-orange-600">+91 7666308198</a>
                  </div>
                </div>
              </div>
              <div className="w-full h-80 rounded-lg overflow-hidden shadow-lg border">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.9067518068514!2d73.11199317466813!3d19.199274748092016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7bf878e333687%3A0xe888f9ff8893f96e!2stechAsia%20Mechatronics%20Private%20Limited!5e0!3m2!1sen!2sin!4v1750608668517!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe> 
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
            <div className="bg-slate-50 p-8 rounded-lg shadow-lg h-full">
              <h2 className="text-3xl font-bold text-zinc-800 mb-6">Get in Touch</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="sr-only">Name</label>
                  <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-md" placeholder="*Name" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="mobile" className="sr-only">Mobile No.</label>
                    <input type="tel" name="mobile" id="mobile" required value={formData.mobile} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-md" placeholder="*Mobile No." />
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-md" placeholder="*Email" />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">Message</label>
                  <textarea name="message" id="message" rows="8" required value={formData.message} onChange={handleChange} className="w-full p-3 bg-white border border-slate-300 rounded-md" placeholder="Message"></textarea>
                </div>
                <div>
                  <button type="submit" disabled={isSending} className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-600 rounded-full shadow-lg hover:scale-105 disabled:from-zinc-500 disabled:to-zinc-600">
                    {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    {isSending ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;