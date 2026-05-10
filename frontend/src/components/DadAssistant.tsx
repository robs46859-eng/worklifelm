<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>DAD_OS_v1.0.4 - Persistent Assistant</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;600;800&amp;family=JetBrains+Mono:wght@400;500;700&amp;family=Inter:wght@400;500&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
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
        /* Custom scrollbar for high-density UI */
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: #0b1c30; }
        ::-webkit-scrollbar-thumb { background: #3b494c; border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: #00e5ff; }

        /* Elevation Stack: Luminance Stacking */
        .panel-border { border: 1px solid #3b494c; }
        .active-glow { box-shadow: 0 0 15px -3px rgba(0, 229, 255, 0.3); }
        
        /* Glassmorphism for floating elements */
        .glass-panel {
            background: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(186, 201, 204, 0.1);
        }
    </style>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "on-secondary": "#283044",
                        "inverse-primary": "#006875",
                        "secondary-container": "#3f465c",
                        "on-tertiary-fixed-variant": "#3c475a",
                        "surface-container-high": "#1b2b3f",
                        "primary-container": "#00e5ff",
                        "error": "#ffb4ab",
                        "tertiary-fixed-dim": "#bcc7de",
                        "surface-tint": "#00daf3",
                        "surface-container-highest": "#26364a",
                        "primary": "#c3f5ff",
                        "on-error": "#690005",
                        "surface": "#031427",
                        "on-primary-fixed": "#001f24",
                        "on-background": "#d3e4fe",
                        "on-secondary-fixed-variant": "#3f465c",
                        "inverse-surface": "#d3e4fe",
                        "on-error-container": "#ffdad6",
                        "primary-fixed": "#9cf0ff",
                        "surface-container-low": "#0b1c30",
                        "surface-container-lowest": "#000f21",
                        "surface-container": "#102034",
                        "surface-bright": "#2a3a4f",
                        "outline": "#849396",
                        "on-primary-fixed-variant": "#004f58",
                        "on-tertiary": "#263143",
                        "tertiary-fixed": "#d8e3fb",
                        "secondary": "#bec6e0",
                        "on-primary-container": "#00626e",
                        "surface-variant": "#26364a",
                        "surface-dim": "#031427",
                        "on-tertiary-fixed": "#111c2d",
                        "inverse-on-surface": "#213145",
                        "on-tertiary-container": "#4f5a6e",
                        "tertiary": "#e6edff",
                        "outline-variant": "#3b494c",
                        "on-surface-variant": "#bac9cc",
                        "secondary-fixed": "#dae2fd",
                        "on-primary": "#00363d",
                        "on-secondary-fixed": "#131b2e",
                        "secondary-fixed-dim": "#bec6e0",
                        "tertiary-container": "#c6d1e9",
                        "on-secondary-container": "#adb4ce",
                        "error-container": "#93000a",
                        "background": "#031427",
                        "primary-fixed-dim": "#00daf3",
                        "on-surface": "#d3e4fe"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.125rem",
                        "lg": "0.25rem",
                        "xl": "0.5rem",
                        "full": "0.75rem"
                    },
                    "spacing": {
                        "lg": "24px",
                        "container-padding": "12px",
                        "unit": "4px",
                        "md": "16px",
                        "panel-gap": "1px",
                        "sm": "8px",
                        "xs": "4px"
                    },
                    "fontFamily": {
                        "headline-md": ["Geist"],
                        "display-lg": ["Geist"],
                        "label-xs": ["JetBrains Mono"],
                        "code-sm": ["JetBrains Mono"],
                        "body-sm": ["Inter"]
                    },
                    "fontSize": {
                        "headline-md": ["20px", {"lineHeight": "1.4", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                        "display-lg": ["32px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "600"}],
                        "label-xs": ["11px", {"lineHeight": "1", "letterSpacing": "0.05em", "fontWeight": "500"}],
                        "code-sm": ["13px", {"lineHeight": "1.6", "letterSpacing": "0em", "fontWeight": "400"}],
                        "body-sm": ["14px", {"lineHeight": "1.5", "letterSpacing": "0em", "fontWeight": "400"}]
                    }
                },
            },
        }
    </script>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-background min-h-screen flex flex-col">
<!-- Top Navigation Bar -->
<header class="bg-surface-container text-primary font-headline-md text-headline-md docked full-width top-0 border-b border-outline-variant flat no shadows flex items-center justify-between px-md h-12 w-full z-50">
<div class="flex items-center gap-sm cursor-pointer active:scale-95 transition-colors hover:bg-surface-bright">
<span class="material-symbols-outlined text-primary" data-icon="terminal">terminal</span>
<span class="font-code-sm text-code-sm font-bold text-primary tracking-tighter">DAD_OS_v1.0.4</span>
</div>
<div class="flex items-center gap-md">
<nav class="hidden md:flex gap-md font-code-sm text-code-sm uppercase tracking-widest text-on-surface-variant">
<span class="text-primary hover:text-primary-fixed transition-colors cursor-pointer">Live_Feed</span>
<span class="hover:text-primary transition-colors cursor-pointer">Neural_Ops</span>
<span class="hover:text-primary transition-colors cursor-pointer">Kernel_Log</span>
</nav>
<span class="material-symbols-outlined text-on-surface-variant cursor-pointer active:scale-95 hover:bg-surface-bright p-1" data-icon="settings_input_component">settings_input_component</span>
</div>
</header>
<!-- Main Workspace Background -->
<main class="flex-1 relative flex overflow-hidden">
<!-- Sidebar Activity Bar -->
<aside class="w-12 border-r border-outline-variant bg-surface-container-low flex flex-col items-center py-md gap-lg shrink-0">
<div class="p-2 bg-secondary-container text-primary border-r-2 border-primary cursor-pointer">
<span class="material-symbols-outlined" data-icon="grid_view">grid_view</span>
</div>
<div class="p-2 text-on-surface-variant opacity-50 hover:opacity-100 transition-all cursor-pointer">
<span class="material-symbols-outlined" data-icon="Auto_awesome">auto_awesome</span>
</div>
<div class="p-2 text-on-surface-variant opacity-50 hover:opacity-100 transition-all cursor-pointer">
<span class="material-symbols-outlined" data-icon="memory">memory</span>
</div>
<div class="mt-auto p-2 text-on-surface-variant opacity-50 hover:opacity-100 transition-all cursor-pointer">
<span class="material-symbols-outlined" data-icon="account_tree">account_tree</span>
</div>
</aside>
<!-- Main Content Area (Background Content) -->
<section class="flex-1 p-lg overflow-y-auto bg-surface-container-lowest">
<div class="max-w-5xl mx-auto space-y-lg">
<!-- Bento Grid Layout for Dashboard -->
<div class="grid grid-cols-12 gap-md">
<div class="col-span-12 lg:col-span-8 panel-border bg-surface-container p-md flex flex-col gap-sm">
<div class="flex justify-between items-center border-b border-outline-variant pb-xs mb-xs">
<h2 class="font-code-sm text-code-sm text-primary-fixed uppercase tracking-tighter">System_Overview.sh</h2>
<span class="text-[10px] font-label-xs text-outline">UPTIME: 14:22:04</span>
</div>
<div class="aspect-video bg-surface-container-low panel-border overflow-hidden relative group">
<img class="w-full h-full object-cover mix-blend-luminosity opacity-40 group-hover:opacity-60 transition-opacity" data-alt="A high-tech server room with glowing blue fiber optic cables and server racks extending into a dark perspective. The image uses a cool palette of deep blues and slate grays with vibrant cyan accents from the server lights. The atmosphere is clinical, professional, and technologically dense, fitting a high-performance compute environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeOcCZRAoj2ReB8DSsFNpjsOkLmbunkD37FDWFbR8M0Kohlu51njFBMqpmpCCyoHbOjVtzvWNhKDC25mckrFygm7y0oxgJRtEMwZuWvpxRPzdVeL3KvhVCpycCIu8wkBFtQsE8nVQH1S6aXxq_hXnOBjaDQ9XiqD_J7UJlMhXIVJ4CCSAzT7ld6Rwiw9esJVAbVJVTLzStuihmpzJgJ47uONeXaIWDg7Foeq1XZnzTXP4CXCGVUvdtnq59Ece4m1shvINb4UBaheI"/>
<div class="absolute inset-0 bg-gradient-to-t from-surface to-transparent pointer-events-none"></div>
<div class="absolute bottom-4 left-4 font-code-sm text-code-sm text-primary">
                                [CLUSTER_ACTIVE] :: 12.4 TFLOPS_SECURED
                            </div>
</div>
</div>
<div class="col-span-12 lg:col-span-4 grid grid-rows-2 gap-md">
<div class="panel-border bg-surface-container-high p-md">
<h3 class="font-label-xs text-label-xs text-on-surface-variant mb-sm uppercase">Resource_Load</h3>
<div class="space-y-sm">
<div class="h-1 bg-surface-container-lowest w-full relative overflow-hidden">
<div class="absolute inset-y-0 left-0 bg-primary-container w-3/4"></div>
</div>
<div class="flex justify-between font-label-xs text-[10px]">
<span>NEURAL_ENGINE</span>
<span class="text-primary">74.2%</span>
</div>
</div>
</div>
<div class="panel-border bg-surface-container-high p-md">
<h3 class="font-label-xs text-label-xs text-on-surface-variant mb-sm uppercase">Active_Processes</h3>
<ul class="font-code-sm text-code-sm space-y-xs opacity-70">
<li class="flex items-center gap-xs"><span class="w-1 h-1 bg-primary-container rounded-full"></span> d_daemon.pid_882</li>
<li class="flex items-center gap-xs"><span class="w-1 h-1 bg-primary-container rounded-full"></span> telemetry_sink.v2</li>
<li class="flex items-center gap-xs"><span class="w-1 h-1 bg-outline rounded-full"></span> idle_wait</li>
</ul>
</div>
</div>
</div>
<!-- Secondary Row -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-md">
<div class="panel-border bg-surface-container p-md hover:bg-surface-bright transition-colors group">
<span class="material-symbols-outlined text-primary mb-sm block" data-icon="database">database</span>
<h4 class="font-headline-md text-code-sm font-bold text-on-background group-hover:text-primary transition-colors">DATABASE_CONTEXT</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-xs">Deep-index of current project scope mapping and architectural dependencies.</p>
</div>
<div class="panel-border bg-surface-container p-md hover:bg-surface-bright transition-colors group">
<span class="material-symbols-outlined text-primary mb-sm block" data-icon="psychology">psychology</span>
<h4 class="font-headline-md text-code-sm font-bold text-on-background group-hover:text-primary transition-colors">NEURAL_SYNAPSE</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-xs">Active reasoning layer processing developer intent and code flow patterns.</p>
</div>
<div class="panel-border bg-surface-container p-md hover:bg-surface-bright transition-colors group">
<span class="material-symbols-outlined text-primary mb-sm block" data-icon="analytics">analytics</span>
<h4 class="font-headline-md text-code-sm font-bold text-on-background group-hover:text-primary transition-colors">METRIC_STREAMS</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-xs">Real-time throughput and performance telemetry of the local DAEMON instance.</p>
</div>
</div>
</div>
</section>
<!-- DAD Intent Browser Panel (Expanded State) -->
<!-- Fixed Positioning relative to the screen, appears when active -->
<section class="fixed right-0 top-12 bottom-0 w-[480px] glass-panel z-40 flex flex-col transform translate-x-0 transition-transform duration-300">
<!-- Panel Header: Spotlight Bar -->
<div class="p-md border-b border-outline-variant bg-surface-container-high flex flex-col gap-sm">
<div class="flex items-center gap-sm bg-surface-container-lowest panel-border px-sm py-xs active-glow">
<span class="font-code-sm text-primary-container font-bold">&gt; _</span>
<input class="bg-transparent border-none focus:ring-0 text-code-sm font-code-sm w-full placeholder:opacity-30" placeholder="QUERY_DAEMON..." type="text"/>
<div class="flex items-center gap-1 bg-surface-container-highest px-1.5 py-0.5 rounded text-[9px] font-label-xs text-outline">
<span>CMD</span><span>+</span><span>K</span>
</div>
</div>
<div class="flex items-center justify-between px-xs">
<span class="font-label-xs text-[10px] text-primary tracking-widest uppercase">INTENT_BROWSER_V1.0</span>
<div class="flex gap-md">
<span class="text-[10px] font-label-xs text-on-surface-variant opacity-60 hover:opacity-100 cursor-pointer">HISTORY</span>
<span class="text-[10px] font-label-xs text-on-surface-variant opacity-60 hover:opacity-100 cursor-pointer">PREFS</span>
</div>
</div>
</div>
<!-- Content Area (Split Layout) -->
<div class="flex-1 flex overflow-hidden">
<!-- Intelligence Summary (Left/Main) -->
<div class="flex-1 flex flex-col bg-surface-container-lowest border-r border-outline-variant">
<div class="p-sm flex items-center justify-between border-b border-outline-variant/30">
<div class="flex items-center gap-xs">
<span class="w-1.5 h-1.5 bg-primary-container rounded-full animate-pulse"></span>
<span class="font-code-sm text-[11px] text-on-surface-variant">INTELLIGENCE_REPORT</span>
</div>
<span class="font-label-xs text-[9px] bg-primary-container/10 text-primary-container px-1.5 py-0.5 rounded border border-primary-container/20">ANALYSIS_COMPLETE</span>
</div>
<div class="p-md font-code-sm text-code-sm space-y-md overflow-y-auto">
<div class="text-on-surface-variant leading-relaxed">
<span class="text-primary-container font-bold">DAEMON:</span> Based on current session data, I have identified a bottleneck in <span class="text-tertiary">`AppShell.tsx`</span>. The state reconciliation for the NavigationDrawer is triggering redundant renders.
                        </div>
<div class="bg-surface-container-high p-sm panel-border text-[12px] space-y-xs">
<div class="text-outline border-b border-outline-variant/50 pb-xs mb-xs flex justify-between">
<span>SUGGESTED_PATCH</span>
<span class="material-symbols-outlined text-[14px]" data-icon="content_copy">content_copy</span>
</div>
<code class="text-secondary block">memo(() =&gt; { ... })</code>
<p class="text-[11px] opacity-60 italic">Wrapping the component in React.memo will prune the render tree effectively.</p>
</div>
<div class="flex gap-sm pt-md">
<button class="bg-primary-container text-surface px-md py-1.5 text-xs font-bold uppercase tracking-wider active:scale-95 transition-transform">APPLY_PATCH</button>
<button class="border border-outline text-on-surface-variant px-md py-1.5 text-xs font-bold uppercase tracking-wider hover:bg-surface-bright transition-colors">DISMISS</button>
</div>
</div>
</div>
<!-- Context & Sources (Right Sidebar) -->
<div class="w-40 bg-surface-container-low flex flex-col shrink-0">
<div class="p-xs bg-surface-container-high border-b border-outline-variant">
<span class="font-label-xs text-[9px] text-outline uppercase tracking-widest">ACTIVE_CONTEXT</span>
</div>
<div class="p-xs space-y-xs">
<div class="flex items-center gap-xs font-code-sm text-[11px] text-primary p-1 hover:bg-surface-bright rounded cursor-pointer">
<span class="material-symbols-outlined text-[14px]" data-icon="description">description</span>
<span>readme.md</span>
</div>
<div class="flex items-center gap-xs font-code-sm text-[11px] text-on-surface-variant p-1 hover:bg-surface-bright rounded cursor-pointer">
<span class="material-symbols-outlined text-[14px]" data-icon="code">code</span>
<span>AppShell.tsx</span>
</div>
<div class="flex items-center gap-xs font-code-sm text-[11px] text-on-surface-variant p-1 hover:bg-surface-bright rounded cursor-pointer">
<span class="material-symbols-outlined text-[14px]" data-icon="javascript">javascript</span>
<span>utils.js</span>
</div>
</div>
<div class="mt-auto border-t border-outline-variant p-sm">
<div class="panel-border border-dashed border-outline-variant bg-surface-container-high p-sm flex flex-col items-center gap-xs text-center group cursor-pointer hover:border-primary-container transition-colors">
<span class="material-symbols-outlined text-outline group-hover:text-primary-container" data-icon="upload_file">upload_file</span>
<span class="font-label-xs text-[9px] text-outline uppercase">DROP_SOURCES</span>
</div>
</div>
</div>
</div>
<!-- Panel Footer -->
<footer class="h-10 border-t border-outline-variant bg-surface-container-high flex items-center justify-between px-md">
<div class="flex items-center gap-md">
<div class="flex items-center gap-xs">
<span class="w-2 h-2 rounded-full bg-primary-container"></span>
<span class="font-code-sm text-[10px] text-primary">ONLINE</span>
</div>
<span class="font-code-sm text-[10px] text-outline">LATENCY: 42ms</span>
</div>
<span class="material-symbols-outlined text-on-surface-variant text-[18px] cursor-pointer" data-icon="chevron_right">chevron_right</span>
</footer>
</section>
</main>
<!-- Bottom Navigation Bar (Responsive/Mobile Only) -->
<nav class="md:hidden fixed bottom-0 w-full flex justify-around items-center h-14 z-40 bg-opacity-90 backdrop-blur-md bg-surface-container-low border-t border-outline-variant text-primary animate-pulse-subtle">
<div class="flex flex-col items-center justify-center text-primary scale-110">
<span class="material-symbols-outlined" data-icon="grid_view">grid_view</span>
</div>
<div class="flex flex-col items-center justify-center text-on-secondary-container opacity-50">
<span class="material-symbols-outlined" data-icon="Auto_awesome">auto_awesome</span>
</div>
<div class="flex flex-col items-center justify-center text-on-secondary-container opacity-50">
<span class="material-symbols-outlined" data-icon="memory">memory</span>
</div>
<div class="flex flex-col items-center justify-center text-on-secondary-container opacity-50">
<span class="material-symbols-outlined" data-icon="account_tree">account_tree</span>
</div>
</nav>
<!-- Trigger Component (Bottom-Right) -->
<!-- Applying Breathing Animation (Scale & Opacity) and Attention State (Pulse Shadow) -->
<div class="fixed bottom-lg right-lg z-50 flex items-center justify-center group">
<!-- Attention Pulse Ring -->
<div class="absolute inset-0 rounded-full bg-primary-container/20 animate-ping opacity-75"></div>
<!-- Main Daemon Button -->
<button class="relative w-14 h-14 rounded-full bg-surface-container-highest border-2 border-primary-container flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] transition-all active:scale-90 overflow-hidden cursor-pointer">
<div class="absolute inset-0 bg-gradient-to-tr from-primary-container/10 to-transparent"></div>
<!-- Custom Daemon Eye Icon -->
<div class="relative flex flex-col items-center justify-center group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-primary-container text-3xl font-variation-settings-fill" data-icon="visibility" style="font-variation-settings: 'FILL' 1;">visibility</span>
<span class="absolute text-[8px] font-label-xs text-primary-container -bottom-1 tracking-tighter uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity">DAEMON</span>
</div>
<!-- Breathing State Indication via scanning line overlay -->
<div class="absolute inset-x-0 h-[2px] bg-primary-container/40 animate-bounce -top-full" style="animation-duration: 3s; opacity: 0.5;"></div>
</button>
</div>
</body></html>