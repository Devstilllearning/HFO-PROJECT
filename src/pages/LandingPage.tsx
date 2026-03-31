import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { BookOpen, Users, Calendar, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden pt-16 pb-32">
        <div className="absolute inset-0 bg-purple-50/50 -skew-y-6 transform origin-top-left -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight sm:text-6xl mb-6">
              Excellence in Education, <span className="text-purple-600">Anywhere.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Holy Faithful Obedient Senior High School's digital campus. Connect, learn, and grow with our modern learning management platform.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/login">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-purple-500/30">
                  Access Portal <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need to succeed</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform brings the classroom to your screen, providing all the tools necessary for a seamless educational experience.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
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
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="bg-purple-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-purple-600 rounded-3xl overflow-hidden shadow-xl">
            <div className="grid md:grid-cols-2">
              <div className="p-12 md:p-16 flex flex-col justify-center">
                <Award className="h-12 w-12 text-purple-300 mb-8" />
                <h2 className="text-3xl font-bold text-white mb-6">
                  "HFO's platform has completely transformed how I manage my classes. It's intuitive, fast, and keeps my students engaged."
                </h2>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-purple-400 flex items-center justify-center text-white font-bold text-xl">
                    SJ
                  </div>
                  <div>
                    <p className="text-white font-semibold">Sarah Johnson</p>
                    <p className="text-purple-200 text-sm">Mathematics Teacher</p>
                  </div>
                </div>
              </div>
              <div className="bg-purple-700 p-12 md:p-16 flex flex-col justify-center">
                <ul className="space-y-6">
                  {[
                    'Real-time grade tracking',
                    'Instant assignment submissions',
                    'Direct teacher feedback',
                    'Mobile-friendly access',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-white text-lg">
                      <CheckCircle2 className="h-6 w-6 text-purple-300 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
