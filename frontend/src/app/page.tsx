"use client";
import React from 'react';
import NavigationLayout from '../components/NavigationLayout';

export default function Dashboard() {
  return (
    <NavigationLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Dashboard Header */}
        <div className="flex justify-between items-end pb-4 border-b border-[#3b494c]">
          <div>
            <p className="text-[10px] text-[#c3f5ff] mb-1 uppercase tracking-tighter font-mono">Current_Node: Main_Registry</p>
            <h2 className="text-3xl font-bold text-[#d3e4fe]">System Overview</h2>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-[#26364a] border border-[#3b494c] text-[10px] text-[#bac9cc] font-mono">STATUS: OPTIMAL</span>
            <span className="px-3 py-1 bg-[#26364a] border border-[#3b494c] text-[10px] text-[#bac9cc] font-mono">UPTIME: 1,442H</span>
          </div>
        </div>

        {/* Bento Grid Content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Major Status Card */}
          <div className="col-span-12 lg:col-span-8 h-80 bg-[#102034] rounded-lg border border-[#3b494c] p-8 relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-[#c3f5ff] mb-6 font-mono tracking-tight">Active Neural Processing</h3>
              <div className="flex gap-12">
                <div>
                  <p className="text-[#bac9cc] text-[10px] uppercase font-mono mb-1">Compute Load</p>
                  <p className="text-5xl font-bold text-[#d3e4fe]">78.2%</p>
                </div>
                <div>
                  <p className="text-[#bac9cc] text-[10px] uppercase font-mono mb-1">Active Agents</p>
                  <p className="text-5xl font-bold text-[#d3e4fe]">1,024</p>
                </div>
              </div>
            </div>
            {/* Abstract Tech Graphic */}
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none p-8">
              <span className="material-symbols-outlined text-[150px] text-[#c3f5ff]">memory</span>
            </div>
          </div>

          {/* Mini Stats */}
          <div className="col-span-12 lg:col-span-4 h-80 grid grid-rows-2 gap-6">
            <div className="bg-[#102034] rounded-lg border border-[#3b494c] p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-[#c3f5ff]">database</span>
                <span className="text-[10px] text-[#c3f5ff] font-mono">SYNCED</span>
              </div>
              <div>
                <p className="text-[#bac9cc] text-[10px] uppercase font-mono mb-1">Data Integrity</p>
                <p className="text-2xl font-bold text-[#d3e4fe]">99.999%</p>
              </div>
            </div>
            <div className="bg-[#102034] rounded-lg border border-[#3b494c] p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-[#c3f5ff]">security</span>
                <span className="text-[10px] text-[#c3f5ff] font-mono">SECURE</span>
              </div>
              <div>
                <p className="text-[#bac9cc] text-[10px] uppercase font-mono mb-1">Protocol Layer</p>
                <p className="text-2xl font-bold text-[#d3e4fe]">V-Kernel-X</p>
              </div>
            </div>
          </div>

          {/* Market Feed */}
          <div className="col-span-12 lg:col-span-4 h-96 bg-[#0b1c30] rounded-lg border border-[#3b494c] overflow-hidden flex flex-col font-mono">
            <div className="p-4 border-b border-[#3b494c] bg-[#102034] flex justify-between items-center text-xs uppercase font-bold tracking-widest text-[#d3e4fe]">
              <span>Contributor_Feed</span>
              <span className="material-symbols-outlined text-[#bac9cc] text-sm cursor-pointer hover:rotate-180 transition-all">refresh</span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar text-[11px]">
              {[
                { user: '@neuro_link', msg: 'Pushed update to swarm_logic.git' },
                { user: '@void_coder', msg: 'Optimized Arkham layer latency' },
                { user: '@sys_admin', msg: 'Maintenance window at 0400 UTC' },
                { user: '@kernel_dev', msg: 'New enterprise module deployed' },
              ].map((item, i) => (
                <div key={i} className="p-3 bg-[#102034]/50 border border-[#3b494c] rounded hover:border-[#c3f5ff] transition-colors cursor-pointer">
                  <p className="text-[#c3f5ff] mb-1">{item.user}</p>
                  <p className="text-[#bac9cc]">{item.msg}</p>
                </div>
              ))}
            </div>
          </div>

          {/* System Visualization */}
          <div className="col-span-12 lg:col-span-8 h-96 bg-[#000f21] rounded-lg border border-[#3b494c] relative overflow-hidden group">
            <img 
              alt="Visualization" 
              className="w-full h-full object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBh3u03iMjpw3M_MdrT-NDD6eCKkT7NmxT0q_7XAI2EZs92gunVAl8CQqUCJGpin-rqufpJOgjo1uX-DGsAFeM5OnIKyW0s2g9UqNkhkslJmGsuk4GZkQ-bcBEFGdRw6iUW0Xa8ghSfIpPfRxhmoU5HHEIz3iD3LcFNbywyhGbQY9UGMooIBnOP3BE_sr3K8CqCs3GBlBfpte9uynWpTjW38QJd-MzhzvH1YakgVld7jCiec-E3DAo84ANUA3vYPS_XDWyWGW2BvJI" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#031427] via-transparent to-transparent p-8 flex flex-col justify-end">
              <h3 className="text-xl font-bold text-[#c3f5ff] mb-2 font-mono">Real-time Node Mapping</h3>
              <p className="text-[#bac9cc] text-sm max-w-md">Visualizing 14,000+ active connections across the global enterprise layer. Latency is within normal parameters.</p>
            </div>
          </div>
        </div>
      </div>
    </NavigationLayout>
  );
}
