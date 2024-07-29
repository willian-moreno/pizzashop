import { api } from '@/lib/axios';

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

export async function getOrders() {
  const response = await api.get<GetOrdersResponse>('/orders', {
    params: {
      pageIndex: 0,
    }
  })

  return response.data
}