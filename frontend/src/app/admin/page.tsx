<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>WorkLifeLM | ADMIN_ROOT</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=JetBrains+Mono:wght@400;500;700&amp;family=Geist:wght@400;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "surface-variant": "#26364a",
                      "on-surface-variant": "#bac9cc",
                      "primary-fixed-dim": "#00daf3",
                      "surface": "#031427",
                      "secondary-container": "#3f465c",
                      "secondary-fixed": "#dae2fd",
                      "on-secondary-fixed-variant": "#3f465c",
                      "background": "#031427",
                      "on-tertiary-container": "#4f5a6e",
                      "tertiary-container": "#c6d1e9",
                      "surface-container-high": "#1b2b3f",
                      "on-primary-container": "#00626e",
                      "secondary": "#bec6e0",
                      "surface-bright": "#2a3a4f",
                      "on-tertiary": "#263143",
                      "on-primary-fixed": "#001f24",
                      "surface-container": "#102034",
                      "on-error": "#690005",
                      "inverse-on-surface": "#213145",
                      "outline-variant": "#3b494c",
                      "surface-container-low": "#0b1c30",
                      "on-tertiary-fixed": "#111c2d",
                      "on-surface": "#d3e4fe",
                      "error-container": "#93000a",
                      "inverse-primary": "#006875",
                      "surface-tint": "#00daf3",
                      "tertiary": "#e6edff",
                      "primary-fixed": "#9cf0ff",
                      "on-primary": "#00363d",
                      "error": "#ffb4ab",
                      "on-primary-fixed-variant": "#004f58",
                      "on-secondary": "#283044",
                      "primary-container": "#00e5ff",
                      "outline": "#849396",
                      "inverse-surface": "#d3e4fe",
                      "on-background": "#d3e4fe",
                      "primary": "#c3f5ff",
                      "surface-container-lowest": "#000f21",
                      "surface-container-highest": "#26364a",
                      "surface-dim": "#031427",
                      "on-error-container": "#ffdad6",
                      "secondary-fixed-dim": "#bec6e0",
                      "tertiary-fixed-dim": "#bcc7de",
                      "on-tertiary-fixed-variant": "#3c475a",
                      "tertiary-fixed": "#d8e3fb",
                      "on-secondary-fixed": "#131b2e",
                      "on-secondary-container": "#adb4ce"
              },
              "borderRadius": {
                      "DEFAULT": "0.125rem",
                      "lg": "0.25rem",
                      "xl": "0.5rem",
                      "full": "0.75rem"
              },
              "spacing": {
                      "container-padding": "12px",
                      "unit": "4px",
                      "panel-gap": "1px",
                      "lg": "24px",
                      "sm": "8px",
                      "xs": "4px",
                      "md": "16px"
              },
              "fontFamily": {
                      "body-sm": ["Inter"],
                      "headline-md": ["Geist"],
                      "code-sm": ["JetBrains Mono"],
                      "display-lg": ["Geist"],
                      "label-xs": ["JetBrains Mono"]
              },
              "fontSize": {
                      "body-sm": ["14px", {"lineHeight": "1.5", "letterSpacing": "0em", "fontWeight": "400"}],
                      "headline-md": ["20px", {"lineHeight": "1.4", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                      "code-sm": ["13px", {"lineHeight": "1.6", "letterSpacing": "0em", "fontWeight": "400"}],
                      "display-lg": ["32px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "600"}],
                      "label-xs": ["11px", {"lineHeight": "1", "letterSpacing": "0.05em", "fontWeight": "500"}]
              }
            },
          },
        }
    </script>
