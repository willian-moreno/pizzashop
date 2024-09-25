import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function OrderDetailsTableSkeleton() {
  return (
    <>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="text-muted-foreground">Status</TableCell>
            <TableCell className="flex justify-end">
              <span className="flex items-center gap-2">
                <Skeleton className="h-2 w-2 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </span>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-muted-foreground">Cliente</TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-4 w-[164px]" />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-muted-foreground">Telefone</TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-4 w-[140px]" />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-muted-foreground">E-mail</TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-4 w-[200px]" />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="text-muted-foreground">Realizado há</TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-4 w-[148px]" />
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
          {Array.from({ length: 2 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-4 w-[120px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="ml-auto h-4 w-3" />
              </TableCell>
              <TableCell>
                <Skeleton className="ml-auto h-4 w-10" />
              </TableCell>
              <TableCell>
                <Skeleton className="ml-auto h-4 w-10" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total do pedido</TableCell>
            <TableCell>
              <Skeleton className="ml-auto h-4 w-20" />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  )
}
