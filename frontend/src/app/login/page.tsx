"use client";
import React, { useState } from 'react';

const API_BASE = '/api';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
    const body = mode === 'login'
      ? { email, password }
      : { email, password, name };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || 'Something went wrong');
        setLoading(false);
        return;
      }

      // Store token and redirect
      localStorage.setItem('wlm_token', data.token);
      localStorage.setItem('wlm_user', JSON.stringify(data.user));
      window.location.href = '/';
    } catch {
      setError('Could not reach the server');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center font-sans">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-wider">WorkLife<span className="text-blue-500">LM</span></h1>
          <p className="text-gray-500 mt-2 text-sm">Your AI-powered orchestration layer</p>
        </div>

        <div className="bg-[#111] border border-gray-800 rounded-lg p-8">
          {/* Toggle */}
          <div className="flex mb-6 bg-gray-900 rounded-lg p-1">
            <button
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 py-2 text-sm rounded-md transition-all ${mode === 'login' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
            >Sign In</button>
            <button
              onClick={() => { setMode('register'); setError(''); }}
              className={`flex-1 py-2 text-sm rounded-md transition-all ${mode === 'register' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
            >Create Account</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="text-xs text-gray-500 uppercase font-semibold block mb-1">Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
                  placeholder="Your name" />
              </div>
            )}
            <div>
              <label className="text-xs text-gray-500 uppercase font-semibold block mb-1">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
                placeholder="you@example.com" />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase font-semibold block mb-1">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
                placeholder="••••••••" />
            </div>

            {error && <p className="text-red-400 text-xs bg-red-900/20 border border-red-900/50 rounded p-2">{error}</p>}

            <button type="submit" disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-600 text-white text-sm rounded-lg shadow-lg shadow-blue-900/50 transition-colors font-medium">
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          By continuing, you agree to the WorkLifeLM Terms of Service.
        </p>
      </div>
    </div>
  );
}
