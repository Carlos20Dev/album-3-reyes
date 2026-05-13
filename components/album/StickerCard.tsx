'use client';

import { motion } from 'framer-motion';
import { Plus, Minus, CheckCircle2 } from 'lucide-react';
import { Sticker } from '@/types/album';
import { useAlbumStore } from '@/store/useAlbumStore';
import { cn } from '@/utils/cn';

interface StickerCardProps {
  sticker: Sticker;
}

export const StickerCard = ({ sticker }: StickerCardProps) => {
  // Extraemos las acciones y el estado global
  const progress = useAlbumStore((state) => state.progress);
  const toggleSticker = useAlbumStore((state) => state.toggleSticker);
  const addDuplicate = useAlbumStore((state) => state.addDuplicate);
  const removeDuplicate = useAlbumStore((state) => state.removeDuplicate);

  // Obtenemos el estado local de este cromo específico
  const info = progress[sticker.id] || { obtained: false, duplicates: 0 };
  const { obtained, duplicates } = info;

  // Configuración visual basada en la rareza (UI Premium)
  const rarityConfig = {
    normal: {
      activeBg: 'bg-slate-800 border-slate-600',
      textName: 'text-slate-100',
      textNumber: 'text-slate-400',
      glow: ''
    },
    silver: {
      activeBg: 'bg-gradient-to-br from-slate-400 via-slate-200 to-slate-500 border-slate-100',
      textName: 'text-slate-900 drop-shadow-sm',
      textNumber: 'text-slate-700',
      glow: 'shadow-[0_0_15px_rgba(203,213,225,0.4)]'
    },
    gold: {
      activeBg: 'bg-gradient-to-br from-yellow-500 via-yellow-200 to-yellow-600 border-yellow-300',
      textName: 'text-yellow-950 drop-shadow-sm',
      textNumber: 'text-yellow-800',
      glow: 'shadow-[0_0_20px_rgba(250,204,21,0.5)]'
    }
  };

  const theme = rarityConfig[sticker.rarity];

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => toggleSticker(sticker.id)}
      className={cn(
        "relative flex flex-col justify-between aspect-[3/4] p-3 rounded-xl cursor-pointer transition-all duration-300 select-none overflow-hidden group",
        // Estado: Faltante
        !obtained && "border-2 border-dashed border-slate-700 bg-slate-900/40 grayscale opacity-60 hover:opacity-80 hover:border-slate-500",
        // Estado: Obtenido
        obtained && `border-2 ${theme.activeBg} ${theme.glow}`
      )}
    >
      {/* Animación de brillo de fondo solo para cromos especiales obtenidos */}
      {obtained && sticker.rarity !== 'normal' && (
        <motion.div
          animate={{ 
            opacity: [0, 0.5, 0],
            backgroundPosition: ["200% 0", "-200% 0"]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] bg-[length:200%_100%] pointer-events-none"
        />
      )}

      {/* Header del Cromo: Número y Badge de Obtenido */}
      <div className="flex items-start justify-between relative z-10">
        <span className={cn(
          "font-mono font-black text-sm tracking-tighter",
          obtained ? theme.textNumber : "text-slate-500"
        )}>
          #{sticker.number}
        </span>
        
        {obtained && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }} // <--- Solución correcta
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-500 drop-shadow-md bg-white/20 rounded-full" />
          </motion.div>
        )}
      </div>

      {/* Body del Cromo: Nombre y Equipo */}
      <div className="text-center relative z-10 mt-auto mb-2">
        <h4 className={cn(
          "text-[11px] font-black uppercase leading-tight line-clamp-2",
          obtained ? theme.textName : "text-slate-400"
        )}>
          {sticker.name}
        </h4>
        <p className={cn(
          "text-[9px] mt-1 font-semibold uppercase tracking-wider",
          obtained ? theme.textNumber : "text-slate-600"
        )}>
          {sticker.team}
        </p>
      </div>

      {/* Controles de Repetidos (Aparecen al hacer hover o si ya tiene repetidos) */}
      <div 
        onClick={(e) => e.stopPropagation()} // Evita que al sumar repetidos se desmarque el cromo
        className={cn(
          "absolute bottom-0 left-0 right-0 h-10 bg-black/60 backdrop-blur-md flex items-center justify-between px-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20",
          duplicates > 0 && "translate-y-0" // Siempre visible si hay repetidos
        )}
      >
        <button 
          onClick={() => removeDuplicate(sticker.id)}
          disabled={duplicates === 0}
          className="p-1 rounded-md text-white/70 hover:bg-white/20 hover:text-red-400 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        >
          <Minus size={14} strokeWidth={3} />
        </button>
        
        <span className="text-xs font-bold text-white font-mono">
          {duplicates}
        </span>
        
        <button 
          onClick={() => addDuplicate(sticker.id)}
          className="p-1 rounded-md text-white/70 hover:bg-white/20 hover:text-emerald-400 transition-colors"
        >
          <Plus size={14} strokeWidth={3} />
        </button>
      </div>

      {/* Badge Flotante de Repetidos (Notificación estilo iOS) */}
      {duplicates > 0 && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black min-w-[20px] h-[20px] flex items-center justify-center rounded-full shadow-lg border-2 border-slate-900 z-30"
        >
          {duplicates}
        </motion.div>
      )}
    </motion.div>
  );
};