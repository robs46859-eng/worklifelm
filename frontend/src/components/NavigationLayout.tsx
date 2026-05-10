<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&amp;family=Inter:wght@400;500&amp;family=Geist:wght@600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "tertiary": "#e6edff",
                    "secondary-container": "#3f465c",
                    "on-primary-fixed-variant": "#004f58",
                    "on-error-container": "#ffdad6",
                    "on-secondary-fixed-variant": "#3f465c",
                    "tertiary-fixed": "#d8e3fb",
                    "on-primary-fixed": "#001f24",
                    "surface": "#031427",
                    "on-secondary-fixed": "#131b2e",
                    "primary-fixed": "#9cf0ff",
                    "surface-tint": "#00daf3",
                    "tertiary-fixed-dim": "#bcc7de",
                    "surface-container-lowest": "#000f21",
                    "inverse-surface": "#d3e4fe",
                    "background": "#031427",
                    "surface-bright": "#2a3a4f",
                    "on-tertiary-fixed": "#111c2d",
                    "on-surface": "#d3e4fe",
                    "on-error": "#690005",
                    "tertiary-container": "#c6d1e9",
                    "surface-container": "#102034",
                    "outline": "#849396",
                    "primary-container": "#00e5ff",
                    "error": "#ffb4ab",
                    "surface-dim": "#031427",
                    "surface-container-low": "#0b1c30",
                    "primary-fixed-dim": "#00daf3",
                    "on-primary": "#00363d",
                    "on-tertiary": "#263143",
                    "on-secondary": "#283044",
                    "surface-container-high": "#1b2b3f",
                    "outline-variant": "#3b494c",
                    "on-primary-container": "#00626e",
                    "primary": "#c3f5ff",
                    "secondary": "#bec6e0",
                    "surface-container-highest": "#26364a",
                    "secondary-fixed-dim": "#bec6e0",
                    "on-surface-variant": "#bac9cc",
                    "inverse-primary": "#006875",
                    "on-tertiary-container": "#4f5a6e",
                    "inverse-on-surface": "#213145",
                    "on-background": "#d3e4fe",
                    "error-container": "#93000a",
                    "surface-variant": "#26364a",
                    "on-secondary-container": "#adb4ce",
                    "on-tertiary-fixed-variant": "#3c475a",
                    "secondary-fixed": "#dae2fd"
            },
            "borderRadius": {
                    "DEFAULT": "0.125rem",
                    "lg": "0.25rem",
                    "xl": "0.5rem",
                    "full": "0.75rem"
            },
            "spacing": {
                    "panel-gap": "1px",
                    "md": "16px",
                    "lg": "24px",
                    "container-padding": "12px",
                    "unit": "4px",
                    "xs": "4px",
                    "sm": "8px"
            },
            "fontFamily": {
                    "code-sm": ["JetBrains Mono"],
                    "headline-md": ["Geist"],
                    "display-lg": ["Geist"],
                    "label-xs": ["JetBrains Mono"],
                    "body-sm": ["Inter"]
            },
            "fontSize": {
                    "code-sm": ["13px", {"lineHeight": "1.6", "letterSpacing": "0em", "fontWeight": "400"}],
                    "headline-md": ["20px", {"lineHeight": "1.4", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                    "display-lg": ["32px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "600"}],
                    "label-xs": ["11px", {"lineHeight": "1", "letterSpacing": "0.05em", "fontWeight": "500"}],
                    "body-sm": ["14px", {"lineHeight": "1.5", "letterSpacing": "0em", "fontWeight": "400"}]
            }
          },
        },
      }
    </script>
