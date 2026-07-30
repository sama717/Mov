export interface Showtime {
    id: string
    tmdbId: number
    startsAt: string
    price: number
    hall: {
        id: string
        name: string
        capacity: number
    }
}