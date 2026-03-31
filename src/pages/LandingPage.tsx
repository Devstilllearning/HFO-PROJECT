import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { BookOpen, Users, Calendar, Award, ArrowRight, CheckCircle2, Mail, Phone, MapPin } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-white pt-16 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 -skew-y-6 transform origin-top-left -z-10"></div>
        {/* Colorful decorative blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.h1 variants={fadeIn} className="text-5xl font-extrabold text-gray-900 tracking-tight sm:text-6xl mb-6">
              Your High School Journey, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Elevated.</span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-xl text-gray-800 mb-10 leading-relaxed font-medium">
              The official digital learning platform for Holy Faithful Obedient Senior High School. Connect with teachers, collaborate with classmates, and excel in your studies.
            </motion.p>
            <motion.div variants={fadeIn} className="flex justify-center gap-4">
              <Link to="/login">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all hover:-translate-y-1">
                  Access Portal <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="#features">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full hover:bg-purple-50 bg-white/80 backdrop-blur-sm">
                  Learn More
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need to succeed</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform brings the classroom to your screen, providing all the tools necessary for a seamless educational experience.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                icon: BookOpen,
                title: 'Organized Classes',
                description: 'Access all your subjects, materials, and assignments in one clean, easy-to-navigate dashboard.',
              },
              {
                icon: Users,
                title: 'Seamless Communication',
                description: 'Stay connected with teachers and classmates through real-time announcements and discussions.',
              },
              {
                icon: Calendar,
                title: 'Never Miss a Deadline',
                description: 'Keep track of upcoming assignments and exams with our integrated calendar and notification system.',
              },
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-purple-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About HFO SHS & YPKB</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
              Holy Faithful Obedient Senior High School is proudly supported by Yayasan Pokok Kegirangan Bangsa (YPKB), dedicated to providing excellent education and character building.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-12 mt-12">
              <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
                <img src="https://storage.googleapis.com/mms-attachments-prod/bW1zLWF0dGFjaG1lbnQvYzM3Y2YwOWUtYjA0Mi00MThjLWE3ZmEtYmQ2Nzg1N2YyNDM4LzE3NDM0ODk2MTQ2MjYvYmFkZ2UuanBn" alt="HFO SHS Logo" className="h-48 md:h-64 w-auto object-contain drop-shadow-xl" referrerPolicy="no-referrer" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
                <img src="https://storage.googleapis.com/mms-attachments-prod/bW1zLWF0dGFjaG1lbnQvYzM3Y2YwOWUtYjA0Mi00MThjLWE3ZmEtYmQ2Nzg1N2YyNDM4LzE3NDM0ODk2MTQ2MjcvZG93bmxvYWQuanBn" alt="YPKB Logo" className="h-48 md:h-64 w-auto object-contain drop-shadow-xl" referrerPolicy="no-referrer" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h2>
            <div className="bg-purple-50 p-8 md:p-12 rounded-3xl shadow-sm border border-purple-100">
              <p className="text-lg text-gray-700 mb-8">Have questions? We're here to help you get started.</p>
              <div className="space-y-6 text-left max-w-sm mx-auto">
                <a href="mailto:info@hfo-school.edu" className="flex items-center gap-4 hover:bg-purple-100 p-2 rounded-lg transition-colors">
                  <div className="bg-white p-3 rounded-full shadow-sm text-purple-600">
                    <Mail className="h-6 w-6" />
                  </div>
                  <span className="text-gray-800 font-medium">info@hfo-school.edu</span>
                </a>
                <a href="tel:+15551234567" className="flex items-center gap-4 hover:bg-purple-100 p-2 rounded-lg transition-colors">
                  <div className="bg-white p-3 rounded-full shadow-sm text-purple-600">
                    <Phone className="h-6 w-6" />
                  </div>
                  <span className="text-gray-800 font-medium">+1 (555) 123-4567</span>
                </a>
                <a href="https://maps.google.com/?q=123+Education+Ave,+Depok" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:bg-purple-100 p-2 rounded-lg transition-colors">
                  <div className="bg-white p-3 rounded-full shadow-sm text-purple-600">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <span className="text-gray-800 font-medium">123 Education Ave, Depok</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
