"use client";
import React, { useState } from 'react';

export default function CommandCenter() {
  const [activeMode, setActiveMode] = useState('Build Mode');

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-gray-200 font-sans overflow-hidden">
      {/* LEFT RAIL - Navigation */}
      <aside className="w-64 bg-[#111] border-r border-gray-800 flex flex-col justify-between">
        <div>
          <div className="p-6">
            <h1 className="text-xl font-bold tracking-wider text-white">WorkLife<span className="text-blue-500">LM</span></h1>
            <p className="text-xs text-gray-500 uppercase mt-1">Command Center</p>
          </div>
          
          <nav className="mt-4 px-4 space-y-6">
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Projects</h2>
              <ul className="space-y-1">
                {['FullStack', 'MedSpa', 'BIM', 'Game'].map(p => (
                  <li key={p} className="px-3 py-2 rounded hover:bg-gray-800 cursor-pointer text-sm transition-colors">{p}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">System</h2>
              <ul className="space-y-1">
                {['Agents', 'Data Sources', 'Revenue', 'Deployments'].map(p => (
                  <li key={p} className="px-3 py-2 rounded hover:bg-gray-800 cursor-pointer text-sm transition-colors flex items-center justify-between">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-800 text-xs text-gray-500">
          Swarm Router: Active
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP BAR - Global State */}
        <header className="h-16 border-b border-gray-800 bg-[#111] flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse"></div>
              <span className="text-sm text-green-400 font-medium">System Healthy</span>
            </div>
            <div className="h-4 w-px bg-gray-700"></div>
            <div className="text-sm"><span className="text-gray-500">Active Models:</span> Claude 3.5 Sonnet, Llama-3 8B</div>
            <div className="h-4 w-px bg-gray-700"></div>
            <div className="text-sm"><span className="text-gray-500">API Spend:</span> $12.40 / day</div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-1.5 bg-gray-800 hover:bg-gray-700 text-sm rounded border border-gray-700 transition-colors">Run Task</button>
            <button className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded shadow-lg shadow-blue-900/50 transition-colors">Generate Output</button>
          </div>
        </header>

        {/* MODES & CANVAS */}
        <div className="flex-1 flex flex-col min-h-0 bg-[#0A0A0A]">
          {/* Mode Selector */}
          <div className="flex px-6 py-3 space-x-1 border-b border-gray-800 bg-[#0d0d0d]">
            {['Build Mode', 'Operate Mode', 'Analyze Mode'].map(mode => (
              <button 
                key={mode}
                onClick={() => setActiveMode(mode)}
                className={`px-4 py-1.5 text-sm rounded-full transition-all ${activeMode === mode ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'}`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* 3-Panel Canvas */}
          <div className="flex-1 flex min-h-0 relative">
            
            {/* CENTER PANEL - Active Thread */}
            <div className="flex-1 flex flex-col border-r border-gray-800 min-w-0">
              <div className="px-6 py-4 border-b border-gray-800 bg-[#111]">
                <h3 className="font-medium text-white">Active Thread</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Swarm Orchestrator</span>
                    <span className="text-xs text-gray-500">12:34 PM</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Detected push to <span className="text-white bg-gray-800 px-1 rounded">FullStack/core</span>. Ingesting new GraphQL mutations. 
                    I've flagged a potential mismatch with the frontend assumptions in <span className="text-white hover:underline cursor-pointer">Decision Node #442</span>.
                  </p>
                </div>
                <div className="flex justify-end">
                  <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-900/50 max-w-[80%]">
                    <p className="text-sm text-blue-100">Spin up the UI_Engineer agent and draft a fix for the schema mismatch.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL - Context Engine */}
            <div className="w-80 bg-[#111] flex flex-col shrink-0">
              <div className="px-6 py-4 border-b border-gray-800">
                <h3 className="font-medium text-white">Context Engine</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <div>
                  <h4 className="text-xs uppercase text-gray-500 font-semibold mb-2 flex items-center"><span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span> Connected Repos</h4>
                  <div className="space-y-2">
                    <div className="p-2 bg-gray-800/50 rounded border border-gray-700/50 text-sm cursor-pointer hover:bg-gray-800">github.com/user/fullstack-core</div>
                    <div className="p-2 bg-gray-800/50 rounded border border-gray-700/50 text-sm cursor-pointer hover:bg-gray-800">github.com/user/medspa-crm</div>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs uppercase text-gray-500 font-semibold mb-2 flex items-center"><span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span> Unresolved Gaps</h4>
                  <div className="space-y-2">
                    <div className="p-2 bg-orange-900/20 rounded border border-orange-900/50 text-xs text-orange-200">
                      <strong>Decision Debt:</strong> Monetization path for BIM tool assumes subscription, but no Stripe webhook is configured.
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs uppercase text-gray-500 font-semibold mb-2 flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span> Memory Vectors</h4>
                  <div className="text-xs text-gray-400 p-2 bg-gray-900 rounded">
                    Found 12 related nodes across 3 projects matching current thread context.
                  </div>
                </div>
              </div>
            </div>
            
          </div>

          {/* BOTTOM PANEL - Execution Console */}
          <div className="h-48 border-t border-gray-800 bg-[#0a0a0a] flex flex-col shrink-0">
            <div className="px-4 py-2 border-b border-gray-800 flex justify-between items-center bg-[#111]">
              <span className="text-xs font-mono text-gray-400">Execution Console &gt;_</span>
              <div className="flex space-x-2">
                {activeMode === 'Build Mode' && <button className="text-xs bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded">Generate Code</button>}
                {activeMode === 'Operate Mode' && <button className="text-xs bg-green-900/30 text-green-400 hover:bg-green-900/50 border border-green-900/50 px-3 py-1 rounded">Run Outreach Workflow</button>}
                {activeMode === 'Analyze Mode' && <button className="text-xs bg-purple-900/30 text-purple-400 hover:bg-purple-900/50 border border-purple-900/50 px-3 py-1 rounded">Synthesize Monetization</button>}
              </div>
            </div>
            <div className="flex-1 p-4 font-mono text-xs text-gray-500 overflow-y-auto">
              <div><span className="text-blue-500">[System]</span> Orchestration layer initialized.</div>
              <div><span className="text-blue-500">[System]</span> Multi-modal parsers standing by.</div>
              {activeMode === 'Build Mode' && <div className="mt-2 text-green-500">Ready to feed prompts into Codex/Godot pipelines.</div>}
              {activeMode === 'Operate Mode' && <div className="mt-2 text-orange-500">Monitoring CRM webhooks and billing events...</div>}
              <div className="mt-4 flex items-center">
                <span className="text-blue-400 mr-2">❯</span>
                <input type="text" className="bg-transparent border-none outline-none flex-1 text-gray-300 placeholder-gray-700" placeholder={`Type a command or natural language request for ${activeMode}...`} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
