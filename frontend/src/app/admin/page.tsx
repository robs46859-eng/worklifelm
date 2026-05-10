"use client";
import React from 'react';
import NavigationLayout from '../../components/NavigationLayout';

export default function AdminPage() {
  return (
    <NavigationLayout>
      <div className="max-w-6xl mx-auto">
        
{/* Left Sidebar: System Health */}
<section className="md:col-span-4 bg-surface-container-low p-md flex flex-col gap-md min-h-[400px]">
<div className="flex items-center justify-between border-b border-outline-variant pb-xs">
<h2 className="font-label-xs text-label-xs uppercase tracking-widest text-on-surface-variant">Global System Health</h2>
<span className="material-symbols-outlined text-primary-fixed-dim text-sm" data-icon="monitor_heart">monitor_heart</span>
</div>
<div className="flex-1 bg-surface-container-lowest panel-border p-sm font-code-sm text-code-sm overflow-hidden flex flex-col">
<div className="flex flex-col gap-xs custom-scrollbar overflow-y-auto">
<p className="text-on-surface-variant opacity-50">[08:44:21] <span className="text-primary-fixed-dim">KERNEL: INITIALIZING...</span></p>
<p className="text-on-surface-variant opacity-50">[08:44:22] <span className="text-primary-fixed-dim">SWARM_CORE: NODES_ONLINE(128)</span></p>
<p className="text-on-surface-variant opacity-50">[08:44:22] <span className="text-primary-fixed-dim">SWARM_04 ACTIVE</span></p>
<p className="text-on-surface-variant opacity-50">[08:44:23] <span className="text-primary-fixed-dim">CHROMADB LATENCY: 12ms</span></p>
<p className="text-on-surface-variant opacity-50">[08:44:25] <span className="text-primary-fixed-dim">API STATUS: OK</span></p>
<p className="text-on-surface-variant opacity-50">[08:44:28] <span className="text-on-tertiary-container">LOG: SYNCING PERSISTENT VOLUMES</span></p>
<p className="text-on-surface-variant opacity-50">[08:44:30] <span className="text-primary-fixed-dim">VECTOR_STORE: INDEX_READY</span></p>
<p className="text-on-surface-variant opacity-50">[08:44:32] <span className="text-on-tertiary-container">LOG: INFERENCE_PIPELINE START</span></p>
<div className="flex gap-xs items-center text-primary-fixed-dim animate-pulse">
<span>_</span>
<span className="text-[10px]">LISTENING FOR EVENTS</span>
</div>
</div>
</div>
<div className="grid grid-cols-2 gap-sm mt-auto">
<div className="bg-surface-container p-sm border border-outline-variant flex flex-col gap-xs">
<span className="font-label-xs text-label-xs text-on-surface-variant">CPU LOAD</span>
<div className="h-1 w-full bg-surface-variant">
<div className="h-full bg-primary-fixed-dim w-1/3"></div>
</div>
<span className="font-code-sm text-code-sm text-primary-fixed-dim">34.2%</span>
</div>
<div className="bg-surface-container p-sm border border-outline-variant flex flex-col gap-xs">
<span className="font-label-xs text-label-xs text-on-surface-variant">MEM USE</span>
<div className="h-1 w-full bg-surface-variant">
<div className="h-full bg-primary-fixed-dim w-3/4"></div>
</div>
<span className="font-code-sm text-code-sm text-primary-fixed-dim">12.4 GB</span>
</div>
</div>
</section>
{/* Center: User Management */}
<section className="md:col-span-5 bg-surface-container-low p-md flex flex-col gap-md">
<div className="flex items-center justify-between border-b border-outline-variant pb-xs">
<h2 className="font-label-xs text-label-xs uppercase tracking-widest text-on-surface-variant">User Management</h2>
<div className="flex gap-sm">
<span className="material-symbols-outlined text-on-surface-variant text-sm cursor-pointer" data-icon="search">search</span>
<span className="material-symbols-outlined text-on-surface-variant text-sm cursor-pointer" data-icon="filter_list">filter_list</span>
</div>
</div>
<div className="flex-1 overflow-x-auto">
<table className="w-full text-left font-code-sm border-collapse">
<thead>
<tr className="border-b border-outline-variant bg-surface-container">
<th className="p-sm text-label-xs text-on-surface-variant font-medium">UID</th>
<th className="p-sm text-label-xs text-on-surface-variant font-medium">USER_IDENTITY</th>
<th className="p-sm text-label-xs text-on-surface-variant font-medium">TIER</th>
<th className="p-sm text-label-xs text-on-surface-variant font-medium text-right">ROOT_ACCESS</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant/30">
<tr className="hover:bg-surface-bright transition-colors">
<td className="p-sm text-on-tertiary-container">001</td>
<td className="p-sm font-medium">alex_dev.sh</td>
<td className="p-sm">
<span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full text-[10px]">ENTERPRISE</span>
</td>
<td className="p-sm text-right">
<div className="inline-flex items-center cursor-pointer">
<div className="w-8 h-4 bg-primary-container rounded-full relative">
<div className="absolute right-0.5 top-0.5 w-3 h-3 bg-on-primary-container rounded-full"></div>
</div>
</div>
</td>
</tr>
<tr className="hover:bg-surface-bright transition-colors">
<td className="p-sm text-on-tertiary-container">004</td>
<td className="p-sm font-medium">j.miller_root</td>
<td className="p-sm">
<span className="bg-surface-container-highest text-primary-fixed-dim px-2 py-0.5 rounded-full text-[10px]">PRO</span>
</td>
<td className="p-sm text-right">
<div className="inline-flex items-center cursor-pointer">
<div className="w-8 h-4 bg-outline-variant rounded-full relative">
<div className="absolute left-0.5 top-0.5 w-3 h-3 bg-on-surface-variant rounded-full"></div>
</div>
</div>
</td>
</tr>
<tr className="hover:bg-surface-bright transition-colors">
<td className="p-sm text-on-tertiary-container">012</td>
<td className="p-sm font-medium">guest_9921</td>
<td className="p-sm">
<span className="border border-outline-variant text-on-surface-variant px-2 py-0.5 rounded-full text-[10px]">FREE</span>
</td>
<td className="p-sm text-right">
<div className="inline-flex items-center cursor-pointer">
<div className="w-8 h-4 bg-outline-variant rounded-full relative">
<div className="absolute left-0.5 top-0.5 w-3 h-3 bg-on-surface-variant rounded-full"></div>
</div>
</div>
</td>
</tr>
<tr className="hover:bg-surface-bright transition-colors">
<td className="p-sm text-on-tertiary-container">023</td>
<td className="p-sm font-medium">neural_link_bot</td>
<td className="p-sm">
<span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full text-[10px]">ENTERPRISE</span>
</td>
<td className="p-sm text-right">
<div className="inline-flex items-center cursor-pointer">
<div className="w-8 h-4 bg-primary-container rounded-full relative">
<div className="absolute right-0.5 top-0.5 w-3 h-3 bg-on-primary-container rounded-full"></div>
</div>
</div>
</td>
</tr>
</tbody>
</table>
</div>
<div className="mt-auto pt-sm flex justify-center">
<img className="w-full h-10 object-cover opacity-60" data-alt="A futuristic data visualization widget showing a series of glowing cyan line graphs representing system activity and user growth. The background is a deep navy blue with subtle grid line overlays, giving it a technical architectural aesthetic. The UI design is minimalist and ultra-sharp." src="https://lh3.googleusercontent.com/aida-public/AB6AXuANN-GR-tC2D7lfIVm3DeogpEOhMkrX_l0FDdJXt5vA6inAjXKFOl6V22ZN2E6q7MuPGWszaFoVtk20SGFnO_vmkXUtZC5kGnIh_XytMmIDRWwZX9YxPjddalzANAPmx0CMvQdCsv3apmqTwZ27SgNzVkPrD-qshZTn90p4VWa_kVUDRxzBMtNbPmBXCGKzWyIxPOZhUx2bYnhPPCyT3KaWgsTeH3qVekM7dCzh5kyJHF5unMCnwnGXpbrtujewC0tP5M7GV6729UM"  />
</div>
</section>
{/* Right Sidebar: Security & Overrides */}
<section className="md:col-span-3 bg-surface-container-low p-md flex flex-col gap-lg">
{/* Secret Management */}
<div className="flex flex-col gap-md">
<div className="flex items-center justify-between border-b border-outline-variant pb-xs">
<h2 className="font-label-xs text-label-xs uppercase tracking-widest text-on-surface-variant">Secret Management</h2>
<span className="material-symbols-outlined text-on-surface-variant text-sm" data-icon="lock_person">lock_person</span>
</div>
<div className="flex flex-col gap-sm">
<div className="bg-surface-container p-sm border border-outline-variant flex flex-col gap-xs group">
<div className="flex justify-between items-center">
<span className="font-code-sm text-code-sm text-primary-fixed-dim">LLAMA_3_KEY</span>
<span className="text-[10px] text-on-tertiary-container">LAST_USE: 2m ago</span>
</div>
<div className="flex gap-sm items-center">
<input className="flex-1 bg-surface-container-lowest border-none font-code-sm text-code-sm p-0 focus:ring-0 text-on-surface-variant opacity-40" readOnly={true} type="password" value="sk-llama-v3-8b-hq-admin-991"  />
<div className="flex gap-xs">
<span className="material-symbols-outlined text-sm text-on-surface-variant cursor-pointer hover:text-primary-fixed-dim" data-icon="visibility">visibility</span>
<span className="material-symbols-outlined text-sm text-on-surface-variant cursor-pointer hover:text-primary-fixed-dim" data-icon="refresh">refresh</span>
</div>
</div>
</div>
<div className="bg-surface-container p-sm border border-outline-variant flex flex-col gap-xs group">
<div className="flex justify-between items-center">
<span className="font-code-sm text-code-sm text-primary-fixed-dim">GROQ_ENGINE</span>
<span className="text-[10px] text-on-tertiary-container">LAST_USE: 14h ago</span>
</div>
<div className="flex gap-sm items-center">
<input className="flex-1 bg-surface-container-lowest border-none font-code-sm text-code-sm p-0 focus:ring-0 text-on-surface-variant opacity-40" readOnly={true} type="password" value="gq-772-prod-secure-token"  />
<div className="flex gap-xs">
<span className="material-symbols-outlined text-sm text-on-surface-variant cursor-pointer hover:text-primary-fixed-dim" data-icon="visibility">visibility</span>
<span className="material-symbols-outlined text-sm text-on-surface-variant cursor-pointer hover:text-primary-fixed-dim" data-icon="refresh">refresh</span>
</div>
</div>
</div>
<div className="bg-surface-container p-sm border border-outline-variant flex flex-col gap-xs group">
<div className="flex justify-between items-center">
<span className="font-code-sm text-code-sm text-primary-fixed-dim">BRAVE_SEARCH</span>
<span className="text-[10px] text-on-tertiary-container">LAST_USE: 1m ago</span>
</div>
<div className="flex gap-sm items-center">
<input className="flex-1 bg-surface-container-lowest border-none font-code-sm text-code-sm p-0 focus:ring-0 text-on-surface-variant opacity-40" readOnly={true} type="password" value="bs-9912-premium-api-cluster"  />
<div className="flex gap-xs">
<span className="material-symbols-outlined text-sm text-on-surface-variant cursor-pointer hover:text-primary-fixed-dim" data-icon="visibility">visibility</span>
<span className="material-symbols-outlined text-sm text-on-surface-variant cursor-pointer hover:text-primary-fixed-dim" data-icon="refresh">refresh</span>
</div>
</div>
</div>
</div>
</div>
{/* Manual Overrides */}
<div className="flex flex-col gap-md mt-auto">
<div className="flex items-center justify-between border-b border-outline-variant pb-xs">
<h2 className="font-label-xs text-label-xs uppercase tracking-widest text-error">Critical Overrides</h2>
<span className="material-symbols-outlined text-error text-sm" data-icon="warning">warning</span>
</div>
<div className="flex flex-col gap-sm">
<button className="w-full bg-surface-container border border-outline-variant py-3 font-code-sm text-code-sm text-on-surface hover:bg-surface-bright active:opacity-80 transition-all">
                        FLUSH_CHROMA_MEMORY
                    </button>
<button className="w-full bg-error-container/20 border border-error text-error py-3 font-code-sm text-code-sm hover:bg-error hover:text-on-error active:opacity-80 transition-all flex flex-col items-center gap-1">
<span>TERMINATE_ALL_SWARMS</span>
<span className="text-[9px] opacity-70">CONFIRMATION_REQUIRED_ON_CLICK</span>
</button>
</div>
</div>
</section>

      </div>
    </NavigationLayout>
  );
}
