import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getMovie } from '../lib/api'
import type { MovieDetailInterface } from '../types/movie'

function MovieDetail() {
  const { id } = useParams()
  const [movie, setMovie] = useState<MovieDetailInterface | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      getMovie(id).then(data => {
        setMovie(data)
        setLoading(false)
      })
    }
  }, [id])

  if (loading) return <p>Loading...</p>
  if (!movie) return <p>Movie not found</p>

  return (
    <div>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie?.title}
      />
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <p>{movie.release_date}</p>
      <p>{movie.vote_average}/10</p>
    </div>
  )
}

export default MovieDetail