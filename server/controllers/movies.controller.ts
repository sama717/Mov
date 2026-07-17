import { Request, Response } from 'express'
import axios from 'axios'

const TMDB_BASE = 'https://api.themoviedb.org/3'
const TMDB_API_KEY = process.env.TMDB_API

export const getNowPlaying = async (_req: Request, res: Response) => {
    try {
        const { data } = await axios.get(`${TMDB_BASE}/movie/now_playing`, {
            params: {
                api_key: TMDB_API_KEY,
                language: 'en-US',
                page: 1
            }
        })
        res.json(data.results)
    } catch (error) {
        console.log('error:', error)
        res.status(500).json({ message: 'Failed to fetch movies' })
    }
}

export const getMovieById = async (req: Request, res: Response) => {
    try {
        const { data } = await axios.get(`${TMDB_BASE}/movie/${req.params.id}`, {
            params: {
                api_key: process.env.TMDB_API,
                language: 'en-US'
            }
        })
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch movie' })
    }
}