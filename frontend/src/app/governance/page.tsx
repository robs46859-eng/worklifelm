"use client";
import React from 'react';
import NavigationLayout from '../../components/NavigationLayout';

export default function GovernancePage() {
  return (
    <NavigationLayout>
      <div className="max-w-6xl mx-auto">
        
{/* Left Column: Intelligence Trust Radar & Terminal */}
<div className="flex-1 flex flex-col gap-panel-gap bg-background">
{/* Section 1: Intelligence Trust Radar */}
<section className="flex-1 bg-surface-container p-md flex flex-col relative overflow-hidden">
<div className="flex justify-between items-center mb-md z-10">
<h2 className="font-label-xs text-label-xs uppercase tracking-widest text-outline">Intelligence Trust Radar</h2>
<span className="text-primary-fixed-dim font-code-sm text-code-sm">SYS_READY_V2.04</span>
</div>
<div className="flex-1 flex items-center justify-center relative">
{/* Circular Radar Visualization */}
<div className="w-64 h-64 md:w-80 md:h-80 rounded-full border border-outline-variant relative flex items-center justify-center radar-grid">
<div className="absolute inset-0 rounded-full border border-outline-variant opacity-20 scale-75"></div>
<div className="absolute inset-0 rounded-full border border-outline-variant opacity-10 scale-50"></div>
<div className="absolute inset-0 rounded-full border border-outline-variant opacity-5 scale-25"></div>
{/* Data Points */}
{/* Brave 98% */}
<div className="absolute top-[5%] left-[50%] -translate-x-1/2 group cursor-crosshair">
<div className="flex flex-col items-center">
<div className="w-2 h-2 bg-primary-fixed-dim shadow-[0_0_10px_rgba(0,218,243,0.8)] rounded-full mb-1"></div>
<span className="font-code-sm text-[10px] text-primary">Brave: 98%</span>
</div>
</div>
{/* GitHub 94% */}
<div className="absolute top-[40%] right-[10%] group cursor-crosshair">
<div className="flex flex-col items-center">
<div className="w-2 h-2 bg-primary-fixed-dim shadow-[0_0_10px_rgba(0,218,243,0.8)] rounded-full mb-1"></div>
<span className="font-code-sm text-[10px] text-primary">GitHub: 94%</span>
</div>
</div>
{/* Chroma 87% */}
<div className="absolute bottom-[20%] left-[15%] group cursor-crosshair">
<div className="flex flex-col items-center">
<div className="w-2 h-2 bg-primary-fixed-dim shadow-[0_0_10px_rgba(0,218,243,0.8)] rounded-full mb-1"></div>
<span className="font-code-sm text-[10px] text-primary">Chroma: 87%</span>
</div>
</div>
{/* Radar Sweep */}
<div className="absolute inset-0 rounded-full border-r-2 border-primary-fixed-dim/20 origin-center animate-[spin_4s_linear_infinite]"></div>
</div>
{/* Side Labels */}
<div className="absolute right-4 bottom-4 flex flex-col gap-xs items-end">
<div className="text-right">
<p className="font-label-xs text-label-xs text-outline">LATENCY</p>
<p className="font-code-sm text-code-sm text-primary">12.4ms</p>
</div>
<div className="text-right">
<p className="font-label-xs text-label-xs text-outline">NODES</p>
<p className="font-code-sm text-code-sm text-primary">1,024/1,024</p>
</div>
</div>
</div>
</section>
{/* Section 4: Moderation Control Terminal */}
<section className="h-48 bg-surface-container-lowest border-t border-outline-variant p-md font-code-sm text-code-sm relative group">
<div className="flex justify-between items-center mb-sm text-outline border-b border-outline-variant pb-1">
<div className="flex items-center gap-sm">
<span className="material-symbols-outlined text-[14px]" data-icon="terminal">terminal</span>
<span className="font-label-xs text-label-xs uppercase">Moderation Control Terminal</span>
</div>
<span className="font-label-xs text-label-xs">SSH:127.0.0.1</span>
</div>
<div className="overflow-y-auto h-24 space-y-1 mb-2 custom-scrollbar text-on-surface-variant">
<p>&gt; arkham-admin --status check</p>
<p className="text-primary-fixed-dim">[OK] Core governance systems operational.</p>
<p>&gt; /fetch_logs --level critical</p>
<p className="text-error">CRITICAL: Unverified segment in block 0xAF32</p>
<p className="flex items-center gap-1">&gt; <span className="w-2 h-4 bg-primary-fixed-dim animate-pulse"></span></p>
</div>
<div className="flex items-center gap-sm bg-surface-container-low px-2 py-1.5 border border-outline-variant">
<span className="text-primary-fixed-dim">$</span>
<input className="bg-transparent border-none focus:ring-0 text-code-sm w-full text-on-surface placeholder:text-outline-variant p-0" placeholder="Enter command..." type="text"  />
<span className="material-symbols-outlined text-outline cursor-pointer hover:text-primary-fixed-dim" data-icon="keyboard_return">keyboard_return</span>
</div>
</section>
</div>
{/* Right Column: Alerts & Heatmap */}
<div className="md:w-96 flex flex-col gap-panel-gap bg-background">
{/* Section 2: Hallucination Alert Stream */}
<section className="flex-1 bg-surface-container p-md flex flex-col">
<div className="flex justify-between items-center mb-md">
<h2 className="font-label-xs text-label-xs uppercase tracking-widest text-outline">Hallucination Stream</h2>
<span className="material-symbols-outlined text-error" data-icon="warning" data-weight="fill">warning</span>
</div>
<div className="flex-1 overflow-y-auto space-y-panel-gap">
{/* High Risk */}
<div className="p-sm bg-error-container/10 border-l-2 border-error hover:bg-surface-container-highest transition-colors cursor-pointer group">
<div className="flex justify-between items-start mb-1">
<span className="font-code-sm text-[10px] text-error font-bold uppercase">[High Risk]</span>
<span className="font-code-sm text-[10px] text-outline">14:22:01</span>
</div>
<p className="font-code-sm text-code-sm text-on-surface leading-tight">Factual inconsistency in source_ref_042</p>
<div className="mt-2 flex gap-sm opacity-0 group-hover:opacity-100 transition-opacity">
<button className="font-label-xs text-label-xs text-error border border-error px-2 py-0.5">FLAG</button>
<button className="font-label-xs text-label-xs text-outline border border-outline-variant px-2 py-0.5">DISMISS</button>
</div>
</div>
{/* Med Risk */}
<div className="p-sm bg-surface-container-high border-l-2 border-secondary hover:bg-surface-container-highest transition-colors cursor-pointer group">
<div className="flex justify-between items-start mb-1">
<span className="font-code-sm text-[10px] text-secondary font-bold uppercase">[Med Risk]</span>
<span className="font-code-sm text-[10px] text-outline">14:21:45</span>
</div>
<p className="font-code-sm text-code-sm text-on-surface-variant leading-tight">Unverified claim regarding API_V3; pending cross-check</p>
</div>
{/* Low Risk */}
<div className="p-sm bg-surface-container-high border-l-2 border-outline hover:bg-surface-container-highest transition-colors cursor-pointer group">
<div className="flex justify-between items-start mb-1">
<span className="font-code-sm text-[10px] text-outline font-bold uppercase">[Low Risk]</span>
<span className="font-code-sm text-[10px] text-outline">14:21:12</span>
</div>
<p className="font-code-sm text-code-sm text-on-surface-variant leading-tight">Tone drift detected in response segment 4</p>
</div>
</div>
</section>
{/* Section 3: Source Verification Heatmap */}
<section className="h-64 bg-surface-container p-md flex flex-col border-t border-outline-variant">
<div className="flex justify-between items-center mb-md">
<h2 className="font-label-xs text-label-xs uppercase tracking-widest text-outline">Verification Heatmap</h2>
<div className="flex items-center gap-sm">
<div className="w-2 h-2 bg-primary-fixed-dim rounded-full"></div>
<span className="font-label-xs text-[10px] text-outline">VERIFIED</span>
</div>
</div>
<div className="flex-1 grid grid-cols-8 grid-rows-6 gap-xs">
{/* Heatmap Cells (Simulated) */}
{/* Row 1 */}
<div className="bg-primary-fixed-dim/40 border border-primary-fixed-dim/20 hover:bg-primary-fixed-dim transition-colors"></div>
<div className="bg-primary-fixed-dim/60 border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim/80 border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim/20 border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim/40 border border-primary-fixed-dim/20"></div>
<div className="bg-error/30 border border-error/20"></div>
<div className="bg-primary-fixed-dim/60 border border-primary-fixed-dim/20"></div>
{/* Row 2 */}
<div className="bg-primary-fixed-dim/80 border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div className="bg-error/60 border border-error/40 relative">
<span className="absolute inset-0 flex items-center justify-center text-[8px] text-on-error">!</span>
</div>
<div className="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim/90 border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim/80 border border-primary-fixed-dim/20"></div>
{/* More rows filled with various shades of primary */}
<div className="bg-primary-fixed-dim/30 border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim/40 border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim/50 border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim/60 border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim/80 border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim/90 border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div className="bg-error border border-error/20"></div>
<div className="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim/10 border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim/20 border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim/30 border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim/90 border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim/80 border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim/70 border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim/60 border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim/40 border border-primary-fixed-dim/20"></div>
<div className="bg-primary-fixed-dim/20 border border-primary-fixed-dim/20"></div>
</div>
<div className="mt-sm flex justify-between font-label-xs text-[10px] text-outline">
<span>0x0000</span>
<span>BUFFER_OFFSETS_VIEW</span>
<span>0xFFFF</span>
</div>
</section>
</div>

      </div>
    </NavigationLayout>
  );
}
