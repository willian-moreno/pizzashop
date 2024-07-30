import { approveOrder } from '@/api/approve-order'
import { cancelOrder } from '@/api/cancel-order'
import { deliverOrder } from '@/api/deliver-order'
import { dispatchOrder } from '@/api/dispatch-order'
import { GetOrdersResponse, Order } from '@/api/get-orders'
import { OrderStatus } from '@/components/order-status'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { dateDistanceToNow } from '@/utils/date-distance-to-now'
import { priceFormatter } from '@/utils/price-formatter'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { OrderDetails } from './order-details'

interface OrderTableRowProps {
  order: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const queryClient = useQueryClient()

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } = useMutation({
    mutationFn: approveOrder,
    onSuccess(_, { orderId }) {
      updateOrderCache(orderId, (order) => {
        return {
          ...order,
          status: 'processing',
        }
      })
    },
  })

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } = useMutation({
    mutationFn: cancelOrder,
    onSuccess(_, { orderId }) {
      updateOrderCache(orderId, (order) => {
        return {
          ...order,
          status: 'canceled',
        }
      })
    },
  })

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } = useMutation({
    mutationFn: dispatchOrder,
    onSuccess(_, { orderId }) {
      updateOrderCache(orderId, (order) => {
        return {
          ...order,
          status: 'delivering',
        }
      })
    },
  })

  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } = useMutation({
    mutationFn: deliverOrder,
    onSuccess(_, { orderId }) {
      updateOrderCache(orderId, (order) => {
        return {
          ...order,
          status: 'delivered',
        }
      })
    },
  })

  function updateOrderCache(orderId: string, updateCallback: (order: Order) => Order) {
    const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders'],
    })

    for (let index = 0; index < ordersListCache.length; index++) {
      const [cacheKey, cacheData] = ordersListCache[index]

      if (!cacheData) {
        continue
      }

      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId !== orderId) {
            return order
          }

          const newOrder = updateCallback(order)

          return newOrder
        }),
      })
    }
  }

  async function handleApproveOrder() {
    try {
      await approveOrderFn({ orderId: order.orderId })

      toast.success('Pedido aprovado com sucesso.')
    } catch (error) {
      toast.error('Erro ao aprovar o pedido.')
    }
  }

  async function handleCancelOrder() {
    try {
      await cancelOrderFn({ orderId: order.orderId })

      toast.success('Pedido cancelado com sucesso.')
    } catch (error) {
      toast.error('Erro ao cancelar o pedido.')
    }
  }

  async function handleDispatchOrder() {
    try {
      await dispatchOrderFn({ orderId: order.orderId })

      toast.success('Pedido enviado com sucesso.')
    } catch (error) {
      toast.error('Erro ao atualizar o envio do pedido.')
    }
  }

  async function handleDeliverOrder() {
    try {
      await deliverOrderFn({ orderId: order.orderId })

      toast.success('Pedido entregue com sucesso.')
    } catch (error) {
      toast.error('Erro ao atualizar a entrega do pedido.')
    }
  }

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails orderId={order.orderId} isDetailOpen={isDetailOpen} />
        </Dialog>
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">{order.orderId}</TableCell>

      <TableCell className="text-muted-foreground">{dateDistanceToNow(order.createdAt)}</TableCell>

      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>

      <TableCell className="font-medium">{order.customerName}</TableCell>

      <TableCell className="font-medium">{priceFormatter.format(order.total)}</TableCell>

      <TableCell>
        {order.status === 'pending' && (
          <Button
            variant="outline"
            size="xs"
            disabled={isApprovingOrder}
            onClick={handleApproveOrder}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Aprovar
          </Button>
        )}

        {order.status === 'processing' && (
          <Button
            variant="outline"
            size="xs"
            disabled={isDispatchingOrder}
            onClick={handleDispatchOrder}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Em entrega
          </Button>
        )}

        {order.status === 'delivering' && (
          <Button
            variant="outline"
            size="xs"
            disabled={isDeliveringOrder}
            onClick={handleDeliverOrder}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Entregue
          </Button>
        )}
      </TableCell>

      <TableCell>
        {['pending', 'processing'].includes(order.status) && (
          <Button variant="ghost" size="xs" disabled={isCancelingOrder} onClick={handleCancelOrder}>
            <X className="mr-2 h-3 w-3" />
            Cancelar
          </Button>
        )}
      </TableCell>
    </TableRow>
  )
}
