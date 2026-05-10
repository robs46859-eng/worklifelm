<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&amp;family=JetBrains+Mono:wght@100..800&amp;family=Inter:wght@100..900&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          "colors": {
            "surface-container-low": "#0b1c30",
            "on-tertiary-fixed-variant": "#3c475a",
            "on-tertiary-fixed": "#111c2d",
            "on-secondary": "#283044",
            "on-background": "#d3e4fe",
            "tertiary-container": "#c6d1e9",
            "surface-variant": "#26364a",
            "on-error-container": "#ffdad6",
            "inverse-surface": "#d3e4fe",
            "on-secondary-fixed": "#131b2e",
            "on-primary-fixed-variant": "#004f58",
            "primary-fixed": "#9cf0ff",
            "tertiary-fixed": "#d8e3fb",
            "surface": "#031427",
            "on-primary-fixed": "#001f24",
            "primary-container": "#00e5ff",
            "on-primary": "#00363d",
            "surface-bright": "#2a3a4f",
            "primary-fixed-dim": "#00daf3",
            "on-tertiary": "#263143",
            "inverse-primary": "#006875",
            "surface-container-highest": "#26364a",
            "surface-tint": "#00daf3",
            "on-primary-container": "#00626e",
            "surface-dim": "#031427",
            "inverse-on-surface": "#213145",
            "error": "#ffb4ab",
            "background": "#031427",
            "error-container": "#93000a",
            "on-secondary-container": "#adb4ce",
            "surface-container": "#102034",
            "surface-container-lowest": "#000f21",
            "outline-variant": "#3b494c",
            "surface-container-high": "#1b2b3f",
            "tertiary": "#e6edff",
            "secondary-container": "#3f465c",
            "on-surface-variant": "#bac9cc",
            "on-surface": "#d3e4fe",
            "on-error": "#690005",
            "on-tertiary-container": "#4f5a6e",
            "primary": "#c3f5ff",
            "secondary-fixed-dim": "#bec6e0",
            "secondary-fixed": "#dae2fd",
            "outline": "#849396",
            "tertiary-fixed-dim": "#bcc7de",
            "secondary": "#bec6e0",
            "on-secondary-fixed-variant": "#3f465c"
          },
          "borderRadius": {
            "DEFAULT": "0.125rem",
            "lg": "0.25rem",
            "xl": "0.5rem",
            "full": "0.75rem"
          },
          "spacing": {
            "xs": "4px",
            "unit": "4px",
            "lg": "24px",
            "container-padding": "12px",
            "sm": "8px",
            "panel-gap": "1px",
            "md": "16px"
          },
          "fontFamily": {
            "headline-md": ["Geist"],
            "label-xs": ["JetBrains Mono"],
            "body-sm": ["Inter"],
            "code-sm": ["JetBrains Mono"],
            "display-lg": ["Geist"]
          },
          "fontSize": {
            "headline-md": ["20px", {"lineHeight": "1.4", "letterSpacing": "-0.01em", "fontWeight": "600"}],
            "label-xs": ["11px", {"lineHeight": "1", "letterSpacing": "0.05em", "fontWeight": "500"}],
            "body-sm": ["14px", {"lineHeight": "1.5", "letterSpacing": "0em", "fontWeight": "400"}],
            "code-sm": ["13px", {"lineHeight": "1.6", "letterSpacing": "0em", "fontWeight": "400"}],
            "display-lg": ["32px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "600"}]
          }
        },
      },
    }
  </script>
