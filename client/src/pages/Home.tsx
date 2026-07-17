import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMovies } from '../lib/api'
import type { Movie } from '../types/movie'

function Home() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getMovies()
      .then(data => {
        setMovies(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h1>MOV</h1>
      <div>
        {movies.map(movie => (
          <div key={movie.id} onClick={() => navigate(`/movie/${movie.id}`)} style={{ cursor: 'pointer' }}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <h2>{movie.title}</h2>
            <p>{movie.release_date}</p>
            <p>{movie.vote_average}/10</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home