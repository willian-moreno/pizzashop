import { TableCell, TableRow } from '@/components/ui/table'
import { priceFormatter } from '@/utils/price-formatter'

interface OrderDetailsTableRowProps {
  item: {
    id: string
    product: {
      name: string
    }
    priceInCents: number
    quantity: number
  }
}

export function OrderDetailsTableRow({ item }: OrderDetailsTableRowProps) {
  const price = priceFormatter.format(item.priceInCents / 100)
  const subtotal = priceFormatter.format((item.priceInCents / 100) * item.quantity)

  return (
    <TableRow>
      <TableCell>{item.product.name}</TableCell>
      <TableCell className="text-right">{item.quantity}</TableCell>
      <TableCell className="text-right">{price}</TableCell>
      <TableCell className="text-right">{subtotal}</TableCell>
    </TableRow>
  )
}
