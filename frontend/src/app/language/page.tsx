<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>WorkLifeLM - Language Workspace</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&amp;family=Geist:wght@400;600&amp;family=Inter:wght@400;500&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "outline": "#849396",
                    "background": "#031427",
                    "tertiary-container": "#c6d1e9",
                    "surface-container-high": "#1b2b3f",
                    "tertiary-fixed": "#d8e3fb",
                    "error": "#ffb4ab",
                    "surface-container-lowest": "#000f21",
                    "secondary": "#bec6e0",
                    "surface-bright": "#2a3a4f",
                    "on-secondary-fixed-variant": "#3f465c",
                    "on-secondary": "#283044",
                    "on-error": "#690005",
                    "surface-container": "#102034",
                    "on-surface-variant": "#bac9cc",
                    "secondary-container": "#3f465c",
                    "surface-dim": "#031427",
                    "tertiary": "#e6edff",
                    "primary": "#c3f5ff",
                    "on-tertiary": "#263143",
                    "inverse-surface": "#d3e4fe",
                    "on-primary-container": "#00626e",
                    "inverse-primary": "#006875",
                    "primary-fixed-dim": "#00daf3",
                    "secondary-fixed": "#dae2fd",
                    "on-primary": "#00363d",
                    "surface-container-highest": "#26364a",
                    "surface-variant": "#26364a",
                    "outline-variant": "#3b494c",
                    "on-tertiary-fixed": "#111c2d",
                    "on-primary-fixed-variant": "#004f58",
                    "surface-tint": "#00daf3",
                    "surface": "#031427",
                    "error-container": "#93000a",
                    "on-tertiary-container": "#4f5a6e",
                    "tertiary-fixed-dim": "#bcc7de",
                    "on-background": "#d3e4fe",
                    "inverse-on-surface": "#213145",
                    "on-tertiary-fixed-variant": "#3c475a",
                    "primary-container": "#00e5ff",
                    "surface-container-low": "#0b1c30",
                    "on-primary-fixed": "#001f24",
                    "on-error-container": "#ffdad6",
                    "secondary-fixed-dim": "#bec6e0",
                    "on-surface": "#d3e4fe",
                    "on-secondary-fixed": "#131b2e",
                    "primary-fixed": "#9cf0ff",
                    "on-secondary-container": "#adb4ce"
            },
            "borderRadius": {
                    "DEFAULT": "0.125rem",
                    "lg": "0.25rem",
                    "xl": "0.5rem",
                    "full": "0.75rem"
            },
            "spacing": {
                    "sm": "8px",
                    "panel-gap": "1px",
                    "container-padding": "12px",
                    "xs": "4px",
                    "unit": "4px",
                    "md": "16px",
                    "lg": "24px"
            },
            "fontFamily": {
                    "code-sm": ["JetBrains Mono"],
                    "display-lg": ["Geist"],
                    "label-xs": ["JetBrains Mono"],
                    "headline-md": ["Geist"],
                    "body-sm": ["Inter"]
            },
            "fontSize": {
                    "code-sm": ["13px", {"lineHeight": "1.6", "letterSpacing": "0em", "fontWeight": "400"}],
                    "display-lg": ["32px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "600"}],
                    "label-xs": ["11px", {"lineHeight": "1", "letterSpacing": "0.05em", "fontWeight": "500"}],
                    "headline-md": ["20px", {"lineHeight": "1.4", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                    "body-sm": ["14px", {"lineHeight": "1.5", "letterSpacing": "0em", "fontWeight": "400"}]
            }
          },
        },
      }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            font-size: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #031427; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1b2b3f; border-radius: 2px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3b494c; }
        .glass-panel {
            background: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(12px);
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-surface font-body-sm selection:bg-primary/30">
<!-- TopAppBar Navigation Shell -->
<header class="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-md py-xs w-full bg-surface border-b border-outline-variant">
<div class="flex items-center gap-md">
<span class="material-symbols-outlined text-primary">terminal</span>
<h1 class="font-headline-md text-headline-md font-bold tracking-tight text-primary">WorkLifeLM</h1>
</div>
<div class="flex items-center gap-md">
<div class="hidden md:flex items-center gap-lg">
<nav class="flex gap-md">
<a class="text-primary font-bold hover:bg-surface-bright transition-colors duration-150 px-sm py-xs" href="#">Translator</a>
<a class="text-on-surface-variant hover:bg-surface-bright transition-colors duration-150 px-sm py-xs" href="#">Vocabulary</a>
<a class="text-on-surface-variant hover:bg-surface-bright transition-colors duration-150 px-sm py-xs" href="#">Lessons</a>
</nav>
</div>
<div class="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden border border-outline-variant">
<img alt="User Profile" data-alt="A professional headshot of a software engineer in a high-tech environment. The lighting is cool-toned with subtle cyan rim lights, echoing the brand's electric cyan palette. The background is a blurred server room with deep slate blues and dark grays, creating a sophisticated, pro-grade aesthetic consistent with a technical OS interface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-KilEbnT5ZPIF6Pcmp4CFE2EwOPX_h8iPP0iuY34V3qNf4gTxwMEBlTCsM3ZQGwCah-XrjpS3k7OiKUewGP2bia15iFD0XKSDJVJ6An1WFI9Ik_mdADUZQ-YEGI33CXBqCVx0frdJAWUoDFeJq64dRayz4KOTU08BL2zxWtUW_k9GNw7kIQ1ye15QuYTgreAwQ916Ie2IhiONluCQmsPb9vXF3rQi1fB4xuTHZbMfpAK2pOq5ok_gdwSzhiztDxs3d9m_2wGRck0"/>
</div>
</div>
</header>
<!-- NavigationDrawer Shell (Desktop Only) -->
<aside class="hidden md:flex flex-col h-screen fixed left-0 top-0 z-40 bg-surface-container w-64 border-r border-outline-variant pt-16">
<div class="p-md">
<h2 class="font-headline-md text-headline-md text-on-surface opacity-50 tracking-widest text-[10px] uppercase mb-lg">WORKSPACE</h2>
<nav class="space-y-xs">
<a class="flex items-center gap-sm p-sm text-primary bg-secondary-container border-l-2 border-primary transition-all duration-200" href="#">
<span class="material-symbols-outlined" data-icon="translate">translate</span>
<span class="font-label-xs text-label-xs">Translator</span>
</a>
<a class="flex items-center gap-sm p-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 transition-all duration-200" href="#">
<span class="material-symbols-outlined" data-icon="grid_view">grid_view</span>
<span class="font-label-xs text-label-xs">Vocabulary</span>
</a>
<a class="flex items-center gap-sm p-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 transition-all duration-200" href="#">
<span class="material-symbols-outlined" data-icon="model_training">model_training</span>
<span class="font-label-xs text-label-xs">Lessons</span>
</a>
<a class="flex items-center gap-sm p-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 transition-all duration-200" href="#">
<span class="material-symbols-outlined" data-icon="history">history</span>
<span class="font-label-xs text-label-xs">History</span>
</a>
<a class="flex items-center gap-sm p-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 transition-all duration-200 mt-lg" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
<span class="font-label-xs text-label-xs">Settings</span>
</a>
</nav>
</div>
</aside>
<!-- Main Workspace Content -->
<main class="pt-16 md:pl-64 pb-20 md:pb-0 min-h-screen">
<div class="max-w-[1400px] mx-auto p-md space-y-md">
<!-- Dialect Translation Section -->
<section class="grid grid-cols-1 lg:grid-cols-2 gap-panel-gap bg-outline-variant border border-outline-variant">
<!-- Input Panel -->
<div class="bg-surface-container p-md flex flex-col gap-md">
<div class="flex justify-between items-center">
<h3 class="font-headline-md text-headline-md text-on-surface">Source Input</h3>
<div class="flex items-center gap-sm">
<span class="font-label-xs text-label-xs text-outline">DETECTED: ENGLISH</span>
<div class="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
</div>
</div>
<textarea class="flex-grow bg-surface-container-lowest border border-outline-variant p-md font-code-sm text-code-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none min-h-[200px] resize-none" placeholder="Enter raw technical text here..."></textarea>
<div class="flex justify-between items-center">
<select class="bg-surface-container-highest border border-outline-variant text-on-surface font-label-xs text-label-xs px-sm py-xs outline-none focus:border-primary">
<option>Mexican Spanish (Industrial)</option>
<option>Parisian French (Legal)</option>
<option>Castilian Spanish (Medical)</option>
<option>Mandarin Chinese (Construction)</option>
</select>
<button class="bg-primary text-on-primary px-lg py-xs font-label-xs text-label-xs uppercase font-bold hover:opacity-90 active:scale-95 transition-all">
                            Execute Translation
                        </button>
</div>
</div>
<!-- Technical Terminal Output -->
<div class="bg-surface-container-lowest p-md flex flex-col gap-sm border-l border-outline-variant">
<div class="flex items-center gap-sm border-b border-outline-variant pb-xs">
<span class="material-symbols-outlined text-primary text-sm">terminal</span>
<span class="font-code-sm text-code-sm text-primary uppercase tracking-widest">Translation Terminal v4.2</span>
</div>
<div class="flex-grow font-code-sm text-code-sm text-on-surface-variant overflow-y-auto custom-scrollbar p-sm">
<p class="text-primary/60 mb-sm">&gt; INITIALIZING DIALECT ENGINE...</p>
<p class="text-primary/60 mb-sm">&gt; LOADING DICTIONARY: MX_ES_CONSTRUCTION_2024</p>
<p class="text-on-surface leading-relaxed">
<span class="text-primary">El capataz</span> solicitó el <span class="text-primary">andamio</span> reforzado para la zona de <span class="text-primary">excavación</span> norte. Asegúrese de que todos los operarios porten su <span class="text-primary">equipo de protección personal</span>.
                        </p>
<p class="mt-lg text-primary/40 italic">// End of output cluster</p>
</div>
<div class="flex gap-sm">
<button class="text-on-surface-variant hover:text-primary transition-colors"><span class="material-symbols-outlined">content_copy</span></button>
<button class="text-on-surface-variant hover:text-primary transition-colors"><span class="material-symbols-outlined">share</span></button>
</div>
</div>
</section>
<!-- Industry Vocabulary Bento Grid -->
<section class="space-y-sm">
<div class="flex items-center justify-between border-b border-outline-variant pb-xs">
<h3 class="font-headline-md text-headline-md">Industry Vocabulary</h3>
<div class="flex gap-xs">
<button class="px-md py-xs bg-primary text-on-primary font-label-xs text-label-xs uppercase">All</button>
<button class="px-md py-xs bg-surface-container-highest border border-outline-variant text-on-surface-variant font-label-xs text-label-xs uppercase hover:border-primary">Construction</button>
<button class="px-md py-xs bg-surface-container-highest border border-outline-variant text-on-surface-variant font-label-xs text-label-xs uppercase hover:border-primary">Software</button>
<button class="px-md py-xs bg-surface-container-highest border border-outline-variant text-on-surface-variant font-label-xs text-label-xs uppercase hover:border-primary">Medical</button>
</div>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
<!-- Vocab Card 1 -->
<div class="bg-surface-container-low border border-outline-variant p-md hover:bg-surface-bright transition-colors group">
<div class="flex justify-between items-start mb-sm">
<span class="px-xs py-0.5 bg-outline-variant text-[9px] text-on-surface-variant font-code-sm uppercase">Construction</span>
<span class="material-symbols-outlined text-outline group-hover:text-primary">info</span>
</div>
<h4 class="font-headline-md text-headline-md text-primary mb-xs">Cimentación</h4>
<p class="text-body-sm text-on-surface-variant mb-md">The base or foundation of a structure which transmits the weight to the ground.</p>
<div class="bg-surface-container-lowest p-sm border-l-2 border-primary">
<p class="font-code-sm text-code-sm text-on-surface italic">"Revisa la cimentación antes del colado."</p>
</div>
</div>
<!-- Vocab Card 2 -->
<div class="bg-surface-container-low border border-outline-variant p-md hover:bg-surface-bright transition-colors group">
<div class="flex justify-between items-start mb-sm">
<span class="px-xs py-0.5 bg-outline-variant text-[9px] text-on-surface-variant font-code-sm uppercase">Software</span>
<span class="material-symbols-outlined text-outline group-hover:text-primary">info</span>
</div>
<h4 class="font-headline-md text-headline-md text-primary mb-xs">Despliegue</h4>
<p class="text-body-sm text-on-surface-variant mb-md">The process of making an application or update ready for use.</p>
<div class="bg-surface-container-lowest p-sm border-l-2 border-primary">
<p class="font-code-sm text-code-sm text-on-surface italic">"El despliegue falló por un error de config."</p>
</div>
</div>
<!-- Vocab Card 3 -->
<div class="bg-surface-container-low border border-outline-variant p-md hover:bg-surface-bright transition-colors group">
<div class="flex justify-between items-start mb-sm">
<span class="px-xs py-0.5 bg-outline-variant text-[9px] text-on-surface-variant font-code-sm uppercase">Medical</span>
<span class="material-symbols-outlined text-outline group-hover:text-primary">info</span>
</div>
<h4 class="font-headline-md text-headline-md text-primary mb-xs">Profilaxis</h4>
<p class="text-body-sm text-on-surface-variant mb-md">Preventive measures taken to maintain health and prevent disease.</p>
<div class="bg-surface-container-lowest p-sm border-l-2 border-primary">
<p class="font-code-sm text-code-sm text-on-surface italic">"Se inició profilaxis antibiótica post-op."</p>
</div>
</div>
<!-- Vocab Card 4 -->
<div class="bg-surface-container-low border border-outline-variant p-md hover:bg-surface-bright transition-colors group">
<div class="flex justify-between items-start mb-sm">
<span class="px-xs py-0.5 bg-outline-variant text-[9px] text-on-surface-variant font-code-sm uppercase">Construction</span>
<span class="material-symbols-outlined text-outline group-hover:text-primary">info</span>
</div>
<h4 class="font-headline-md text-headline-md text-primary mb-xs">Bovedilla</h4>
<p class="text-body-sm text-on-surface-variant mb-md">Pre-cast block used between joists to form a floor or ceiling system.</p>
<div class="bg-surface-container-lowest p-sm border-l-2 border-primary">
<p class="font-code-sm text-code-sm text-on-surface italic">"Faltan tres hileras de bovedilla."</p>
</div>
</div>
</div>
</section>
<!-- Lesson Generation Section -->
<section class="grid grid-cols-1 lg:grid-cols-12 gap-md items-start">
<!-- Form Sidebar -->
<div class="lg:col-span-4 bg-surface-container border border-outline-variant p-md space-y-md">
<h3 class="font-headline-md text-headline-md">Generate Lesson</h3>
<div class="space-y-sm">
<label class="font-label-xs text-label-xs text-on-surface-variant block uppercase">Topic</label>
<input class="w-full bg-surface-container-lowest border border-outline-variant p-sm font-body-sm text-on-surface focus:border-primary outline-none" placeholder="e.g., Safety Protocols" type="text"/>
</div>
<div class="space-y-sm">
<label class="font-label-xs text-label-xs text-on-surface-variant block uppercase">Industry</label>
<select class="w-full bg-surface-container-lowest border border-outline-variant p-sm font-body-sm text-on-surface focus:border-primary outline-none">
<option>Heavy Construction</option>
<option>Cloud Infrastructure</option>
<option>Pediatric Nursing</option>
</select>
</div>
<div class="space-y-sm">
<label class="font-label-xs text-label-xs text-on-surface-variant block uppercase">Complexity Level</label>
<div class="flex gap-sm">
<button class="flex-1 border border-primary text-primary py-xs font-label-xs text-label-xs">L1</button>
<button class="flex-1 border border-outline-variant text-on-surface-variant py-xs font-label-xs text-label-xs">L2</button>
<button class="flex-1 border border-outline-variant text-on-surface-variant py-xs font-label-xs text-label-xs">L3</button>
</div>
</div>
<button class="w-full bg-primary text-on-primary font-label-xs text-label-xs uppercase font-bold py-md mt-lg hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all">
                        Synthesize Training Plan
                    </button>
</div>
<!-- Results Panel -->
<div class="lg:col-span-8 bg-surface-container-low border border-outline-variant flex flex-col min-h-[500px]">
<div class="p-md border-b border-outline-variant bg-surface-container flex justify-between items-center">
<div>
<span class="font-label-xs text-label-xs text-primary uppercase">Lesson Plan #882</span>
<h2 class="font-display-lg text-display-lg">Safety Protocols: Site Induction</h2>
</div>
<span class="material-symbols-outlined text-outline">download</span>
</div>
<div class="p-md flex-grow space-y-lg custom-scrollbar">
<!-- Subsection: Vocabulary -->
<div>
<h4 class="font-headline-md text-headline-md border-l-4 border-primary pl-sm mb-md">Key Terminology</h4>
<div class="grid grid-cols-2 gap-sm">
<div class="bg-surface-container-lowest p-sm border border-outline-variant/30">
<p class="font-bold text-primary">EPP (Equipo de Protección Personal)</p>
<p class="text-xs text-on-surface-variant">Personal Protective Equipment - Essential for site access.</p>
</div>
<div class="bg-surface-container-lowest p-sm border border-outline-variant/30">
<p class="font-bold text-primary">Bitácora de Obra</p>
<p class="text-xs text-on-surface-variant">Daily construction logbook for documenting incidents.</p>
</div>
</div>
</div>
<!-- Subsection: Common Phrases -->
<div>
<h4 class="font-headline-md text-headline-md border-l-4 border-primary pl-sm mb-md">Common Phrases</h4>
<ul class="space-y-sm">
<li class="bg-surface-container-highest p-sm font-code-sm text-code-sm">
<span class="text-primary font-bold">"¡Cuidado con la carga suspendida!"</span>
<span class="text-on-surface-variant block mt-1">Watch out for the suspended load! (Critical safety shout)</span>
</li>
<li class="bg-surface-container-highest p-sm font-code-sm text-code-sm">
<span class="text-primary font-bold">"¿Ya se hizo el análisis de riesgo?"</span>
<span class="text-on-surface-variant block mt-1">Has the risk analysis been performed yet?</span>
</li>
</ul>
</div>
<!-- Subsection: Cultural Context -->
<div class="p-md bg-secondary-container/20 border border-secondary-container">
<h4 class="font-headline-md text-headline-md mb-sm flex items-center gap-sm">
<span class="material-symbols-outlined text-secondary">explore</span>
                                Cultural Context
                            </h4>
<p class="text-body-sm text-on-surface">In many Latin American construction sites, "Maestro" is a term of respect for senior technicians or site leads. Using this correctly during safety briefings ensures higher engagement and respect for established hierarchy.</p>
</div>
</div>
</div>
</section>
</div>
</main>
<!-- BottomNavBar Shell (Mobile Only) -->
<nav class="md:hidden fixed bottom-0 w-full z-50 bg-surface-container-high border-t border-outline-variant h-16 flex justify-around items-center">
<a class="flex flex-col items-center justify-center text-primary scale-110" href="#">
<span class="material-symbols-outlined" data-icon="translate">translate</span>
<span class="font-label-xs text-label-xs">Trans</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant" href="#">
<span class="material-symbols-outlined" data-icon="grid_view">grid_view</span>
<span class="font-label-xs text-label-xs">Vocab</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant" href="#">
<span class="material-symbols-outlined" data-icon="model_training">model_training</span>
<span class="font-label-xs text-label-xs">Lessons</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant" href="#">
<span class="material-symbols-outlined" data-icon="person">person</span>
<span class="font-label-xs text-label-xs">Profile</span>
</a>
</nav>
<!-- Contextual FAB (Only on relevant main views) -->
<button class="fixed bottom-20 right-md md:bottom-md md:right-md w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40">
<span class="material-symbols-outlined font-bold">add</span>
</button>
</body></html>