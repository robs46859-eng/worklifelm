"use client";
import React, { useState, useEffect } from 'react';

const API_BASE = '/api';

type OutputType = 'report' | 'slides' | 'mindmap' | 'flashcards' | 'quiz' | 'audio-script' | 'pitch' | 'video';

interface OutputOption {
  key: OutputType;
  label: string;
  description: string;
  icon: string;
  comingSoon?: boolean;
}

const OUTPUT_OPTIONS: OutputOption[] = [
  { key: 'report', label: 'Report', description: 'Executive report with findings & recommendations', icon: '📊' },
  { key: 'slides', label: 'Slide Deck', description: 'Structured presentation with speaker notes', icon: '📽️' },
  { key: 'mindmap', label: 'Mind Map', description: 'Visual knowledge map with branches', icon: '🧠' },
  { key: 'flashcards', label: 'Flashcards', description: 'Study cards with Q&A pairs', icon: '🃏' },
  { key: 'quiz', label: 'Quiz', description: 'Multiple choice assessment', icon: '✅' },
  { key: 'audio-script', label: 'Audio Overview', description: 'Podcast-style conversation script', icon: '🎙️' },
  { key: 'pitch', label: 'Reverse Pitch', description: 'AI pitches you on your next best move', icon: '🚀' },
  { key: 'video', label: 'Video Overview', description: 'AI-generated video storyboard & production plan', icon: '🎬', comingSoon: true },
];

