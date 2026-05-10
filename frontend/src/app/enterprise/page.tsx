<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>WorkLifeLM Enterprise Dashboard</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=JetBrains+Mono:wght@400;500;700&amp;family=Geist:wght@400;600;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "tertiary-container": "#c6d1e9",
                      "surface-container-high": "#1b2b3f",
                      "tertiary-fixed-dim": "#bcc7de",
                      "tertiary-fixed": "#d8e3fb",
                      "primary": "#c3f5ff",
                      "error": "#ffb4ab",
                      "surface-tint": "#00daf3",
                      "on-surface-variant": "#bac9cc",
                      "on-primary": "#00363d",
                      "on-tertiary-container": "#4f5a6e",
                      "on-surface": "#d3e4fe",
                      "primary-fixed-dim": "#00daf3",
                      "inverse-primary": "#006875",
                      "on-tertiary": "#263143",
                      "on-primary-fixed-variant": "#004f58",
                      "surface": "#031427",
                      "secondary-fixed-dim": "#bec6e0",
                      "tertiary": "#e6edff",
                      "surface-container-highest": "#26364a",
                      "surface-container": "#102034",
                      "secondary": "#bec6e0",
                      "on-tertiary-fixed-variant": "#3c475a",
                      "on-primary-fixed": "#001f24",
                      "on-secondary-container": "#adb4ce",
                      "surface-dim": "#031427",
                      "on-error-container": "#ffdad6",
                      "error-container": "#93000a",
                      "background": "#031427",
                      "outline": "#849396",
                      "secondary-container": "#3f465c",
                      "outline-variant": "#3b494c",
                      "on-error": "#690005",
                      "primary-container": "#00e5ff",
                      "surface-container-lowest": "#000f21",
                      "on-tertiary-fixed": "#111c2d",
                      "surface-variant": "#26364a",
                      "surface-bright": "#2a3a4f",
                      "on-background": "#d3e4fe",
                      "on-secondary-fixed-variant": "#3f465c",
                      "surface-container-low": "#0b1c30",
                      "on-secondary": "#283044",
                      "on-primary-container": "#00626e",
                      "primary-fixed": "#9cf0ff",
                      "inverse-on-surface": "#213145",
                      "on-secondary-fixed": "#131b2e",
                      "inverse-surface": "#d3e4fe",
                      "secondary-fixed": "#dae2fd"
              },
              "borderRadius": {
                      "DEFAULT": "0.125rem",
                      "lg": "0.25rem",
                      "xl": "0.5rem",
                      "full": "0.75rem"
              },
              "spacing": {
                      "sm": "8px",
                      "container-padding": "12px",
                      "xs": "4px",
                      "md": "16px",
                      "lg": "24px",
                      "unit": "4px",
                      "panel-gap": "1px"
              },
              "fontFamily": {
                      "display-lg": ["Geist"],
                      "body-sm": ["Inter"],
                      "label-xs": ["JetBrains Mono"],
                      "headline-md": ["Geist"],
                      "code-sm": ["JetBrains Mono"]
              },
              "fontSize": {
                      "display-lg": ["32px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "600"}],
                      "body-sm": ["14px", {"lineHeight": "1.5", "letterSpacing": "0em", "fontWeight": "400"}],
                      "label-xs": ["11px", {"lineHeight": "1", "letterSpacing": "0.05em", "fontWeight": "500"}],
                      "headline-md": ["20px", {"lineHeight": "1.4", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                      "code-sm": ["13px", {"lineHeight": "1.6", "letterSpacing": "0em", "fontWeight": "400"}]
              }
            },
          },
        }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            vertical-align: middle;
        }
        .technical-grid-bg {
            background-image: radial-gradient(#1e293b 1px, transparent 1px);
            background-size: 20px 20px;
        }
        .scan-line {
            background: linear-gradient(to bottom, transparent, rgba(0, 229, 255, 0.05), transparent);
            height: 100px;
            width: 100%;
            position: absolute;
            top: -100px;
            animation: scan 8s linear infinite;
        }
        @keyframes scan {
            0% { top: -100px; }
            100% { top: 100%; }
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-background font-body-sm selection:bg-primary selection:text-on-primary">
<!-- TopAppBar -->
<header class="flex justify-between items-center w-full px-md h-12 z-50 bg-surface border-b border-outline-variant fixed top-0 left-0">
<div class="flex items-center gap-sm cursor-pointer active:opacity-80">
<span class="material-symbols-outlined text-primary text-headline-md" data-icon="terminal">terminal</span>
<h1 class="font-display-lg text-headline-md tracking-tighter text-primary">WorkLifeLM</h1>
</div>
<div class="flex items-center gap-md">
<div class="hidden md:flex gap-md font-label-xs text-label-xs">
<span class="text-primary font-bold transition-colors cursor-pointer">Workspace</span>
<span class="text-on-surface-variant hover:bg-surface-container-highest transition-colors cursor-pointer">Intelligence</span>
<span class="text-on-surface-variant hover:bg-surface-container-highest transition-colors cursor-pointer">Nodes</span>
<span class="text-on-surface-variant hover:bg-surface-container-highest transition-colors cursor-pointer">Settings</span>
</div>
<div class="flex items-center bg-surface-container-high px-sm py-1 border border-outline-variant gap-xs cursor-pointer hover:bg-surface-container-highest">
<span class="material-symbols-outlined text-xs text-primary" data-icon="dns">dns</span>
<span class="font-label-xs text-label-xs text-on-surface uppercase tracking-widest">TENANT_PROD_01</span>
<span class="material-symbols-outlined text-xs text-on-surface-variant" data-icon="expand_more">expand_more</span>
</div>
</div>
</header>
<main class="pt-12 pb-16 md:pb-0 min-h-screen technical-grid-bg relative overflow-hidden">
<div class="scan-line"></div>
<!-- Multi-Tenant Tab Bar (Contextual) -->
<div class="bg-surface-container border-b border-outline-variant px-md py-xs flex gap-md overflow-x-auto">
<button class="flex items-center gap-xs px-sm py-1 border-b-2 border-primary text-primary font-label-xs">
<span class="material-symbols-outlined text-sm" data-icon="hub">hub</span>
                TENANT_PROD_01
            </button>
<button class="flex items-center gap-xs px-sm py-1 border-b-2 border-transparent text-on-surface-variant hover:text-on-surface transition-colors font-label-xs">
<span class="material-symbols-outlined text-sm" data-icon="layers">layers</span>
                TENANT_STAGING
            </button>
<button class="flex items-center gap-xs px-sm py-1 border-b-2 border-transparent text-on-surface-variant hover:text-on-surface transition-colors font-label-xs">
<span class="material-symbols-outlined text-sm" data-icon="public">public</span>
                REGIONAL_OFFICE_EU
            </button>
</div>
<div class="p-md space-y-md max-w-7xl mx-auto">
<!-- Section 1: Usage Metrics Grid -->
<section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-sm">
<!-- Card 1 -->
<div class="bg-surface-container border border-outline-variant p-sm flex flex-col gap-xs hover:border-primary/50 transition-all group">
<div class="flex justify-between items-center">
<span class="font-label-xs text-on-surface-variant uppercase tracking-tighter">Token Usage</span>
<span class="material-symbols-outlined text-primary text-sm" data-icon="bolt">bolt</span>
</div>
<div class="flex flex-col gap-xs">
<div class="flex justify-between items-baseline">
<span class="font-code-sm text-on-surface text-lg font-bold">1.2B <span class="text-xs text-on-surface-variant font-normal">/ 2B</span></span>
<span class="font-label-xs text-primary">60%</span>
</div>
<div class="h-1 bg-surface-container-highest w-full overflow-hidden">
<div class="h-full bg-primary" style="width: 60%"></div>
</div>
</div>
</div>
<!-- Card 2 -->
<div class="bg-surface-container border border-outline-variant p-sm flex flex-col gap-xs hover:border-primary/50 transition-all group">
<div class="flex justify-between items-center">
<span class="font-label-xs text-on-surface-variant uppercase tracking-tighter">Swarm Jobs</span>
<span class="material-symbols-outlined text-primary text-sm" data-icon="psychology">psychology</span>
</div>
<div class="flex flex-col gap-xs">
<div class="flex justify-between items-baseline">
<span class="font-code-sm text-on-surface text-lg font-bold">14,204</span>
<span class="font-label-xs text-primary">+12%</span>
</div>
<div class="flex gap-px items-end h-4">
<div class="w-1 bg-primary/20 h-[30%]"></div>
<div class="w-1 bg-primary/30 h-[45%]"></div>
<div class="w-1 bg-primary/40 h-[60%]"></div>
<div class="w-1 bg-primary/60 h-[80%]"></div>
<div class="w-1 bg-primary/80 h-[70%]"></div>
<div class="w-1 bg-primary h-full"></div>
</div>
</div>
</div>
<!-- Card 3 -->
<div class="bg-surface-container border border-outline-variant p-sm flex flex-col gap-xs hover:border-primary/50 transition-all group">
<div class="flex justify-between items-center">
<span class="font-label-xs text-on-surface-variant uppercase tracking-tighter">Active Seats</span>
<span class="material-symbols-outlined text-primary text-sm" data-icon="group">group</span>
</div>
<div class="flex flex-col gap-xs">
<div class="flex justify-between items-baseline">
<span class="font-code-sm text-on-surface text-lg font-bold">842 <span class="text-xs text-on-surface-variant font-normal">/ 1000</span></span>
<span class="font-label-xs text-primary">84%</span>
</div>
<div class="h-1 bg-surface-container-highest w-full overflow-hidden">
<div class="h-full bg-primary" style="width: 84%"></div>
</div>
</div>
</div>
<!-- Card 4 -->
<div class="bg-surface-container border border-outline-variant p-sm flex flex-col gap-xs hover:border-primary/50 transition-all group">
<div class="flex justify-between items-center">
<span class="font-label-xs text-on-surface-variant uppercase tracking-tighter">API Latency</span>
<span class="material-symbols-outlined text-primary text-sm" data-icon="speed">speed</span>
</div>
<div class="flex flex-col gap-xs">
<div class="flex justify-between items-baseline">
<span class="font-code-sm text-on-surface text-lg font-bold">24ms</span>
<span class="font-label-xs text-primary">OPTIMAL</span>
</div>
<div class="flex items-center gap-xs">
<div class="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
<span class="font-label-xs text-on-surface-variant">Global Mesh Status: Healthy</span>
</div>
</div>
</div>
</section>
<!-- Section 2 & 3: Two Column Layout -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-md">
<!-- Team Management Panel (2 cols) -->
<section class="lg:col-span-2 bg-surface-container border border-outline-variant">
<div class="flex items-center justify-between p-sm border-b border-outline-variant bg-surface-container-high">
<div class="flex items-center gap-xs">
<span class="material-symbols-outlined text-primary text-sm" data-icon="manage_accounts">manage_accounts</span>
<h2 class="font-label-xs text-on-surface uppercase tracking-widest">Team Management</h2>
</div>
<button class="font-label-xs text-primary border border-primary px-sm py-0.5 hover:bg-primary hover:text-on-primary transition-all">INVITE_MEMBER</button>
</div>
<div class="divide-y divide-outline-variant">
<!-- Row Sarah -->
<div class="p-sm flex items-center justify-between hover:bg-surface-container-highest transition-colors">
<div class="flex items-center gap-md">
<div class="w-8 h-8 bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs">SJ</div>
<div>
<p class="font-label-xs text-on-surface">Admin - Sarah J.</p>
<p class="font-code-sm text-[10px] text-on-surface-variant">sarah.j@enterprise.ai</p>
</div>
</div>
<div class="flex items-center gap-lg">
<div class="hidden sm:flex flex-col items-end">
<span class="font-label-xs text-[9px] text-on-surface-variant uppercase">30D Usage</span>
<span class="font-code-sm text-primary">45.2M tokens</span>
</div>
<span class="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary" data-icon="more_vert">more_vert</span>
</div>
</div>
<!-- Row Mark -->
<div class="p-sm flex items-center justify-between hover:bg-surface-container-highest transition-colors">
<div class="flex items-center gap-md">
<div class="w-8 h-8 bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs">MK</div>
<div>
<p class="font-label-xs text-on-surface">Editor - Mark K.</p>
<p class="font-code-sm text-[10px] text-on-surface-variant">m.koenig@enterprise.ai</p>
</div>
</div>
<div class="flex items-center gap-lg">
<div class="hidden sm:flex flex-col items-end">
<span class="font-label-xs text-[9px] text-on-surface-variant uppercase">30D Usage</span>
<span class="font-code-sm text-primary">12.8M tokens</span>
</div>
<span class="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary" data-icon="more_vert">more_vert</span>
</div>
</div>
<!-- Row Alex -->
<div class="p-sm flex items-center justify-between hover:bg-surface-container-highest transition-colors">
<div class="flex items-center gap-md">
<div class="w-8 h-8 bg-tertiary-container text-on-tertiary-container flex items-center justify-center font-bold text-xs">AL</div>
<div>
<p class="font-label-xs text-on-surface">Viewer - Alex L.</p>
<p class="font-code-sm text-[10px] text-on-surface-variant">alex.l@enterprise.ai</p>
</div>
</div>
<div class="flex items-center gap-lg">
<div class="hidden sm:flex flex-col items-end">
<span class="font-label-xs text-[9px] text-on-surface-variant uppercase">30D Usage</span>
<span class="font-code-sm text-primary">0.4M tokens</span>
</div>
<span class="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary" data-icon="more_vert">more_vert</span>
</div>
</div>
</div>
</section>
<!-- API Access Control Panel (1 col) -->
<section class="bg-surface-container border border-outline-variant flex flex-col">
<div class="p-sm border-b border-outline-variant bg-surface-container-high flex items-center gap-xs">
<span class="material-symbols-outlined text-primary text-sm" data-icon="security">security</span>
<h2 class="font-label-xs text-on-surface uppercase tracking-widest">API Control</h2>
</div>
<div class="p-md flex-1 flex flex-col gap-md bg-surface-container-lowest">
<div class="space-y-xs">
<label class="font-label-xs text-on-surface-variant uppercase text-[10px]">ORG_API_KEY</label>
<div class="flex gap-panel-gap">
<div class="flex-1 bg-surface-container px-sm py-1 font-code-sm text-primary border border-outline-variant/30 flex items-center justify-between">
<span>wl_live_•••••••••••••••••••••</span>
<span class="material-symbols-outlined text-sm cursor-pointer" data-icon="content_copy">content_copy</span>
</div>
<button class="bg-error-container text-on-error-container px-sm flex items-center justify-center hover:bg-error transition-colors" title="Rotate Key">
<span class="material-symbols-outlined text-sm" data-icon="refresh">refresh</span>
</button>
</div>
</div>
<div class="space-y-xs">
<label class="font-label-xs text-on-surface-variant uppercase text-[10px]">Environment Runtime</label>
<div class="bg-surface-container border border-outline-variant/30 p-sm font-code-sm">
<p class="text-primary"><span class="text-on-surface-variant">NODE_ENV:</span> PROD</p>
<p class="text-primary"><span class="text-on-surface-variant">REGION:</span> us-east-1</p>
<p class="text-primary"><span class="text-on-surface-variant">SCALING:</span> AUTO_MESH_L4</p>
</div>
</div>
<div class="mt-auto pt-md">
<div class="border border-outline-variant border-dashed p-sm">
<p class="font-label-xs text-[9px] text-on-surface-variant leading-relaxed">
<span class="text-primary font-bold">WARNING:</span> Key rotation will invalidate all active sessions across the global node network. Latency may spike during re-sync.
                                </p>
</div>
</div>
</div>
</section>
</div>
<!-- Bento Visualizer / Nodes Status -->
<section class="grid grid-cols-1 md:grid-cols-4 gap-sm">
<div class="md:col-span-3 bg-surface-container border border-outline-variant h-64 relative overflow-hidden group">
<div class="absolute inset-0 z-0">
<img alt="Global Network Visualization" class="w-full h-full object-cover opacity-20 grayscale group-hover:scale-105 transition-transform duration-1000" data-alt="A highly complex digital visualization of a global neural network mesh with interconnecting nodes and glowing data pathways in shades of electric cyan and deep blue. The visual style is technical and cinematic, suggesting a high-performance cloud infrastructure under heavy load. The lighting is low-key with sharp, luminous accents that emphasize a sense of immense scale and technological sophistication in a dark-mode environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjLjRSBpP5j-CYKMDT1dFQwieAE6GJwcrCM70H4gXQAWCTYw4C3sNddflxczIvJxzZDoso0gFqgXqh79XJQvkZB4iVEZ1OiGQkOIHzQ_kSMn2am7jS2FYMiN0DVe6Gy66reSYjpD2XgemUkgKmuYQXeNEwxH82zB9jXW7fvM2YCy05f411EExYMFH_Nh7GuK74x5GcnBDsBwzBJd3arL473NAC5IUuHY_levq5IpAwsigbFJS-SjKcMqH-IWcdterPhDWpg1Iy9tk"/>
</div>
<div class="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent"></div>
<div class="absolute top-sm left-sm z-10 flex items-center gap-xs">
<div class="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
<span class="font-label-xs text-primary uppercase tracking-widest">Real-time Node Mesh</span>
</div>
<div class="absolute bottom-sm right-sm z-10 font-code-sm text-on-surface-variant text-[10px]">
                        LAT_GRID: 40.7128° N, 74.0060° W
                    </div>
</div>
<div class="bg-primary-container p-sm flex flex-col justify-between">
<div class="space-y-xs">
<h3 class="font-headline-md text-on-primary-container leading-tight">Pro-Grade AI OS</h3>
<p class="font-label-xs text-on-primary-container opacity-70">Running Kernel v4.8.2-delta</p>
</div>
<div class="text-on-primary-container">
<span class="font-code-sm text-3xl font-bold">0.00ms</span>
<p class="font-label-xs uppercase">Jitter Variance</p>
</div>
</div>
</section>
</div>
</main>
<!-- BottomNavBar (Mobile Only) -->
<nav class="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center h-16 px-container-padding bg-surface-container border-t border-outline-variant z-50">
<div class="flex flex-col items-center justify-center text-primary border-t-2 border-primary pt-1 cursor-pointer">
<span class="material-symbols-outlined" data-icon="grid_view">grid_view</span>
<span class="font-label-xs text-label-xs">Workspace</span>
</div>
<div class="flex flex-col items-center justify-center text-on-surface-variant pt-1 hover:text-on-surface transition-colors cursor-pointer">
<span class="material-symbols-outlined" data-icon="psychology">psychology</span>
<span class="font-label-xs text-label-xs">Intelligence</span>
</div>
<div class="flex flex-col items-center justify-center text-on-surface-variant pt-1 hover:text-on-surface transition-colors cursor-pointer">
<span class="material-symbols-outlined" data-icon="hub">hub</span>
<span class="font-label-xs text-label-xs">Nodes</span>
</div>
<div class="flex flex-col items-center justify-center text-on-surface-variant pt-1 hover:text-on-surface transition-colors cursor-pointer">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
<span class="font-label-xs text-label-xs">Settings</span>
</div>
</nav>
<!-- Floating Action Button (Only on Workspace Main) -->
<button class="fixed bottom-20 right-md md:bottom-md md:right-md w-12 h-12 bg-primary text-on-primary flex items-center justify-center shadow-lg active:scale-95 transition-transform z-50">
<span class="material-symbols-outlined" data-icon="terminal">terminal</span>
</button>
</body></html>