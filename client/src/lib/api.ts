const BASE_URL = 'http://localhost:3000'

export const getMovies = async () => {
    const res = await fetch(`${BASE_URL}/api/movies`)
    if (!res.ok) throw new Error('Failed to fetch movies')
    return res.json()
}

export const getMovie = async (id: string) => {
    const res = await fetch(`${BASE_URL}/api/movies/${id}`)
    if (!res.ok) throw new Error('Failed to fetch movie')
    return res.json()
}