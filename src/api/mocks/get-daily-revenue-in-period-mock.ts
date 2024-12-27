import { http, HttpResponse } from 'msw'
import { GetDailyRevenueInPeriodResponse } from '../get-daily-revenue-in-period'

export const getDailyRevenueInPeriodMock = http.get<never, never, GetDailyRevenueInPeriodResponse>(
  '/metrics/daily-receipt-in-period',
  async () => {
    return HttpResponse.json([
      {
        date: '01/01/2024',
        receipt: 1568,
      },
      {
        date: '03/02/2024',
        receipt: 2005,
      },
      {
        date: '11/03/2024',
        receipt: 1798,
      },
      {
        date: '12/03/2024',
        receipt: 502,
      },
      {
        date: '17/07/2024',
        receipt: 4256,
      },
    ])
  },
)
