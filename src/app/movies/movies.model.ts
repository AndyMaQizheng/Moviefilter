// Define interface that matches JSON structure
export interface Movie {
    id: string;
    imdbId: string;
    popularity: number;
    budget: number;
    revenue: number;
    title: string;
    cast: string[];
    homepage: string;
    directors: string[];
    short_summary: string;
    genres: string[];
    production_companies: string[];
    release_year: string;
    relevance: number;
  }