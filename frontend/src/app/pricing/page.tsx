"use client";
import React, { useState, useEffect } from 'react';

export default function Pricing() {
  const [loading, setLoading] = useState<string | null>(null);
  const [userTier, setUserTier] = useState('free');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('wlm_user');
    if (stored) {
      const user = JSON.parse(stored);
      setUserTier(user.tier || 'free');
      setIsLoggedIn(true);
    }
  }, []);

  const handleUpgrade = async (tier: string) => {
    const token = localStorage.getItem('wlm_token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    setLoading(tier);
    try {
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ tier }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      alert('Could not create checkout session');
    }
    setLoading(null);
  };

  const tiers = [
    {
      name: 'Free', price: '$0', color: 'gray', tier: 'free',
      limits: [
        ['Notebooks', '100 / user'], ['Sources', '50 / notebook'], ['Chats', '50 / day'],
        ['Audio Overviews', '3 / day'], ['Reports', '10 / day'], ['Flashcards & Quizzes', '10 / day'],
        ['Video Overviews', '3 / day'], ['Cinematic Videos', '—'], ['Mind Maps', '10 / day'],
        ['Deep Research', '10 / month'], ['Data & Infographics', 'Limited'], ['Slide Decks', 'Limited'],
      ],
    },
    {
      name: 'Professional', price: '$20', color: 'blue', tier: 'professional', popular: true,
      limits: [
        ['Notebooks', '200 / user'], ['Sources', '100 / notebook'], ['Chats', '200 / day'],
        ['Audio Overviews', '6 / day'], ['Reports', '20 / day'], ['Flashcards & Quizzes', '20 / day'],
        ['Video Overviews', '6 / day'], ['Cinematic Videos', '2 / day'], ['Mind Maps', '20 / day'],
        ['Deep Research', '3 / day'], ['Data & Infographics', 'More Limits'], ['Slide Decks', 'More Limits'],
      ],
    },
    {
      name: 'Max', price: '$100', color: 'purple', tier: 'max',
      limits: [
        ['Notebooks', '500 / user'], ['Sources', '300 / notebook'], ['Chats', '500 / day'],
        ['Audio Overviews', '20 / day'], ['Reports', '100 / day'], ['Flashcards & Quizzes', '100 / day'],
        ['Video Overviews', '20 / day'], ['Cinematic Videos', 'Unlimited'], ['Mind Maps', '100 / day'],
        ['Deep Research', '20 / day'], ['Data & Infographics', 'Highest Limits'], ['Slide Decks', 'Highest Limits'],
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 font-sans p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <a href="/" className="text-3xl font-bold text-white mb-2 inline-block">WorkLife<span className="text-blue-500">LM</span></a>
          <h1 className="text-2xl font-bold text-white mt-2">Pricing</h1>
          <p className="text-gray-500 mt-1">Scale your orchestration layer to match your workflow.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map(t => {
            const isCurrent = userTier === t.tier;
            const borderClass = t.popular ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'border-gray-800';
            const btnColor = t.color === 'blue' ? 'bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/50'
              : t.color === 'purple' ? 'bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-900/50'
              : 'bg-gray-800 hover:bg-gray-700';
            const priceColor = t.color === 'blue' ? 'text-blue-400' : t.color === 'purple' ? 'text-purple-400' : 'text-blue-500';

            return (
              <div key={t.tier} className={`bg-[#111] border ${borderClass} rounded-lg p-6 relative`}>
                {t.popular && <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl-lg rounded-tr-lg font-semibold">POPULAR</div>}
                <h2 className="text-xl font-bold text-white">{t.name}</h2>
                <div className={`text-3xl font-bold ${priceColor} my-4`}>{t.price} <span className="text-sm font-normal text-gray-500">/ month</span></div>

                {isCurrent ? (
                  <div className="w-full py-2 bg-green-900/30 border border-green-600/30 text-green-400 rounded text-sm mb-6 text-center font-medium">
                    ✓ Current Plan
                  </div>
                ) : t.tier === 'free' ? (
                  <div className="w-full py-2 bg-gray-800 rounded text-sm mb-6 text-center text-gray-500">Free Forever</div>
                ) : (
                  <button
                    onClick={() => handleUpgrade(t.tier)}
                    disabled={loading === t.tier}
                    className={`w-full py-2 ${btnColor} text-white rounded text-sm mb-6 transition font-medium disabled:opacity-50`}
                  >
                    {loading === t.tier ? 'Redirecting...' : `Upgrade to ${t.name}`}
                  </button>
                )}

                <ul className="space-y-3 text-sm text-gray-400">
                  {t.limits.map(([label, value]) => (
                    <li key={label} className="flex justify-between">
                      <span>{label}</span>
                      <span className="text-white">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {!isLoggedIn && (
          <p className="text-center text-gray-600 text-sm mt-8">
            <a href="/login" className="text-blue-400 hover:text-blue-300 underline">Sign in</a> to upgrade your plan.
          </p>
        )}
      </div>
    </div>
  );
}
