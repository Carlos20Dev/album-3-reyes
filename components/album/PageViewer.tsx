'use client';

import { Page } from '@/types/album';
import { SectionViewer } from './SectionViewer';

interface PageViewerProps {
  page: Page;
}

export const PageViewer = ({ page }: PageViewerProps) => {
  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 md:p-6 shadow-2xl flex-1 flex flex-col relative overflow-hidden min-h-[600px]">
      
      {/* Marca de agua decorativa con el número de página */}
      <div className="absolute top-4 right-6 text-slate-800/50 font-black text-8xl select-none pointer-events-none z-0">
        {page.pageNumber}
      </div>

      {/* Contenido de la página (Secciones) */}
      <div className="relative z-10 flex-1">
        {page.sections.map((section, idx) => (
          <SectionViewer key={`${page.pageNumber}-${idx}`} section={section} />
        ))}
      </div>

      {/* Pie de página físico */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 text-center flex justify-between items-center text-slate-500 text-xs font-mono relative z-10">
        <span>ÁLBUM 3 REYES</span>
        <span className="font-bold text-slate-400 bg-slate-800 px-3 py-1 rounded-full">
          Pág. {page.pageNumber}
        </span>
      </div>
    </div>
  );
};