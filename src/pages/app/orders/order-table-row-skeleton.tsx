import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

export function OrderTableRowSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-8 w-8" />
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">
        <Skeleton className="h-4 w-40" />
      </TableCell>

      <TableCell className="text-muted-foreground">
        <Skeleton className="h-4 w-16" />
      </TableCell>

      <TableCell>
        <span className="flex items-center gap-2">
          <Skeleton className="h-2 w-2 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </span>
      </TableCell>

      <TableCell className="font-medium">
        <Skeleton className="h-4 w-96" />
      </TableCell>

      <TableCell className="font-medium">
        <Skeleton className="h-4 w-36" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-7 w-24" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-7 w-24" />
      </TableCell>
    </TableRow>
  )
}
