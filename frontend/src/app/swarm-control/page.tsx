"use client";
import React from 'react';
import NavigationLayout from '../../components/NavigationLayout';

export default function SwarmControlPage() {
  return (
    <NavigationLayout>
      <div className="max-w-6xl mx-auto">
        
{/* Summary Stats */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-panel-gap">
<div className="panel-border bg-surface-container-low p-sm">
<span className="font-code-sm text-label-xs text-on-surface-variant opacity-60">ACTIVE_NODES</span>
<div className="font-display-lg text-primary-container">124</div>
</div>
<div className="panel-border bg-surface-container-low p-sm">
<span className="font-code-sm text-label-xs text-on-surface-variant opacity-60">QUEUED_TASKS</span>
<div className="font-display-lg text-secondary">842</div>
</div>
<div className="panel-border bg-surface-container-low p-sm">
<span className="font-code-sm text-label-xs text-on-surface-variant opacity-60">AVG_LATENCY</span>
<div className="font-display-lg text-on-surface">42ms</div>
</div>
<div className="panel-border bg-surface-container-low p-sm">
<span className="font-code-sm text-label-xs text-error opacity-60">ERROR_RATE</span>
<div className="font-display-lg text-error">0.02%</div>
</div>
</div>
{/* Dashboard Grid */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-md">
{/* ACTIVE_SWARMS Section */}
<section className="lg:col-span-7 flex flex-col gap-sm">
<div className="flex items-center justify-between px-xs">
<h2 className="font-code-sm text-code-sm uppercase tracking-widest text-primary-container">ACTIVE_SWARMS</h2>
<span className="material-symbols-outlined text-on-surface-variant text-sm">refresh</span>
</div>
<div className="flex flex-col gap-panel-gap">
{/* Swarm Card 1 */}
<div className="panel-border bg-surface-container p-sm flex flex-col gap-xs hover:bg-surface-container-high transition-colors">
<div className="flex justify-between items-start">
<div>
<div className="font-code-sm text-on-surface font-bold">SWARM_ALPHA_09</div>
<div className="font-code-sm text-label-xs text-on-surface-variant">Cluster: US-EAST-1 // ID: 8829-X</div>
</div>
<span className="bg-primary-container/10 text-primary-container border border-primary-container/30 px-xs py-[2px] font-code-sm text-label-xs flex items-center gap-xs">
<span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
                                    PROCESSING
                                </span>
</div>
<div className="w-full bg-outline-variant h-1 mt-sm">
<div className="bg-primary-container h-full" style={{width: '64%'}}></div>
</div>
<div className="flex justify-between font-code-sm text-label-xs text-on-surface-variant pt-xs">
<span>8/12 Agents Active</span>
<span>64% Completed</span>
</div>
</div>
{/* Swarm Card 2 */}
<div className="panel-border bg-surface-container p-sm flex flex-col gap-xs hover:bg-surface-container-high transition-colors">
<div className="flex justify-between items-start">
<div>
<div className="font-code-sm text-on-surface font-bold">SENTINEL_ROOT_01</div>
<div className="font-code-sm text-label-xs text-on-surface-variant">Cluster: EU-WEST-2 // ID: 1042-K</div>
</div>
<span className="bg-surface-container-highest text-on-surface-variant border border-outline-variant px-xs py-[2px] font-code-sm text-label-xs flex items-center gap-xs">
<span className="w-1.5 h-1.5 rounded-full bg-on-surface-variant"></span>
                                    IDLE
                                </span>
</div>
<div className="w-full bg-outline-variant h-1 mt-sm opacity-30"></div>
<div className="flex justify-between font-code-sm text-label-xs text-on-surface-variant pt-xs">
<span>0/4 Agents Active</span>
<span>Awaiting Task...</span>
</div>
</div>
{/* Swarm Card 3 */}
<div className="panel-border bg-surface-container p-sm flex flex-col gap-xs hover:bg-surface-container-high transition-colors border-l-2 border-l-error">
<div className="flex justify-between items-start">
<div>
<div className="font-code-sm text-on-surface font-bold">PARALLEL_CORE_XV</div>
<div className="font-code-sm text-label-xs text-on-surface-variant">Cluster: AP-SOUTH-1 // ID: 4492-Z</div>
</div>
<span className="bg-error-container/20 text-error border border-error/30 px-xs py-[2px] font-code-sm text-label-xs flex items-center gap-xs">
<span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                                    ERROR
                                </span>
</div>
<div className="font-code-sm text-label-xs text-error bg-error/10 p-xs mt-xs border border-error/20">
                                EXCEPTION_RECURSION_LIMIT_EXCEEDED: agent_id: node_721
                            </div>
</div>
</div>
</section>
{/* Right Column: QUEUED & COMPLETED */}
<div className="lg:col-span-5 flex flex-col gap-md">
{/* QUEUED_TASKS */}
<section className="flex flex-col gap-sm">
<h2 className="font-code-sm text-code-sm uppercase tracking-widest text-primary-container px-xs">QUEUED_TASKS</h2>
<div className="panel-border bg-surface-container divide-y divide-outline-variant">
<div className="p-sm flex justify-between items-center hover:bg-surface-container-highest transition-colors">
<div className="flex flex-col">
<span className="font-code-sm text-body-sm text-on-surface">Data_Scrub_v2</span>
<span className="font-code-sm text-label-xs text-on-surface-variant opacity-50">Priority: HIGH</span>
</div>
<span className="font-code-sm text-label-xs text-primary-container">T-MINUS 04:12</span>
</div>
<div className="p-sm flex justify-between items-center hover:bg-surface-container-highest transition-colors">
<div className="flex flex-col">
<span className="font-code-sm text-body-sm text-on-surface">Vector_Indexing</span>
<span className="font-code-sm text-label-xs text-on-surface-variant opacity-50">Priority: NORMAL</span>
</div>
<span className="font-code-sm text-label-xs text-on-surface-variant">T-MINUS 12:44</span>
</div>
</div>
</section>
{/* COMPLETED_JOBS */}
<section className="flex flex-col gap-sm">
<h2 className="font-code-sm text-code-sm uppercase tracking-widest text-primary-container px-xs">COMPLETED_JOBS</h2>
<div className="panel-border bg-surface-container-low p-sm">
<div className="space-y-sm">
<div className="flex items-center gap-sm">
<span className="material-symbols-outlined text-primary-container scale-75">check_circle</span>
<div className="flex-1 border-b border-outline-variant pb-xs">
<div className="flex justify-between">
<span className="font-code-sm text-label-xs text-on-surface">Global_Sentiment_Analysis</span>
<span className="font-code-sm text-label-xs text-on-surface-variant">2m ago</span>
</div>
</div>
</div>
<div className="flex items-center gap-sm opacity-60">
<span className="material-symbols-outlined text-primary-container scale-75">check_circle</span>
<div className="flex-1 border-b border-outline-variant pb-xs">
<div className="flex justify-between">
<span className="font-code-sm text-label-xs text-on-surface">Neural_Weight_Export</span>
<span className="font-code-sm text-label-xs text-on-surface-variant">14m ago</span>
</div>
</div>
</div>
</div>
</div>
</section>
</div>
{/* AGENT_HANDOFF_LOG Section */}
<section className="lg:col-span-12 flex flex-col gap-sm">
<h2 className="font-code-sm text-code-sm uppercase tracking-widest text-primary-container px-xs">AGENT_HANDOFF_LOG</h2>
<div className="panel-border bg-surface-container-lowest overflow-x-auto">
<table className="w-full text-left font-code-sm text-label-xs border-collapse">
<thead className="bg-surface-container-high text-on-surface-variant uppercase tracking-tighter">
<tr>
<th className="p-sm font-medium border-r border-outline-variant">TIMESTAMP</th>
<th className="p-sm font-medium border-r border-outline-variant">ORIGIN_AGENT</th>
<th className="p-sm font-medium border-r border-outline-variant">TRANSITION</th>
<th className="p-sm font-medium border-r border-outline-variant">TARGET_AGENT</th>
<th className="p-sm font-medium">PAYLOAD_SIZE</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">
<tr className="hover:bg-primary-container/5">
<td className="p-sm border-r border-outline-variant whitespace-nowrap">14:22:01.042</td>
<td className="p-sm border-r border-outline-variant text-on-surface">Researcher_α</td>
<td className="p-sm border-r border-outline-variant text-center">
<span className="material-symbols-outlined text-primary-container text-xs">arrow_forward</span>
</td>
<td className="p-sm border-r border-outline-variant text-on-surface">Coder_β</td>
<td className="p-sm">1.24 MB</td>
</tr>
<tr className="hover:bg-primary-container/5">
<td className="p-sm border-r border-outline-variant whitespace-nowrap">14:22:05.881</td>
<td className="p-sm border-r border-outline-variant text-on-surface">Coder_β</td>
<td className="p-sm border-r border-outline-variant text-center">
<span className="material-symbols-outlined text-primary-container text-xs">arrow_forward</span>
</td>
<td className="p-sm border-r border-outline-variant text-on-surface">Reviewer_γ</td>
<td className="p-sm">45 KB</td>
</tr>
<tr className="hover:bg-primary-container/5">
<td className="p-sm border-r border-outline-variant whitespace-nowrap">14:23:12.115</td>
<td className="p-sm border-r border-outline-variant text-on-surface">Reviewer_γ</td>
<td className="p-sm border-r border-outline-variant text-center">
<span className="material-symbols-outlined text-primary-container text-xs">arrow_forward</span>
</td>
<td className="p-sm border-r border-outline-variant text-on-surface">Deployer_δ</td>
<td className="p-sm">8.2 MB</td>
</tr>
</tbody>
</table>
</div>
</section>
{/* Visualization Panel (Bento Style) */}
<section className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-md pb-16 md:pb-0">
<div className="panel-border bg-surface-container h-48 relative overflow-hidden">
<div className="absolute inset-0 bg-gradient-to-br from-primary-container/5 to-transparent"></div>
<div className="absolute top-sm left-sm font-code-sm text-label-xs text-on-surface-variant z-10">NEURAL_DENSITY_MAP</div>
<img className="w-full h-full object-cover opacity-40 mix-blend-screen" data-alt="A sophisticated macro visualization of a high-tech computer circuit board with glowing cyan trails of electricity flowing through microscopic pathways. The lighting is cinematic and dark, emphasizing the intricate metallic textures and neon energy. The overall atmosphere is focused, technical, and suggests advanced artificial intelligence architecture." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6QUCEsTJMnal5qV0Ah2zs29Tz_BBN4WX2gFPt6ni8jmdlK4ur58EzwjRnbYc7Fezjv45guExYZzX2x9ankk14z0MmN0uyd-x5NbHQkO8wqj1-H0NEfE6q_3sGHPARdI_EhnYZG4u2KFolFh7CKNbCMnPvxlKjwHUeiCC4ipn9ShGF3_xesQejbf90tFu84gO_XmXNzb-tsd3O-6ac4BxdfvzkYa4rNu8qGF1nKaob1nGhcvpF_6Ce-a4kOSvQ9zpOur19LEsMBbs"  />
</div>
<div className="panel-border bg-surface-container h-48 flex flex-col p-sm relative">
<div className="font-code-sm text-label-xs text-on-surface-variant mb-xs">GLOBAL_ACTIVITY_RADAR</div>
<div className="flex-1 bg-surface-container-lowest panel-border relative flex items-center justify-center">
<div className="w-32 h-32 rounded-full border border-primary-container/20 flex items-center justify-center">
<div className="w-24 h-24 rounded-full border border-primary-container/40 flex items-center justify-center">
<div className="w-16 h-16 rounded-full border border-primary-container/60 flex items-center justify-center">
<div className="w-1 h-1 bg-primary-container rounded-full shadow-[0_0_10px_#00e5ff]"></div>
</div>
</div>
<div className="absolute w-[1px] h-32 bg-primary-container/20 animate-spin origin-center"></div>
</div>
<div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
<img className="w-full h-full object-cover" data-alt="A detailed satellite view of Earth at night, showing the glowing network of city lights and digital connectivity across continents. The oceans are deep midnight blue, while the landmasses are defined by shimmering clusters of golden and white electrical activity. The image conveys a sense of global scale and planetary-level data monitoring." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjlGvQTLIFZST1lunzapMc16DdC3Fa-Y3FXMHVmCy5m9DiAuh-8OI6lhBUY4HrYJidgJ8aaFqSOsjuBLR34esKvivYW_Z5UEZb5r1k0j9AGF7B_q50EoYxd2VPUNTgeb0ZwT3rhP12Z0z2DzHwxgFYtXN-DWG6HTvr1LfEtZvy4kvpwnZ6zooRQSOCVRKWjD1b4XXSRc9rMLAz1ChFGNvXNWgiX8z_nKpQ_hsTYfyyTQg-NBv3NEkidV0tN94zkt8kzoqv1bQVqv4"  />
</div>
</div>
</div>
</section>
</div>

      </div>
    </NavigationLayout>
  );
}
