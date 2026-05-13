// store/useAlbumStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserProgress } from '@/types/user';

export type FilterType = 'all' | 'obtained' | 'missing' | 'duplicates';

interface AlbumState {
  // Estado
  progress: UserProgress;
  currentPageIndex: number;
  searchQuery: string;
  filter: FilterType;
  
  // Acciones
  toggleSticker: (id: string) => void;
  addDuplicate: (id: string) => void;
  removeDuplicate: (id: string) => void;
  setPageIndex: (index: number) => void;
  setFilter: (filter: FilterType) => void;
  setSearch: (query: string) => void;
  
  // Selectores derivados (útiles para la UI)
  getStats: () => { totalObtained: number; totalDuplicates: number };
}

export const useAlbumStore = create<AlbumState>()(
  persist(
    (set, get) => ({
      // Estado Inicial
      progress: {},
      currentPageIndex: 0,
      searchQuery: '',
      filter: 'all',

      // Acción: Marcar/Desmarcar como obtenido
      toggleSticker: (id: string) => set((state) => {
        const current = state.progress[id] || { obtained: false, duplicates: 0 };
        return {
          progress: {
            ...state.progress,
            [id]: { ...current, obtained: !current.obtained }
          }
        };
      }),

      // Acción: Sumar repetida
      addDuplicate: (id: string) => set((state) => {
        const current = state.progress[id] || { obtained: false, duplicates: 0 };
        // Si sumamos un repetido, asumimos que lógicamente ya lo tiene obtenido
        return {
          progress: { 
            ...state.progress, 
            [id]: { obtained: true, duplicates: current.duplicates + 1 } 
          }
        };
      }),

      // Acción: Restar repetida
      removeDuplicate: (id: string) => set((state) => {
        const current = state.progress[id];
        if (!current || current.duplicates <= 0) return state; // No bajar de 0
        
        return {
          progress: { 
            ...state.progress, 
            [id]: { ...current, duplicates: current.duplicates - 1 } 
          }
        };
      }),

      // Acciones de Navegación y Filtros
      setPageIndex: (index: number) => set({ currentPageIndex: index }),
      setFilter: (filter: FilterType) => set({ filter }),
      setSearch: (searchQuery: string) => set({ searchQuery }),

      // Selector de Estadísticas Globales
      getStats: () => {
        const progress = get().progress;
        let totalObtained = 0;
        let totalDuplicates = 0;

        Object.values(progress).forEach(sticker => {
          if (sticker.obtained) totalObtained++;
          totalDuplicates += sticker.duplicates;
        });

        return { totalObtained, totalDuplicates };
      }
    }),
    {
      name: 'album-3-reyes-storage', // Nombre de la key en LocalStorage
      storage: createJSONStorage(() => localStorage),
      // ¡Arquitectura Clave! Solo guardamos el 'progress' en LocalStorage. 
      // Filtros y página actual se resetean al recargar, lo cual es mejor UX.
      partialize: (state) => ({ progress: state.progress }), 
    }
  )
);