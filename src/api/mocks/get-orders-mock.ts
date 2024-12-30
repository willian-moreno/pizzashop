import { OrderStatus } from '@/components/order-status'
import { http, HttpResponse } from 'msw'
import { GetOrdersResponse, Order } from '../get-orders'

const statuses: OrderStatus[] = ['pending', 'canceled', 'processing', 'delivering', 'delivered']

const orders: Order[] = Array.from({ length: 100 }).map((_, index) => {
  return {
    orderId: `custom-order-id-${index + 1}`,
    customerName: `John Doe ${index + 1}`,
    total: 3600,
    status: statuses[index % 5],
    createdAt: new Date().toISOString(),
  }
})

export const getOrdersMock = http.get<never, never, GetOrdersResponse>(
  '/orders',
  async ({ request }) => {
    const { searchParams } = new URL(request.url)

    const pageIndex = Number(searchParams.get('pageIndex') ?? 0)
    const perPage = 10

    const customerName = searchParams.get('customerName')
    const orderId = searchParams.get('orderId')
    const status = searchParams.get('status')

    let filteredOrders = orders

    if (customerName) {
      filteredOrders = filteredOrders.filter((order) => order.customerName.includes(customerName))
    }

    if (orderId) {
      filteredOrders = filteredOrders.filter((order) => order.orderId.includes(orderId))
    }

    if (status) {
      filteredOrders = filteredOrders.filter((order) => order.status === status)
    }

    const paginatedOrders = filteredOrders.slice(pageIndex * perPage, (pageIndex + 1) * perPage)

    return HttpResponse.json({
      orders: paginatedOrders,
      meta: {
        pageIndex,
        perPage,
        totalCount: filteredOrders.length,
      },
    })
  },
)