<style>
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #020617; }
    ::-webkit-scrollbar-thumb { background: #1e293b; }
    ::-webkit-scrollbar-thumb:hover { background: #334155; }
  </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-surface font-body-sm selection:bg-primary-container/30">
<!-- TopAppBar -->
<header class="flex justify-between items-center w-full px-md h-12 z-50 fixed top-0 docked full-width bg-surface border-b border-outline-variant">
<div class="flex items-center gap-sm">
<span class="material-symbols-outlined text-primary" data-icon="terminal">terminal</span>
<span class="font-code-sm text-headline-md font-bold tracking-tighter text-primary">ARKHAM // CORE</span>
</div>
<div class="flex items-center gap-md">
<nav class="hidden md:flex gap-md">
<a class="font-label-xs text-label-xs text-primary font-bold uppercase" href="#">Marketplace</a>
<a class="font-label-xs text-label-xs text-on-surface-variant hover:bg-surface-variant/50 transition-colors duration-150 uppercase" href="#">Contributors</a>
<a class="font-label-xs text-label-xs text-on-surface-variant hover:bg-surface-variant/50 transition-colors duration-150 uppercase" href="#">Packs</a>
</nav>
<span class="material-symbols-outlined text-on-surface-variant" data-icon="account_circle">account_circle</span>
</div>
</header>
<!-- NavigationDrawer -->
<aside class="fixed left-0 top-12 h-screen w-64 flex flex-col pt-md bg-surface-container-low border-r border-outline-variant hidden md:flex">
<div class="px-md mb-lg">
<span class="font-label-xs text-label-xs text-on-surface-variant tracking-widest uppercase">WORKSPACE</span>
</div>
<nav class="flex flex-col">
<a class="bg-surface-variant text-primary border-r-2 border-primary flex items-center gap-md px-md py-sm transition-all duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined" data-icon="database">database</span>
<span class="font-label-xs text-label-xs">Marketplace</span>
</a>
<a class="text-on-surface-variant flex items-center gap-md px-md py-sm hover:bg-surface-variant/30 hover:text-on-surface transition-all duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined" data-icon="groups">groups</span>
<span class="font-label-xs text-label-xs">Contributors</span>
</a>
<a class="text-on-surface-variant flex items-center gap-md px-md py-sm hover:bg-surface-variant/30 hover:text-on-surface transition-all duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined" data-icon="package_2">package_2</span>
<span class="font-label-xs text-label-xs">Packs</span>
</a>
<a class="text-on-surface-variant flex items-center gap-md px-md py-sm hover:bg-surface-variant/30 hover:text-on-surface transition-all duration-200 ease-in-out" href="#">
<span class="material-symbols-outlined" data-icon="visibility">visibility</span>
<span class="font-label-xs text-label-xs">Queue</span>
</a>
</nav>
</aside>
<!-- Main Canvas -->
<main class="md:ml-64 pt-12 pb-24 min-h-screen">
<!-- Section 1: Marketplace Hero -->
<section class="p-lg bg-surface-container-lowest/50 border-b border-outline-variant">
<div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-md">
<div>
<span class="font-label-xs text-label-xs text-primary-container border border-primary-container/20 px-xs mb-xs inline-block">SYSTEM_ACCESS_GRANTED</span>
<h1 class="font-display-lg text-display-lg text-on-background tracking-tighter">CONTRIBUTOR_MARKETPLACE_v2.4</h1>
</div>
<div class="flex gap-lg bg-surface-container-high p-md rounded border border-outline-variant">
<div class="flex flex-col">
<span class="font-label-xs text-label-xs text-on-surface-variant">ACTIVE_NODES</span>
<span class="font-code-sm text-headline-md text-primary-fixed">1,402</span>
</div>
<div class="flex flex-col">
<span class="font-label-xs text-label-xs text-on-surface-variant">TRUST_SCORE</span>
<span class="font-code-sm text-headline-md text-primary-fixed">99.8%</span>
</div>
<div class="flex flex-col">
<span class="font-label-xs text-label-xs text-on-surface-variant">TOP_RANKED</span>
<span class="font-code-sm text-headline-md text-primary">@DialectMaster_X</span>
</div>
</div>
</div>
</section>
<div class="p-lg space-y-lg">
<!-- Section 2: Contributor Profiles (Bento-style Grid) -->
<section>
<div class="flex items-center gap-sm mb-md">
<span class="material-symbols-outlined text-primary-container" data-icon="psychology">psychology</span>
<h2 class="font-headline-md text-headline-md uppercase tracking-widest text-on-surface">Verified Nodes</h2>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-panel-gap bg-outline-variant p-[1px]">
<!-- Card 1 -->
<div class="bg-surface-container-high p-md hover:bg-surface-variant transition-colors group">
<div class="flex justify-between items-start mb-md">
<div class="w-12 h-12 bg-surface-variant flex items-center justify-center border border-outline-variant">
<span class="material-symbols-outlined text-primary" data-icon="account_circle">account_circle</span>
</div>
<span class="font-label-xs text-label-xs bg-primary-container/10 text-primary-container px-xs py-[2px] border border-primary-container/30">LEVEL 5 ELITE</span>
</div>
<h3 class="font-headline-md text-headline-md text-on-surface mb-xs">@DialectMaster_X</h3>
<p class="font-label-xs text-label-xs text-primary mb-sm">SPECIALTY: Regional Slang</p>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-md">Expert in deep-web linguistic shifts and hyper-local dialect synthesis for high-fidelity LLM training.</p>
<button class="w-full py-xs border border-outline text-on-surface font-label-xs text-label-xs uppercase hover:bg-primary-container hover:text-on-primary transition-all">View Logs</button>
</div>
<!-- Card 2 -->
<div class="bg-surface-container-high p-md hover:bg-surface-variant transition-colors group">
<div class="flex justify-between items-start mb-md">
<div class="w-12 h-12 bg-surface-variant flex items-center justify-center border border-outline-variant">
<span class="material-symbols-outlined text-primary" data-icon="account_circle">account_circle</span>
</div>
<span class="font-label-xs text-label-xs bg-on-tertiary-fixed-variant text-tertiary-fixed px-xs py-[2px]">LEVEL 4 EXPERT</span>
</div>
<h3 class="font-headline-md text-headline-md text-on-surface mb-xs">@Safety_Sentry</h3>
<p class="font-label-xs text-label-xs text-primary mb-sm">SPECIALTY: Protocol Guardrails</p>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-md">Specializing in regional legal compliance and industrial safety protocol translation for mining sectors.</p>
<button class="w-full py-xs border border-outline text-on-surface font-label-xs text-label-xs uppercase hover:bg-primary-container hover:text-on-primary transition-all">View Logs</button>
</div>
<!-- Card 3 -->
<div class="bg-surface-container-high p-md hover:bg-surface-variant transition-colors group">
<div class="flex justify-between items-start mb-md">
<div class="w-12 h-12 bg-surface-variant flex items-center justify-center border border-outline-variant">
<span class="material-symbols-outlined text-primary" data-icon="account_circle">account_circle</span>
</div>
<span class="font-label-xs text-label-xs bg-primary-container/10 text-primary-container px-xs py-[2px] border border-primary-container/30">LEVEL 5 ELITE</span>
</div>
<h3 class="font-headline-md text-headline-md text-on-surface mb-xs">@Lingo_Flow</h3>
<p class="font-label-xs text-label-xs text-primary mb-sm">SPECIALTY: Medical Phrasing</p>
<p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-md">Optimizing healthcare response models for complex surgical environments and emergency triage slang.</p>
<button class="w-full py-xs border border-outline text-on-surface font-label-xs text-label-xs uppercase hover:bg-primary-container hover:text-on-primary transition-all">View Logs</button>
</div>
</div>
</section>
<!-- Section 3: Packs Explorer -->
<section>
<div class="flex items-center justify-between mb-md">
<div class="flex items-center gap-sm">
<span class="material-symbols-outlined text-primary-container" data-icon="package_2">package_2</span>
<h2 class="font-headline-md text-headline-md uppercase tracking-widest text-on-surface">Verified Packs</h2>
</div>
<span class="font-label-xs text-label-xs text-on-surface-variant">SORT: BY_LATENCY</span>
</div>
<div class="space-y-sm">
<!-- Pack Item 1 -->
<div class="flex items-center justify-between p-md bg-surface border border-outline-variant hover:border-primary transition-all">
<div class="flex items-center gap-md">
<div class="w-10 h-10 bg-surface-container flex items-center justify-center border border-outline-variant">
<span class="material-symbols-outlined text-on-surface-variant" data-icon="language">language</span>
</div>
<div>
<h4 class="font-code-sm text-headline-md text-on-surface leading-none mb-xs">Industrial Spanish Dialect Pack</h4>
<div class="flex gap-xs items-center">
<span class="font-label-xs text-[10px] text-on-surface-variant uppercase border border-outline-variant px-xs">v3.4.1</span>
<span class="font-label-xs text-[10px] text-on-surface-variant uppercase border border-outline-variant px-xs">verified_node</span>
</div>
</div>
</div>
<div class="flex items-center gap-lg">
<span class="font-code-sm text-headline-md text-primary">$45.00</span>
<button class="flex items-center gap-sm bg-primary-container text-on-primary font-label-xs text-label-xs px-md py-sm rounded-lg hover:brightness-110 active:scale-95 transition-transform uppercase">
<span class="material-symbols-outlined text-[18px]" data-icon="terminal">terminal</span>
                ADD_TO_WORKSPACE
              </button>
</div>
</div>
<!-- Pack Item 2 -->
<div class="flex items-center justify-between p-md bg-surface border border-outline-variant hover:border-primary transition-all">
<div class="flex items-center gap-md">
<div class="w-10 h-10 bg-surface-container flex items-center justify-center border border-outline-variant">
<span class="material-symbols-outlined text-on-surface-variant" data-icon="security">security</span>
</div>
<div>
<h4 class="font-code-sm text-headline-md text-on-surface leading-none mb-xs">Safety Protocol V3 - Mexico</h4>
<div class="flex gap-xs items-center">
<span class="font-label-xs text-[10px] text-on-surface-variant uppercase border border-outline-variant px-xs">v1.2.0</span>
<span class="font-label-xs text-[10px] text-on-surface-variant uppercase border border-outline-variant px-xs">compliance_ready</span>
</div>
</div>
</div>
<div class="flex items-center gap-lg">
<span class="font-code-sm text-headline-md text-primary">$12.00</span>
<button class="flex items-center gap-sm bg-primary-container text-on-primary font-label-xs text-label-xs px-md py-sm rounded-lg hover:brightness-110 active:scale-95 transition-transform uppercase">
<span class="material-symbols-outlined text-[18px]" data-icon="terminal">terminal</span>
                ADD_TO_WORKSPACE
              </button>
</div>
</div>
<!-- Pack Item 3 -->
<div class="flex items-center justify-between p-md bg-surface border border-outline-variant hover:border-primary transition-all">
<div class="flex items-center gap-md">
<div class="w-10 h-10 bg-surface-container flex items-center justify-center border border-outline-variant">
<span class="material-symbols-outlined text-on-surface-variant" data-icon="record_voice_over">record_voice_over</span>
</div>
<div>
<h4 class="font-code-sm text-headline-md text-on-surface leading-none mb-xs">Pronunciation Core: Bogota</h4>
<div class="flex gap-xs items-center">
<span class="font-label-xs text-[10px] text-on-surface-variant uppercase border border-outline-variant px-xs">v0.9.8</span>
<span class="font-label-xs text-[10px] text-on-surface-variant uppercase border border-outline-variant px-xs">beta_access</span>
</div>
</div>
</div>
<div class="flex items-center gap-lg">
<span class="font-code-sm text-headline-md text-primary">$30.00</span>
<button class="flex items-center gap-sm bg-primary-container text-on-primary font-label-xs text-label-xs px-md py-sm rounded-lg hover:brightness-110 active:scale-95 transition-transform uppercase">
<span class="material-symbols-outlined text-[18px]" data-icon="terminal">terminal</span>
                ADD_TO_WORKSPACE
              </button>
</div>
</div>
</div>
</section>
</div>
<!-- Section 4: Review Queue (Arkham) -->
<section class="fixed bottom-0 md:left-64 right-0 bg-surface-container-lowest border-t border-outline-variant p-sm z-40">
<div class="flex items-center justify-between mb-xs px-sm">
<div class="flex items-center gap-sm">
<span class="material-symbols-outlined text-primary-fixed text-[14px]" data-icon="visibility">visibility</span>
<span class="font-code-sm text-label-xs text-on-surface-variant uppercase">ARKHAM_MONITOR // Review Queue</span>
</div>
<div class="flex gap-md">
<span class="font-label-xs text-label-xs text-primary-container animate-pulse">LIVE_STREAM_ACTIVE</span>
<span class="font-label-xs text-label-xs text-on-surface-variant">LOAD: 12%</span>
</div>
</div>
<div class="bg-black p-md rounded-lg border border-outline-variant/30 max-h-32 overflow-y-auto space-y-xs">
<div class="flex items-center justify-between group">
<div class="font-code-sm text-[12px] text-primary/80">
<span class="text-on-surface-variant">[PENDING]</span> Pack_772 // User: <span class="text-primary">@S_Gomez</span> // Status: <span class="text-primary">IN_REVIEW</span>
</div>
<div class="flex gap-xs opacity-0 group-hover:opacity-100 transition-opacity">
<button class="font-label-xs text-[10px] px-xs py-0 border border-primary text-primary hover:bg-primary/10">APPROVE</button>
<button class="font-label-xs text-[10px] px-xs py-0 border border-error text-error hover:bg-error/10">REJECT</button>
<button class="font-label-xs text-[10px] px-xs py-0 border border-on-surface-variant text-on-surface-variant hover:bg-on-surface-variant/10">DIAGNOSE</button>
</div>
</div>
<div class="flex items-center justify-between group">
<div class="font-code-sm text-[12px] text-primary/80">
<span class="text-on-surface-variant">[PENDING]</span> Pack_814 // User: <span class="text-primary">@K_Chen</span> // Status: <span class="text-primary">VALIDATING</span>
</div>
<div class="flex gap-xs opacity-0 group-hover:opacity-100 transition-opacity">
<button class="font-label-xs text-[10px] px-xs py-0 border border-primary text-primary hover:bg-primary/10">APPROVE</button>
<button class="font-label-xs text-[10px] px-xs py-0 border border-error text-error hover:bg-error/10">REJECT</button>
<button class="font-label-xs text-[10px] px-xs py-0 border border-on-surface-variant text-on-surface-variant hover:bg-on-surface-variant/10">DIAGNOSE</button>
</div>
</div>
<div class="flex items-center justify-between group">
<div class="font-code-sm text-[12px] text-primary/80">
<span class="text-on-surface-variant">[PENDING]</span> Node_331 // User: <span class="text-primary">@A_Vance</span> // Status: <span class="text-primary">IN_REVIEW</span>
</div>
<div class="flex gap-xs opacity-0 group-hover:opacity-100 transition-opacity">
<button class="font-label-xs text-[10px] px-xs py-0 border border-primary text-primary hover:bg-primary/10">APPROVE</button>
<button class="font-label-xs text-[10px] px-xs py-0 border border-error text-error hover:bg-error/10">REJECT</button>
<button class="font-label-xs text-[10px] px-xs py-0 border border-on-surface-variant text-on-surface-variant hover:bg-on-surface-variant/10">DIAGNOSE</button>
</div>
</div>
</div>
</section>
</main>
<!-- BottomNavBar (Mobile) -->
<nav class="fixed bottom-0 w-full z-50 flex justify-around items-center h-16 md:hidden bg-surface-container-highest border-t border-outline-variant">
<a class="text-primary scale-110 flex flex-col items-center justify-center active:scale-90 transition-transform" href="#">
<span class="material-symbols-outlined" data-icon="database">database</span>
<span class="font-label-xs text-label-xs">Marketplace</span>
</a>
<a class="text-on-surface-variant flex flex-col items-center justify-center active:scale-90 transition-transform hover:text-primary" href="#">
<span class="material-symbols-outlined" data-icon="groups">groups</span>
<span class="font-label-xs text-label-xs">Contributors</span>
</a>
<a class="text-on-surface-variant flex flex-col items-center justify-center active:scale-90 transition-transform hover:text-primary" href="#">
<span class="material-symbols-outlined" data-icon="package_2">package_2</span>
<span class="font-label-xs text-label-xs">Packs</span>
</a>
<a class="text-on-surface-variant flex flex-col items-center justify-center active:scale-90 transition-transform hover:text-primary" href="#">
<span class="material-symbols-outlined" data-icon="visibility">visibility</span>
<span class="font-label-xs text-label-xs">Queue</span>
</a>
</nav>
</body></html>