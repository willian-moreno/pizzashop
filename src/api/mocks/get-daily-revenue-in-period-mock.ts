import { http, HttpResponse } from 'msw'
import { GetDailyRevenueInPeriodResponse } from '../get-daily-revenue-in-period'

export const getDailyRevenueInPeriodMock = http.get<never, never, GetDailyRevenueInPeriodResponse>(
  '/metrics/daily-receipt-in-period',
  async () => {
    const oneDay = 1000 * 60 * 60 * 24

    return HttpResponse.json([
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
    ])
  },
)
