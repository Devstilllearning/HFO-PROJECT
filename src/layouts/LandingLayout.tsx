import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { Button } from '../components/ui/button';

export const LandingLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-purple-600 p-2 rounded-lg flex items-center justify-center">
              {/* Fallback icon if user hasn't uploaded the logo yet */}
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">SHS</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <a href="#features" className="text-sm font-medium text-gray-600 hover:text-purple-600">Features</a>
            <a href="#about" className="text-sm font-medium text-gray-600 hover:text-purple-600">About</a>
            <a href="#contact" className="text-sm font-medium text-gray-600 hover:text-purple-600">Contact</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link to="/login">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-600 p-1.5 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold">SHS</span>
            </div>
            <p className="text-gray-400 text-sm max-w-xs">
              Holy Faithful Obedient Senior High School. Empowering students with modern learning tools for academic excellence.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/login" className="hover:text-white">Student Portal</Link></li>
              <li><Link to="/login" className="hover:text-white">Teacher Portal</Link></li>
              <li><Link to="/login" className="hover:text-white">Admin Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>info@hfo-school.edu</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Education Ave, Depok</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-sm text-gray-400 text-center">
          &copy; {new Date().getFullYear()} Holy Faithful Obedient Senior High School. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
