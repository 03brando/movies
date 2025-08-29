export const images = {
  posterBaseUrl: 'https://image.tmdb.org/t/p/original'
};

const sizeMap = {
  poster: {
    small: 'w185',
    medium: 'w342',
    large: 'w500'
  },
  backdrop: {
    small: 'w780',
    large: 'w1280'
  }
} as const;

export function buildImageUrl(path: string | null | undefined, type: 'poster', size?: keyof typeof sizeMap.poster): string;
export function buildImageUrl(path: string | null | undefined, type: 'backdrop', size?: keyof typeof sizeMap.backdrop): string;
export function buildImageUrl(path?: string | null, type: 'poster' | 'backdrop' = 'poster', size?: string) {
  if (!path) return '/placeholder-movie.svg';
  // pick size based on map; fallback to original if missing
  const bucket = type === 'poster' ? sizeMap.poster : sizeMap.backdrop;
  const defaultLabel = type === 'poster' ? 'medium' : 'large';
  const selected = (bucket as Record<string, string>)[size || defaultLabel] ?? 'original';
  return `https://image.tmdb.org/t/p/${selected}${path}`;
}


