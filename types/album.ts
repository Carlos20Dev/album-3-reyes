// types/album.ts

export type Rarity = 'normal' | 'silver' | 'gold';

export type StickerType = 
  | 'team' 
  | 'coach' 
  | 'goalkeeper' 
  | 'defender' 
  | 'midfielder' 
  | 'forward' 
  | 'stadium' 
  | 'historic' 
  | 'special';

export interface Sticker {
  id: string;          // Ej: "17", "T-1"
  number: string;      // Ej: "17", "T-1" (Usamos string para soportar los alfanuméricos)
  name: string;
  type: StickerType;
  team: string;
  group: string;
  rarity: Rarity;
}

export interface Section {
  title: string;
  stickers: Sticker[];
}

export interface Page {
  pageNumber: number;
  sections: Section[];
}

export interface Sheet {
  id: number;
  pages: [Page, Page] | [Page]; // Soporta hojas de 2 páginas o de 1 página (como contraportadas)
}

export interface CoverMetadata {
  description: string;
  type: string;
}

export interface Album {
  id: string;
  title: string;
  totalStickers: number;
  covers: {
    front: CoverMetadata;
    back: CoverMetadata;
  };
  sheets: Sheet[];
}