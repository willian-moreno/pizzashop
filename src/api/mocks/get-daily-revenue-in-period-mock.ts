import { subDays } from 'date-fns'
import { http, HttpResponse } from 'msw'
import { GetDailyRevenueInPeriodResponse } from '../get-daily-revenue-in-period'

const dailyRevenueInPeriod = [
  {
    date: subDays(new Date(), 5).toLocaleDateString(),
    receipt: 1568,
  },
  {
    date: subDays(new Date(), 4).toLocaleDateString(),
    receipt: 2005,
  },
  {
    date: subDays(new Date(), 3).toLocaleDateString(),
    receipt: 1798,
  },
  {
    date: subDays(new Date(), 2).toLocaleDateString(),
    receipt: 1856,
  },
  {
    date: subDays(new Date(), 1).toLocaleDateString(),
    receipt: 2564,
  },
  {
    date: new Date().toLocaleDateString(),
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
