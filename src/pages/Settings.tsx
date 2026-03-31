import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { User, Mail, Camera, Save } from 'lucide-react';
import { motion } from 'motion/react';

export const Settings = () => {
  const { profile } = useAuth();
  const [name, setName] = useState(profile?.name || '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatarUrl || '');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?.uid) return;
    
    setIsSaving(true);
    setMessage('');
    
    try {
      const userRef = doc(db, 'users', profile.uid);
      await updateDoc(userRef, {
        name,
        avatarUrl
      });
      setMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-2">Manage your account settings and preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal details and public profile.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="flex items-center gap-6 mb-6">
              <div className="relative">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="h-24 w-24 rounded-full object-cover border-4 border-purple-50" />
                ) : (
                  <div className="h-24 w-24 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-3xl border-4 border-purple-50">
                    {name.charAt(0) || 'U'}
                  </div>
                )}
                <div className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md border border-gray-100 text-gray-500 hover:text-purple-600 cursor-pointer transition-colors">
                  <Camera className="h-4 w-4" />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture URL</label>
                <input 
                  type="url" 
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all"
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="email" 
                    value={profile?.email || ''}
                    disabled
                    className="w-full pl-10 p-2.5 border border-gray-200 bg-gray-50 text-gray-500 rounded-lg outline-none cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Email address cannot be changed.</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <input 
                  type="text" 
                  value={profile?.role || ''}
                  disabled
                  className="w-full p-2.5 border border-gray-200 bg-gray-50 text-gray-500 rounded-lg outline-none cursor-not-allowed capitalize"
                />
              </div>
            </div>

            {message && (
              <div className={`p-3 rounded-lg text-sm ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {message}
              </div>
            )}

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <Button type="submit" disabled={isSaving} className="rounded-full px-6">
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};
