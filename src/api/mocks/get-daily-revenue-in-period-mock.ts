import { http, HttpResponse } from 'msw'
import { GetDailyRevenueInPeriodResponse } from '../get-daily-revenue-in-period'

const oneDay = 1000 * 60 * 60 * 24

const dailyRevenueInPeriod = [
  {
    date: new Date().toLocaleDateString(),
    receipt: 1568,
  },
  {
    date: new Date(Date.now() + oneDay).toLocaleDateString(),
    receipt: 2005,
  },
  {
    date: new Date(Date.now() + oneDay * 2).toLocaleDateString(),
    receipt: 1798,
  },
  {
    date: new Date(Date.now() + oneDay * 3).toLocaleDateString(),
    receipt: 1856,
  },
  {
    date: new Date(Date.now() + oneDay * 4).toLocaleDateString(),
    receipt: 2564,
  },
  {
    date: new Date(Date.now() + oneDay * 5).toLocaleDateString(),
    receipt: 1965,
  },
]

export const getDailyRevenueInPeriodMock = http.get<never, never, GetDailyRevenueInPeriodResponse>(
  '/metrics/daily-receipt-in-period',
  async ({ request }) => {
    const { searchParams } = new URL(request.url)

    const from = searchParams.get('from')
    const to = searchParams.get('to') ?? from

    let filteredDailyRevenueInPeriod = dailyRevenueInPeriod

    if (from && to) {
      const fromDate = new Date(from)
      const toDate = new Date(to)

      filteredDailyRevenueInPeriod = filteredDailyRevenueInPeriod.filter((item) => {
        const [day, month, year] = item.date.split('/')
        const currentDate = new Date(+year, +month - 1, +day)

        return currentDate >= fromDate && currentDate <= toDate
      })
    }

    return HttpResponse.json(filteredDailyRevenueInPeriod)
  },
)
