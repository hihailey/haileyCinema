/**
 * Typescript interface
 */

// Interface of MovieList
export interface MovieList {
  Search: Movie[];
  totalResult: string;
  Response: string;
  Error: string;
}

// Interface of Movie
export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

// Interface of Movie Detail
export interface MovieData extends Movie {
  Genre: string;
  Released: string;
  Director: string;
  Writer: string;
  Runtime: string;
  Country: string;
}
