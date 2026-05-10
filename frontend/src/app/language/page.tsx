"use client";
import React from 'react';
import NavigationLayout from '../../components/NavigationLayout';

export default function LanguagePage() {
  return (
    <NavigationLayout>
      <div className="max-w-6xl mx-auto">
        
<div className="max-w-[1400px] mx-auto p-md space-y-md">
{/* Dialect Translation Section */}
<section className="grid grid-cols-1 lg:grid-cols-2 gap-panel-gap bg-outline-variant border border-outline-variant">
{/* Input Panel */}
<div className="bg-surface-container p-md flex flex-col gap-md">
<div className="flex justify-between items-center">
<h3 className="font-headline-md text-headline-md text-on-surface">Source Input</h3>
<div className="flex items-center gap-sm">
<span className="font-label-xs text-label-xs text-outline">DETECTED: ENGLISH</span>
<div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
</div>
</div>
<textarea className="flex-grow bg-surface-container-lowest border border-outline-variant p-md font-code-sm text-code-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none min-h-[200px] resize-none" placeholder="Enter raw technical text here..."></textarea>
<div className="flex justify-between items-center">
<select className="bg-surface-container-highest border border-outline-variant text-on-surface font-label-xs text-label-xs px-sm py-xs outline-none focus:border-primary">
<option>Mexican Spanish (Industrial)</option>
<option>Parisian French (Legal)</option>
<option>Castilian Spanish (Medical)</option>
<option>Mandarin Chinese (Construction)</option>
</select>
<button className="bg-primary text-on-primary px-lg py-xs font-label-xs text-label-xs uppercase font-bold hover:opacity-90 active:scale-95 transition-all">
                            Execute Translation
                        </button>
</div>
</div>
{/* Technical Terminal Output */}
<div className="bg-surface-container-lowest p-md flex flex-col gap-sm border-l border-outline-variant">
<div className="flex items-center gap-sm border-b border-outline-variant pb-xs">
<span className="material-symbols-outlined text-primary text-sm">terminal</span>
<span className="font-code-sm text-code-sm text-primary uppercase tracking-widest">Translation Terminal v4.2</span>
</div>
<div className="flex-grow font-code-sm text-code-sm text-on-surface-variant overflow-y-auto custom-scrollbar p-sm">
<p className="text-primary/60 mb-sm">&gt; INITIALIZING DIALECT ENGINE...</p>
<p className="text-primary/60 mb-sm">&gt; LOADING DICTIONARY: MX_ES_CONSTRUCTION_2024</p>
<p className="text-on-surface leading-relaxed">
<span className="text-primary">El capataz</span> solicitó el <span className="text-primary">andamio</span> reforzado para la zona de <span className="text-primary">excavación</span> norte. Asegúrese de que todos los operarios porten su <span className="text-primary">equipo de protección personal</span>.
                        </p>
<p className="mt-lg text-primary/40 italic">// End of output cluster</p>
</div>
<div className="flex gap-sm">
<button className="text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined">content_copy</span></button>
<button className="text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined">share</span></button>
</div>
</div>
</section>
{/* Industry Vocabulary Bento Grid */}
<section className="space-y-sm">
<div className="flex items-center justify-between border-b border-outline-variant pb-xs">
<h3 className="font-headline-md text-headline-md">Industry Vocabulary</h3>
<div className="flex gap-xs">
<button className="px-md py-xs bg-primary text-on-primary font-label-xs text-label-xs uppercase">All</button>
<button className="px-md py-xs bg-surface-container-highest border border-outline-variant text-on-surface-variant font-label-xs text-label-xs uppercase hover:border-primary">Construction</button>
<button className="px-md py-xs bg-surface-container-highest border border-outline-variant text-on-surface-variant font-label-xs text-label-xs uppercase hover:border-primary">Software</button>
<button className="px-md py-xs bg-surface-container-highest border border-outline-variant text-on-surface-variant font-label-xs text-label-xs uppercase hover:border-primary">Medical</button>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
{/* Vocab Card 1 */}
<div className="bg-surface-container-low border border-outline-variant p-md hover:bg-surface-bright transition-colors group">
<div className="flex justify-between items-start mb-sm">
<span className="px-xs py-0.5 bg-outline-variant text-[9px] text-on-surface-variant font-code-sm uppercase">Construction</span>
<span className="material-symbols-outlined text-outline group-hover:text-primary">info</span>
</div>
<h4 className="font-headline-md text-headline-md text-primary mb-xs">Cimentación</h4>
<p className="text-body-sm text-on-surface-variant mb-md">The base or foundation of a structure which transmits the weight to the ground.</p>
<div className="bg-surface-container-lowest p-sm border-l-2 border-primary">
<p className="font-code-sm text-code-sm text-on-surface italic">"Revisa la cimentación antes del colado."</p>
</div>
</div>
{/* Vocab Card 2 */}
<div className="bg-surface-container-low border border-outline-variant p-md hover:bg-surface-bright transition-colors group">
<div className="flex justify-between items-start mb-sm">
<span className="px-xs py-0.5 bg-outline-variant text-[9px] text-on-surface-variant font-code-sm uppercase">Software</span>
<span className="material-symbols-outlined text-outline group-hover:text-primary">info</span>
</div>
<h4 className="font-headline-md text-headline-md text-primary mb-xs">Despliegue</h4>
<p className="text-body-sm text-on-surface-variant mb-md">The process of making an application or update ready for use.</p>
<div className="bg-surface-container-lowest p-sm border-l-2 border-primary">
<p className="font-code-sm text-code-sm text-on-surface italic">"El despliegue falló por un error de config."</p>
</div>
</div>
{/* Vocab Card 3 */}
<div className="bg-surface-container-low border border-outline-variant p-md hover:bg-surface-bright transition-colors group">
<div className="flex justify-between items-start mb-sm">
<span className="px-xs py-0.5 bg-outline-variant text-[9px] text-on-surface-variant font-code-sm uppercase">Medical</span>
<span className="material-symbols-outlined text-outline group-hover:text-primary">info</span>
</div>
<h4 className="font-headline-md text-headline-md text-primary mb-xs">Profilaxis</h4>
<p className="text-body-sm text-on-surface-variant mb-md">Preventive measures taken to maintain health and prevent disease.</p>
<div className="bg-surface-container-lowest p-sm border-l-2 border-primary">
<p className="font-code-sm text-code-sm text-on-surface italic">"Se inició profilaxis antibiótica post-op."</p>
</div>
</div>
{/* Vocab Card 4 */}
<div className="bg-surface-container-low border border-outline-variant p-md hover:bg-surface-bright transition-colors group">
<div className="flex justify-between items-start mb-sm">
<span className="px-xs py-0.5 bg-outline-variant text-[9px] text-on-surface-variant font-code-sm uppercase">Construction</span>
<span className="material-symbols-outlined text-outline group-hover:text-primary">info</span>
</div>
<h4 className="font-headline-md text-headline-md text-primary mb-xs">Bovedilla</h4>
<p className="text-body-sm text-on-surface-variant mb-md">Pre-cast block used between joists to form a floor or ceiling system.</p>
<div className="bg-surface-container-lowest p-sm border-l-2 border-primary">
<p className="font-code-sm text-code-sm text-on-surface italic">"Faltan tres hileras de bovedilla."</p>
</div>
</div>
</div>
</section>
{/* Lesson Generation Section */}
<section className="grid grid-cols-1 lg:grid-cols-12 gap-md items-start">
{/* Form Sidebar */}
<div className="lg:col-span-4 bg-surface-container border border-outline-variant p-md space-y-md">
<h3 className="font-headline-md text-headline-md">Generate Lesson</h3>
<div className="space-y-sm">
<label className="font-label-xs text-label-xs text-on-surface-variant block uppercase">Topic</label>
<input className="w-full bg-surface-container-lowest border border-outline-variant p-sm font-body-sm text-on-surface focus:border-primary outline-none" placeholder="e.g., Safety Protocols" type="text"  />
</div>
<div className="space-y-sm">
<label className="font-label-xs text-label-xs text-on-surface-variant block uppercase">Industry</label>
<select className="w-full bg-surface-container-lowest border border-outline-variant p-sm font-body-sm text-on-surface focus:border-primary outline-none">
<option>Heavy Construction</option>
<option>Cloud Infrastructure</option>
<option>Pediatric Nursing</option>
</select>
</div>
<div className="space-y-sm">
<label className="font-label-xs text-label-xs text-on-surface-variant block uppercase">Complexity Level</label>
<div className="flex gap-sm">
<button className="flex-1 border border-primary text-primary py-xs font-label-xs text-label-xs">L1</button>
<button className="flex-1 border border-outline-variant text-on-surface-variant py-xs font-label-xs text-label-xs">L2</button>
<button className="flex-1 border border-outline-variant text-on-surface-variant py-xs font-label-xs text-label-xs">L3</button>
</div>
</div>
<button className="w-full bg-primary text-on-primary font-label-xs text-label-xs uppercase font-bold py-md mt-lg hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all">
                        Synthesize Training Plan
                    </button>
</div>
{/* Results Panel */}
<div className="lg:col-span-8 bg-surface-container-low border border-outline-variant flex flex-col min-h-[500px]">
<div className="p-md border-b border-outline-variant bg-surface-container flex justify-between items-center">
<div>
<span className="font-label-xs text-label-xs text-primary uppercase">Lesson Plan #882</span>
<h2 className="font-display-lg text-display-lg">Safety Protocols: Site Induction</h2>
</div>
<span className="material-symbols-outlined text-outline">download</span>
</div>
<div className="p-md flex-grow space-y-lg custom-scrollbar">
{/* Subsection: Vocabulary */}
<div>
<h4 className="font-headline-md text-headline-md border-l-4 border-primary pl-sm mb-md">Key Terminology</h4>
<div className="grid grid-cols-2 gap-sm">
<div className="bg-surface-container-lowest p-sm border border-outline-variant/30">
<p className="font-bold text-primary">EPP (Equipo de Protección Personal)</p>
<p className="text-xs text-on-surface-variant">Personal Protective Equipment - Essential for site access.</p>
</div>
<div className="bg-surface-container-lowest p-sm border border-outline-variant/30">
<p className="font-bold text-primary">Bitácora de Obra</p>
<p className="text-xs text-on-surface-variant">Daily construction logbook for documenting incidents.</p>
</div>
</div>
</div>
{/* Subsection: Common Phrases */}
<div>
<h4 className="font-headline-md text-headline-md border-l-4 border-primary pl-sm mb-md">Common Phrases</h4>
<ul className="space-y-sm">
<li className="bg-surface-container-highest p-sm font-code-sm text-code-sm">
<span className="text-primary font-bold">"¡Cuidado con la carga suspendida!"</span>
<span className="text-on-surface-variant block mt-1">Watch out for the suspended load! (Critical safety shout)</span>
</li>
<li className="bg-surface-container-highest p-sm font-code-sm text-code-sm">
<span className="text-primary font-bold">"¿Ya se hizo el análisis de riesgo?"</span>
<span className="text-on-surface-variant block mt-1">Has the risk analysis been performed yet?</span>
</li>
</ul>
</div>
{/* Subsection: Cultural Context */}
<div className="p-md bg-secondary-container/20 border border-secondary-container">
<h4 className="font-headline-md text-headline-md mb-sm flex items-center gap-sm">
<span className="material-symbols-outlined text-secondary">explore</span>
                                Cultural Context
                            </h4>
<p className="text-body-sm text-on-surface">In many Latin American construction sites, "Maestro" is a term of respect for senior technicians or site leads. Using this correctly during safety briefings ensures higher engagement and respect for established hierarchy.</p>
</div>
</div>
</div>
</section>
</div>

      </div>
    </NavigationLayout>
  );
}
