'use client';

import { useAlbumStore, FilterType } from '@/store/useAlbumStore';
import { cn } from '@/utils/cn';

export const FiltersBar = () => {
  const currentFilter = useAlbumStore((state) => state.filter);
  const setFilter = useAlbumStore((state) => state.setFilter);

  const filters: { id: FilterType; label: string }[] = [
    { id: 'all', label: 'Todos' },
    { id: 'missing', label: 'Faltantes' },
    { id: 'obtained', label: 'Obtenidos' },
    { id: 'duplicates', label: 'Repetidos' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8 relative z-20">
      {filters.map((f) => (
        <button
          key={f.id}
          onClick={() => setFilter(f.id)}
          className={cn(
            "px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300",
            currentFilter === f.id
              ? "bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
              : "bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-slate-200 border border-slate-700/50"
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};