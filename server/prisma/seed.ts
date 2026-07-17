import 'dotenv/config'
import { PrismaClient } from '../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  const hall = await prisma.hall.create({
    data: {
      name: 'Hall A',
      capacity: 50,
    }
  })

  const seatData: { row: string; number: number }[] = [
    { row: 'A', number: 1 },
    { row: 'A', number: 2 },
    { row: 'A', number: 3 },
    { row: 'B', number: 1 },
    { row: 'B', number: 2 },
  ]

  const seats = await Promise.all(
    seatData.map((seat: { row: string; number: number }) => prisma.seat.create({
      data: { ...seat, hallId: hall.id }
    }))
  )

  const showtime = await prisma.showtime.create({
    data: {
      tmdbId: 1339713,
      hallId: hall.id,
      startsAt: new Date('2026-07-15T19:00:00.000Z'),
      price: 12.50,
    }
  })

  await Promise.all(
    seats.map((seat: { id: string }) => prisma.showtimeSeat.create({
      data: {
        showtimeId: showtime.id,
        seatId: seat.id,
        status: 'AVAILABLE'
      }
    }))
  )

  console.log('Seeded successfully')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())