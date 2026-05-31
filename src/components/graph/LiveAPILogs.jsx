'use client'

import { useEffect, useRef, useState } from 'react'
import { Activity, Wifi } from 'lucide-react'

// LiveAPILogs — terminal-style scrolling REST request feed.
// New rows stream in every ~1.1s, color-coded by HTTP method + status.
export default function LiveAPILogs({ logs = [], title = 'api.feed' }) {
  const [feed, setFeed] = useState([])
  const idxRef = useRef(0)

  useEffect(() => {
    if (!logs.length) return
    const push = () => {
      const log = logs[idxRef.current % logs.length]
      idxRef.current++
      const id = Date.now() + Math.random()
      setFeed((f) => [...f.slice(-7), { ...log, id }])
    }
    push()
    const id = setInterval(push, 1100)
    return () => clearInterval(id)
  }, [logs])

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[rgba(8,12,18,0.7)] backdrop-blur-sm overflow-hidden">
      {/* terminal header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="status-dot run" />
          <p className="mono-label text-fog-400 text-[10px] tracking-[0.22em]">{title}</p>
        </div>
        <div className="flex items-center gap-3">
          <p className="mono-label text-signal-green text-[10px] tracking-[0.18em] flex items-center gap-1.5">
            <Wifi size={10} />
            <span>LIVE</span>
          </p>
          <p className="mono-label text-fog-500 text-[10px] tracking-[0.18em] tabular-nums">
            {feed.length} / {logs.length}
          </p>
        </div>
      </div>

      {/* table head */}
      <div className="grid grid-cols-[60px_minmax(0,1fr)_56px_50px] sm:grid-cols-[70px_minmax(0,1fr)_60px_60px] gap-2 px-3 sm:px-4 py-2 mono-label text-fog-600 text-[9px] tracking-[0.18em] border-b border-white/[0.04]">
        <span>METHOD</span>
        <span className="truncate">PATH</span>
        <span className="text-right">STATUS</span>
        <span className="text-right">MS</span>
      </div>

      {/* rows */}
      <div className="px-3 sm:px-4 py-2 space-y-1 font-mono text-[11px] sm:text-[12px] min-h-[280px]">
        {feed.map((row, i) => {
          const fade = Math.max(0.4, (i + 1) / feed.length)
          const methodColor =
            row.method === 'GET' ? 'text-signal-blue'
            : row.method === 'POST' ? 'text-accent'
            : row.method === 'PUT' ? 'text-signal-amber'
            : row.method === 'PATCH' ? 'text-signal-amber'
            : row.method === 'DELETE' ? 'text-signal-red'
            : 'text-fog-300'
          const statusColor =
            row.status >= 200 && row.status < 300 ? 'text-signal-green'
            : row.status >= 300 && row.status < 400 ? 'text-signal-blue'
            : row.status >= 400 && row.status < 500 ? 'text-signal-amber'
            : 'text-signal-red'
          return (
            <div
              key={row.id}
              className="grid grid-cols-[60px_minmax(0,1fr)_56px_50px] sm:grid-cols-[70px_minmax(0,1fr)_60px_60px] gap-2 items-center animate-[apiFade_0.4s_ease-out] min-w-0"
              style={{ opacity: fade }}
            >
              <span className={`mono-label text-[10px] tracking-[0.14em] truncate ${methodColor}`}>
                {row.method}
              </span>
              <span className="text-fog-200 truncate">{row.path}</span>
              <span className={`text-right tabular-nums truncate ${statusColor}`}>
                {row.status}
              </span>
              <span className="text-fog-500 text-right tabular-nums truncate">{row.ms}ms</span>
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-between px-4 py-2 border-t border-white/[0.06] mono-label text-fog-500 text-[9px] tracking-[0.18em]">
        <span className="flex items-center gap-1.5">
          <Activity size={10} className="text-accent" />
          <span>rps · 8.4</span>
        </span>
        <span>seq · {idxRef.current.toString().padStart(6, '0')}</span>
      </div>

      <style jsx global>{`
        @keyframes apiFade {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
