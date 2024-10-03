export type OrderStatus = 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'

interface OrderStatusProps {
  status: OrderStatus
}

const orderStatusMap: Record<OrderStatus, string> = {
  pending: 'Pendente',
  canceled: 'Cancelado',
  delivered: 'Entregue',
  delivering: 'Em entrega',
  processing: 'Em preparo',
}

export function OrderStatus({ status }: OrderStatusProps) {
  const statusText = orderStatusMap[status]

  return (
    <span className="flex items-center gap-2">
      {status === 'pending' && (
        <span className="h-2 w-2 rounded-full bg-slate-400" data-testid="badge" />
      )}
      {status === 'canceled' && (
        <span className="h-2 w-2 rounded-full bg-rose-500" data-testid="badge" />
      )}
      {status === 'delivered' && (
        <span className="h-2 w-2 rounded-full bg-emerald-500" data-testid="badge" />
      )}
      {['delivering', 'processing'].includes(status) && (
        <span className="h-2 w-2 rounded-full bg-amber-500" data-testid="badge" />
      )}
      <span className="font-medium text-muted-foreground">{statusText}</span>
    </span>
  )
}
