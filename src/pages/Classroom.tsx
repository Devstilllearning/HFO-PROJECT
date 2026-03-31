import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { doc, getDoc, collection, query, where, onSnapshot } from 'firebase/firestore';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { BookOpen, Users, FileText, MessageSquare, Plus, ArrowLeft } from 'lucide-react';

export const Classroom = () => {
  const { classId } = useParams<{ classId: string }>();
  const { profile } = useAuth();
  const [classData, setClassData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('stream');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!classId) return;

    const fetchClass = async () => {
      try {
        const docRef = doc(db, 'classes', classId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setClassData({ id: docSnap.id, ...docSnap.data() });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching class:", error);
        setLoading(false);
      }
    };

    fetchClass();
  }, [classId]);

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div></div>;
  }

  if (!classData) {
    return <div className="text-center py-12">Class not found</div>;
  }

  const isTeacher = profile?.role === 'teacher' && classData.teacherId === profile?.uid;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-800 to-purple-600 rounded-2xl p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
        <Link to="/dashboard" className="inline-flex items-center text-purple-100 hover:text-white mb-6 text-sm font-medium transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
        </Link>
        <h1 className="text-4xl font-bold mb-2">{classData.name}</h1>
        <p className="text-xl text-purple-100 mb-4">{classData.subject}</p>
        <div className="flex items-center gap-4 text-sm text-purple-50">
          <span className="bg-purple-900/50 px-3 py-1 rounded-full">{classData.teacherName}</span>
          {isTeacher && (
            <span className="bg-white/20 px-3 py-1 rounded-full font-mono">Code: {classData.enrollCode}</span>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {[
          { id: 'stream', label: 'Stream', icon: MessageSquare },
          { id: 'classwork', label: 'Classwork', icon: BookOpen },
          { id: 'people', label: 'People', icon: Users },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="py-6">
        {activeTab === 'stream' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1 space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">Upcoming</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-900 mb-4">No work due soon</p>
                  <Link to="#" className="text-sm text-purple-600 hover:underline font-medium">View all</Link>
                </CardContent>
              </Card>
            </div>
            <div className="md:col-span-3 space-y-6">
              {isTeacher && (
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-gray-200">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold shrink-0">
                      {profile?.name?.charAt(0)}
                    </div>
                    <div className="text-gray-500 flex-1">Announce something to your class</div>
                  </CardContent>
                </Card>
              )}
              
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-gray-400" />
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">No announcements yet</h4>
                <p className="text-gray-500 max-w-sm mx-auto">
                  This is where you'll see updates, announcements, and discussions for this class.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'classwork' && (
          <div className="space-y-6">
            {isTeacher && (
              <div className="flex justify-between items-center mb-6">
                <Button className="rounded-full shadow-md">
                  <Plus className="h-5 w-5 mr-2" />
                  Create
                </Button>
              </div>
            )}
            
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
              <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">No classwork yet</h4>
              <p className="text-gray-500 max-w-sm mx-auto">
                {isTeacher 
                  ? "Create assignments, questions, and materials for your students." 
                  : "Your teacher hasn't assigned any classwork yet."}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'people' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-purple-600 border-b border-purple-200 pb-4 mb-6 flex items-center justify-between">
                Teachers
                <span className="text-sm font-normal text-gray-500">1</span>
              </h2>
              <div className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold shrink-0">
                  {classData.teacherName?.charAt(0)}
                </div>
                <span className="font-medium text-gray-900">{classData.teacherName}</span>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-purple-600 border-b border-purple-200 pb-4 mb-6 flex items-center justify-between">
                Students
                <span className="text-sm font-normal text-gray-500">0</span>
              </h2>
              <div className="text-center py-8 text-gray-500">
                No students enrolled yet.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
