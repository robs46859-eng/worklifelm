"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DadAssistant from './DadAssistant';

export default function NavigationLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', href: '/', icon: 'dashboard' },
    { label: 'Language Workspace', href: '/language', icon: 'variable_insert' },
    { label: 'Contributor Marketplace', href: '/marketplace', icon: 'storefront' },
    { label: 'Swarm Control', href: '/swarm-control', icon: 'hub' },
    { label: 'Arkham Governance', href: '/governance', icon: 'account_balance' },
    { label: 'Enterprise Layer', href: '/enterprise', icon: 'business_center' },
    { label: 'Admin Dashboard', href: '/admin', icon: 'admin_panel_settings', adminOnly: true },
    { label: 'Profile', href: '/profile', icon: 'person' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#031427] text-[#d3e4fe]">
      {/* Top Bar */}
      <header className="flex justify-between items-center px-6 h-16 w-full z-40 bg-[#102034] border-b border-[#3b494c] fixed top-0">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#c3f5ff]">terminal</span>
          <h1 className="text-xl font-bold text-[#c3f5ff] tracking-tighter">WorkLifeLM</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end hidden md:flex text-xs">
            <span className="text-[#c3f5ff] uppercase tracking-widest font-mono">System_Active</span>
            <span className="text-[#bac9cc]">v2.0.4-stable</span>
          </div>
          <div className="w-10 h-10 rounded-full border border-[#00626e] overflow-hidden bg-[#1b2b3f]">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuChsxrAmNgF5V1u8L4k89hJPL4Y4prwz4sCR38YUQoIgFURh4RAleU_6cBC6BzpJfNPYi6A_bYkeLIbD1YFcWs1L673SRfWtv__P7oYOyxeQTD_JwJiLGUoeDxwG5YIjNCq413lDD8pb3dZHSu2cz-9MT9TjGyKEPXPgVei3z-vZAtMkc_XwFntp_oJsl00ADjLxkM2zZa_Ci-9yQ2G0a-yQfRI5_qGKU8rYICg1UVIP8dMDxpd1OY9kOlUtmGthifs1sfa8novRX8"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-16 h-full overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-[#102034] border-r border-[#3b494c] py-6 px-2">
          <div className="mb-8 px-4">
            <span className="text-[10px] text-[#bac9cc] opacity-50 font-mono block">NODE_IDENTITY</span>
            <h2 className="text-lg font-bold text-[#c3f5ff]">SYSTEM_CORE</h2>
          </div>
          <nav className="flex-1 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded transition-all font-mono text-sm ${
                  isActive(item.href) 
                    ? 'text-[#c3f5ff] bg-[#00e5ff1a] border-r-2 border-[#c3f5ff]' 
                    : 'text-[#bac9cc] hover:bg-[#1b2b3f] hover:text-[#d3e4fe]'
                }`}
              >
                <span className="material-symbols-outlined text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          <div className="mt-auto border-t border-[#3b494c] pt-4 px-2">
            <button 
              onClick={() => {
                localStorage.removeItem('wlm_token');
                localStorage.removeItem('wlm_user');
                window.location.href = '/login';
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#1b2b3f] border border-[#3b494c] text-red-400 text-sm hover:bg-red-950/20 transition-colors rounded-lg font-mono"
            >
              <span className="material-symbols-outlined text-lg">logout</span>
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 relative bg-[#031427]">
          {children}
        </main>
      </div>

      {/* DAD Persistent Companion */}
      <DadAssistant />

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 w-full h-16 bg-[#102034] border-t border-[#3b494c] flex justify-around items-center px-4 z-40">
        <Link href="/" className="flex flex-col items-center text-[#c3f5ff]">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px]">Home</span>
        </Link>
        <Link href="/swarm-control" className="flex flex-col items-center text-[#bac9cc]">
          <span className="material-symbols-outlined">hub</span>
          <span className="text-[10px]">Swarm</span>
        </Link>
        <Link href="/governance" className="flex flex-col items-center text-[#bac9cc]">
          <span className="material-symbols-outlined">account_balance</span>
          <span className="text-[10px]">Gov</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center text-[#bac9cc]">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px]">Me</span>
        </Link>
      </nav>
    </div>
  );
}
