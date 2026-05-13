'use client';

import { Section } from '@/types/album';
import { StickerCard } from './StickerCard';
import { useAlbumStore } from '@/store/useAlbumStore';

interface SectionViewerProps {
  section: Section;
}

export const SectionViewer = ({ section }: SectionViewerProps) => {
  const filter = useAlbumStore((state) => state.filter);
  const progress = useAlbumStore((state) => state.progress);

  // Lógica de filtrado en tiempo real
  const filteredStickers = section.stickers.filter((sticker) => {
    const info = progress[sticker.id] || { obtained: false, duplicates: 0 };
    
    if (filter === 'all') return true;
    if (filter === 'obtained') return info.obtained;
    if (filter === 'missing') return !info.obtained;
    if (filter === 'duplicates') return info.duplicates > 0;
    
    return true;
  });

  // Si después de filtrar no hay cromos en esta sección, no la renderizamos
  // Esto hace que la navegación sea súper limpia cuando buscas repetidos o faltantes.
  if (filteredStickers.length === 0) return null;

  return (
    <div className="mb-10 w-full">
      <div className="flex items-center gap-3 mb-5">
        <div className="h-px bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0 flex-1" />
        <h3 className="text-sm md:text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 tracking-[0.2em] uppercase text-center">
          {section.title}
        </h3>
        <div className="h-px bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0 flex-1" />
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
        {/* Renderizamos el array filtrado, no el original */}
        {filteredStickers.map((sticker) => (
          <StickerCard key={sticker.id} sticker={sticker} />
        ))}
      </div>
    </div>
  );
};