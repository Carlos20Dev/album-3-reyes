// types/user.ts

export interface StickerProgress {
  obtained: boolean;
  duplicates: number;
}

// Un diccionario (Record) donde la clave es el ID del cromo (ej: "17" o "T-1")
export interface UserProgress {
  [stickerId: string]: StickerProgress;
}