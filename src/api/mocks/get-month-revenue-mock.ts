import { http, HttpResponse } from 'msw'
import { GetMonthRevenueResponse } from '../get-month-revenue'

export const getMonthRevenueMock = http.get<never, never, GetMonthRevenueResponse>(
  '/metrics/month-receipt',
  async () => {
    return HttpResponse.json({
      receipt: 458470,
      diffFromLastMonth: 10,
    })
  },
)
