"use client";
import React, { useState, useEffect, useCallback } from 'react';

const API_BASE = '/api';

interface SuggestedPrompt {
  label: string;
  prompt: string;
  complexity: string;
}

interface SwarmResponse {
  status: string;
  complexity: string;
  model: { model: string; label: string; cost_input_per_1k: number; cost_output_per_1k: number };
  context_retrieved: number;
  context_snippets: string[];
  response?: string;
  message: string;
  usage?: { input_tokens: number; output_tokens: number; cost_usd: number };
}

interface SystemStats {
  brain_nodes: number;
  decision_debt_count: number;
  active_models: string[];
  api_spend_today: number;
  system_healthy: boolean;
}

interface DecisionItem {
  id: string;
  document: string;
  metadata: Record<string, string>;
}

export default function CommandCenter() {
  const [activeMode, setActiveMode] = useState('Build Mode');
  const [activeProject, setActiveProject] = useState('FullStack');
  const [consoleInput, setConsoleInput] = useState('');
  const [threadMessages, setThreadMessages] = useState<Array<{role: string; content: string; meta?: string; time: string}>>([]);
  const [suggestedPrompts, setSuggestedPrompts] = useState<SuggestedPrompt[]>([]);
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [decisions, setDecisions] = useState<DecisionItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch system stats
  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/stats`);
      if (res.ok) setStats(await res.json());
    } catch { /* silent */ }
  }, []);

  // Fetch suggested prompts
  const fetchPrompts = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/prompts/suggested?project_id=${activeProject}`);
      if (res.ok) {
        const data = await res.json();
        setSuggestedPrompts(data.prompts || []);
      }
    } catch { /* silent */ }
  }, [activeProject]);

  // Fetch decision debt
  const fetchDecisions = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/decisions/list?project_id=${activeProject}`);
      if (res.ok) {
        const data = await res.json();
        const ids = data.decisions?.ids || [];
        const docs = data.decisions?.documents || [];
        const metas = data.decisions?.metadatas || [];
        setDecisions(ids.map((id: string, i: number) => ({ id, document: docs[i], metadata: metas[i] })));
      }
    } catch { /* silent */ }
  }, [activeProject]);

  useEffect(() => {
    fetchStats();
    fetchPrompts();
    fetchDecisions();
    const interval = setInterval(fetchStats, 15000);
    return () => clearInterval(interval);
  }, [fetchStats, fetchPrompts, fetchDecisions]);

  // Route a prompt through the Swarm Router
  const handleSubmit = async (prompt: string) => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setThreadMessages(prev => [...prev, { role: 'user', content: prompt, time: now }]);
    setConsoleInput('');

    try {
      const res = await fetch(`${API_BASE}/swarm/route`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, project_id: activeProject, user_tier: 'free' }),
      });
      if (res.ok) {
        const data: SwarmResponse = await res.json();
        const usageLine = data.usage
          ? `${data.usage.input_tokens + data.usage.output_tokens} tokens · $${data.usage.cost_usd.toFixed(5)}`
          : '';
        // Show the full LLM response if available, otherwise the routing message
        setThreadMessages(prev => [...prev, {
          role: 'system',
          content: data.response || data.message,
          meta: `Model: ${data.model.label} · ${data.complexity} · ${data.context_retrieved} context nodes${usageLine ? ' · ' + usageLine : ''}`,
          time: now,
        }]);
        if (data.context_snippets && data.context_snippets.length > 0) {
          setThreadMessages(prev => [...prev, {
            role: 'context',
            content: data.context_snippets.join('\n---\n'),
            time: now,
          }]);
        }
      }
    } catch {
      setThreadMessages(prev => [...prev, { role: 'system', content: 'Error: Could not reach the Brain API.', time: now }]);
    }
    setIsLoading(false);
    fetchStats();
  };

  const projects = ['FullStack', 'MedSpa', 'BIM', 'Game'];

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-gray-200 font-sans overflow-hidden">
      {/* LEFT RAIL */}
      <aside className="w-64 bg-[#111] border-r border-gray-800 flex flex-col justify-between shrink-0">
        <div>
          <div className="p-6">
            <h1 className="text-xl font-bold tracking-wider text-white">WorkLife<span className="text-blue-500">LM</span></h1>
            <p className="text-xs text-gray-500 uppercase mt-1">Command Center</p>
          </div>
          <nav className="mt-4 px-4 space-y-6">
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Projects</h2>
              <ul className="space-y-1">
                {projects.map(p => (
                  <li key={p}
                    onClick={() => setActiveProject(p)}
                    className={`px-3 py-2 rounded cursor-pointer text-sm transition-colors ${activeProject === p ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' : 'hover:bg-gray-800 text-gray-300'}`}
                  >{p}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">System</h2>
              <ul className="space-y-1">
                {['Agents', 'Data Sources', 'Revenue', 'Deployments'].map(p => (
                  <li key={p} className="px-3 py-2 rounded hover:bg-gray-800 cursor-pointer text-sm transition-colors text-gray-300">{p}</li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        {/* Suggested Prompts */}
        <div className="px-4 pb-4 space-y-2">
          <h3 className="text-xs text-gray-500 uppercase font-semibold mb-1">Quick Prompts</h3>
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {suggestedPrompts.slice(0, 4).map((sp, i) => (
              <button key={i}
                onClick={() => handleSubmit(sp.prompt)}
                className="w-full text-left px-3 py-2 rounded bg-gray-900 hover:bg-gray-800 text-xs text-gray-400 hover:text-white transition-colors border border-gray-800"
              >
                <span className="block font-medium text-gray-300">{sp.label}</span>
                <span className="block truncate">{sp.prompt}</span>
              </button>
            ))}
          </div>
          <div className="pt-2 border-t border-gray-800 text-xs text-gray-600 flex justify-between">
            <span>Swarm Router: <span className="text-green-500">Active</span></span>
            <span>{stats?.brain_nodes ?? '—'} nodes</span>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP BAR */}
        <header className="h-16 border-b border-gray-800 bg-[#111] flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${stats?.system_healthy ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]' : 'bg-red-500'} animate-pulse`}></div>
              <span className={`text-sm font-medium ${stats?.system_healthy ? 'text-green-400' : 'text-red-400'}`}>
                {stats?.system_healthy ? 'System Healthy' : 'Connecting...'}
              </span>
            </div>
            <div className="h-4 w-px bg-gray-700"></div>
            <div className="text-sm"><span className="text-gray-500">Models:</span> {stats?.active_models?.join(', ') ?? 'Loading...'}</div>
            <div className="h-4 w-px bg-gray-700"></div>
            <div className="text-sm"><span className="text-gray-500">Spend:</span> ${stats?.api_spend_today?.toFixed(2) ?? '—'} / day</div>
          </div>
          <div className="flex items-center space-x-3">
            <a href="/pricing" className="px-4 py-1.5 bg-gray-800 hover:bg-gray-700 text-sm rounded border border-gray-700 transition-colors">Pricing</a>
            <button className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded shadow-lg shadow-blue-900/50 transition-colors">Generate Output</button>
          </div>
        </header>

        {/* CANVAS */}
        <div className="flex-1 flex flex-col min-h-0 bg-[#0A0A0A]">
          {/* Mode Selector */}
          <div className="flex px-6 py-3 space-x-1 border-b border-gray-800 bg-[#0d0d0d]">
            {['Build Mode', 'Operate Mode', 'Analyze Mode'].map(mode => (
              <button key={mode} onClick={() => setActiveMode(mode)}
                className={`px-4 py-1.5 text-sm rounded-full transition-all ${activeMode === mode ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'}`}
              >{mode}</button>
            ))}
            <div className="flex-1" />
            <span className="text-xs text-gray-600 self-center">Project: <span className="text-white">{activeProject}</span></span>
          </div>

          {/* 3-Panel Canvas */}
          <div className="flex-1 flex min-h-0 relative">
            
            {/* CENTER - Active Thread */}
            <div className="flex-1 flex flex-col border-r border-gray-800 min-w-0">
              <div className="px-6 py-4 border-b border-gray-800 bg-[#111] flex justify-between items-center">
                <h3 className="font-medium text-white">Active Thread — {activeProject}</h3>
                <span className="text-xs text-gray-500">{threadMessages.length} messages</span>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {threadMessages.length === 0 && (
                  <div className="text-center text-gray-600 mt-12">
                    <p className="text-lg mb-2">No messages yet.</p>
                    <p className="text-sm">Use the console below or click a Quick Prompt to start.</p>
                  </div>
                )}
                {threadMessages.map((msg, i) => (
                  <div key={i} className={msg.role === 'user' ? 'flex justify-end' : ''}>
                    {msg.role === 'user' ? (
                      <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-900/50 max-w-[80%]">
                        <p className="text-sm text-blue-100">{msg.content}</p>
                      </div>
                    ) : msg.role === 'context' ? (
                      <div className="bg-purple-900/10 p-4 rounded-lg border border-purple-900/30">
                        <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Retrieved Context</span>
                        <pre className="text-xs text-gray-400 mt-2 whitespace-pre-wrap">{msg.content}</pre>
                      </div>
                    ) : (
                      <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Swarm Orchestrator</span>
                          <span className="text-xs text-gray-500">{msg.time}</span>
                        </div>
                        <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{msg.content}</div>
                        {msg.meta && <p className="text-xs text-gray-600 mt-3 font-mono border-t border-gray-800 pt-2">{msg.meta}</p>}
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 animate-pulse">
                    <span className="text-xs text-blue-400">Routing through swarm...</span>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT - Context Engine */}
            <div className="w-80 bg-[#111] flex flex-col shrink-0">
              <div className="px-6 py-4 border-b border-gray-800">
                <h3 className="font-medium text-white">Context Engine</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <div>
                  <h4 className="text-xs uppercase text-gray-500 font-semibold mb-2 flex items-center"><span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span> Connected Repos</h4>
                  <div className="space-y-2">
                    <div className="p-2 bg-gray-800/50 rounded border border-gray-700/50 text-sm cursor-pointer hover:bg-gray-800">github.com/robs46859-eng/worklifelm</div>
                    <div className="p-2 bg-gray-800/50 rounded border border-gray-700/50 text-sm cursor-pointer hover:bg-gray-800">github.com/robs46859-eng/fullstack-core</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs uppercase text-gray-500 font-semibold mb-2 flex items-center"><span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span> Decision Debt ({decisions.length})</h4>
                  <div className="space-y-2">
                    {decisions.length === 0 ? (
                      <p className="text-xs text-gray-600">No unresolved decisions tracked.</p>
                    ) : decisions.slice(0, 5).map(d => (
                      <div key={d.id} className="p-2 bg-orange-900/20 rounded border border-orange-900/50 text-xs text-orange-200">
                        <strong>Assumption:</strong> {d.document}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs uppercase text-gray-500 font-semibold mb-2 flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span> Memory Vectors</h4>
                  <div className="text-xs text-gray-400 p-2 bg-gray-900 rounded">
                    {stats?.brain_nodes ?? 0} nodes stored in the system brain.
                  </div>
                </div>

                <div>
                  <h4 className="text-xs uppercase text-gray-500 font-semibold mb-2 flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> Model Routing</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs"><span className="text-gray-400">Simple tasks</span><span className="text-green-400">→ Haiku</span></div>
                    <div className="flex justify-between text-xs"><span className="text-gray-400">Moderate tasks</span><span className="text-yellow-400">→ Sonnet</span></div>
                    <div className="flex justify-between text-xs"><span className="text-gray-400">Complex tasks</span><span className="text-red-400">→ Opus</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM - Execution Console */}
          <div className="h-48 border-t border-gray-800 bg-[#0a0a0a] flex flex-col shrink-0">
            <div className="px-4 py-2 border-b border-gray-800 flex justify-between items-center bg-[#111]">
              <span className="text-xs font-mono text-gray-400">Execution Console &gt;_</span>
              <div className="flex space-x-2">
                {activeMode === 'Build Mode' && <button onClick={() => handleSubmit('Generate production-ready code for ' + activeProject)} className="text-xs bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded transition-colors">Generate Code</button>}
                {activeMode === 'Operate Mode' && <button onClick={() => handleSubmit('Draft outreach emails for the top leads in CRM')} className="text-xs bg-green-900/30 text-green-400 hover:bg-green-900/50 border border-green-900/50 px-3 py-1 rounded transition-colors">Run Outreach</button>}
                {activeMode === 'Analyze Mode' && <button onClick={() => handleSubmit('Synthesize all monetization paths across my active projects')} className="text-xs bg-purple-900/30 text-purple-400 hover:bg-purple-900/50 border border-purple-900/50 px-3 py-1 rounded transition-colors">Synthesize Revenue</button>}
              </div>
            </div>
            <div className="flex-1 p-4 font-mono text-xs text-gray-500 overflow-y-auto">
              <div><span className="text-blue-500">[System]</span> Orchestration layer initialized. Brain API connected.</div>
              <div><span className="text-blue-500">[System]</span> Tiered model routing active: Haiku → Sonnet → Opus.</div>
              <div><span className="text-blue-500">[System]</span> GitHub webhook endpoint ready at /api/webhooks/github.</div>
              {activeMode === 'Build Mode' && <div className="mt-1 text-green-500">Build Mode: Ready to route prompts into code generation pipelines.</div>}
              {activeMode === 'Operate Mode' && <div className="mt-1 text-orange-500">Operate Mode: Monitoring CRM webhooks and billing events.</div>}
              {activeMode === 'Analyze Mode' && <div className="mt-1 text-purple-500">Analyze Mode: Cross-project synthesis engine standing by.</div>}
              <div className="mt-3 flex items-center">
                <span className="text-blue-400 mr-2">❯</span>
                <input
                  type="text"
                  value={consoleInput}
                  onChange={e => setConsoleInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleSubmit(consoleInput); }}
                  className="bg-transparent border-none outline-none flex-1 text-gray-300 placeholder-gray-700"
                  placeholder={`Type a command or natural language request for ${activeMode}...`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
