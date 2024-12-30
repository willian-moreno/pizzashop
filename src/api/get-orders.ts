import { api } from '@/lib/axios'

export interface GetOrdersQuery {
  orderId?: string | null
  customerName?: string | null
  status?: string | null
  pageIndex?: number | null
}

export type OrderStatus = 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'

export type Order = {
  orderId: string
  createdAt: string
  status: OrderStatus
  customerName: string
  total: number
}

export type Meta = {
  pageIndex: number
  perPage: number
  totalCount: number
}

export interface GetOrdersResponse {
  orders: Order[]
  meta: Meta
}

export async function getOrders({ orderId, customerName, status, pageIndex }: GetOrdersQuery) {
  const response = await api.get<GetOrdersResponse>('/orders', {
    params: {
      orderId,
      customerName,
      status,
      pageIndex: pageIndex ?? 0,
    },
  })

  return response.data
}
