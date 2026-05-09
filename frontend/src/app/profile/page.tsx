"use client";
import React, { useState, useEffect } from 'react';

export default function ProfilePage() {
  const [user, setUser] = useState<{id: number; email: string; name: string; tier: string} | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [profileMsg, setProfileMsg] = useState('');
  const [pwMsg, setPwMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('wlm_token');
    const stored = localStorage.getItem('wlm_user');
    if (!token || !stored) {
      window.location.href = '/login';
      return;
    }
    const u = JSON.parse(stored);
    setUser(u);
    setName(u.name || '');
    setEmail(u.email || '');
  }, []);

  const getAuth = () => ({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('wlm_token')}` });

  const handleProfileUpdate = async () => {
    setLoading(true);
    setProfileMsg('');
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: getAuth(),
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('wlm_token', data.token);
        localStorage.setItem('wlm_user', JSON.stringify(data.user));
        setUser(data.user);
        setProfileMsg('Profile updated successfully.');
      } else {
        setProfileMsg(data.detail || 'Update failed.');
      }
    } catch { setProfileMsg('Could not reach server.'); }
    setLoading(false);
  };

  const handlePasswordChange = async () => {
    setPwMsg('');
    if (newPw !== confirmPw) { setPwMsg('Passwords do not match.'); return; }
    if (newPw.length < 6) { setPwMsg('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: getAuth(),
        body: JSON.stringify({ current_password: currentPw, new_password: newPw }),
      });
      const data = await res.json();
      if (res.ok) {
        setPwMsg('Password changed successfully.');
        setCurrentPw(''); setNewPw(''); setConfirmPw('');
      } else {
        setPwMsg(data.detail || 'Password change failed.');
      }
    } catch { setPwMsg('Could not reach server.'); }
    setLoading(false);
  };

  const tierColors: Record<string, string> = {
    free: 'text-gray-400 bg-gray-800', professional: 'text-blue-400 bg-blue-900/30', max: 'text-purple-400 bg-purple-900/30', admin: 'text-red-400 bg-red-900/30',
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 font-sans">
      <header className="h-16 border-b border-gray-800 bg-[#111] flex items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <a href="/" className="text-xl font-bold tracking-wider text-white">WorkLife<span className="text-blue-500">LM</span></a>
          <span className="text-gray-600">/ Profile</span>
        </div>
        <a href="/" className="px-4 py-1.5 bg-gray-800 hover:bg-gray-700 text-sm rounded border border-gray-700 transition-colors">← Dashboard</a>
      </header>

      <div className="max-w-2xl mx-auto p-8 space-y-8">
        {/* Account Info */}
        <div className="bg-[#111] border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Account</h2>
            <span className={`text-xs px-3 py-1 rounded-full font-semibold uppercase ${tierColors[user.tier] || tierColors.free}`}>{user.tier}</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 uppercase font-semibold block mb-1">Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase font-semibold block mb-1">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500" />
            </div>
            {profileMsg && <p className={`text-xs p-2 rounded ${profileMsg.includes('success') ? 'bg-green-900/20 text-green-400 border border-green-900/50' : 'bg-red-900/20 text-red-400 border border-red-900/50'}`}>{profileMsg}</p>}
            <button onClick={handleProfileUpdate} disabled={loading}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 text-white text-sm rounded-lg shadow-lg shadow-blue-900/50 transition-colors font-medium">
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-[#111] border border-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-bold text-white mb-6">Change Password</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 uppercase font-semibold block mb-1">Current Password</label>
              <input type="password" value={currentPw} onChange={e => setCurrentPw(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500" placeholder="••••••••" />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase font-semibold block mb-1">New Password</label>
              <input type="password" value={newPw} onChange={e => setNewPw(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500" placeholder="••••••••" />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase font-semibold block mb-1">Confirm New Password</label>
              <input type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500" placeholder="••••••••" />
            </div>
            {pwMsg && <p className={`text-xs p-2 rounded ${pwMsg.includes('success') ? 'bg-green-900/20 text-green-400 border border-green-900/50' : 'bg-red-900/20 text-red-400 border border-red-900/50'}`}>{pwMsg}</p>}
            <button onClick={handlePasswordChange} disabled={loading || !currentPw || !newPw}
              className="px-6 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-white text-sm rounded-lg border border-gray-700 transition-colors font-medium">
              {loading ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </div>

        {/* Subscription */}
        <div className="bg-[#111] border border-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-bold text-white mb-4">Subscription</h2>
          <p className="text-sm text-gray-400 mb-4">Current plan: <span className="text-white font-medium capitalize">{user.tier}</span></p>
          <div className="flex space-x-3">
            <a href="/pricing" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-colors">Manage Plan</a>
            <button onClick={() => { localStorage.removeItem('wlm_token'); localStorage.removeItem('wlm_user'); window.location.href = '/login'; }}
              className="px-4 py-2 bg-red-900/30 hover:bg-red-900/50 text-red-400 text-sm rounded-lg border border-red-900/50 transition-colors">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