<style>
        body {
            background-color: #031427;
            color: #d3e4fe;
            -webkit-font-smoothing: antialiased;
        }
        .panel-border {
            border: 1px solid #1E293B;
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: #0b1c30;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #26364a;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #3b494c;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="font-body-sm text-body-sm min-h-screen flex flex-col">
<!-- TopAppBar -->
<header class="flex justify-between items-center w-full px-container-padding h-12 bg-surface-container dark:bg-surface-container border-b border-outline-variant fixed top-0 z-50">
<div class="flex items-center gap-sm">
<span class="material-symbols-outlined text-primary-fixed-dim" data-icon="terminal">terminal</span>
<span class="font-code-sm text-code-sm font-bold tracking-tighter text-primary-fixed-dim">AI OS / ROOT</span>
</div>
<div class="flex items-center gap-md">
<div class="hidden md:flex gap-md">
<button class="text-primary-fixed-dim font-bold font-label-xs text-label-xs hover:bg-surface-bright transition-colors duration-150 px-2 py-1">Users</button>
<button class="text-on-surface-variant font-label-xs text-label-xs hover:bg-surface-bright transition-colors duration-150 px-2 py-1">Health</button>
<button class="text-on-surface-variant font-label-xs text-label-xs hover:bg-surface-bright transition-colors duration-150 px-2 py-1">Security</button>
</div>
<button class="cursor-pointer active:opacity-80 bg-surface-bright px-3 py-1 rounded-sm border border-outline-variant font-label-xs text-label-xs text-primary-fixed-dim">ADMIN</button>
</div>
</header>
<main class="mt-12 mb-16 md:mb-0 p-xs flex-1 grid grid-cols-1 md:grid-cols-12 gap-panel-gap bg-outline-variant">
<!-- Left Sidebar: System Health -->
<section class="md:col-span-4 bg-surface-container-low p-md flex flex-col gap-md min-h-[400px]">
<div class="flex items-center justify-between border-b border-outline-variant pb-xs">
<h2 class="font-label-xs text-label-xs uppercase tracking-widest text-on-surface-variant">Global System Health</h2>
<span class="material-symbols-outlined text-primary-fixed-dim text-sm" data-icon="monitor_heart">monitor_heart</span>
</div>
<div class="flex-1 bg-surface-container-lowest panel-border p-sm font-code-sm text-code-sm overflow-hidden flex flex-col">
<div class="flex flex-col gap-xs custom-scrollbar overflow-y-auto">
<p class="text-on-surface-variant opacity-50">[08:44:21] <span class="text-primary-fixed-dim">KERNEL: INITIALIZING...</span></p>
<p class="text-on-surface-variant opacity-50">[08:44:22] <span class="text-primary-fixed-dim">SWARM_CORE: NODES_ONLINE(128)</span></p>
<p class="text-on-surface-variant opacity-50">[08:44:22] <span class="text-primary-fixed-dim">SWARM_04 ACTIVE</span></p>
<p class="text-on-surface-variant opacity-50">[08:44:23] <span class="text-primary-fixed-dim">CHROMADB LATENCY: 12ms</span></p>
<p class="text-on-surface-variant opacity-50">[08:44:25] <span class="text-primary-fixed-dim">API STATUS: OK</span></p>
<p class="text-on-surface-variant opacity-50">[08:44:28] <span class="text-on-tertiary-container">LOG: SYNCING PERSISTENT VOLUMES</span></p>
<p class="text-on-surface-variant opacity-50">[08:44:30] <span class="text-primary-fixed-dim">VECTOR_STORE: INDEX_READY</span></p>
<p class="text-on-surface-variant opacity-50">[08:44:32] <span class="text-on-tertiary-container">LOG: INFERENCE_PIPELINE START</span></p>
<div class="flex gap-xs items-center text-primary-fixed-dim animate-pulse">
<span>_</span>
<span class="text-[10px]">LISTENING FOR EVENTS</span>
</div>
</div>
</div>
<div class="grid grid-cols-2 gap-sm mt-auto">
<div class="bg-surface-container p-sm border border-outline-variant flex flex-col gap-xs">
<span class="font-label-xs text-label-xs text-on-surface-variant">CPU LOAD</span>
<div class="h-1 w-full bg-surface-variant">
<div class="h-full bg-primary-fixed-dim w-1/3"></div>
</div>
<span class="font-code-sm text-code-sm text-primary-fixed-dim">34.2%</span>
</div>
<div class="bg-surface-container p-sm border border-outline-variant flex flex-col gap-xs">
<span class="font-label-xs text-label-xs text-on-surface-variant">MEM USE</span>
<div class="h-1 w-full bg-surface-variant">
<div class="h-full bg-primary-fixed-dim w-3/4"></div>
</div>
<span class="font-code-sm text-code-sm text-primary-fixed-dim">12.4 GB</span>
</div>
</div>
</section>
<!-- Center: User Management -->
<section class="md:col-span-5 bg-surface-container-low p-md flex flex-col gap-md">
<div class="flex items-center justify-between border-b border-outline-variant pb-xs">
<h2 class="font-label-xs text-label-xs uppercase tracking-widest text-on-surface-variant">User Management</h2>
<div class="flex gap-sm">
<span class="material-symbols-outlined text-on-surface-variant text-sm cursor-pointer" data-icon="search">search</span>
<span class="material-symbols-outlined text-on-surface-variant text-sm cursor-pointer" data-icon="filter_list">filter_list</span>
</div>
</div>
<div class="flex-1 overflow-x-auto">
<table class="w-full text-left font-code-sm border-collapse">
<thead>
<tr class="border-b border-outline-variant bg-surface-container">
<th class="p-sm text-label-xs text-on-surface-variant font-medium">UID</th>
<th class="p-sm text-label-xs text-on-surface-variant font-medium">USER_IDENTITY</th>
<th class="p-sm text-label-xs text-on-surface-variant font-medium">TIER</th>
<th class="p-sm text-label-xs text-on-surface-variant font-medium text-right">ROOT_ACCESS</th>
</tr>
</thead>
<tbody class="divide-y divide-outline-variant/30">
<tr class="hover:bg-surface-bright transition-colors">
<td class="p-sm text-on-tertiary-container">001</td>
<td class="p-sm font-medium">alex_dev.sh</td>
<td class="p-sm">
<span class="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full text-[10px]">ENTERPRISE</span>
</td>
<td class="p-sm text-right">
<div class="inline-flex items-center cursor-pointer">
<div class="w-8 h-4 bg-primary-container rounded-full relative">
<div class="absolute right-0.5 top-0.5 w-3 h-3 bg-on-primary-container rounded-full"></div>
</div>
</div>
</td>
</tr>
<tr class="hover:bg-surface-bright transition-colors">
<td class="p-sm text-on-tertiary-container">004</td>
<td class="p-sm font-medium">j.miller_root</td>
<td class="p-sm">
<span class="bg-surface-container-highest text-primary-fixed-dim px-2 py-0.5 rounded-full text-[10px]">PRO</span>
</td>
<td class="p-sm text-right">
<div class="inline-flex items-center cursor-pointer">
<div class="w-8 h-4 bg-outline-variant rounded-full relative">
<div class="absolute left-0.5 top-0.5 w-3 h-3 bg-on-surface-variant rounded-full"></div>
</div>
</div>
</td>
</tr>
<tr class="hover:bg-surface-bright transition-colors">
<td class="p-sm text-on-tertiary-container">012</td>
<td class="p-sm font-medium">guest_9921</td>
<td class="p-sm">
<span class="border border-outline-variant text-on-surface-variant px-2 py-0.5 rounded-full text-[10px]">FREE</span>
</td>
<td class="p-sm text-right">
<div class="inline-flex items-center cursor-pointer">
<div class="w-8 h-4 bg-outline-variant rounded-full relative">
<div class="absolute left-0.5 top-0.5 w-3 h-3 bg-on-surface-variant rounded-full"></div>
</div>
</div>
</td>
</tr>
<tr class="hover:bg-surface-bright transition-colors">
<td class="p-sm text-on-tertiary-container">023</td>
<td class="p-sm font-medium">neural_link_bot</td>
<td class="p-sm">
<span class="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full text-[10px]">ENTERPRISE</span>
</td>
<td class="p-sm text-right">
<div class="inline-flex items-center cursor-pointer">
<div class="w-8 h-4 bg-primary-container rounded-full relative">
<div class="absolute right-0.5 top-0.5 w-3 h-3 bg-on-primary-container rounded-full"></div>
</div>
</div>
</td>
</tr>
</tbody>
</table>
</div>
<div class="mt-auto pt-sm flex justify-center">
<img class="w-full h-10 object-cover opacity-60" data-alt="A futuristic data visualization widget showing a series of glowing cyan line graphs representing system activity and user growth. The background is a deep navy blue with subtle grid line overlays, giving it a technical architectural aesthetic. The UI design is minimalist and ultra-sharp." src="https://lh3.googleusercontent.com/aida-public/AB6AXuANN-GR-tC2D7lfIVm3DeogpEOhMkrX_l0FDdJXt5vA6inAjXKFOl6V22ZN2E6q7MuPGWszaFoVtk20SGFnO_vmkXUtZC5kGnIh_XytMmIDRWwZX9YxPjddalzANAPmx0CMvQdCsv3apmqTwZ27SgNzVkPrD-qshZTn90p4VWa_kVUDRxzBMtNbPmBXCGKzWyIxPOZhUx2bYnhPPCyT3KaWgsTeH3qVekM7dCzh5kyJHF5unMCnwnGXpbrtujewC0tP5M7GV6729UM"/>
</div>
</section>
<!-- Right Sidebar: Security & Overrides -->
<section class="md:col-span-3 bg-surface-container-low p-md flex flex-col gap-lg">
<!-- Secret Management -->
<div class="flex flex-col gap-md">
<div class="flex items-center justify-between border-b border-outline-variant pb-xs">
<h2 class="font-label-xs text-label-xs uppercase tracking-widest text-on-surface-variant">Secret Management</h2>
<span class="material-symbols-outlined text-on-surface-variant text-sm" data-icon="lock_person">lock_person</span>
</div>
<div class="flex flex-col gap-sm">
<div class="bg-surface-container p-sm border border-outline-variant flex flex-col gap-xs group">
<div class="flex justify-between items-center">
<span class="font-code-sm text-code-sm text-primary-fixed-dim">LLAMA_3_KEY</span>
<span class="text-[10px] text-on-tertiary-container">LAST_USE: 2m ago</span>
</div>
<div class="flex gap-sm items-center">
<input class="flex-1 bg-surface-container-lowest border-none font-code-sm text-code-sm p-0 focus:ring-0 text-on-surface-variant opacity-40" readonly="" type="password" value="sk-llama-v3-8b-hq-admin-991"/>
<div class="flex gap-xs">
<span class="material-symbols-outlined text-sm text-on-surface-variant cursor-pointer hover:text-primary-fixed-dim" data-icon="visibility">visibility</span>
<span class="material-symbols-outlined text-sm text-on-surface-variant cursor-pointer hover:text-primary-fixed-dim" data-icon="refresh">refresh</span>
</div>
</div>
</div>
<div class="bg-surface-container p-sm border border-outline-variant flex flex-col gap-xs group">
<div class="flex justify-between items-center">
<span class="font-code-sm text-code-sm text-primary-fixed-dim">GROQ_ENGINE</span>
<span class="text-[10px] text-on-tertiary-container">LAST_USE: 14h ago</span>
</div>
<div class="flex gap-sm items-center">
<input class="flex-1 bg-surface-container-lowest border-none font-code-sm text-code-sm p-0 focus:ring-0 text-on-surface-variant opacity-40" readonly="" type="password" value="gq-772-prod-secure-token"/>
<div class="flex gap-xs">
<span class="material-symbols-outlined text-sm text-on-surface-variant cursor-pointer hover:text-primary-fixed-dim" data-icon="visibility">visibility</span>
<span class="material-symbols-outlined text-sm text-on-surface-variant cursor-pointer hover:text-primary-fixed-dim" data-icon="refresh">refresh</span>
</div>
</div>
</div>
<div class="bg-surface-container p-sm border border-outline-variant flex flex-col gap-xs group">
<div class="flex justify-between items-center">
<span class="font-code-sm text-code-sm text-primary-fixed-dim">BRAVE_SEARCH</span>
<span class="text-[10px] text-on-tertiary-container">LAST_USE: 1m ago</span>
</div>
<div class="flex gap-sm items-center">
<input class="flex-1 bg-surface-container-lowest border-none font-code-sm text-code-sm p-0 focus:ring-0 text-on-surface-variant opacity-40" readonly="" type="password" value="bs-9912-premium-api-cluster"/>
<div class="flex gap-xs">
<span class="material-symbols-outlined text-sm text-on-surface-variant cursor-pointer hover:text-primary-fixed-dim" data-icon="visibility">visibility</span>
<span class="material-symbols-outlined text-sm text-on-surface-variant cursor-pointer hover:text-primary-fixed-dim" data-icon="refresh">refresh</span>
</div>
</div>
</div>
</div>
</div>
<!-- Manual Overrides -->
<div class="flex flex-col gap-md mt-auto">
<div class="flex items-center justify-between border-b border-outline-variant pb-xs">
<h2 class="font-label-xs text-label-xs uppercase tracking-widest text-error">Critical Overrides</h2>
<span class="material-symbols-outlined text-error text-sm" data-icon="warning">warning</span>
</div>
<div class="flex flex-col gap-sm">
<button class="w-full bg-surface-container border border-outline-variant py-3 font-code-sm text-code-sm text-on-surface hover:bg-surface-bright active:opacity-80 transition-all">
                        FLUSH_CHROMA_MEMORY
                    </button>
<button class="w-full bg-error-container/20 border border-error text-error py-3 font-code-sm text-code-sm hover:bg-error hover:text-on-error active:opacity-80 transition-all flex flex-col items-center gap-1">
<span>TERMINATE_ALL_SWARMS</span>
<span class="text-[9px] opacity-70">CONFIRMATION_REQUIRED_ON_CLICK</span>
</button>
</div>
</div>
</section>
</main>
<!-- BottomNavBar (Mobile Only) -->
<nav class="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 bg-surface-container-low border-t border-outline-variant">
<div class="flex flex-col items-center justify-center text-primary-fixed-dim bg-secondary-container rounded-xl px-4 py-1 scale-95 active:scale-90 transition-transform cursor-pointer">
<span class="material-symbols-outlined" data-icon="group">group</span>
<span class="font-label-xs text-label-xs">Users</span>
</div>
<div class="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 scale-95 active:scale-90 transition-transform cursor-pointer hover:text-primary transition-all">
<span class="material-symbols-outlined" data-icon="monitor_heart">monitor_heart</span>
<span class="font-label-xs text-label-xs">Health</span>
</div>
<div class="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 scale-95 active:scale-90 transition-transform cursor-pointer hover:text-primary transition-all">
<span class="material-symbols-outlined" data-icon="lock_person">lock_person</span>
<span class="font-label-xs text-label-xs">Security</span>
</div>
</nav>
</body></html>