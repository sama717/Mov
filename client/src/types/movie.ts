export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string
  release_date: string
  vote_average: number
}

export interface MovieDetailInterface extends Movie {
  runtime: number
  genres: { id: number; name: string }[]
  tagline: string
  status: string
  backdrop_path: string
}