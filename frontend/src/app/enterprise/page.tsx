"use client";
import React from 'react';
import NavigationLayout from '../../components/NavigationLayout';

export default function EnterprisePage() {
  return (
    <NavigationLayout>
      <div className="max-w-6xl mx-auto">
        
<div className="scan-line"></div>
{/* Multi-Tenant Tab Bar (Contextual) */}
<div className="bg-surface-container border-b border-outline-variant px-md py-xs flex gap-md overflow-x-auto">
<button className="flex items-center gap-xs px-sm py-1 border-b-2 border-primary text-primary font-label-xs">
<span className="material-symbols-outlined text-sm" data-icon="hub">hub</span>
                TENANT_PROD_01
            </button>
<button className="flex items-center gap-xs px-sm py-1 border-b-2 border-transparent text-on-surface-variant hover:text-on-surface transition-colors font-label-xs">
<span className="material-symbols-outlined text-sm" data-icon="layers">layers</span>
                TENANT_STAGING
            </button>
<button className="flex items-center gap-xs px-sm py-1 border-b-2 border-transparent text-on-surface-variant hover:text-on-surface transition-colors font-label-xs">
<span className="material-symbols-outlined text-sm" data-icon="public">public</span>
                REGIONAL_OFFICE_EU
            </button>
</div>
<div className="p-md space-y-md max-w-7xl mx-auto">
{/* Section 1: Usage Metrics Grid */}
<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-sm">
{/* Card 1 */}
<div className="bg-surface-container border border-outline-variant p-sm flex flex-col gap-xs hover:border-primary/50 transition-all group">
<div className="flex justify-between items-center">
<span className="font-label-xs text-on-surface-variant uppercase tracking-tighter">Token Usage</span>
<span className="material-symbols-outlined text-primary text-sm" data-icon="bolt">bolt</span>
</div>
<div className="flex flex-col gap-xs">
<div className="flex justify-between items-baseline">
<span className="font-code-sm text-on-surface text-lg font-bold">1.2B <span className="text-xs text-on-surface-variant font-normal">/ 2B</span></span>
<span className="font-label-xs text-primary">60%</span>
</div>
<div className="h-1 bg-surface-container-highest w-full overflow-hidden">
<div className="h-full bg-primary" style={{width: '60%'}}></div>
</div>
</div>
</div>
{/* Card 2 */}
<div className="bg-surface-container border border-outline-variant p-sm flex flex-col gap-xs hover:border-primary/50 transition-all group">
<div className="flex justify-between items-center">
<span className="font-label-xs text-on-surface-variant uppercase tracking-tighter">Swarm Jobs</span>
<span className="material-symbols-outlined text-primary text-sm" data-icon="psychology">psychology</span>
</div>
<div className="flex flex-col gap-xs">
<div className="flex justify-between items-baseline">
<span className="font-code-sm text-on-surface text-lg font-bold">14,204</span>
<span className="font-label-xs text-primary">+12%</span>
</div>
<div className="flex gap-px items-end h-4">
<div className="w-1 bg-primary/20 h-[30%]"></div>
<div className="w-1 bg-primary/30 h-[45%]"></div>
<div className="w-1 bg-primary/40 h-[60%]"></div>
<div className="w-1 bg-primary/60 h-[80%]"></div>
<div className="w-1 bg-primary/80 h-[70%]"></div>
<div className="w-1 bg-primary h-full"></div>
</div>
</div>
</div>
{/* Card 3 */}
<div className="bg-surface-container border border-outline-variant p-sm flex flex-col gap-xs hover:border-primary/50 transition-all group">
<div className="flex justify-between items-center">
<span className="font-label-xs text-on-surface-variant uppercase tracking-tighter">Active Seats</span>
<span className="material-symbols-outlined text-primary text-sm" data-icon="group">group</span>
</div>
<div className="flex flex-col gap-xs">
<div className="flex justify-between items-baseline">
<span className="font-code-sm text-on-surface text-lg font-bold">842 <span className="text-xs text-on-surface-variant font-normal">/ 1000</span></span>
<span className="font-label-xs text-primary">84%</span>
</div>
<div className="h-1 bg-surface-container-highest w-full overflow-hidden">
<div className="h-full bg-primary" style={{width: '84%'}}></div>
</div>
</div>
</div>
{/* Card 4 */}
<div className="bg-surface-container border border-outline-variant p-sm flex flex-col gap-xs hover:border-primary/50 transition-all group">
<div className="flex justify-between items-center">
<span className="font-label-xs text-on-surface-variant uppercase tracking-tighter">API Latency</span>
<span className="material-symbols-outlined text-primary text-sm" data-icon="speed">speed</span>
</div>
<div className="flex flex-col gap-xs">
<div className="flex justify-between items-baseline">
<span className="font-code-sm text-on-surface text-lg font-bold">24ms</span>
<span className="font-label-xs text-primary">OPTIMAL</span>
</div>
<div className="flex items-center gap-xs">
<div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
<span className="font-label-xs text-on-surface-variant">Global Mesh Status: Healthy</span>
</div>
</div>
</div>
</section>
{/* Section 2 & 3: Two Column Layout */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-md">
{/* Team Management Panel (2 cols) */}
<section className="lg:col-span-2 bg-surface-container border border-outline-variant">
<div className="flex items-center justify-between p-sm border-b border-outline-variant bg-surface-container-high">
<div className="flex items-center gap-xs">
<span className="material-symbols-outlined text-primary text-sm" data-icon="manage_accounts">manage_accounts</span>
<h2 className="font-label-xs text-on-surface uppercase tracking-widest">Team Management</h2>
</div>
<button className="font-label-xs text-primary border border-primary px-sm py-0.5 hover:bg-primary hover:text-on-primary transition-all">INVITE_MEMBER</button>
</div>
<div className="divide-y divide-outline-variant">
{/* Row Sarah */}
<div className="p-sm flex items-center justify-between hover:bg-surface-container-highest transition-colors">
<div className="flex items-center gap-md">
<div className="w-8 h-8 bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs">SJ</div>
<div>
<p className="font-label-xs text-on-surface">Admin - Sarah J.</p>
<p className="font-code-sm text-[10px] text-on-surface-variant">sarah.j@enterprise.ai</p>
</div>
</div>
<div className="flex items-center gap-lg">
<div className="hidden sm:flex flex-col items-end">
<span className="font-label-xs text-[9px] text-on-surface-variant uppercase">30D Usage</span>
<span className="font-code-sm text-primary">45.2M tokens</span>
</div>
<span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary" data-icon="more_vert">more_vert</span>
</div>
</div>
{/* Row Mark */}
<div className="p-sm flex items-center justify-between hover:bg-surface-container-highest transition-colors">
<div className="flex items-center gap-md">
<div className="w-8 h-8 bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs">MK</div>
<div>
<p className="font-label-xs text-on-surface">Editor - Mark K.</p>
<p className="font-code-sm text-[10px] text-on-surface-variant">m.koenig@enterprise.ai</p>
</div>
</div>
<div className="flex items-center gap-lg">
<div className="hidden sm:flex flex-col items-end">
<span className="font-label-xs text-[9px] text-on-surface-variant uppercase">30D Usage</span>
<span className="font-code-sm text-primary">12.8M tokens</span>
</div>
<span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary" data-icon="more_vert">more_vert</span>
</div>
</div>
{/* Row Alex */}
<div className="p-sm flex items-center justify-between hover:bg-surface-container-highest transition-colors">
<div className="flex items-center gap-md">
<div className="w-8 h-8 bg-tertiary-container text-on-tertiary-container flex items-center justify-center font-bold text-xs">AL</div>
<div>
<p className="font-label-xs text-on-surface">Viewer - Alex L.</p>
<p className="font-code-sm text-[10px] text-on-surface-variant">alex.l@enterprise.ai</p>
</div>
</div>
<div className="flex items-center gap-lg">
<div className="hidden sm:flex flex-col items-end">
<span className="font-label-xs text-[9px] text-on-surface-variant uppercase">30D Usage</span>
<span className="font-code-sm text-primary">0.4M tokens</span>
</div>
<span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary" data-icon="more_vert">more_vert</span>
</div>
</div>
</div>
</section>
{/* API Access Control Panel (1 col) */}
<section className="bg-surface-container border border-outline-variant flex flex-col">
<div className="p-sm border-b border-outline-variant bg-surface-container-high flex items-center gap-xs">
<span className="material-symbols-outlined text-primary text-sm" data-icon="security">security</span>
<h2 className="font-label-xs text-on-surface uppercase tracking-widest">API Control</h2>
</div>
<div className="p-md flex-1 flex flex-col gap-md bg-surface-container-lowest">
<div className="space-y-xs">
<label className="font-label-xs text-on-surface-variant uppercase text-[10px]">ORG_API_KEY</label>
<div className="flex gap-panel-gap">
<div className="flex-1 bg-surface-container px-sm py-1 font-code-sm text-primary border border-outline-variant/30 flex items-center justify-between">
<span>wl_live_•••••••••••••••••••••</span>
<span className="material-symbols-outlined text-sm cursor-pointer" data-icon="content_copy">content_copy</span>
</div>
<button className="bg-error-container text-on-error-container px-sm flex items-center justify-center hover:bg-error transition-colors" title="Rotate Key">
<span className="material-symbols-outlined text-sm" data-icon="refresh">refresh</span>
</button>
</div>
</div>
<div className="space-y-xs">
<label className="font-label-xs text-on-surface-variant uppercase text-[10px]">Environment Runtime</label>
<div className="bg-surface-container border border-outline-variant/30 p-sm font-code-sm">
<p className="text-primary"><span className="text-on-surface-variant">NODE_ENV:</span> PROD</p>
<p className="text-primary"><span className="text-on-surface-variant">REGION:</span> us-east-1</p>
<p className="text-primary"><span className="text-on-surface-variant">SCALING:</span> AUTO_MESH_L4</p>
</div>
</div>
<div className="mt-auto pt-md">
<div className="border border-outline-variant border-dashed p-sm">
<p className="font-label-xs text-[9px] text-on-surface-variant leading-relaxed">
<span className="text-primary font-bold">WARNING:</span> Key rotation will invalidate all active sessions across the global node network. Latency may spike during re-sync.
                                </p>
</div>
</div>
</div>
</section>
</div>
{/* Bento Visualizer / Nodes Status */}
<section className="grid grid-cols-1 md:grid-cols-4 gap-sm">
<div className="md:col-span-3 bg-surface-container border border-outline-variant h-64 relative overflow-hidden group">
<div className="absolute inset-0 z-0">
<img alt="Global Network Visualization" className="w-full h-full object-cover opacity-20 grayscale group-hover:scale-105 transition-transform duration-1000" data-alt="A highly complex digital visualization of a global neural network mesh with interconnecting nodes and glowing data pathways in shades of electric cyan and deep blue. The visual style is technical and cinematic, suggesting a high-performance cloud infrastructure under heavy load. The lighting is low-key with sharp, luminous accents that emphasize a sense of immense scale and technological sophistication in a dark-mode environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjLjRSBpP5j-CYKMDT1dFQwieAE6GJwcrCM70H4gXQAWCTYw4C3sNddflxczIvJxzZDoso0gFqgXqh79XJQvkZB4iVEZ1OiGQkOIHzQ_kSMn2am7jS2FYMiN0DVe6Gy66reSYjpD2XgemUkgKmuYQXeNEwxH82zB9jXW7fvM2YCy05f411EExYMFH_Nh7GuK74x5GcnBDsBwzBJd3arL473NAC5IUuHY_levq5IpAwsigbFJS-SjKcMqH-IWcdterPhDWpg1Iy9tk"  />
</div>
<div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent"></div>
<div className="absolute top-sm left-sm z-10 flex items-center gap-xs">
<div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
<span className="font-label-xs text-primary uppercase tracking-widest">Real-time Node Mesh</span>
</div>
<div className="absolute bottom-sm right-sm z-10 font-code-sm text-on-surface-variant text-[10px]">
                        LAT_GRID: 40.7128° N, 74.0060° W
                    </div>
</div>
<div className="bg-primary-container p-sm flex flex-col justify-between">
<div className="space-y-xs">
<h3 className="font-headline-md text-on-primary-container leading-tight">Pro-Grade AI OS</h3>
<p className="font-label-xs text-on-primary-container opacity-70">Running Kernel v4.8.2-delta</p>
</div>
<div className="text-on-primary-container">
<span className="font-code-sm text-3xl font-bold">0.00ms</span>
<p className="font-label-xs uppercase">Jitter Variance</p>
</div>
</div>
</section>
</div>

      </div>
    </NavigationLayout>
  );
}
