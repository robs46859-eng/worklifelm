<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&amp;family=Geist:wght@400;600;800&amp;family=Inter:wght@400;500&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          "colors": {
            "secondary-fixed": "#dae2fd",
            "on-secondary-fixed": "#131b2e",
            "on-primary": "#00363d",
            "tertiary-fixed": "#d8e3fb",
            "on-primary-container": "#00626e",
            "on-surface-variant": "#bac9cc",
            "inverse-on-surface": "#213145",
            "surface-container-high": "#1b2b3f",
            "secondary-container": "#3f465c",
            "primary-fixed-dim": "#00daf3",
            "on-error": "#690005",
            "secondary": "#bec6e0",
            "on-primary-fixed-variant": "#004f58",
            "surface-tint": "#00daf3",
            "primary": "#c3f5ff",
            "on-tertiary-fixed": "#111c2d",
            "on-secondary": "#283044",
            "on-primary-fixed": "#001f24",
            "surface-container": "#102034",
            "surface": "#031427",
            "on-tertiary-container": "#4f5a6e",
            "on-background": "#d3e4fe",
            "tertiary-container": "#c6d1e9",
            "surface-bright": "#2a3a4f",
            "error-container": "#93000a",
            "surface-container-low": "#0b1c30",
            "on-error-container": "#ffdad6",
            "background": "#031427",
            "on-secondary-fixed-variant": "#3f465c",
            "secondary-fixed-dim": "#bec6e0",
            "on-tertiary": "#263143",
            "on-surface": "#d3e4fe",
            "tertiary-fixed-dim": "#bcc7de",
            "outline": "#849396",
            "on-secondary-container": "#adb4ce",
            "error": "#ffb4ab",
            "surface-container-highest": "#26364a",
            "outline-variant": "#3b494c",
            "inverse-primary": "#006875",
            "surface-variant": "#26364a",
            "surface-container-lowest": "#000f21",
            "on-tertiary-fixed-variant": "#3c475a",
            "primary-container": "#00e5ff",
            "primary-fixed": "#9cf0ff",
            "inverse-surface": "#d3e4fe",
            "tertiary": "#e6edff",
            "surface-dim": "#031427"
          },
          "borderRadius": {
            "DEFAULT": "0.125rem",
            "lg": "0.25rem",
            "xl": "0.5rem",
            "full": "0.75rem"
          },
          "spacing": {
            "xs": "4px",
            "container-padding": "12px",
            "md": "16px",
            "unit": "4px",
            "lg": "24px",
            "sm": "8px",
            "panel-gap": "1px"
          },
          "fontFamily": {
            "label-xs": ["JetBrains Mono"],
            "code-sm": ["JetBrains Mono"],
            "body-sm": ["Inter"],
            "headline-md": ["Geist"],
            "display-lg": ["Geist"]
          },
          "fontSize": {
            "label-xs": ["11px", {"lineHeight": "1", "letterSpacing": "0.05em", "fontWeight": "500"}],
            "code-sm": ["13px", {"lineHeight": "1.6", "letterSpacing": "0em", "fontWeight": "400"}],
            "body-sm": ["14px", {"lineHeight": "1.5", "letterSpacing": "0em", "fontWeight": "400"}],
            "headline-md": ["20px", {"lineHeight": "1.4", "letterSpacing": "-0.01em", "fontWeight": "600"}],
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
    .radar-grid {
      background-image: radial-gradient(circle, #3b494c 1px, transparent 1px);
      background-size: 20px 20px;
    }
    .scan-line {
      background: linear-gradient(to bottom, transparent 0%, rgba(0, 218, 243, 0.1) 50%, transparent 100%);
      height: 100px;
      width: 100%;
      position: absolute;
      top: -100px;
      left: 0;
    }
  </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-surface font-body-sm selection:bg-primary-container selection:text-on-primary-container">
<!-- Top Navigation Shell -->
<header class="flex justify-between items-center w-full px-md h-12 z-50 bg-surface border-b border-outline-variant fixed top-0 left-0">
<div class="flex items-center gap-sm">
<span class="material-symbols-outlined text-primary-fixed-dim" data-icon="terminal">terminal</span>
<h1 class="font-headline-md text-headline-md font-bold tracking-tighter text-primary">WorkLifeLM</h1>
<span class="font-code-sm text-code-sm bg-surface-container-highest px-2 py-0.5 rounded text-outline uppercase ml-sm">Arkham Governance</span>
</div>
<div class="flex items-center gap-md">
<nav class="hidden md:flex gap-md">
<span class="font-code-sm text-code-sm text-primary font-bold cursor-pointer transition-opacity active:opacity-80">Governance</span>
<span class="font-code-sm text-code-sm text-on-surface-variant hover:bg-surface-container-highest transition-colors duration-200 cursor-pointer px-2 rounded">Protocol</span>
<span class="font-code-sm text-code-sm text-on-surface-variant hover:bg-surface-container-highest transition-colors duration-200 cursor-pointer px-2 rounded">Nodes</span>
</nav>
<div class="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center border border-outline-variant cursor-pointer overflow-hidden">
<img alt="User Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3WcUcfN6mkNiSFau00LC2sPSBkJC8iTq7Lseo9Mv4L2TVRx-a6SZeMmOFs1kT9ZAKjDfaputXcqSRIYMM4PyW_NsvRcFvUf941pjCQBBss8RCTClL992an5E8Ztt5BMRwwcdXR1kG0DMbYXZn6JoZ5DPV_IQjDtDrO42yaF9MEdcVovdY4Wh29cw9mD1-nqUGt_4EiMY2xqm8FlOzwfGMxqYZMnaCZH0mo5BTL3p65JUrIs_7Q1UCP88Y16hBZzmDD5paAXGepOE"/>
</div>
</div>
</header>
<!-- Main Content Canvas -->
<main class="pt-12 pb-16 md:pb-0 min-h-screen flex flex-col md:flex-row gap-panel-gap bg-outline-variant overflow-hidden">
<!-- Left Column: Intelligence Trust Radar & Terminal -->
<div class="flex-1 flex flex-col gap-panel-gap bg-background">
<!-- Section 1: Intelligence Trust Radar -->
<section class="flex-1 bg-surface-container p-md flex flex-col relative overflow-hidden">
<div class="flex justify-between items-center mb-md z-10">
<h2 class="font-label-xs text-label-xs uppercase tracking-widest text-outline">Intelligence Trust Radar</h2>
<span class="text-primary-fixed-dim font-code-sm text-code-sm">SYS_READY_V2.04</span>
</div>
<div class="flex-1 flex items-center justify-center relative">
<!-- Circular Radar Visualization -->
<div class="w-64 h-64 md:w-80 md:h-80 rounded-full border border-outline-variant relative flex items-center justify-center radar-grid">
<div class="absolute inset-0 rounded-full border border-outline-variant opacity-20 scale-75"></div>
<div class="absolute inset-0 rounded-full border border-outline-variant opacity-10 scale-50"></div>
<div class="absolute inset-0 rounded-full border border-outline-variant opacity-5 scale-25"></div>
<!-- Data Points -->
<!-- Brave 98% -->
<div class="absolute top-[5%] left-[50%] -translate-x-1/2 group cursor-crosshair">
<div class="flex flex-col items-center">
<div class="w-2 h-2 bg-primary-fixed-dim shadow-[0_0_10px_rgba(0,218,243,0.8)] rounded-full mb-1"></div>
<span class="font-code-sm text-[10px] text-primary">Brave: 98%</span>
</div>
</div>
<!-- GitHub 94% -->
<div class="absolute top-[40%] right-[10%] group cursor-crosshair">
<div class="flex flex-col items-center">
<div class="w-2 h-2 bg-primary-fixed-dim shadow-[0_0_10px_rgba(0,218,243,0.8)] rounded-full mb-1"></div>
<span class="font-code-sm text-[10px] text-primary">GitHub: 94%</span>
</div>
</div>
<!-- Chroma 87% -->
<div class="absolute bottom-[20%] left-[15%] group cursor-crosshair">
<div class="flex flex-col items-center">
<div class="w-2 h-2 bg-primary-fixed-dim shadow-[0_0_10px_rgba(0,218,243,0.8)] rounded-full mb-1"></div>
<span class="font-code-sm text-[10px] text-primary">Chroma: 87%</span>
</div>
</div>
<!-- Radar Sweep -->
<div class="absolute inset-0 rounded-full border-r-2 border-primary-fixed-dim/20 origin-center animate-[spin_4s_linear_infinite]"></div>
</div>
<!-- Side Labels -->
<div class="absolute right-4 bottom-4 flex flex-col gap-xs items-end">
<div class="text-right">
<p class="font-label-xs text-label-xs text-outline">LATENCY</p>
<p class="font-code-sm text-code-sm text-primary">12.4ms</p>
</div>
<div class="text-right">
<p class="font-label-xs text-label-xs text-outline">NODES</p>
<p class="font-code-sm text-code-sm text-primary">1,024/1,024</p>
</div>
</div>
</div>
</section>
<!-- Section 4: Moderation Control Terminal -->
<section class="h-48 bg-surface-container-lowest border-t border-outline-variant p-md font-code-sm text-code-sm relative group">
<div class="flex justify-between items-center mb-sm text-outline border-b border-outline-variant pb-1">
<div class="flex items-center gap-sm">
<span class="material-symbols-outlined text-[14px]" data-icon="terminal">terminal</span>
<span class="font-label-xs text-label-xs uppercase">Moderation Control Terminal</span>
</div>
<span class="font-label-xs text-label-xs">SSH:127.0.0.1</span>
</div>
<div class="overflow-y-auto h-24 space-y-1 mb-2 custom-scrollbar text-on-surface-variant">
<p>&gt; arkham-admin --status check</p>
<p class="text-primary-fixed-dim">[OK] Core governance systems operational.</p>
<p>&gt; /fetch_logs --level critical</p>
<p class="text-error">CRITICAL: Unverified segment in block 0xAF32</p>
<p class="flex items-center gap-1">&gt; <span class="w-2 h-4 bg-primary-fixed-dim animate-pulse"></span></p>
</div>
<div class="flex items-center gap-sm bg-surface-container-low px-2 py-1.5 border border-outline-variant">
<span class="text-primary-fixed-dim">$</span>
<input class="bg-transparent border-none focus:ring-0 text-code-sm w-full text-on-surface placeholder:text-outline-variant p-0" placeholder="Enter command..." type="text"/>
<span class="material-symbols-outlined text-outline cursor-pointer hover:text-primary-fixed-dim" data-icon="keyboard_return">keyboard_return</span>
</div>
</section>
</div>
<!-- Right Column: Alerts & Heatmap -->
<div class="md:w-96 flex flex-col gap-panel-gap bg-background">
<!-- Section 2: Hallucination Alert Stream -->
<section class="flex-1 bg-surface-container p-md flex flex-col">
<div class="flex justify-between items-center mb-md">
<h2 class="font-label-xs text-label-xs uppercase tracking-widest text-outline">Hallucination Stream</h2>
<span class="material-symbols-outlined text-error" data-icon="warning" data-weight="fill">warning</span>
</div>
<div class="flex-1 overflow-y-auto space-y-panel-gap">
<!-- High Risk -->
<div class="p-sm bg-error-container/10 border-l-2 border-error hover:bg-surface-container-highest transition-colors cursor-pointer group">
<div class="flex justify-between items-start mb-1">
<span class="font-code-sm text-[10px] text-error font-bold uppercase">[High Risk]</span>
<span class="font-code-sm text-[10px] text-outline">14:22:01</span>
</div>
<p class="font-code-sm text-code-sm text-on-surface leading-tight">Factual inconsistency in source_ref_042</p>
<div class="mt-2 flex gap-sm opacity-0 group-hover:opacity-100 transition-opacity">
<button class="font-label-xs text-label-xs text-error border border-error px-2 py-0.5">FLAG</button>
<button class="font-label-xs text-label-xs text-outline border border-outline-variant px-2 py-0.5">DISMISS</button>
</div>
</div>
<!-- Med Risk -->
<div class="p-sm bg-surface-container-high border-l-2 border-secondary hover:bg-surface-container-highest transition-colors cursor-pointer group">
<div class="flex justify-between items-start mb-1">
<span class="font-code-sm text-[10px] text-secondary font-bold uppercase">[Med Risk]</span>
<span class="font-code-sm text-[10px] text-outline">14:21:45</span>
</div>
<p class="font-code-sm text-code-sm text-on-surface-variant leading-tight">Unverified claim regarding API_V3; pending cross-check</p>
</div>
<!-- Low Risk -->
<div class="p-sm bg-surface-container-high border-l-2 border-outline hover:bg-surface-container-highest transition-colors cursor-pointer group">
<div class="flex justify-between items-start mb-1">
<span class="font-code-sm text-[10px] text-outline font-bold uppercase">[Low Risk]</span>
<span class="font-code-sm text-[10px] text-outline">14:21:12</span>
</div>
<p class="font-code-sm text-code-sm text-on-surface-variant leading-tight">Tone drift detected in response segment 4</p>
</div>
</div>
</section>
<!-- Section 3: Source Verification Heatmap -->
<section class="h-64 bg-surface-container p-md flex flex-col border-t border-outline-variant">
<div class="flex justify-between items-center mb-md">
<h2 class="font-label-xs text-label-xs uppercase tracking-widest text-outline">Verification Heatmap</h2>
<div class="flex items-center gap-sm">
<div class="w-2 h-2 bg-primary-fixed-dim rounded-full"></div>
<span class="font-label-xs text-[10px] text-outline">VERIFIED</span>
</div>
</div>
<div class="flex-1 grid grid-cols-8 grid-rows-6 gap-xs">
<!-- Heatmap Cells (Simulated) -->
<!-- Row 1 -->
<div class="bg-primary-fixed-dim/40 border border-primary-fixed-dim/20 hover:bg-primary-fixed-dim transition-colors"></div>
<div class="bg-primary-fixed-dim/60 border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim/80 border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim/20 border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim/40 border border-primary-fixed-dim/20"></div>
<div class="bg-error/30 border border-error/20"></div>
<div class="bg-primary-fixed-dim/60 border border-primary-fixed-dim/20"></div>
<!-- Row 2 -->
<div class="bg-primary-fixed-dim/80 border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div class="bg-error/60 border border-error/40 relative">
<span class="absolute inset-0 flex items-center justify-center text-[8px] text-on-error">!</span>
</div>
<div class="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim/90 border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim/80 border border-primary-fixed-dim/20"></div>
<!-- More rows filled with various shades of primary -->
<div class="bg-primary-fixed-dim/30 border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim/40 border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim/50 border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim/60 border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim/80 border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim/90 border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div class="bg-error border border-error/20"></div>
<div class="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim/10 border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim/20 border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim/30 border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim/90 border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim/80 border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim/70 border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim/60 border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim/40 border border-primary-fixed-dim/20"></div>
<div class="bg-primary-fixed-dim/20 border border-primary-fixed-dim/20"></div>
</div>
<div class="mt-sm flex justify-between font-label-xs text-[10px] text-outline">
<span>0x0000</span>
<span>BUFFER_OFFSETS_VIEW</span>
<span>0xFFFF</span>
</div>
</section>
</div>
</main>
<!-- Mobile Bottom NavBar Shell -->
<footer class="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 bg-surface-container border-t border-outline-variant px-container-padding">
<div class="flex flex-col items-center justify-center text-on-surface-variant pt-1 hover:bg-surface-container-highest transition-all active:scale-95 duration-150 cursor-pointer">
<span class="material-symbols-outlined" data-icon="radar">radar</span>
<span class="font-label-xs text-label-xs">Radar</span>
</div>
<div class="flex flex-col items-center justify-center text-on-surface-variant pt-1 hover:bg-surface-container-highest transition-all active:scale-95 duration-150 cursor-pointer">
<span class="material-symbols-outlined" data-icon="notifications_active">notifications_active</span>
<span class="font-label-xs text-label-xs">Alerts</span>
</div>
<div class="flex flex-col items-center justify-center text-on-surface-variant pt-1 hover:bg-surface-container-highest transition-all active:scale-95 duration-150 cursor-pointer">
<span class="material-symbols-outlined" data-icon="grid_view">grid_view</span>
<span class="font-label-xs text-label-xs">Heatmap</span>
</div>
<div class="flex flex-col items-center justify-center text-primary-fixed-dim font-bold border-t-2 border-primary-fixed-dim pt-1 hover:bg-surface-container-highest transition-all active:scale-95 duration-150 cursor-pointer">
<span class="material-symbols-outlined" data-icon="terminal">terminal</span>
<span class="font-label-xs text-label-xs">Terminal</span>
</div>
</footer>
</body></html>