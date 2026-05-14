'use client';

import { Section } from '@/types/album';
import { StickerCard } from './StickerCard';
import { useAlbumStore } from '@/store/useAlbumStore';
import { GroupInfo } from './GrupoInfo';

interface SectionViewerProps {
  section: Section;
}

export const SectionViewer = ({ section }: SectionViewerProps) => {
  const filter = useAlbumStore((state) => state.filter);
  const progress = useAlbumStore((state) => state.progress);

  const filteredStickers = section.stickers.filter((sticker) => {
    const info = progress[sticker.id] || { obtained: false, duplicates: 0 };
    if (filter === 'all') return true;
    if (filter === 'obtained') return info.obtained;
    if (filter === 'missing') return !info.obtained;
    if (filter === 'duplicates') return info.duplicates > 0;
    return true;
  });

  if (filteredStickers.length === 0) return null;

  const theme = section.theme;

  return (
    <div className="mb-10 w-full relative">
      
      {/* Glow de fondo dinámico basado en el color primario del país */}
      {theme && (
        <div 
          className="absolute inset-0 blur-[80px] opacity-20 pointer-events-none -z-10 rounded-full"
          style={{ background: theme.colors.primary }}
        />
      )}

      {/* Cabecera de la Sección con Escudo y Colores */}
      <div className="flex items-center gap-4 mb-6">
        <div 
          className="h-px flex-1 opacity-50" 
          style={{ background: theme ? `linear-gradient(to right, transparent, ${theme.colors.primary})` : 'linear-gradient(to right, transparent, #10b981)' }} 
        />
        
        <div className="flex items-center gap-3">
          {theme?.crest && (
            <img 
              src={theme.crest} 
              alt={`Escudo ${section.title}`} 
              className="w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow-xl"
              onError={(e) => e.currentTarget.style.display = 'none'} // Ocultar si no encuentra la imagen
            />
          )}
          
          <h3 
            className="text-lg md:text-xl font-black tracking-[0.2em] uppercase text-transparent bg-clip-text"
            style={{ 
              backgroundImage: theme 
                ? `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.secondary})` 
                : 'linear-gradient(to right, #34d399, #22d3ee)' // Default Emerald a Cyan
            }}
          >
            {section.title}
          </h3>
        </div>

        <div 
          className="h-px flex-1 opacity-50" 
          style={{ background: theme ? `linear-gradient(to left, transparent, ${theme.colors.secondary})` : 'linear-gradient(to left, transparent, #22d3ee)' }} 
        />
      </div>

      {/* RENDERIZAR INFO DE GRUPO SI EXISTE */}
      {section.groupData && (
        <GroupInfo data={section.groupData} theme={section.theme} />
      )}

      {/* Grid de Cromos */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 relative z-10">
        {filteredStickers.map((sticker) => (
          <StickerCard key={sticker.id} sticker={sticker} />
        ))}
      </div>
    </div>
  );
};