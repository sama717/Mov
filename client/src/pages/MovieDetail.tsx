import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getMovie, getShowtimes } from '../lib/api'
import type { MovieDetailInterface } from '../types/movie'
import type { Showtime } from '../types/showtime'

function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState<MovieDetailInterface | null>(null)
  const [showtimes, setShowtimes] = useState<Showtime[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      Promise.all([getMovie(id), getShowtimes(id)])
        .then(([movieData, showtimesData]) => {
          setMovie(movieData)
          setShowtimes(showtimesData)
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

      <h2>Showtimes</h2>
      {showtimes.length === 0 ? (
        <p>No showtimes available</p>
      ) : (
          showtimes.map(showtime => (
            <div key={showtime.id} onClick={() => navigate(`/booking/${showtime.id}`)}>
              <p>{new Date(showtime.startsAt).toLocaleString()}</p>
              <p>{showtime.hall.name}</p>
              <p>${showtime.price.toFixed(2)}</p>
            </div>
          ))
        )}
    </div>
  )
}

export default MovieDetail