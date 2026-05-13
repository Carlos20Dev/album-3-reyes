import { AlbumViewer } from '@/components/album/AlbumViewer';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 relative overflow-hidden text-slate-200 font-sans selection:bg-emerald-500/30">
      
      {/* Efectos de fondo (Glows radiales para dar look premium) */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Header global simple */}
      <header className="w-full pt-8 pb-4 text-center relative z-10">
        <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 tracking-tighter uppercase drop-shadow-lg">
          Álbum 3 Reyes
        </h1>
        <p className="text-slate-500 mt-2 font-mono text-sm tracking-widest uppercase">
          Mundial 2026
        </p>
      </header>

      {/* Renderizado del Álbum */}
      <AlbumViewer />
      
    </main>
  );
}