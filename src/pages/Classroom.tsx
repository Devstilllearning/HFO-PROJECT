import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { doc, getDoc, collection, query, where, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { BookOpen, Users, FileText, MessageSquare, Plus, ArrowLeft, Send, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '../components/ui/dialog';

export const Classroom = () => {
  const { classId } = useParams<{ classId: string }>();
  const { profile } = useAuth();
  const [classData, setClassData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('stream');
  const [loading, setLoading] = useState(true);
  
  // Announcements State
  const [assignments, setAssignments] = useState<any[]>([
    { id: 1, title: 'Chapter 1 Review', date: new Date().toLocaleDateString(), submitted: false }
  ]);

  const handleCreateAssignment = () => {
    const title = prompt("Enter assignment title:");
    if (title) {
      setAssignments([{ id: Date.now(), title, date: new Date().toLocaleDateString(), submitted: false }, ...assignments]);
    }
  };

  const [submittingAssignment, setSubmittingAssignment] = useState<number | null>(null);
  const [submissionText, setSubmissionText] = useState('');
  const [announcements, setAnnouncements] = useState<any[]>([]);

  const handleSubmitWork = () => {
    if (submittingAssignment !== null) {
      setAssignments(assignments.map(a => a.id === submittingAssignment ? { ...a, submitted: true } : a));
      setSubmittingAssignment(null);
      setSubmissionText('');
    }
  };
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [showPostBox, setShowPostBox] = useState(false);

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

  useEffect(() => {
    if (!classId) return;
    
    // Fetch announcements (client-side sort to avoid requiring composite index)
    const q = query(collection(db, 'announcements'), where('classId', '==', classId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      data.sort((a: any, b: any) => {
        const timeA = a.createdAt?.toMillis() || 0;
        const timeB = b.createdAt?.toMillis() || 0;
        return timeB - timeA;
      });
      setAnnouncements(data);
    });

    return () => unsubscribe();
  }, [classId]);

  const handlePostAnnouncement = async () => {
    if (!newAnnouncement.trim() || !profile || !classId) return;
    setIsPosting(true);
    try {
      await addDoc(collection(db, 'announcements'), {
        classId,
        content: newAnnouncement,
        authorId: profile.uid,
        authorName: profile.name,
        authorAvatar: profile.avatarUrl || '',
        createdAt: serverTimestamp()
      });
      setNewAnnouncement('');
      setShowPostBox(false);
    } catch (error) {
      console.error("Error posting announcement:", error);
    } finally {
      setIsPosting(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div></div>;
  }

  if (!classData) {
    return <div className="text-center py-12">Class not found</div>;
  }

  const isTeacher = profile?.role === 'teacher' && classData.teacherId === profile?.uid;

  const tabContentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto space-y-6"
    >
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
        <Link to="/dashboard" className="inline-flex items-center text-purple-100 hover:text-white mb-6 text-sm font-medium transition-colors relative z-10">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
        </Link>
        <h1 className="text-4xl font-bold mb-2 relative z-10">{classData.name}</h1>
        <p className="text-xl text-purple-100 mb-6 relative z-10">{classData.subject}</p>
        <div className="flex items-center gap-4 text-sm text-purple-50 relative z-10">
          <span className="bg-purple-900/50 px-4 py-1.5 rounded-full backdrop-blur-sm border border-purple-500/30">
            Teacher: {classData.teacherName}
          </span>
          {isTeacher && (
            <span className="bg-white/20 px-4 py-1.5 rounded-full font-mono backdrop-blur-sm border border-white/20">
              Code: {classData.enrollCode}
            </span>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 sticky top-0 bg-gray-50 z-20 pt-2">
        {[
          { id: 'stream', label: 'Stream', icon: MessageSquare },
          { id: 'classwork', label: 'Classwork', icon: BookOpen },
          { id: 'people', label: 'People', icon: Users },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-all ${
              activeTab === tab.id
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <tab.icon className={`h-4 w-4 ${activeTab === tab.id ? 'animate-pulse' : ''}`} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="py-6 min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === 'stream' && (
            <motion.div 
              key="stream"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-4 gap-6"
            >
              <div className="md:col-span-1 space-y-6">
                <Card className="border-gray-200 shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">Upcoming</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-900 mb-4">Woohoo, no work due soon!</p>
                    <button onClick={() => setActiveTab('classwork')} className="text-sm text-purple-600 hover:underline font-medium">View all</button>
                  </CardContent>
                </Card>
              </div>
              <div className="md:col-span-3 space-y-6">
                {isTeacher && (
                  <Card className="border-gray-200 shadow-sm overflow-hidden">
                    {!showPostBox ? (
                      <CardContent 
                        className="p-4 flex items-center gap-4 cursor-text hover:bg-gray-50 transition-colors"
                        onClick={() => setShowPostBox(true)}
                      >
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold shrink-0">
                          {profile?.name?.charAt(0)}
                        </div>
                        <div className="text-gray-500 flex-1">Announce something to your class...</div>
                      </CardContent>
                    ) : (
                      <CardContent className="p-4 space-y-4">
                        <textarea 
                          className="w-full min-h-[100px] p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none outline-none"
                          placeholder="Announce something to your class..."
                          value={newAnnouncement}
                          onChange={(e) => setNewAnnouncement(e.target.value)}
                          autoFocus
                        />
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" onClick={() => setShowPostBox(false)}>Cancel</Button>
                          <Button 
                            onClick={handlePostAnnouncement} 
                            disabled={!newAnnouncement.trim() || isPosting}
                            className="rounded-full"
                          >
                            <Send className="h-4 w-4 mr-2" />
                            {isPosting ? 'Posting...' : 'Post'}
                          </Button>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                )}
                
                {announcements.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm"
                  >
                    <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="h-8 w-8 text-gray-400" />
                    </div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No announcements yet</h4>
                    <p className="text-gray-500 max-w-sm mx-auto">
                      This is where you'll see updates, announcements, and discussions for this class.
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {announcements.map((announcement, index) => (
                      <motion.div 
                        key={announcement.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold shrink-0">
                                {announcement.authorName?.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{announcement.authorName}</p>
                                <p className="text-xs text-gray-500">
                                  {announcement.createdAt?.toDate().toLocaleDateString() || 'Just now'}
                                </p>
                              </div>
                            </div>
                            <p className="text-gray-800 whitespace-pre-wrap">{announcement.content}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'classwork' && (
            <motion.div 
              key="classwork"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              {isTeacher && (
                <div className="flex justify-between items-center mb-6">
                  <Button 
                    onClick={handleCreateAssignment}
                    className="rounded-full shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Create Assignment
                  </Button>
                </div>
              )}
              
              {assignments.length === 0 ? (
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
              ) : (
                <div className="space-y-4">
                  {assignments.map((assignment, index) => (
                    <motion.div 
                      key={assignment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-6 flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                            <FileText className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{assignment.title}</h4>
                            <p className="text-sm text-gray-500">Posted {assignment.date}</p>
                          </div>
                          {!isTeacher && (
                            <Button 
                              variant={assignment.submitted ? "secondary" : "default"}
                              size="sm"
                              onClick={() => !assignment.submitted && setSubmittingAssignment(assignment.id)}
                              disabled={assignment.submitted}
                              className={assignment.submitted ? "bg-green-100 text-green-700 hover:bg-green-100" : ""}
                            >
                              {assignment.submitted ? "Submitted" : "Submit Work"}
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Submit Work Dialog */}
              <Dialog open={submittingAssignment !== null} onOpenChange={(open) => !open && setSubmittingAssignment(null)}>
                <DialogContent className="bg-white">
                  <DialogHeader>
                    <DialogTitle>Submit Assignment</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <p className="text-sm text-gray-500">
                      Upload your work or type your answer below.
                    </p>
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-700">Click to upload files</p>
                      <p className="text-xs text-gray-500 mt-1">PDF, DOCX, or images up to 10MB</p>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-200" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-gray-500">Or</span>
                      </div>
                    </div>
                    <textarea 
                      placeholder="Type your answer here..." 
                      className="w-full min-h-[120px] p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-y outline-none"
                      value={submissionText}
                      onChange={(e) => setSubmissionText(e.target.value)}
                    />
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setSubmittingAssignment(null)}>Cancel</Button>
                    <Button onClick={handleSubmitWork}>Turn In</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </motion.div>
          )}

          {activeTab === 'people' && (
            <motion.div 
              key="people"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold text-purple-600 border-b border-purple-100 pb-4 mb-6 flex items-center justify-between">
                  Teachers
                </h2>
                <div className="flex items-center gap-4 px-4 py-3 hover:bg-purple-50 rounded-xl transition-colors">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold shrink-0 text-lg border-2 border-purple-200">
                    {classData.teacherName?.charAt(0)}
                  </div>
                  <span className="font-medium text-gray-900 text-lg">{classData.teacherName}</span>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold text-purple-600 border-b border-purple-100 pb-4 mb-6 flex items-center justify-between">
                  Students
                </h2>
                <div className="text-center py-12 text-gray-500">
                  <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p>No students enrolled yet.</p>
                  {isTeacher && <p className="text-sm mt-2">Share the class code <b>{classData.enrollCode}</b> with your students.</p>}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
