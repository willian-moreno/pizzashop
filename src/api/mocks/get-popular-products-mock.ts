import { http, HttpResponse } from 'msw'
import { GetPopularProductsResponse } from '../get-popular-products'

export const getPopularProductsMock = http.get<never, never, GetPopularProductsResponse>(
  '/metrics/popular-products',
  async () => {
    return HttpResponse.json([
      { product: 'Pizza 01', amount: 54.99 },
      { product: 'Pizza 02', amount: 55.99 },
      { product: 'Pizza 03', amount: 63.99 },
      { product: 'Pizza 04', amount: 54.99 },
      { product: 'Pizza 05', amount: 70.99 },
    ])
  },
)
