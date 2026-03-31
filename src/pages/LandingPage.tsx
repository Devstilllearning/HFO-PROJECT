import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { BookOpen, Users, Calendar, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

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
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 -skew-y-6 transform origin-top-left -z-10"></div>
        {/* Colorful decorative blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>
        
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
            <motion.p variants={fadeIn} className="text-xl text-gray-600 mb-10 leading-relaxed">
              The official digital learning platform for Holy Faithful Obedient Senior High School. Connect with teachers, collaborate with classmates, and excel in your studies.
            </motion.p>
            <motion.div variants={fadeIn} className="flex justify-center gap-4">
              <Link to="/login">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all hover:-translate-y-1">
                  Access Portal <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="#features">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full hover:bg-purple-50">
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

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-purple-700 to-purple-900 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="grid md:grid-cols-2">
              <div className="p-12 md:p-16 flex flex-col justify-center relative">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                  <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>
                <Award className="h-12 w-12 text-purple-300 mb-8 relative z-10" />
                <h2 className="text-3xl font-bold text-white mb-6 relative z-10 leading-tight">
                  "HFO's platform has completely transformed how our high school operates. It's intuitive, fast, and keeps my students engaged."
                </h2>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="h-12 w-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-xl border-2 border-purple-400">
                    SJ
                  </div>
                  <div>
                    <p className="text-white font-semibold">Sarah Johnson</p>
                    <p className="text-purple-200 text-sm">Mathematics Teacher</p>
                  </div>
                </div>
              </div>
              <div className="bg-black/20 p-12 md:p-16 flex flex-col justify-center backdrop-blur-sm">
                <ul className="space-y-6">
                  {[
                    'Real-time grade tracking',
                    'Instant assignment submissions',
                    'Direct teacher feedback',
                    'Mobile-friendly access',
                  ].map((item, i) => (
                    <motion.li 
                      key={i} 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="flex items-center gap-4 text-white text-lg"
                    >
                      <CheckCircle2 className="h-6 w-6 text-purple-300 flex-shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
