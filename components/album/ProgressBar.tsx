'use client';

import { motion } from 'framer-motion';
import { useAlbumStore } from '@/store/useAlbumStore';
import albumData from '@/data/album.json';

export const ProgressBar = () => {
  // Suscribirnos a los cambios de progreso
  const progress = useAlbumStore((state) => state.progress);
  
  const totalStickers = albumData.totalStickers;
  
  // Calcular estadísticas en tiempo real
  const obtainedCount = Object.values(progress).filter((p) => p.obtained).length;
  const duplicatesCount = Object.values(progress).reduce((acc, curr) => acc + curr.duplicates, 0);
  
  const percentage = totalStickers === 0 ? 0 : Math.round((obtainedCount / totalStickers) * 100);

  return (
    <div className="w-full max-w-3xl mx-auto mb-8 bg-slate-900/60 backdrop-blur-md border border-slate-700/50 p-4 md:p-6 rounded-2xl shadow-xl">
      
      {/* Cabecera de Estadísticas */}
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Tu Colección</h2>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              {percentage}%
            </span>
            <span className="text-slate-500 text-sm font-mono tracking-tighter">COMPLETADO</span>
          </div>
        </div>

        <div className="flex gap-4 text-right">
          <div>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">Cromos</p>
            <p className="text-slate-200 font-mono font-bold">
              {obtainedCount} <span className="text-slate-600">/</span> {totalStickers}
            </p>
          </div>
          <div>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">Repetidos</p>
            <p className="text-amber-400 font-mono font-bold">{duplicatesCount}</p>
          </div>
        </div>
      </div>

      {/* Barra visual de progreso con Framer Motion */}
      <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 relative"
        >
          {/* Brillo interno de la barra */}
          <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
};