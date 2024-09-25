import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'
import { Search } from 'lucide-react'

export function OrderTableRowSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Button variant="outline" size="xs" disabled>
          <Search className="h-3 w-3" />
          <span className="sr-only">Detalhes do pedido</span>
        </Button>
      </TableCell>

      <TableCell>
        <Skeleton className="h-4 w-[172px]" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-4 w-[148px]" />
      </TableCell>

      <TableCell>
        <span className="flex items-center gap-2">
          <Skeleton className="h-2 w-2 rounded-full" />
          <Skeleton className="h-4 w-[110px]" />
        </span>
      </TableCell>

      <TableCell>
        <Skeleton className="h-4 w-[200px]" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-4 w-[64px]" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-7 w-[92px]" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-7 w-[92px]" />
      </TableCell>
    </TableRow>
  )
}
