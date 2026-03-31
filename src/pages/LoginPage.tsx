import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, Role } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { BookOpen, AlertCircle } from 'lucide-react';

export const LoginPage = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>('student');

  const handleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      await signInWithGoogle(selectedRole);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Colorful decorative blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <Card className="w-full max-w-md shadow-2xl border-0 relative z-10 bg-white/90 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center pb-8">
          <div className="flex justify-center mb-6">
            <div className="bg-purple-600 p-3 rounded-2xl shadow-lg shadow-purple-500/30">
              <BookOpen className="h-10 w-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight text-gray-900">Welcome back</CardTitle>
          <CardDescription className="text-base text-gray-500">
            Sign in to your HFO account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm flex items-center gap-3 border border-red-100">
              <AlertCircle className="h-5 w-5" />
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div className="flex justify-center gap-4 mb-6">
              <Button 
                variant={selectedRole === 'student' ? 'default' : 'outline'} 
                onClick={() => setSelectedRole('student')}
                className="flex-1"
              >
                Student
              </Button>
              <Button 
                variant={selectedRole === 'teacher' ? 'default' : 'outline'} 
                onClick={() => setSelectedRole('teacher')}
                className="flex-1"
              >
                Teacher
              </Button>
            </div>
            
            <Button 
              className="w-full h-12 text-base font-medium" 
              onClick={handleLogin} 
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in with Google'}
            </Button>
          </div>
          
          <div className="text-center text-sm text-gray-500 mt-8">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
