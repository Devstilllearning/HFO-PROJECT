import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs, onSnapshot, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { BookOpen, Users, Clock, Plus, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export const Dashboard = () => {
  const { profile } = useAuth();
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Create Class State
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newClassSubject, setNewClassSubject] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  // Join Class State
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [joinError, setJoinError] = useState('');

  useEffect(() => {
    if (!profile) return;

    let unsubscribe: () => void;

    const fetchClasses = async () => {
      try {
        if (profile.role === 'teacher') {
          const q = query(collection(db, 'classes'), where('teacherId', '==', profile.uid));
          unsubscribe = onSnapshot(q, (snapshot) => {
            const classData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setClasses(classData);
            setLoading(false);
          });
        } else if (profile.role === 'student') {
          const q = query(collection(db, 'enrollments'), where('studentId', '==', profile.uid));
          unsubscribe = onSnapshot(q, async (snapshot) => {
            const enrollments = snapshot.docs.map(doc => doc.data());
            const classPromises = enrollments.map(async (enrollment) => {
              const classDoc = await getDoc(doc(db, 'classes', enrollment.classId));
              return { id: classDoc.id, ...classDoc.data() };
            });
            const classData = await Promise.all(classPromises);
            setClasses(classData.filter(c => c.id)); // Filter out nulls if a class was deleted
            setLoading(false);
          });
        } else {
          // Admin sees all classes
          const q = query(collection(db, 'classes'));
          unsubscribe = onSnapshot(q, (snapshot) => {
            const classData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setClasses(classData);
            setLoading(false);
          });
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
        setLoading(false);
      }
    };

    fetchClasses();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [profile]);

  const handleCreateClass = async () => {
    if (!newClassName || !newClassSubject || !profile) return;
    setIsCreating(true);
    try {
      const classId = Math.random().toString(36).substring(2, 10);
      const enrollCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      
      await setDoc(doc(db, 'classes', classId), {
        id: classId,
        name: newClassName,
        subject: newClassSubject,
        teacherId: profile.uid,
        teacherName: profile.name,
        enrollCode,
        createdAt: serverTimestamp(),
      });
      
      setIsCreateOpen(false);
      setNewClassName('');
      setNewClassSubject('');
    } catch (error) {
      console.error("Error creating class:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleJoinClass = async () => {
    if (!joinCode || !profile) return;
    setIsJoining(true);
    setJoinError('');
    try {
      const q = query(collection(db, 'classes'), where('enrollCode', '==', joinCode));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        setJoinError('Invalid class code');
        setIsJoining(false);
        return;
      }
      
      const classDoc = querySnapshot.docs[0];
      const classId = classDoc.id;
      
      // Check if already enrolled
      const enrollmentId = `${classId}_${profile.uid}`;
      const enrollmentRef = doc(db, 'enrollments', enrollmentId);
      const enrollmentSnap = await getDoc(enrollmentRef);
      
      if (enrollmentSnap.exists()) {
        setJoinError('You are already enrolled in this class');
        setIsJoining(false);
        return;
      }
      
      await setDoc(enrollmentRef, {
        classId,
        studentId: profile.uid,
        studentName: profile.name,
        joinedAt: serverTimestamp(),
      });
      
      setIsJoinOpen(false);
      setJoinCode('');
    } catch (error) {
      console.error("Error joining class:", error);
      setJoinError('Failed to join class');
    } finally {
      setIsJoining(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div></div>;
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {profile?.name}!</h2>
          <p className="text-gray-600">Here's what's happening in your classes today.</p>
        </div>
        {profile?.role === 'teacher' && (
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="shrink-0">
                <Plus className="h-5 w-5 mr-2" />
                Create Class
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle>Create a new class</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="className">Class Name</Label>
                  <Input 
                    id="className" 
                    placeholder="e.g. Mathematics 101" 
                    value={newClassName}
                    onChange={(e) => setNewClassName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject" 
                    placeholder="e.g. Algebra" 
                    value={newClassSubject}
                    onChange={(e) => setNewClassSubject(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateClass} disabled={!newClassName || !newClassSubject || isCreating}>
                  {isCreating ? 'Creating...' : 'Create'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        {profile?.role === 'student' && (
          <Dialog open={isJoinOpen} onOpenChange={setIsJoinOpen}>
            <DialogTrigger asChild>
              <Button className="shrink-0">
                <Plus className="h-5 w-5 mr-2" />
                Join Class
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle>Join a class</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="joinCode">Class Code</Label>
                  <Input 
                    id="joinCode" 
                    placeholder="Ask your teacher for the class code" 
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                  />
                  {joinError && <p className="text-sm text-red-500 mt-1">{joinError}</p>}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsJoinOpen(false)}>Cancel</Button>
                <Button onClick={handleJoinClass} disabled={!joinCode || isJoining}>
                  {isJoining ? 'Joining...' : 'Join'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Stats/Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-purple-50 border-purple-100">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-purple-600 p-3 rounded-xl text-white">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-purple-600 mb-1">Enrolled Classes</p>
              <h3 className="text-2xl font-bold text-gray-900">{classes.length}</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-100">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-green-600 p-3 rounded-xl text-white">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-600 mb-1">Upcoming Tasks</p>
              <h3 className="text-2xl font-bold text-gray-900">3</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-orange-50 border-orange-100">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-orange-600 p-3 rounded-xl text-white">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-orange-600 mb-1">New Announcements</p>
              <h3 className="text-2xl font-bold text-gray-900">5</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Class List */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Your Classes</h3>
          <Link to="/dashboard/classes" className="text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center">
            View all <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        {classes.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">No classes yet</h4>
            <p className="text-gray-500 max-w-sm mx-auto mb-6">
              {profile?.role === 'teacher' 
                ? "You haven't created any classes yet. Create one to get started." 
                : "You haven't joined any classes yet. Use a class code to join."}
            </p>
            {profile?.role === 'teacher' && (
              <Button variant="outline" onClick={() => setIsCreateOpen(true)}>Create Class</Button>
            )}
            {profile?.role === 'student' && (
              <Button variant="outline" onClick={() => setIsJoinOpen(true)}>Join Class</Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((c) => (
              <Link key={c.id} to={`/dashboard/classes/${c.id}`}>
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer border-gray-200 overflow-hidden group">
                  <div className="h-32 bg-gradient-to-r from-purple-700 to-purple-500 p-6 flex flex-col justify-end relative">
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white">
                      {c.subject}
                    </div>
                    <h4 className="text-xl font-bold text-white truncate group-hover:underline">{c.name}</h4>
                    <p className="text-purple-100 text-sm truncate">{c.teacherName}</p>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <Users className="h-4 w-4" /> 24 Students
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" /> 2 Due soon
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
