'use client';

import { GroupData, Theme } from '@/types/album';
import { CalendarDays, Users } from 'lucide-react';

interface GroupInfoProps {
  data: GroupData;
  theme?: Theme;
}

export const GroupInfo = ({ data, theme }: GroupInfoProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      {/* Tabla del Grupo */}
      <div className="bg-slate-950/40 backdrop-blur-md border border-white/5 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3 text-emerald-400">
          <Users size={16} />
          <h4 className="text-xs font-black uppercase tracking-tighter">{data.name}</h4>
        </div>
        <div className="space-y-2">
          {data.teams.map((t, i) => (
            <div key={i} className="flex items-center justify-between text-[11px] font-bold p-2 rounded-lg bg-white/5 border border-white/5">
              <div className="flex items-center gap-2">
                <img src={t.crest} alt={t.name} className="w-4 h-4 object-contain" />
                <span className="text-slate-200">{t.name}</span>
              </div>
              <span className="text-slate-500 font-mono">POS {i + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Calendario de Partidos */}
      <div className="bg-slate-950/40 backdrop-blur-md border border-white/5 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3 text-cyan-400">
          <CalendarDays size={16} />
          <h4 className="text-xs font-black uppercase tracking-tighter">Partidos Fase de Grupos</h4>
        </div>
        <div className="space-y-2">
          {data.matches.map((m, i) => (
            <div key={i} className="flex flex-col gap-1 p-2 rounded-lg bg-white/5 border border-white/5">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-slate-200 uppercase">vs {m.opponent}</span>
                <span className="text-[9px] font-mono text-emerald-500">{m.date}</span>
              </div>
              <span className="text-[8px] text-slate-500 truncate italic">{m.stadium}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};