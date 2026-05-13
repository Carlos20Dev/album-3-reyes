'use client';

import { useState } from 'react'; // <-- AGREGAR useState
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'; // <-- AGREGAR Search
import { useAlbumStore } from '@/store/useAlbumStore';
import { PageViewer } from './PageViewer';
import { ProgressBar } from './ProgressBar';
import { FiltersBar } from './FilterBar';
import { NavigationModal } from './NavigationModal'; // <-- IMPORTAR EL MODAL
import albumData from '@/data/album.json';
import { Album } from '@/types/album';

const album = albumData as unknown as Album;

export const AlbumViewer = () => {
  const currentPageIndex = useAlbumStore((state) => state.currentPageIndex);
  const setPageIndex = useAlbumStore((state) => state.setPageIndex);
  
  // <-- NUEVO ESTADO PARA EL MODAL
  const [isNavOpen, setIsNavOpen] = useState(false); 

  const currentSheet = album.sheets[currentPageIndex];

  const handlePrev = () => {
    if (currentPageIndex > 0) setPageIndex(currentPageIndex - 1);
  };

  const handleNext = () => {
    if (currentPageIndex < album.sheets.length - 1) setPageIndex(currentPageIndex + 1);
  };

  if (!currentSheet) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 pb-32 pt-6 md:pt-10 flex flex-col items-center min-h-screen">
      
      {/* Nuestro Modal de Navegación */}
      <NavigationModal isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />

      <ProgressBar />
      <FiltersBar />

      <div className="w-full relative perspective-[2000px]">
        <AnimatePresence mode="wait">
          {/* ... (Todo el código de motion.div y PageViewer queda exactamente igual) ... */}
          <motion.div
            key={currentPageIndex}
            initial={{ opacity: 0, rotateY: 15, scale: 0.95 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: -15, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col md:flex-row gap-4 md:gap-8 w-full"
          >
            {currentSheet.pages.map((page) => (
              <PageViewer key={`page-${page.pageNumber}`} page={page} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* BARRA DE NAVEGACIÓN ACTUALIZADA */}
      <div className="fixed bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-950/90 backdrop-blur-2xl p-2 rounded-full border border-slate-800 shadow-[0_0_40px_rgba(0,0,0,0.8)] z-40">
        
        <button
          onClick={handlePrev}
          disabled={currentPageIndex === 0}
          className="p-3 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-full disabled:opacity-30 disabled:hover:text-slate-400 disabled:hover:bg-transparent transition-all cursor-pointer"
        >
          <ChevronLeft size={24} />
        </button>

        {/* ESTE AHORA ES UN BOTÓN CLICKABLE */}
        <button 
          onClick={() => setIsNavOpen(true)}
          className="flex flex-col items-center justify-center min-w-[140px] h-full px-4 py-2 rounded-full hover:bg-slate-800 transition-colors group cursor-pointer"
        >
          <span className="flex items-center gap-1 text-[10px] text-slate-500 group-hover:text-emerald-500 transition-colors font-bold uppercase tracking-[0.2em] mb-0.5">
            <Search size={10} strokeWidth={3} /> Buscar País
          </span>
          <span className="font-mono font-black text-slate-100 text-base">
            Hoja {currentPageIndex + 1} <span className="text-slate-600 font-normal">/</span> {album.sheets.length}
          </span>
        </button>

        <button
          onClick={handleNext}
          disabled={currentPageIndex === album.sheets.length - 1}
          className="p-3 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-full disabled:opacity-30 disabled:hover:text-slate-400 disabled:hover:bg-transparent transition-all cursor-pointer"
        >
          <ChevronRight size={24} />
        </button>
      </div>

    </div>
  );
};