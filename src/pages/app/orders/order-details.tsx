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

export function OrderDetails() {
  return (
    <DialogContent className="max-h-screen overflow-auto md:max-h-[90vh]">
      <DialogHeader>
        <DialogTitle>Pedido: qskjd939k39k9k39</DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  <span className="font-medium text-muted-foreground">Pendente</span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Cliente</TableCell>
              <TableCell className="flex justify-end">Willian Moreno</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Telefone</TableCell>
              <TableCell className="flex justify-end">(11) 99999-9999</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">E-mail</TableCell>
              <TableCell className="flex justify-end">willian_moreno@outlook.com</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Realizado há</TableCell>
              <TableCell className="flex justify-end">há 3 minutos</TableCell>
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
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>Pizza quatro queijos</TableCell>
                <TableCell className="text-right">2</TableCell>
                <TableCell className="text-right">R$ 50,00</TableCell>
                <TableCell className="text-right">R$ 100,00</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total do pedido</TableCell>
              <TableCell className="text-right font-medium">R$ 500,00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </DialogContent>
  )
}
