import { api } from '@/lib/axios';

export interface GetOrdersQuery {
  pageIndex?: number | null
}

export type Order = {
  orderId: string
  createdAt: string
  status: "pending" | "canceled" | "processing" | "delivering" | "delivered"
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

export async function getOrders({ pageIndex }: GetOrdersQuery) {
  const response = await api.get<GetOrdersResponse>('/orders', {
    params: {
      pageIndex: pageIndex ?? 0,
    }
  })

  return response.data
}