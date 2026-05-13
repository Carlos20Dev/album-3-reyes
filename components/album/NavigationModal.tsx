'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Map } from 'lucide-react';
import { useAlbumStore } from '@/store/useAlbumStore';
import albumData from '@/data/album.json';

interface NavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NavigationModal = ({ isOpen, onClose }: NavigationModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const setPageIndex = useAlbumStore((state) => state.setPageIndex);

  // Bloquear el scroll del fondo cuando el modal está abierto
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Generar el índice de navegación dinámicamente desde el JSON
  const navigationIndex = useMemo(() => {
    const items: { title: string; sheetIndex: number }[] = [];
    const seenTitles = new Set(); // Para no repetir títulos que ocupan varias páginas (ej: México)

    albumData.sheets.forEach((sheet, index) => {
      sheet.pages.forEach((page) => {
        page.sections.forEach((section) => {
          // Limpiar el título (quitar continuaciones si las hubiera en tu JSON)
          const cleanTitle = section.title.replace(/\(Continuación\)/gi, '').trim();
          
          if (!seenTitles.has(cleanTitle)) {
            seenTitles.add(cleanTitle);
            items.push({ title: cleanTitle, sheetIndex: index });
          }
        });
      });
    });

    return items;
  }, []);

  // Filtrar según lo que escriba el usuario
  const filteredItems = navigationIndex.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (sheetIndex: number) => {
    setPageIndex(sheetIndex);
    setSearchTerm(''); // Limpiamos el buscador
    onClose(); // Cerramos el modal
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 pt-10 pb-20">
          {/* Backdrop con blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Contenedor del Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-slate-900 border border-slate-700 shadow-2xl rounded-2xl overflow-hidden flex flex-col max-h-[80vh]"
          >
            {/* Cabecera y Buscador */}
            <div className="p-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-200 font-black tracking-widest uppercase flex items-center gap-2">
                  <Map className="w-5 h-5 text-emerald-500" />
                  Índice del Álbum
                </h3>
                <button onClick={onClose} className="text-slate-500 hover:text-slate-300 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Buscar país, grupo o sección..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-600 font-mono text-sm"
                />
              </div>
            </div>

            {/* Lista de Resultados */}
            <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center text-slate-500 font-mono text-sm">
                  No se encontraron resultados para "{searchTerm}"
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {filteredItems.map((item) => (
                    <button
                      key={item.title}
                      onClick={() => handleSelect(item.sheetIndex)}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800 transition-colors group text-left"
                    >
                      <span className="text-slate-300 font-bold text-sm truncate group-hover:text-emerald-400 transition-colors">
                        {item.title}
                      </span>
                      <span className="text-slate-600 font-mono text-xs group-hover:text-emerald-500/50 transition-colors">
                        Hoja {item.sheetIndex + 1}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};