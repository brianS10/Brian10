export interface Perfume {
  id: string;
  nombre: string;
  descripcion?: string;
  imagen_url: string;
  disponible: boolean;
  destacado: boolean;
  created_at: string;
}

export interface PerfumeInsert {
  nombre: string;
  descripcion?: string;
  imagen_url: string;
  disponible?: boolean;
  destacado?: boolean;
}

export interface PerfumeUpdate {
  nombre?: string;
  descripcion?: string;
  imagen_url?: string;
  disponible?: boolean;
  destacado?: boolean;
}
