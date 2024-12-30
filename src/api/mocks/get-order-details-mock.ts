import { http, HttpResponse } from 'msw'
import { GetOrderDetailsParams, GetOrderDetailsResponse } from '../get-order-details'

export const getOrderDetailsMock = http.get<GetOrderDetailsParams, never, GetOrderDetailsResponse>(
  '/orders/:orderId',
  async ({ params }) => {
    return HttpResponse.json({
      id: params.orderId,
      customer: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '11987456321',
      },
      status: 'pending',
      orderItems: [
        {
          id: 'custom-order-item-1',
          priceInCents: 5499,
          quantity: 1,
          product: {
            name: 'Pizza 1',
          },
        },
        {
          id: 'custom-order-item-2',
          priceInCents: 8950,
          quantity: 2,
          product: {
            name: 'Pizza 2',
          },
        },
      ],
      totalInCents: 23399,
      createdAt: new Date().toISOString(),
    })
  },
)
