"use client";
import React from 'react';

export default function Pricing() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 font-sans p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">WorkLife<span className="text-blue-500">LM</span> Pricing</h1>
          <p className="text-gray-500">Scale your orchestration layer to match your workflow.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Free Tier */}
          <div className="bg-[#111] border border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white">Free Tier</h2>
            <div className="text-3xl font-bold text-blue-500 my-4">$0 <span className="text-sm font-normal text-gray-500">/ month</span></div>
            <button className="w-full py-2 bg-gray-800 hover:bg-gray-700 rounded text-sm mb-6 transition">Current Plan</button>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex justify-between"><span>Notebooks</span> <span className="text-white">100 / user</span></li>
              <li className="flex justify-between"><span>Sources</span> <span className="text-white">50 / notebook</span></li>
              <li className="flex justify-between"><span>Chats</span> <span className="text-white">50 / day</span></li>
              <li className="flex justify-between"><span>Audio Overviews</span> <span className="text-white">3 / day</span></li>
              <li className="flex justify-between"><span>Reports</span> <span className="text-white">10 / day</span></li>
              <li className="flex justify-between"><span>Flashcards & Quizzes</span> <span className="text-white">10 / day</span></li>
              <li className="flex justify-between"><span>Video Overviews</span> <span className="text-white">3 / day</span></li>
              <li className="flex justify-between"><span>Cinematic Videos</span> <span className="text-white">-</span></li>
              <li className="flex justify-between"><span>Mind Maps</span> <span className="text-white">10 / day</span></li>
              <li className="flex justify-between"><span>Deep Research</span> <span className="text-white">10 / month</span></li>
              <li className="flex justify-between"><span>Data & Infographics</span> <span className="text-white">Limited</span></li>
              <li className="flex justify-between"><span>Slide Decks</span> <span className="text-white">Limited</span></li>
            </ul>
          </div>

          {/* Professional Tier */}
          <div className="bg-[#111] border border-blue-500 rounded-lg p-6 relative shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl-lg rounded-tr-lg font-semibold">POPULAR</div>
            <h2 className="text-xl font-bold text-white">Professional</h2>
            <div className="text-3xl font-bold text-blue-400 my-4">$20 <span className="text-sm font-normal text-gray-500">/ month</span></div>
            <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-sm mb-6 shadow-lg shadow-blue-900/50 transition">Upgrade to Pro</button>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex justify-between"><span>Notebooks</span> <span className="text-white">200 / user</span></li>
              <li className="flex justify-between"><span>Sources</span> <span className="text-white">100 / notebook</span></li>
              <li className="flex justify-between"><span>Chats</span> <span className="text-white">200 / day</span></li>
              <li className="flex justify-between"><span>Audio Overviews</span> <span className="text-white">6 / day</span></li>
              <li className="flex justify-between"><span>Reports</span> <span className="text-white">20 / day</span></li>
              <li className="flex justify-between"><span>Flashcards & Quizzes</span> <span className="text-white">20 / day</span></li>
              <li className="flex justify-between"><span>Video Overviews</span> <span className="text-white">6 / day</span></li>
              <li className="flex justify-between"><span>Cinematic Videos</span> <span className="text-white">2 / day</span></li>
              <li className="flex justify-between"><span>Mind Maps</span> <span className="text-white">20 / day</span></li>
              <li className="flex justify-between"><span>Deep Research</span> <span className="text-white">3 / day</span></li>
              <li className="flex justify-between"><span>Data & Infographics</span> <span className="text-white">More Limits</span></li>
              <li className="flex justify-between"><span>Slide Decks</span> <span className="text-white">More Limits</span></li>
            </ul>
          </div>

          {/* Max Tier */}
          <div className="bg-[#111] border border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white">Max</h2>
            <div className="text-3xl font-bold text-purple-400 my-4">$100 <span className="text-sm font-normal text-gray-500">/ month</span></div>
            <button className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white rounded text-sm mb-6 shadow-lg shadow-purple-900/50 transition">Upgrade to Max</button>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex justify-between"><span>Notebooks</span> <span className="text-white">500 / user</span></li>
              <li className="flex justify-between"><span>Sources</span> <span className="text-white">300 / notebook</span></li>
              <li className="flex justify-between"><span>Chats</span> <span className="text-white">500 / day</span></li>
              <li className="flex justify-between"><span>Audio Overviews</span> <span className="text-white">20 / day</span></li>
              <li className="flex justify-between"><span>Reports</span> <span className="text-white">100 / day</span></li>
              <li className="flex justify-between"><span>Flashcards & Quizzes</span> <span className="text-white">100 / day</span></li>
              <li className="flex justify-between"><span>Video Overviews</span> <span className="text-white">20 / day</span></li>
              <li className="flex justify-between"><span>Cinematic Videos</span> <span className="text-white">Unlimited</span></li>
              <li className="flex justify-between"><span>Mind Maps</span> <span className="text-white">100 / day</span></li>
              <li className="flex justify-between"><span>Deep Research</span> <span className="text-white">20 / day</span></li>
              <li className="flex justify-between"><span>Data & Infographics</span> <span className="text-white">Highest Limits</span></li>
              <li className="flex justify-between"><span>Slide Decks</span> <span className="text-white">Highest Limits</span></li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
