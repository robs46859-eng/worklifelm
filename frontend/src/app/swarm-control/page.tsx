<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>SWARM_OS // ORCHESTRATOR</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&amp;family=JetBrains+Mono:wght@100..800&amp;family=Inter:wght@100..900&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "inverse-primary": "#006875",
                    "on-surface": "#d3e4fe",
                    "error-container": "#93000a",
                    "on-tertiary-fixed": "#111c2d",
                    "surface-container-low": "#0b1c30",
                    "outline-variant": "#3b494c",
                    "on-error": "#690005",
                    "inverse-on-surface": "#213145",
                    "on-primary": "#00363d",
                    "error": "#ffb4ab",
                    "primary-fixed": "#9cf0ff",
                    "tertiary": "#e6edff",
                    "surface-tint": "#00daf3",
                    "surface-dim": "#031427",
                    "surface-container-lowest": "#000f21",
                    "surface-container-highest": "#26364a",
                    "primary": "#c3f5ff",
                    "on-background": "#d3e4fe",
                    "outline": "#849396",
                    "inverse-surface": "#d3e4fe",
                    "primary-container": "#00e5ff",
                    "on-secondary": "#283044",
                    "on-primary-fixed-variant": "#004f58",
                    "tertiary-fixed": "#d8e3fb",
                    "on-secondary-fixed": "#131b2e",
                    "on-secondary-container": "#adb4ce",
                    "tertiary-fixed-dim": "#bcc7de",
                    "on-tertiary-fixed-variant": "#3c475a",
                    "secondary-fixed-dim": "#bec6e0",
                    "on-error-container": "#ffdad6",
                    "primary-fixed-dim": "#00daf3",
                    "on-surface-variant": "#bac9cc",
                    "surface-variant": "#26364a",
                    "secondary-fixed": "#dae2fd",
                    "secondary-container": "#3f465c",
                    "surface": "#031427",
                    "secondary": "#bec6e0",
                    "tertiary-container": "#c6d1e9",
                    "surface-container-high": "#1b2b3f",
                    "on-primary-container": "#00626e",
                    "on-tertiary-container": "#4f5a6e",
                    "on-secondary-fixed-variant": "#3f465c",
                    "background": "#031427",
                    "surface-container": "#102034",
                    "on-primary-fixed": "#001f24",
                    "surface-bright": "#2a3a4f",
                    "on-tertiary": "#263143"
            },
            "borderRadius": {
                    "DEFAULT": "0.125rem",
                    "lg": "0.25rem",
                    "xl": "0.5rem",
                    "full": "0.75rem"
            },
            "spacing": {
                    "sm": "8px",
                    "md": "16px",
                    "xs": "4px",
                    "unit": "4px",
                    "container-padding": "12px",
                    "panel-gap": "1px",
                    "lg": "24px"
            },
            "fontFamily": {
                    "display-lg": ["Geist"],
                    "body-sm": ["Inter"],
                    "headline-md": ["Geist"],
                    "code-sm": ["JetBrains Mono"],
                    "label-xs": ["JetBrains Mono"]
            },
            "fontSize": {
                    "display-lg": ["32px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "600"}],
                    "body-sm": ["14px", {"lineHeight": "1.5", "letterSpacing": "0em", "fontWeight": "400"}],
                    "headline-md": ["20px", {"lineHeight": "1.4", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                    "code-sm": ["13px", {"lineHeight": "1.6", "letterSpacing": "0em", "fontWeight": "400"}],
                    "label-xs": ["11px", {"lineHeight": "1", "letterSpacing": "0.05em", "fontWeight": "500"}]
            }
          },
        },
      }
    </script>