<style>
        body {
            background-color: #031427;
            color: #d3e4fe;
            font-family: 'Inter', sans-serif;
            overflow: hidden;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .panel-border {
            border: 1px solid #3b494c;
        }
        .glass-panel {
            background: rgba(16, 32, 52, 0.8);
            backdrop-filter: blur(12px);
        }
        ::-webkit-scrollbar {
            width: 4px;
        }
        ::-webkit-scrollbar-track {
            background: #031427;
        }
        ::-webkit-scrollbar-thumb {
            background: #3b494c;
            border-radius: 2px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #849396;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="h-screen flex flex-col">
<!-- TopAppBar -->
<header class="flex justify-between items-center px-lg h-16 w-full z-40 bg-surface dark:bg-surface border-b border-outline-variant fixed top-0 docked full-width">
<div class="flex items-center gap-sm">
<span class="material-symbols-outlined text-primary" data-icon="terminal">terminal</span>
<h1 class="font-display-lg text-display-lg font-bold text-primary tracking-tighter">WorkLifeLM</h1>
</div>
<div class="flex items-center gap-md">
<div class="flex flex-col items-end hidden md:flex">
<span class="font-code-sm text-code-sm text-primary uppercase tracking-widest">System_Active</span>
<span class="font-label-xs text-label-xs text-on-surface-variant">v2.0.4-stable</span>
</div>
<div class="w-10 h-10 rounded-full border border-primary-container overflow-hidden bg-surface-container-high flex items-center justify-center">
<img alt="User Avatar" class="w-full h-full object-cover" data-alt="A futuristic, high-contrast close-up portrait of a digital entity avatar. The profile is rendered in a sleek, technical style with neon electric cyan highlights tracing the contours of a visor. The background is a dark, deep navy slate with subtle grid patterns. The lighting is cold and clinical, evoking a professional AI operating system environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuChsxrAmNgF5V1u8L4k89hJPL4Y4prwz4sCR38YUQoIgFURh4RAleU_6cBC6BzpJfNPYi6A_bYkeLIbD1YFcWs1L673SRfWtv__P7oYOyxeQTD_JwJiLGUoeDxwG5YIjNCq413lDD8pb3dZHSu2cz-9MT9TjGyKEPXPgVei3z-vZAtMkc_XwFntp_oJsl00ADjLxkM2zZa_Ci-9yQ2G0a-yQfRI5_qGKU8rYICg1UVIP8dMDxpd1OY9kOlUtmGthifs1sfa8novRX8"/>
</div>
</div>
</header>
<div class="flex flex-1 pt-16 h-full overflow-hidden">
<!-- NavigationDrawer -->
<aside class="flex flex-col h-full py-md px-sm bg-surface-container dark:bg-surface-container border-r border-outline-variant docked h-screen left-0 w-64 hidden md:flex">
<div class="mb-lg px-md">
<span class="font-code-sm text-code-sm text-on-surface-variant opacity-50">NODE_IDENTITY</span>
<h2 class="font-display-lg text-display-lg text-primary">SYSTEM_CORE</h2>
</div>
<nav class="flex-1 space-y-xs overflow-y-auto">
<!-- Dashboard (Active) -->
<a class="flex items-center gap-md px-md py-sm cursor-pointer active:scale-98 transition-all text-primary bg-primary-container/10 border-r-2 border-primary font-code-sm text-code-sm" href="#">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span>Dashboard</span>
</a>
<!-- Language Workspace -->
<a class="flex items-center gap-md px-md py-sm cursor-pointer active:scale-98 transition-all text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-code-sm text-code-sm" href="#">
<span class="material-symbols-outlined" data-icon="variable_insert">variable_insert</span>
<span>Language Workspace</span>
</a>
<!-- Contributor Marketplace -->
<a class="flex items-center gap-md px-md py-sm cursor-pointer active:scale-98 transition-all text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-code-sm text-code-sm" href="#">
<span class="material-symbols-outlined" data-icon="storefront">storefront</span>
<span>Contributor Marketplace</span>
</a>
<!-- Swarm Control -->
<a class="flex items-center gap-md px-md py-sm cursor-pointer active:scale-98 transition-all text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-code-sm text-code-sm" href="#">
<span class="material-symbols-outlined" data-icon="hub">hub</span>
<span>Swarm Control</span>
</a>
<!-- Arkham Governance -->
<a class="flex items-center gap-md px-md py-sm cursor-pointer active:scale-98 transition-all text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-code-sm text-code-sm" href="#">
<span class="material-symbols-outlined" data-icon="account_balance">account_balance</span>
<span>Arkham Governance</span>
</a>
<!-- Enterprise Layer -->
<a class="flex items-center gap-md px-md py-sm cursor-pointer active:scale-98 transition-all text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-code-sm text-code-sm" href="#">
<span class="material-symbols-outlined" data-icon="business_center">business_center</span>
<span>Enterprise Layer</span>
</a>
<!-- Admin Dashboard (Conditional) -->
<a class="flex items-center gap-md px-md py-sm cursor-pointer active:scale-98 transition-all text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-code-sm text-code-sm" href="#">
<span class="material-symbols-outlined" data-icon="admin_panel_settings">admin_panel_settings</span>
<span>Admin Dashboard</span>
</a>
<!-- Profile -->
<a class="flex items-center gap-md px-md py-sm cursor-pointer active:scale-98 transition-all text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-code-sm text-code-sm" href="#">
<span class="material-symbols-outlined" data-icon="person">person</span>
<span>Profile</span>
</a>
</nav>
<div class="mt-auto border-t border-outline-variant pt-md px-sm">
<button class="w-full flex items-center justify-center gap-sm px-md py-sm bg-surface-container-high border border-outline-variant text-error font-code-sm text-code-sm hover:bg-error-container/20 transition-colors rounded-lg">
<span class="material-symbols-outlined" data-icon="logout">logout</span>
<span>Sign Out</span>
</button>
</div>
</aside>
<!-- Main Content Area -->
<main class="flex-1 bg-background overflow-y-auto p-lg relative">
<div class="max-w-6xl mx-auto space-y-lg">
<!-- Dashboard Header -->
<div class="flex justify-between items-end pb-md border-b border-outline-variant">
<div>
<p class="font-code-sm text-label-xs text-primary mb-xs uppercase tracking-tighter">Current_Node: Main_Registry</p>
<h2 class="font-display-lg text-display-lg text-on-surface">System Overview</h2>
</div>
<div class="flex gap-sm">
<span class="px-sm py-xs bg-surface-container-highest border border-outline-variant font-code-sm text-label-xs text-on-surface-variant">STATUS: OPTIMAL</span>
<span class="px-sm py-xs bg-surface-container-highest border border-outline-variant font-code-sm text-label-xs text-on-surface-variant">UPTIME: 1,442H</span>
</div>
</div>
<!-- Bento Grid Content -->
<div class="grid grid-cols-12 gap-md">
<!-- Major Status Card -->
<div class="col-span-12 lg:col-span-8 h-80 bg-surface-container rounded-lg border border-outline-variant p-lg relative overflow-hidden group">
<div class="relative z-10">
<h3 class="font-headline-md text-headline-md text-primary mb-md">Active Neural Processing</h3>
<div class="flex gap-lg">
<div>
<p class="text-on-surface-variant font-label-xs uppercase">Compute Load</p>
<p class="text-display-lg font-display-lg text-on-surface">78.2%</p>
</div>
<div>
<p class="text-on-surface-variant font-label-xs uppercase">Active Agents</p>
<p class="text-display-lg font-display-lg text-on-surface">1,024</p>
</div>
</div>
</div>
<!-- Abstract Tech Graphic -->
<div class="absolute right-0 bottom-0 opacity-20 pointer-events-none p-lg">
<span class="material-symbols-outlined text-[120px] text-primary" data-icon="memory">memory</span>
</div>
</div>
<!-- Mini Stats -->
<div class="col-span-12 lg:col-span-4 h-80 grid grid-rows-2 gap-md">
<div class="bg-surface-container rounded-lg border border-outline-variant p-md flex flex-col justify-between">
<div class="flex justify-between items-start">
<span class="material-symbols-outlined text-primary" data-icon="database">database</span>
<span class="font-label-xs text-primary">SYNCED</span>
</div>
<div>
<p class="text-on-surface-variant font-label-xs uppercase">Data Integrity</p>
<p class="text-headline-md font-headline-md text-on-surface">99.999%</p>
</div>
</div>
<div class="bg-surface-container rounded-lg border border-outline-variant p-md flex flex-col justify-between">
<div class="flex justify-between items-start">
<span class="material-symbols-outlined text-primary" data-icon="security">security</span>
<span class="font-label-xs text-primary">SECURE</span>
</div>
<div>
<p class="text-on-surface-variant font-label-xs uppercase">Protocol Layer</p>
<p class="text-headline-md font-headline-md text-on-surface">V-Kernel-X</p>
</div>
</div>
</div>
<!-- Market Feed -->
<div class="col-span-12 lg:col-span-4 h-96 bg-surface-container-low rounded-lg border border-outline-variant overflow-hidden flex flex-col">
<div class="p-md border-b border-outline-variant bg-surface-container flex justify-between items-center">
<h3 class="font-code-sm text-code-sm font-bold uppercase text-on-surface">Contributor_Feed</h3>
<span class="material-symbols-outlined text-on-surface-variant text-sm" data-icon="refresh">refresh</span>
</div>
<div class="flex-1 overflow-y-auto p-sm space-y-sm">
<div class="p-sm bg-surface-container-high border border-outline-variant rounded hover:border-primary transition-colors">
<p class="text-primary font-code-sm text-xs">@neuro_link</p>
<p class="text-on-surface-variant text-body-sm">Pushed update to swarm_logic.git</p>
</div>
<div class="p-sm bg-surface-container-high border border-outline-variant rounded hover:border-primary transition-colors">
<p class="text-primary font-code-sm text-xs">@void_coder</p>
<p class="text-on-surface-variant text-body-sm">Optimized Arkham layer latency</p>
</div>
<div class="p-sm bg-surface-container-high border border-outline-variant rounded hover:border-primary transition-colors">
<p class="text-primary font-code-sm text-xs">@sys_admin</p>
<p class="text-on-surface-variant text-body-sm">Maintenance window at 0400 UTC</p>
</div>
<div class="p-sm bg-surface-container-high border border-outline-variant rounded hover:border-primary transition-colors">
<p class="text-primary font-code-sm text-xs">@kernel_dev</p>
<p class="text-on-surface-variant text-body-sm">New enterprise module deployed</p>
</div>
</div>
</div>
<!-- System Visualization -->
<div class="col-span-12 lg:col-span-8 h-96 bg-surface-container-lowest rounded-lg border border-outline-variant relative overflow-hidden group">
<img alt="System Visualization" class="w-full h-full object-cover opacity-60" data-alt="A sophisticated abstract visualization of a neural network or a global data grid. Glowing lines and nodes in electric cyan and deep indigo interconnect across a dark slate background. The style is hyper-technical with floating data points and thin geometric lines, creating a sense of deep machine intelligence and complex processing." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBh3u03iMjpw3M_MdrT-NDD6eCKkT7NmxT0q_7XAI2EZs92gunVAl8CQqUCJGpin-rqufpJOgjo1uX-DGsAFeM5OnIKyW0s2g9UqNkhkslJmGsuk4GZkQ-bcBEFGdRw6iUW0Xa8ghSfIpPfRxhmoU5HHEIz3iD3LcFNbywyhGbQY9UGMooIBnOP3BE_sr3K8CqCs3GBlBfpte9uynWpTjW38QJd-MzhzvH1YakgVld7jCiec-E3DAo84ANUA3vYPS_XDWyWGW2BvJI"/>
<div class="absolute inset-0 bg-gradient-to-t from-surface to-transparent p-lg flex flex-col justify-end">
<h3 class="font-headline-md text-headline-md text-on-primary">Real-time Node Mapping</h3>
<p class="text-on-surface-variant text-body-sm max-w-md">Visualizing 14,000+ active connections across the global enterprise layer. Latency is within normal parameters.</p>
</div>
</div>
</div>
</div>
</main>
</div>
<!-- BottomNavBar (Mobile Only / Persistent FAB) -->
<div class="fixed bottom-lg right-lg z-50 flex items-center gap-md">
<!-- Persistent Assistant DAD Bubble -->
<button class="flex items-center justify-center bg-transparent text-primary rounded-full w-14 h-14 shadow-[0_0_15px_rgba(0,218,243,0.3)] hover:scale-110 hover:shadow-[0_0_20px_rgba(0,218,243,0.5)] transition-all animate-pulse border-2 border-primary-container bg-surface-container">
<span class="material-symbols-outlined text-3xl" data-icon="smart_toy" style="font-variation-settings: 'FILL' 1;">smart_toy</span>
</button>
</div>
<!-- Mobile Bottom Navigation (Hidden on MD) -->
<nav class="md:hidden fixed bottom-0 w-full h-16 bg-surface-container border-t border-outline-variant flex justify-around items-center px-md z-40">
<a class="flex flex-col items-center text-primary" href="#">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span class="font-label-xs text-label-xs">Home</span>
</a>
<a class="flex flex-col items-center text-on-surface-variant" href="#">
<span class="material-symbols-outlined" data-icon="hub">hub</span>
<span class="font-label-xs text-label-xs">Swarm</span>
</a>
<a class="flex flex-col items-center text-on-surface-variant" href="#">
<span class="material-symbols-outlined" data-icon="account_balance">account_balance</span>
<span class="font-label-xs text-label-xs">Gov</span>
</a>
<a class="flex flex-col items-center text-on-surface-variant" href="#">
<span class="material-symbols-outlined" data-icon="person">person</span>
<span class="font-label-xs text-label-xs">Me</span>
</a>
</nav>
</body></html>