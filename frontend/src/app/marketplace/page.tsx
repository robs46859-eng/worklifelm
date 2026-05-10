"use client";
import React from 'react';
import NavigationLayout from '../../components/NavigationLayout';

export default function MarketplacePage() {
  return (
    <NavigationLayout>
      <div className="max-w-6xl mx-auto">
        
{/* Section 1: Marketplace Hero */}
<section className="p-lg bg-surface-container-lowest/50 border-b border-outline-variant">
<div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-md">
<div>
<span className="font-label-xs text-label-xs text-primary-container border border-primary-container/20 px-xs mb-xs inline-block">SYSTEM_ACCESS_GRANTED</span>
<h1 className="font-display-lg text-display-lg text-on-background tracking-tighter">CONTRIBUTOR_MARKETPLACE_v2.4</h1>
</div>
<div className="flex gap-lg bg-surface-container-high p-md rounded border border-outline-variant">
<div className="flex flex-col">
<span className="font-label-xs text-label-xs text-on-surface-variant">ACTIVE_NODES</span>
<span className="font-code-sm text-headline-md text-primary-fixed">1,402</span>
</div>
<div className="flex flex-col">
<span className="font-label-xs text-label-xs text-on-surface-variant">TRUST_SCORE</span>
<span className="font-code-sm text-headline-md text-primary-fixed">99.8%</span>
</div>
<div className="flex flex-col">
<span className="font-label-xs text-label-xs text-on-surface-variant">TOP_RANKED</span>
<span className="font-code-sm text-headline-md text-primary">@DialectMaster_X</span>
</div>
</div>
</div>
</section>
<div className="p-lg space-y-lg">
{/* Section 2: Contributor Profiles (Bento-style Grid) */}
<section>
<div className="flex items-center gap-sm mb-md">
<span className="material-symbols-outlined text-primary-container" data-icon="psychology">psychology</span>
<h2 className="font-headline-md text-headline-md uppercase tracking-widest text-on-surface">Verified Nodes</h2>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-panel-gap bg-outline-variant p-[1px]">
{/* Card 1 */}
<div className="bg-surface-container-high p-md hover:bg-surface-variant transition-colors group">
<div className="flex justify-between items-start mb-md">
<div className="w-12 h-12 bg-surface-variant flex items-center justify-center border border-outline-variant">
<span className="material-symbols-outlined text-primary" data-icon="account_circle">account_circle</span>
</div>
<span className="font-label-xs text-label-xs bg-primary-container/10 text-primary-container px-xs py-[2px] border border-primary-container/30">LEVEL 5 ELITE</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-xs">@DialectMaster_X</h3>
<p className="font-label-xs text-label-xs text-primary mb-sm">SPECIALTY: Regional Slang</p>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-md">Expert in deep-web linguistic shifts and hyper-local dialect synthesis for high-fidelity LLM training.</p>
<button className="w-full py-xs border border-outline text-on-surface font-label-xs text-label-xs uppercase hover:bg-primary-container hover:text-on-primary transition-all">View Logs</button>
</div>
{/* Card 2 */}
<div className="bg-surface-container-high p-md hover:bg-surface-variant transition-colors group">
<div className="flex justify-between items-start mb-md">
<div className="w-12 h-12 bg-surface-variant flex items-center justify-center border border-outline-variant">
<span className="material-symbols-outlined text-primary" data-icon="account_circle">account_circle</span>
</div>
<span className="font-label-xs text-label-xs bg-on-tertiary-fixed-variant text-tertiary-fixed px-xs py-[2px]">LEVEL 4 EXPERT</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-xs">@Safety_Sentry</h3>
<p className="font-label-xs text-label-xs text-primary mb-sm">SPECIALTY: Protocol Guardrails</p>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-md">Specializing in regional legal compliance and industrial safety protocol translation for mining sectors.</p>
<button className="w-full py-xs border border-outline text-on-surface font-label-xs text-label-xs uppercase hover:bg-primary-container hover:text-on-primary transition-all">View Logs</button>
</div>
{/* Card 3 */}
<div className="bg-surface-container-high p-md hover:bg-surface-variant transition-colors group">
<div className="flex justify-between items-start mb-md">
<div className="w-12 h-12 bg-surface-variant flex items-center justify-center border border-outline-variant">
<span className="material-symbols-outlined text-primary" data-icon="account_circle">account_circle</span>
</div>
<span className="font-label-xs text-label-xs bg-primary-container/10 text-primary-container px-xs py-[2px] border border-primary-container/30">LEVEL 5 ELITE</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-xs">@Lingo_Flow</h3>
<p className="font-label-xs text-label-xs text-primary mb-sm">SPECIALTY: Medical Phrasing</p>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-md">Optimizing healthcare response models for complex surgical environments and emergency triage slang.</p>
<button className="w-full py-xs border border-outline text-on-surface font-label-xs text-label-xs uppercase hover:bg-primary-container hover:text-on-primary transition-all">View Logs</button>
</div>
</div>
</section>
{/* Section 3: Packs Explorer */}
<section>
<div className="flex items-center justify-between mb-md">
<div className="flex items-center gap-sm">
<span className="material-symbols-outlined text-primary-container" data-icon="package_2">package_2</span>
<h2 className="font-headline-md text-headline-md uppercase tracking-widest text-on-surface">Verified Packs</h2>
</div>
<span className="font-label-xs text-label-xs text-on-surface-variant">SORT: BY_LATENCY</span>
</div>
<div className="space-y-sm">
{/* Pack Item 1 */}
<div className="flex items-center justify-between p-md bg-surface border border-outline-variant hover:border-primary transition-all">
<div className="flex items-center gap-md">
<div className="w-10 h-10 bg-surface-container flex items-center justify-center border border-outline-variant">
<span className="material-symbols-outlined text-on-surface-variant" data-icon="language">language</span>
</div>
<div>
<h4 className="font-code-sm text-headline-md text-on-surface leading-none mb-xs">Industrial Spanish Dialect Pack</h4>
<div className="flex gap-xs items-center">
<span className="font-label-xs text-[10px] text-on-surface-variant uppercase border border-outline-variant px-xs">v3.4.1</span>
<span className="font-label-xs text-[10px] text-on-surface-variant uppercase border border-outline-variant px-xs">verified_node</span>
</div>
</div>
</div>
<div className="flex items-center gap-lg">
<span className="font-code-sm text-headline-md text-primary">$45.00</span>
<button className="flex items-center gap-sm bg-primary-container text-on-primary font-label-xs text-label-xs px-md py-sm rounded-lg hover:brightness-110 active:scale-95 transition-transform uppercase">
<span className="material-symbols-outlined text-[18px]" data-icon="terminal">terminal</span>
                ADD_TO_WORKSPACE
              </button>
</div>
</div>
{/* Pack Item 2 */}
<div className="flex items-center justify-between p-md bg-surface border border-outline-variant hover:border-primary transition-all">
<div className="flex items-center gap-md">
<div className="w-10 h-10 bg-surface-container flex items-center justify-center border border-outline-variant">
<span className="material-symbols-outlined text-on-surface-variant" data-icon="security">security</span>
</div>
<div>
<h4 className="font-code-sm text-headline-md text-on-surface leading-none mb-xs">Safety Protocol V3 - Mexico</h4>
<div className="flex gap-xs items-center">
<span className="font-label-xs text-[10px] text-on-surface-variant uppercase border border-outline-variant px-xs">v1.2.0</span>
<span className="font-label-xs text-[10px] text-on-surface-variant uppercase border border-outline-variant px-xs">compliance_ready</span>
</div>
</div>
</div>
<div className="flex items-center gap-lg">
<span className="font-code-sm text-headline-md text-primary">$12.00</span>
<button className="flex items-center gap-sm bg-primary-container text-on-primary font-label-xs text-label-xs px-md py-sm rounded-lg hover:brightness-110 active:scale-95 transition-transform uppercase">
<span className="material-symbols-outlined text-[18px]" data-icon="terminal">terminal</span>
                ADD_TO_WORKSPACE
              </button>
</div>
</div>
{/* Pack Item 3 */}
<div className="flex items-center justify-between p-md bg-surface border border-outline-variant hover:border-primary transition-all">
<div className="flex items-center gap-md">
<div className="w-10 h-10 bg-surface-container flex items-center justify-center border border-outline-variant">
<span className="material-symbols-outlined text-on-surface-variant" data-icon="record_voice_over">record_voice_over</span>
</div>
<div>
<h4 className="font-code-sm text-headline-md text-on-surface leading-none mb-xs">Pronunciation Core: Bogota</h4>
<div className="flex gap-xs items-center">
<span className="font-label-xs text-[10px] text-on-surface-variant uppercase border border-outline-variant px-xs">v0.9.8</span>
<span className="font-label-xs text-[10px] text-on-surface-variant uppercase border border-outline-variant px-xs">beta_access</span>
</div>
</div>
</div>
<div className="flex items-center gap-lg">
<span className="font-code-sm text-headline-md text-primary">$30.00</span>
<button className="flex items-center gap-sm bg-primary-container text-on-primary font-label-xs text-label-xs px-md py-sm rounded-lg hover:brightness-110 active:scale-95 transition-transform uppercase">
<span className="material-symbols-outlined text-[18px]" data-icon="terminal">terminal</span>
                ADD_TO_WORKSPACE
              </button>
</div>
</div>
</div>
</section>
</div>
{/* Section 4: Review Queue (Arkham) */}
<section className="fixed bottom-0 md:left-64 right-0 bg-surface-container-lowest border-t border-outline-variant p-sm z-40">
<div className="flex items-center justify-between mb-xs px-sm">
<div className="flex items-center gap-sm">
<span className="material-symbols-outlined text-primary-fixed text-[14px]" data-icon="visibility">visibility</span>
<span className="font-code-sm text-label-xs text-on-surface-variant uppercase">ARKHAM_MONITOR // Review Queue</span>
</div>
<div className="flex gap-md">
<span className="font-label-xs text-label-xs text-primary-container animate-pulse">LIVE_STREAM_ACTIVE</span>
<span className="font-label-xs text-label-xs text-on-surface-variant">LOAD: 12%</span>
</div>
</div>
<div className="bg-black p-md rounded-lg border border-outline-variant/30 max-h-32 overflow-y-auto space-y-xs">
<div className="flex items-center justify-between group">
<div className="font-code-sm text-[12px] text-primary/80">
<span className="text-on-surface-variant">[PENDING]</span> Pack_772 // User: <span className="text-primary">@S_Gomez</span> // Status: <span className="text-primary">IN_REVIEW</span>
</div>
<div className="flex gap-xs opacity-0 group-hover:opacity-100 transition-opacity">
<button className="font-label-xs text-[10px] px-xs py-0 border border-primary text-primary hover:bg-primary/10">APPROVE</button>
<button className="font-label-xs text-[10px] px-xs py-0 border border-error text-error hover:bg-error/10">REJECT</button>
<button className="font-label-xs text-[10px] px-xs py-0 border border-on-surface-variant text-on-surface-variant hover:bg-on-surface-variant/10">DIAGNOSE</button>
</div>
</div>
<div className="flex items-center justify-between group">
<div className="font-code-sm text-[12px] text-primary/80">
<span className="text-on-surface-variant">[PENDING]</span> Pack_814 // User: <span className="text-primary">@K_Chen</span> // Status: <span className="text-primary">VALIDATING</span>
</div>
<div className="flex gap-xs opacity-0 group-hover:opacity-100 transition-opacity">
<button className="font-label-xs text-[10px] px-xs py-0 border border-primary text-primary hover:bg-primary/10">APPROVE</button>
<button className="font-label-xs text-[10px] px-xs py-0 border border-error text-error hover:bg-error/10">REJECT</button>
<button className="font-label-xs text-[10px] px-xs py-0 border border-on-surface-variant text-on-surface-variant hover:bg-on-surface-variant/10">DIAGNOSE</button>
</div>
</div>
<div className="flex items-center justify-between group">
<div className="font-code-sm text-[12px] text-primary/80">
<span className="text-on-surface-variant">[PENDING]</span> Node_331 // User: <span className="text-primary">@A_Vance</span> // Status: <span className="text-primary">IN_REVIEW</span>
</div>
<div className="flex gap-xs opacity-0 group-hover:opacity-100 transition-opacity">
<button className="font-label-xs text-[10px] px-xs py-0 border border-primary text-primary hover:bg-primary/10">APPROVE</button>
<button className="font-label-xs text-[10px] px-xs py-0 border border-error text-error hover:bg-error/10">REJECT</button>
<button className="font-label-xs text-[10px] px-xs py-0 border border-on-surface-variant text-on-surface-variant hover:bg-on-surface-variant/10">DIAGNOSE</button>
</div>
</div>
</div>
</section>

      </div>
    </NavigationLayout>
  );
}