<style>
        body {
            background-color: #020617;
            color: #d3e4fe;
            font-family: 'Inter', sans-serif;
            -webkit-font-smoothing: antialiased;
        }
        .panel-border { border: 1px solid #1E293B; }
        .glow-cyan { box-shadow: 0 0 8px rgba(0, 229, 255, 0.2); }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
            font-size: 20px;
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #020617; }
        ::-webkit-scrollbar-thumb { background: #1E293B; border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: #3b494c; }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="flex flex-col min-h-screen">
<!-- TopAppBar -->
<header class="docked full-width top-0 border-b border-outline-variant bg-surface flex justify-between items-center px-md w-full h-12 z-50">
<div class="flex items-center gap-sm cursor-pointer active:opacity-80">
<span class="material-symbols-outlined text-primary-container">terminal</span>
<h1 class="font-display-lg text-headline-md tracking-tighter text-primary-container">SWARM_OS // ORCHESTRATOR</h1>
</div>
<div class="flex items-center gap-md">
<div class="hidden md:flex gap-md">
<span class="font-code-sm text-code-sm text-primary-container font-bold">ACTIVE_SWARMS</span>
<span class="font-code-sm text-code-sm text-on-surface-variant hover:bg-surface-container-highest transition-colors cursor-pointer">TASK_QUEUE</span>
<span class="font-code-sm text-code-sm text-on-surface-variant hover:bg-surface-container-highest transition-colors cursor-pointer">HANDOFF_LOGS</span>
</div>
<span class="material-symbols-outlined text-on-surface-variant cursor-pointer hover:bg-surface-container-highest transition-colors">settings_input_component</span>
</div>
</header>
<div class="flex flex-1 overflow-hidden">
<!-- NavigationDrawer (Desktop Only) -->
<aside class="hidden md:flex flex-col gap-unit pt-md h-full left-0 w-64 bg-surface-container-low border-r border-outline-variant">
<div class="px-md pb-md">
<span class="font-code-sm text-code-sm uppercase tracking-widest text-on-surface-variant opacity-50">WORKSPACE_ROOT</span>
</div>
<nav class="flex flex-col">
<div class="text-primary-container bg-surface-container-highest border-l-2 border-primary-container px-md py-sm flex items-center gap-sm transition-all duration-150 ease-in-out cursor-pointer">
<span class="material-symbols-outlined">hub</span>
<span class="font-code-sm text-code-sm uppercase tracking-widest">ACTIVE_SWARMS</span>
</div>
<div class="text-on-surface-variant px-md py-sm hover:text-on-surface hover:bg-surface-container-highest flex items-center gap-sm transition-all duration-150 ease-in-out cursor-pointer">
<span class="material-symbols-outlined">reorder</span>
<span class="font-code-sm text-code-sm uppercase tracking-widest">TASK_QUEUE</span>
</div>
<div class="text-on-surface-variant px-md py-sm hover:text-on-surface hover:bg-surface-container-highest flex items-center gap-sm transition-all duration-150 ease-in-out cursor-pointer">
<span class="material-symbols-outlined">history_edu</span>
<span class="font-code-sm text-code-sm uppercase tracking-widest">HANDOFF_LOGS</span>
</div>
<div class="text-on-surface-variant px-md py-sm hover:text-on-surface hover:bg-surface-container-highest flex items-center gap-sm transition-all duration-150 ease-in-out cursor-pointer">
<span class="material-symbols-outlined">query_stats</span>
<span class="font-code-sm text-code-sm uppercase tracking-widest">SYSTEM_METRICS</span>
</div>
</nav>
</aside>
<!-- Main Content Area -->
<main class="flex-1 overflow-y-auto bg-background p-xs md:p-md space-y-md">
<!-- Summary Stats -->
<div class="grid grid-cols-2 md:grid-cols-4 gap-panel-gap">
<div class="panel-border bg-surface-container-low p-sm">
<span class="font-code-sm text-label-xs text-on-surface-variant opacity-60">ACTIVE_NODES</span>
<div class="font-display-lg text-primary-container">124</div>
</div>
<div class="panel-border bg-surface-container-low p-sm">
<span class="font-code-sm text-label-xs text-on-surface-variant opacity-60">QUEUED_TASKS</span>
<div class="font-display-lg text-secondary">842</div>
</div>
<div class="panel-border bg-surface-container-low p-sm">
<span class="font-code-sm text-label-xs text-on-surface-variant opacity-60">AVG_LATENCY</span>
<div class="font-display-lg text-on-surface">42ms</div>
</div>
<div class="panel-border bg-surface-container-low p-sm">
<span class="font-code-sm text-label-xs text-error opacity-60">ERROR_RATE</span>
<div class="font-display-lg text-error">0.02%</div>
</div>
</div>
<!-- Dashboard Grid -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-md">
<!-- ACTIVE_SWARMS Section -->
<section class="lg:col-span-7 flex flex-col gap-sm">
<div class="flex items-center justify-between px-xs">
<h2 class="font-code-sm text-code-sm uppercase tracking-widest text-primary-container">ACTIVE_SWARMS</h2>
<span class="material-symbols-outlined text-on-surface-variant text-sm">refresh</span>
</div>
<div class="flex flex-col gap-panel-gap">
<!-- Swarm Card 1 -->
<div class="panel-border bg-surface-container p-sm flex flex-col gap-xs hover:bg-surface-container-high transition-colors">
<div class="flex justify-between items-start">
<div>
<div class="font-code-sm text-on-surface font-bold">SWARM_ALPHA_09</div>
<div class="font-code-sm text-label-xs text-on-surface-variant">Cluster: US-EAST-1 // ID: 8829-X</div>
</div>
<span class="bg-primary-container/10 text-primary-container border border-primary-container/30 px-xs py-[2px] font-code-sm text-label-xs flex items-center gap-xs">
<span class="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
                                    PROCESSING
                                </span>
</div>
<div class="w-full bg-outline-variant h-1 mt-sm">
<div class="bg-primary-container h-full" style="width: 64%"></div>
</div>
<div class="flex justify-between font-code-sm text-label-xs text-on-surface-variant pt-xs">
<span>8/12 Agents Active</span>
<span>64% Completed</span>
</div>
</div>
<!-- Swarm Card 2 -->
<div class="panel-border bg-surface-container p-sm flex flex-col gap-xs hover:bg-surface-container-high transition-colors">
<div class="flex justify-between items-start">
<div>
<div class="font-code-sm text-on-surface font-bold">SENTINEL_ROOT_01</div>
<div class="font-code-sm text-label-xs text-on-surface-variant">Cluster: EU-WEST-2 // ID: 1042-K</div>
</div>
<span class="bg-surface-container-highest text-on-surface-variant border border-outline-variant px-xs py-[2px] font-code-sm text-label-xs flex items-center gap-xs">
<span class="w-1.5 h-1.5 rounded-full bg-on-surface-variant"></span>
                                    IDLE
                                </span>
</div>
<div class="w-full bg-outline-variant h-1 mt-sm opacity-30"></div>
<div class="flex justify-between font-code-sm text-label-xs text-on-surface-variant pt-xs">
<span>0/4 Agents Active</span>
<span>Awaiting Task...</span>
</div>
</div>
<!-- Swarm Card 3 -->
<div class="panel-border bg-surface-container p-sm flex flex-col gap-xs hover:bg-surface-container-high transition-colors border-l-2 border-l-error">
<div class="flex justify-between items-start">
<div>
<div class="font-code-sm text-on-surface font-bold">PARALLEL_CORE_XV</div>
<div class="font-code-sm text-label-xs text-on-surface-variant">Cluster: AP-SOUTH-1 // ID: 4492-Z</div>
</div>
<span class="bg-error-container/20 text-error border border-error/30 px-xs py-[2px] font-code-sm text-label-xs flex items-center gap-xs">
<span class="w-1.5 h-1.5 rounded-full bg-error"></span>
                                    ERROR
                                </span>
</div>
<div class="font-code-sm text-label-xs text-error bg-error/10 p-xs mt-xs border border-error/20">
                                EXCEPTION_RECURSION_LIMIT_EXCEEDED: agent_id: node_721
                            </div>
</div>
</div>
</section>
<!-- Right Column: QUEUED & COMPLETED -->
<div class="lg:col-span-5 flex flex-col gap-md">
<!-- QUEUED_TASKS -->
<section class="flex flex-col gap-sm">
<h2 class="font-code-sm text-code-sm uppercase tracking-widest text-primary-container px-xs">QUEUED_TASKS</h2>
<div class="panel-border bg-surface-container divide-y divide-outline-variant">
<div class="p-sm flex justify-between items-center hover:bg-surface-container-highest transition-colors">
<div class="flex flex-col">
<span class="font-code-sm text-body-sm text-on-surface">Data_Scrub_v2</span>
<span class="font-code-sm text-label-xs text-on-surface-variant opacity-50">Priority: HIGH</span>
</div>
<span class="font-code-sm text-label-xs text-primary-container">T-MINUS 04:12</span>
</div>
<div class="p-sm flex justify-between items-center hover:bg-surface-container-highest transition-colors">
<div class="flex flex-col">
<span class="font-code-sm text-body-sm text-on-surface">Vector_Indexing</span>
<span class="font-code-sm text-label-xs text-on-surface-variant opacity-50">Priority: NORMAL</span>
</div>
<span class="font-code-sm text-label-xs text-on-surface-variant">T-MINUS 12:44</span>
</div>
</div>
</section>
<!-- COMPLETED_JOBS -->
<section class="flex flex-col gap-sm">
<h2 class="font-code-sm text-code-sm uppercase tracking-widest text-primary-container px-xs">COMPLETED_JOBS</h2>
<div class="panel-border bg-surface-container-low p-sm">
<div class="space-y-sm">
<div class="flex items-center gap-sm">
<span class="material-symbols-outlined text-primary-container scale-75">check_circle</span>
<div class="flex-1 border-b border-outline-variant pb-xs">
<div class="flex justify-between">
<span class="font-code-sm text-label-xs text-on-surface">Global_Sentiment_Analysis</span>
<span class="font-code-sm text-label-xs text-on-surface-variant">2m ago</span>
</div>
</div>
</div>
<div class="flex items-center gap-sm opacity-60">
<span class="material-symbols-outlined text-primary-container scale-75">check_circle</span>
<div class="flex-1 border-b border-outline-variant pb-xs">
<div class="flex justify-between">
<span class="font-code-sm text-label-xs text-on-surface">Neural_Weight_Export</span>
<span class="font-code-sm text-label-xs text-on-surface-variant">14m ago</span>
</div>
</div>
</div>
</div>
</div>
</section>
</div>
<!-- AGENT_HANDOFF_LOG Section -->
<section class="lg:col-span-12 flex flex-col gap-sm">
<h2 class="font-code-sm text-code-sm uppercase tracking-widest text-primary-container px-xs">AGENT_HANDOFF_LOG</h2>
<div class="panel-border bg-surface-container-lowest overflow-x-auto">
<table class="w-full text-left font-code-sm text-label-xs border-collapse">
<thead class="bg-surface-container-high text-on-surface-variant uppercase tracking-tighter">
<tr>
<th class="p-sm font-medium border-r border-outline-variant">TIMESTAMP</th>
<th class="p-sm font-medium border-r border-outline-variant">ORIGIN_AGENT</th>
<th class="p-sm font-medium border-r border-outline-variant">TRANSITION</th>
<th class="p-sm font-medium border-r border-outline-variant">TARGET_AGENT</th>
<th class="p-sm font-medium">PAYLOAD_SIZE</th>
</tr>
</thead>
<tbody class="divide-y divide-outline-variant">
<tr class="hover:bg-primary-container/5">
<td class="p-sm border-r border-outline-variant whitespace-nowrap">14:22:01.042</td>
<td class="p-sm border-r border-outline-variant text-on-surface">Researcher_α</td>
<td class="p-sm border-r border-outline-variant text-center">
<span class="material-symbols-outlined text-primary-container text-xs">arrow_forward</span>
</td>
<td class="p-sm border-r border-outline-variant text-on-surface">Coder_β</td>
<td class="p-sm">1.24 MB</td>
</tr>
<tr class="hover:bg-primary-container/5">
<td class="p-sm border-r border-outline-variant whitespace-nowrap">14:22:05.881</td>
<td class="p-sm border-r border-outline-variant text-on-surface">Coder_β</td>
<td class="p-sm border-r border-outline-variant text-center">
<span class="material-symbols-outlined text-primary-container text-xs">arrow_forward</span>
</td>
<td class="p-sm border-r border-outline-variant text-on-surface">Reviewer_γ</td>
<td class="p-sm">45 KB</td>
</tr>
<tr class="hover:bg-primary-container/5">
<td class="p-sm border-r border-outline-variant whitespace-nowrap">14:23:12.115</td>
<td class="p-sm border-r border-outline-variant text-on-surface">Reviewer_γ</td>
<td class="p-sm border-r border-outline-variant text-center">
<span class="material-symbols-outlined text-primary-container text-xs">arrow_forward</span>
</td>
<td class="p-sm border-r border-outline-variant text-on-surface">Deployer_δ</td>
<td class="p-sm">8.2 MB</td>
</tr>
</tbody>
</table>
</div>
</section>
<!-- Visualization Panel (Bento Style) -->
<section class="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-md pb-16 md:pb-0">
<div class="panel-border bg-surface-container h-48 relative overflow-hidden">
<div class="absolute inset-0 bg-gradient-to-br from-primary-container/5 to-transparent"></div>
<div class="absolute top-sm left-sm font-code-sm text-label-xs text-on-surface-variant z-10">NEURAL_DENSITY_MAP</div>
<img class="w-full h-full object-cover opacity-40 mix-blend-screen" data-alt="A sophisticated macro visualization of a high-tech computer circuit board with glowing cyan trails of electricity flowing through microscopic pathways. The lighting is cinematic and dark, emphasizing the intricate metallic textures and neon energy. The overall atmosphere is focused, technical, and suggests advanced artificial intelligence architecture." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6QUCEsTJMnal5qV0Ah2zs29Tz_BBN4WX2gFPt6ni8jmdlK4ur58EzwjRnbYc7Fezjv45guExYZzX2x9ankk14z0MmN0uyd-x5NbHQkO8wqj1-H0NEfE6q_3sGHPARdI_EhnYZG4u2KFolFh7CKNbCMnPvxlKjwHUeiCC4ipn9ShGF3_xesQejbf90tFu84gO_XmXNzb-tsd3O-6ac4BxdfvzkYa4rNu8qGF1nKaob1nGhcvpF_6Ce-a4kOSvQ9zpOur19LEsMBbs"/>
</div>
<div class="panel-border bg-surface-container h-48 flex flex-col p-sm relative">
<div class="font-code-sm text-label-xs text-on-surface-variant mb-xs">GLOBAL_ACTIVITY_RADAR</div>
<div class="flex-1 bg-surface-container-lowest panel-border relative flex items-center justify-center">
<div class="w-32 h-32 rounded-full border border-primary-container/20 flex items-center justify-center">
<div class="w-24 h-24 rounded-full border border-primary-container/40 flex items-center justify-center">
<div class="w-16 h-16 rounded-full border border-primary-container/60 flex items-center justify-center">
<div class="w-1 h-1 bg-primary-container rounded-full shadow-[0_0_10px_#00e5ff]"></div>
</div>
</div>
<div class="absolute w-[1px] h-32 bg-primary-container/20 animate-spin origin-center"></div>
</div>
<div class="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
<img class="w-full h-full object-cover" data-alt="A detailed satellite view of Earth at night, showing the glowing network of city lights and digital connectivity across continents. The oceans are deep midnight blue, while the landmasses are defined by shimmering clusters of golden and white electrical activity. The image conveys a sense of global scale and planetary-level data monitoring." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjlGvQTLIFZST1lunzapMc16DdC3Fa-Y3FXMHVmCy5m9DiAuh-8OI6lhBUY4HrYJidgJ8aaFqSOsjuBLR34esKvivYW_Z5UEZb5r1k0j9AGF7B_q50EoYxd2VPUNTgeb0ZwT3rhP12Z0z2DzHwxgFYtXN-DWG6HTvr1LfEtZvy4kvpwnZ6zooRQSOCVRKWjD1b4XXSRc9rMLAz1ChFGNvXNWgiX8z_nKpQ_hsTYfyyTQg-NBv3NEkidV0tN94zkt8kzoqv1bQVqv4"/>
</div>
</div>
</div>
</section>
</div>
</main>
</div>
<!-- BottomNavBar (Mobile Only) -->
<nav class="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center bg-surface/80 backdrop-blur-lg border-t border-outline-variant h-16">
<button class="flex flex-col items-center justify-center text-primary-container scale-110 active:bg-surface-container-low transition-all">
<span class="material-symbols-outlined">hub</span>
<span class="font-label-xs text-label-xs mt-1">SWARMS</span>
</button>
<button class="flex flex-col items-center justify-center text-on-surface-variant active:bg-surface-container-low transition-all">
<span class="material-symbols-outlined">reorder</span>
<span class="font-label-xs text-label-xs mt-1">QUEUE</span>
</button>
<button class="flex flex-col items-center justify-center text-on-surface-variant active:bg-surface-container-low transition-all">
<span class="material-symbols-outlined">history_edu</span>
<span class="font-label-xs text-label-xs mt-1">LOGS</span>
</button>
<button class="flex flex-col items-center justify-center text-on-surface-variant active:bg-surface-container-low transition-all">
<span class="material-symbols-outlined">query_stats</span>
<span class="font-label-xs text-label-xs mt-1">STATS</span>
</button>
</nav>
<!-- FAB: Process Command -->
<button class="fixed bottom-20 right-md md:bottom-md md:right-md w-14 h-14 bg-primary-container text-on-primary rounded-full shadow-lg flex items-center justify-center glow-cyan active:scale-95 transition-transform">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">bolt</span>
</button>
</body></html>