import { api } from '@/lib/axios';

export interface GetOrderDetailsParams {
  orderId: string
}

export interface GetOrderDetailsResponse {
  status: "pending" | "canceled" | "processing" | "delivering" | "delivered"
  id: string
  createdAt: string
  totalInCents: number
  customer: {
    name: string
    email: string
    phone: string | null
  }
  orderItems: {
    id: string
    product: {
      name: string
    }
    priceInCents: number
    quantity: number
  }[]
}

export async function getOrderDetails({ orderId }: GetOrderDetailsParams) {
  const response = await api.get<GetOrderDetailsResponse>(`/orders/${orderId}`)

  return response.data
}