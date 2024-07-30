import { getOrderDetails } from '@/api/get-order-details'
import { OrderStatus } from '@/components/order-status'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { priceFormatter } from '@/utils/price-formatter'
import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { OrderDetailsTableRow } from './order-details-table-row'
import { OrderDetailsTableSkeleton } from './order-details-table-skeleton'

interface OrderDetailsProps {
  orderId: string
  isDetailOpen: boolean
}

export function OrderDetails({ orderId, isDetailOpen }: OrderDetailsProps) {
  const { data: order } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrderDetails({ orderId }),
    enabled: isDetailOpen,
  })

  return (
    <DialogContent className="max-h-screen overflow-auto md:max-h-[90vh]">
      <DialogHeader>
        <DialogTitle>Pedido: {orderId}</DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        {order ? (
          <>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="text-muted-foreground">Status</TableCell>
                  <TableCell className="flex justify-end">
                    <OrderStatus status={order.status} />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-muted-foreground">Cliente</TableCell>
                  <TableCell className="flex justify-end">{order.customer.name}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-muted-foreground">Telefone</TableCell>
                  <TableCell className="flex justify-end">{order.customer.phone}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-muted-foreground">E-mail</TableCell>
                  <TableCell className="flex justify-end">{order.customer.email}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="text-muted-foreground">Realizado há</TableCell>
                  <TableCell className="flex justify-end">
                    {formatDistanceToNow(order.createdAt, {
                      locale: ptBR,
                      addSuffix: true,
                    })}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead className="text-right">Quantidade</TableHead>
                  <TableHead className="text-right">Preço</TableHead>
                  <TableHead className="text-right">Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.orderItems.map((item) => {
                  return <OrderDetailsTableRow key={item.id} item={item} />
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total do pedido</TableCell>
                  <TableCell className="text-right font-medium">
                    {priceFormatter.format(order.totalInCents / 100)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </>
        ) : (
          <OrderDetailsTableSkeleton />
        )}
      </div>
    </DialogContent>
  )
}