export default function OutputsPage() {
  const [selectedType, setSelectedType] = useState<OutputType | null>(null);
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [saveMsg, setSaveMsg] = useState('');
  const [showArchived, setShowArchived] = useState(false);
  const [savedOutputs, setSavedOutputs] = useState<Record<string, unknown>[]>([]);

  const fetchSaved = async (archived: boolean) => {
    const token = localStorage.getItem('wlm_token');
    if (!token) return;
    try {
      const res = await fetch(`/api/outputs/list?archived=${archived}`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) { const data = await res.json(); setSavedOutputs(data.outputs || []); }
    } catch { /* silent */ }
  };

  // Auth gate
  useEffect(() => {
    const token = localStorage.getItem('wlm_token');
    if (!token) {
      window.location.href = '/login';
    } else {
      fetchSaved(false);
    }
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('wlm_token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
  };

  const handleGenerate = async () => {
    if (!selectedType || !topic.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`${API_BASE}/outputs/${selectedType}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ topic, project_id: 'general', user_tier: 'free' }),
      });
      if (res.ok) setResult(await res.json());
    } catch { /* silent */ }
    setLoading(false);
  };

  const renderResult = () => {
    if (!result) return null;
    const type = result.type as string;

    if (type === 'report') {
      const output = result.output as Record<string, unknown>;
      return <div className="whitespace-pre-wrap text-sm text-gray-300 leading-relaxed">{output.content as string}</div>;
    }

    if (type === 'slides') {
      const slides = result.slides as Array<Record<string, unknown>>;
      return (
        <div className="space-y-4">
          {slides.map((s, i) => (
            <div key={i} className="bg-gray-900 border border-gray-700 rounded-lg p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-blue-400 font-mono">Slide {(s.slide_number as number) || i + 1}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{s.title as string}</h3>
              <ul className="space-y-1.5 mb-3">
                {(s.bullets as string[])?.map((b, j) => (
                  <li key={j} className="text-sm text-gray-300 flex items-start"><span className="text-blue-500 mr-2 mt-0.5">•</span>{b}</li>
                ))}
              </ul>
              {s.speaker_notes ? <p className="text-xs text-gray-500 italic border-t border-gray-800 pt-2 mt-2">🎤 {String(s.speaker_notes)}</p> : null}
            </div>
          ))}
        </div>
      );
    }

    if (type === 'flashcards') {
      const cards = result.cards as Array<Record<string, string>>;
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {cards.map((c, i) => (
            <div key={i} className="bg-gray-900 border border-gray-700 rounded-lg p-4 hover:border-green-600/50 transition-colors group">
              <p className="text-sm font-medium text-green-400 mb-2">{c.front}</p>
              <p className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors">{c.back}</p>
            </div>
          ))}
        </div>
      );
    }

    if (type === 'quiz') {
      const questions = result.questions as Array<Record<string, unknown>>;
      return (
        <div className="space-y-6">
          {questions.map((q, i) => (
            <div key={i} className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <p className="text-sm font-medium text-white mb-3">{i + 1}. {q.question as string}</p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {(q.options as string[])?.map((opt, j) => (
                  <div key={j} className={`text-xs p-2 rounded border ${opt.startsWith(q.correct as string) ? 'border-green-600/50 bg-green-900/20 text-green-300' : 'border-gray-700 text-gray-400'}`}>{opt}</div>
                ))}
              </div>
              <p className="text-xs text-gray-500">💡 {q.explanation as string}</p>
            </div>
          ))}
        </div>
      );
    }

    if (type === 'mindmap') {
      const mm = result.mindmap as Record<string, unknown>;
      const renderNode = (node: Record<string, unknown>, depth: number): React.ReactNode => (
        <div key={node.label as string} style={{ paddingLeft: depth * 20 }}>
          <div className={`text-sm py-1 ${depth === 0 ? 'text-white font-bold text-lg' : depth === 1 ? 'text-blue-400 font-medium' : 'text-gray-400'}`}>
            {depth > 0 && <span className="text-gray-600 mr-1">{'└─'}</span>}{node.label as string}
          </div>
          {(node.children as Array<Record<string, unknown>>)?.map(c => renderNode(c, depth + 1))}
        </div>
      );
      return <div className="p-4">{renderNode(mm, 0)}</div>;
    }

    if (type === 'audio_script') {
      return <div className="whitespace-pre-wrap text-sm text-gray-300 leading-relaxed">{result.script as string}</div>;
    }

    if (type === 'pitch') {
      return <div className="whitespace-pre-wrap text-sm text-gray-300 leading-relaxed">{result.pitch as string}</div>;
    }

    if (type === 'video') {
      return (
        <div>
          <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-4 mb-4">
            <p className="text-sm text-purple-300">🎬 <strong>Coming Soon:</strong> {String(result.message)}</p>
            <p className="text-xs text-purple-400 mt-1">Full AI video rendering pipeline is under development.</p>
          </div>
          <div className="whitespace-pre-wrap text-sm text-gray-300 leading-relaxed">{result.storyboard as string}</div>
        </div>
      );
    }

    return <pre className="text-xs text-gray-400">{JSON.stringify(result, null, 2)}</pre>;
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 font-sans">
      <header className="h-16 border-b border-gray-800 bg-[#111] flex items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <a href="/" className="text-xl font-bold tracking-wider text-white">WorkLife<span className="text-blue-500">LM</span></a>
          <span className="text-gray-600">/ Output Generator</span>
        </div>
        <a href="/" className="px-4 py-1.5 bg-gray-800 hover:bg-gray-700 text-sm rounded border border-gray-700 transition-colors">← Back to Dashboard</a>
      </header>

      <div className="max-w-5xl mx-auto p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {OUTPUT_OPTIONS.map(opt => (
            <button key={opt.key}
              onClick={() => { if (!opt.comingSoon) { setSelectedType(opt.key); setResult(null); } }}
              className={`p-4 rounded-lg border text-left transition-all relative ${opt.comingSoon ? 'border-gray-800 bg-[#111] opacity-60 cursor-default' : selectedType === opt.key ? 'border-blue-500 bg-blue-900/20 shadow-lg shadow-blue-900/20' : 'border-gray-800 bg-[#111] hover:border-gray-600'}`}
            >
              {opt.comingSoon && <span className="absolute top-2 right-2 text-[10px] bg-purple-900/50 text-purple-300 px-1.5 py-0.5 rounded-full border border-purple-700/30">SOON</span>}
              <span className="text-2xl">{opt.icon}</span>
              <h3 className="text-sm font-bold text-white mt-2">{opt.label}</h3>
              <p className="text-xs text-gray-500 mt-1">{opt.description}</p>
            </button>
          ))}
        </div>

        {selectedType && (
          <div className="mb-8">
            <div className="flex space-x-3">
              <input
                type="text"
                value={topic}
                onChange={e => setTopic(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleGenerate(); }}
                placeholder={`What should the ${OUTPUT_OPTIONS.find(o => o.key === selectedType)?.label.toLowerCase()} be about?`}
                className="flex-1 bg-[#111] border border-gray-700 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleGenerate}
                disabled={loading || !topic.trim()}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-600 text-white text-sm rounded-lg shadow-lg shadow-blue-900/50 transition-colors font-medium"
              >
                {loading ? 'Generating...' : 'Generate'}
              </button>
            </div>
          </div>
        )}

        {loading && (
          <div className="bg-[#111] border border-gray-800 rounded-lg p-8 text-center animate-pulse">
            <p className="text-blue-400 text-sm">Routing to optimal model and generating output...</p>
          </div>
        )}

        {result && (
          <div className="bg-[#111] border border-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-800">
              <h2 className="text-lg font-bold text-white">{OUTPUT_OPTIONS.find(o => o.key === selectedType)?.icon} {OUTPUT_OPTIONS.find(o => o.key === selectedType)?.label} Output</h2>
              <div className="flex items-center space-x-3">
                {(result.usage as Record<string, unknown>) && (
                  <span className="text-xs text-gray-500 font-mono">
                    {((result.usage as Record<string, number>)?.input_tokens || 0) + ((result.usage as Record<string, number>)?.output_tokens || 0)} tokens · ${((result.usage as Record<string, number>)?.cost_usd || 0).toFixed(4)}
                  </span>
                )}
                <button onClick={async () => {
                  const content = JSON.stringify(result, null, 2);
                  const token = localStorage.getItem('wlm_token');
                  const res = await fetch('/api/outputs/save', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ output_type: result.type, title: `${selectedType} - ${topic.slice(0, 40)}`, content, file_format: selectedType === 'report' || selectedType === 'pitch' ? 'md' : 'json' }) });
                  if (res.ok) { setSaveMsg('Saved!'); setTimeout(() => setSaveMsg(''), 2000); }
                }} className="px-3 py-1.5 bg-green-900/30 hover:bg-green-900/50 text-green-400 text-xs rounded border border-green-800/50 transition-colors">
                  {saveMsg || '💾 Save'}
                </button>
                <button onClick={() => {
                  const content = JSON.stringify(result, null, 2);
                  const ext = selectedType === 'report' || selectedType === 'pitch' ? 'md' : 'json';
                  const blob = new Blob([content], { type: ext === 'md' ? 'text/markdown' : 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a'); a.href = url; a.download = `${selectedType}_${Date.now()}.${ext}`; a.click();
                  URL.revokeObjectURL(url);
                }} className="px-3 py-1.5 bg-blue-900/30 hover:bg-blue-900/50 text-blue-400 text-xs rounded border border-blue-800/50 transition-colors">
                  ⬇ Download
                </button>
              </div>
            </div>
            {renderResult()}
          </div>
        )}

        {/* Saved Outputs Library */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Saved Outputs</h2>
            <div className="flex space-x-2">
              <button onClick={() => { setShowArchived(false); fetchSaved(false); }} className={`px-3 py-1 text-xs rounded ${!showArchived ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'}`}>Active</button>
              <button onClick={() => { setShowArchived(true); fetchSaved(true); }} className={`px-3 py-1 text-xs rounded ${showArchived ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'}`}>Archived</button>
            </div>
          </div>
          {savedOutputs.length === 0 ? (
            <p className="text-sm text-gray-600 bg-[#111] border border-gray-800 rounded-lg p-6 text-center">
              {showArchived ? 'No archived outputs.' : 'No saved outputs yet. Generate something and hit Save!'}
            </p>
          ) : (
            <div className="space-y-2">
              {savedOutputs.map((s: Record<string, unknown>) => (
                <div key={s.id as number} className="bg-[#111] border border-gray-800 rounded-lg p-4 flex items-center justify-between hover:border-gray-700 transition-colors">
                  <div>
                    <span className="text-sm font-medium text-white">{s.title as string}</span>
                    <span className="text-xs text-gray-500 ml-3">{s.output_type as string} · {s.file_format as string} · {(s.created_at as string)?.slice(0, 10)}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={async () => {
                      const token = localStorage.getItem('wlm_token');
                      const endpoint = showArchived ? `/api/outputs/${s.id}/unarchive` : `/api/outputs/${s.id}/archive`;
                      await fetch(endpoint, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } });
                      fetchSaved(showArchived);
                    }} className="px-2 py-1 text-xs text-gray-400 hover:text-yellow-400 transition-colors">
                      {showArchived ? '↩ Restore' : '📦 Archive'}
                    </button>
                    <button onClick={async () => {
                      const token = localStorage.getItem('wlm_token');
                      await fetch(`/api/outputs/${s.id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
                      fetchSaved(showArchived);
                    }} className="px-2 py-1 text-xs text-gray-400 hover:text-red-400 transition-colors">
                      🗑 Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
