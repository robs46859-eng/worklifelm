"use client";
import React, { useState } from 'react';

export default function DadAssistant() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ai_summary?: string, sources?: any} | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setIsThinking(true);
    try {
      const res = await fetch('/api/browser/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, engines: ["brave", "workspace"] }),
      });
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("DAD Search failed:", err);
    }
    setIsThinking(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4 pointer-events-none">
      {/* Intent Browser Panel */}
      {isExpanded && (
        <div className="w-[450px] max-h-[600px] bg-[#0F172A]/95 backdrop-blur-xl border border-[#3b494c] rounded-xl shadow-2xl shadow-black/50 pointer-events-auto overflow-hidden flex flex-col transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
          <div className="p-4 border-b border-[#3b494c] bg-[#1b2b3f]/50">
            <form onSubmit={handleSearch} className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#c3f5ff] text-xl">search</span>
              <input 
                type="text"
                autoFocus
                placeholder="Ask DAD anything... (CMD + K)"
                className="w-full bg-[#031427] border border-[#3b494c] rounded-lg pl-10 pr-4 py-2 text-sm text-[#d3e4fe] placeholder-[#bac9cc]/50 focus:outline-none focus:border-[#00e5ff] font-mono"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {isThinking && <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-[#00e5ff] border-t-transparent rounded-full animate-spin"></div>}
            </form>
          </div>

          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            {!results && !isThinking ? (
              <div className="h-40 flex flex-col items-center justify-center text-[#bac9cc]/30 gap-2">
                <span className="material-symbols-outlined text-4xl">neurology</span>
                <p className="text-xs font-mono italic">Deus Absconditus Daemon is listening...</p>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {results?.ai_summary && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] text-[#00e5ff] font-mono uppercase tracking-widest">
                      <span className="w-2 h-2 bg-[#00e5ff] rounded-full animate-pulse"></span>
                      Neural Synthesis
                    </div>
                    <div className="bg-[#1e2b3f] p-3 rounded-lg border border-[#3b494c] text-xs leading-relaxed font-sans text-gray-200">
                      {results.ai_summary}
                    </div>
                  </div>
                )}

                {results?.sources && (
                  <div className="space-y-3">
                    <div className="text-[10px] text-[#bac9cc] font-mono uppercase tracking-widest border-b border-[#3b494c] pb-1">Verified Sources</div>
                    {Object.entries(results.sources).map(([engine, docs]: [string, any]) => (
                      <div key={engine} className="space-y-2">
                        {docs.map((doc: any, i: number) => (
                          <div key={i} className="group p-2 hover:bg-[#1b2b3f] border border-transparent hover:border-[#3b494c] rounded transition-all cursor-pointer">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-[10px] text-[#00e5ff] font-mono">{engine}</span>
                              <span className="material-symbols-outlined text-[10px] text-[#bac9cc] opacity-0 group-hover:opacity-100 transition-opacity">open_in_new</span>
                            </div>
                            <h4 className="text-xs font-bold text-gray-100 truncate">{doc.title}</h4>
                            <p className="text-[10px] text-[#bac9cc] line-clamp-2">{doc.snippet}</p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="p-2 border-t border-[#3b494c] bg-[#1b2b3f]/30 flex justify-between items-center px-4">
            <span className="text-[9px] text-[#bac9cc] font-mono uppercase tracking-tighter">Sheepish Reminder: I'm watching the workspace.</span>
            <button 
              onClick={() => setIsExpanded(false)}
              className="text-[10px] text-[#00e5ff] hover:underline font-mono"
            >Minimize</button>
          </div>
        </div>
      )}

      {/* Persistent Bubble */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`pointer-events-auto group relative flex items-center justify-center w-14 h-14 rounded-full border-2 border-[#00626e] bg-[#102034] shadow-[0_0_15px_rgba(0,218,243,0.3)] hover:shadow-[0_0_25px_rgba(0,218,243,0.6)] hover:scale-110 transition-all duration-500 overflow-hidden ${isThinking ? 'animate-pulse' : ''}`}
      >
        <div className="absolute inset-0 bg-[#00e5ff]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <span className="material-symbols-outlined text-3xl text-[#00e5ff] transition-transform duration-500 group-hover:rotate-[360deg]" style={{ fontVariationSettings: "'FILL' 1" }}>
          {isExpanded ? 'close' : 'smart_toy'}
        </span>
        
        {/* Subtle breathing ring */}
        {!isExpanded && (
          <div className="absolute inset-[-4px] border-2 border-[#00e5ff]/20 rounded-full animate-[ping_3s_linear_infinite]"></div>
        )}
      </button>
    </div>
  );
}
