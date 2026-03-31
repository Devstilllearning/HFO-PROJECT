import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Calendar as CalendarIcon, Clock, BookOpen } from 'lucide-react';

export const Calendar = () => {
  // Mock upcoming events for demonstration
  const events = [
    { id: 1, title: 'Midterm Mathematics Exam', date: 'Oct 15, 2026', time: '09:00 AM', type: 'Exam', color: 'bg-red-100 text-red-700' },
    { id: 2, title: 'Physics Lab Report Due', date: 'Oct 18, 2026', time: '11:59 PM', type: 'Assignment', color: 'bg-orange-100 text-orange-700' },
    { id: 3, title: 'School Assembly', date: 'Oct 20, 2026', time: '08:00 AM', type: 'Event', color: 'bg-blue-100 text-blue-700' },
    { id: 4, title: 'History Essay Submission', date: 'Oct 25, 2026', time: '11:59 PM', type: 'Assignment', color: 'bg-purple-100 text-purple-700' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto space-y-8"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Academic Calendar</h1>
          <p className="text-gray-500 mt-2">Keep track of your upcoming assignments and school events.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Calendar View (Mockup) */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="border-b bg-gray-50/50">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold text-gray-800">October 2026</CardTitle>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-gray-100">&lt;</button>
                  <button className="p-2 rounded-lg hover:bg-gray-100">&gt;</button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-7 gap-2 text-center mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-sm font-medium text-gray-500">{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {/* Empty days for start of month */}
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-24 rounded-xl bg-gray-50 border border-transparent opacity-50"></div>
                ))}
                {/* Days of the month */}
                {Array.from({ length: 31 }).map((_, i) => {
                  const day = i + 1;
                  const hasEvent = [15, 18, 20, 25].includes(day);
                  return (
                    <div 
                      key={day} 
                      className={`h-24 rounded-xl border p-2 flex flex-col transition-all ${
                        day === new Date().getDate() ? 'border-purple-500 bg-purple-50' : 'border-gray-100 hover:border-purple-200'
                      }`}
                    >
                      <span className={`text-sm font-medium ${day === new Date().getDate() ? 'text-purple-700' : 'text-gray-700'}`}>
                        {day}
                      </span>
                      {hasEvent && (
                        <div className="mt-auto">
                          <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mx-auto"></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events List */}
        <div className="space-y-6">
          <Card className="border-gray-200 shadow-sm h-full">
            <CardHeader className="border-b bg-gray-50/50">
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-purple-600" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 divide-y divide-gray-100">
              {events.map((event, index) => (
                <motion.div 
                  key={event.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${event.color}`}>
                      {event.type}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{event.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-3.5 w-3.5" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {event.time}
                    </div>
                  </div>
                </motion.div>
              ))}
              <div className="p-4 text-center">
                <button className="text-sm font-medium text-purple-600 hover:underline">View All Events</button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};
