import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Add some empty days for the start of the month to align correctly
  const startDayOfWeek = monthStart.getDay();
  const emptyDays = Array.from({ length: startDayOfWeek });

  // Mock upcoming events for demonstration
  const events = [
    { id: 1, title: 'Midterm Mathematics Exam', date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15), time: '09:00 AM', type: 'Exam', color: 'bg-red-100 text-red-700' },
    { id: 2, title: 'Physics Lab Report Due', date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18), time: '11:59 PM', type: 'Assignment', color: 'bg-orange-100 text-orange-700' },
    { id: 3, title: 'School Assembly', date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 20), time: '08:00 AM', type: 'Event', color: 'bg-blue-100 text-blue-700' },
    { id: 4, title: 'History Essay Submission', date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 25), time: '11:59 PM', type: 'Assignment', color: 'bg-purple-100 text-purple-700' },
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
        {/* Main Calendar View */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="border-b bg-gray-50/50">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold text-gray-800">{format(currentDate, 'MMMM yyyy')}</CardTitle>
                <div className="flex gap-2">
                  <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
                    <ChevronLeft className="h-5 w-5 text-gray-600" />
                  </button>
                  <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
                    <ChevronRight className="h-5 w-5 text-gray-600" />
                  </button>
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
                {emptyDays.map((_, i) => (
                  <div key={`empty-${i}`} className="h-24 rounded-xl bg-gray-50/50 border border-transparent opacity-50"></div>
                ))}
                {daysInMonth.map((day, i) => {
                  const dayEvents = events.filter(e => isSameDay(e.date, day));
                  const isCurrentDay = isToday(day);
                  
                  return (
                    <motion.div 
                      key={day.toISOString()} 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.01 }}
                      className={`h-24 rounded-xl border p-2 flex flex-col transition-all cursor-pointer ${
                        isCurrentDay ? 'border-purple-500 bg-purple-50 shadow-sm' : 'border-gray-100 hover:border-purple-300 hover:shadow-md'
                      }`}
                    >
                      <span className={`text-sm font-medium ${isCurrentDay ? 'text-purple-700' : 'text-gray-700'}`}>
                        {format(day, 'd')}
                      </span>
                      <div className="mt-auto flex flex-col gap-1">
                        {dayEvents.map(event => (
                          <div key={event.id} className={`h-1.5 w-full rounded-full ${event.color.split(' ')[0]}`} title={event.title}></div>
                        ))}
                      </div>
                    </motion.div>
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
                Events in {format(currentDate, 'MMMM')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 divide-y divide-gray-100">
              {events.length > 0 ? events.map((event, index) => (
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
                      {format(event.date, 'MMM d, yyyy')}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {event.time}
                    </div>
                  </div>
                </motion.div>
              )) : (
                <div className="p-8 text-center text-gray-500">
                  No events this month.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};
