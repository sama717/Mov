import { Router } from 'express'
import { getMovieById, getNowPlaying } from '../controllers/movies.controller'

const router = Router()

router.get('/', getNowPlaying)
router.get('/:id', getMovieById)

export default router