import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

const orderFiltersSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
})

type OrderFiltersSchema = z.infer<typeof orderFiltersSchema>

export function OrderTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('orderId') ?? ''
  const customerName = searchParams.get('customerName') ?? ''
  const status = searchParams.get('status') ?? 'all'

  const { register, handleSubmit, control, reset } = useForm<OrderFiltersSchema>({
    resolver: zodResolver(orderFiltersSchema),
    defaultValues: {
      orderId,
      customerName,
      status,
    },
  })

  function handleFilter({ orderId, customerName, status }: OrderFiltersSchema) {
    setSearchParams((state) => {
      changeOrderIdFromURL(state, orderId)
      changeCustomerNameFromURL(state, customerName)
      changeStatusFromURL(state, status)

      state.set('page', '1')

      return state
    })
  }

  function changeOrderIdFromURL(state: URLSearchParams, orderId?: string) {
    if (orderId && orderId.length) {
      state.set('orderId', orderId)
      return
    }

    state.delete('orderId')
  }

  function changeCustomerNameFromURL(state: URLSearchParams, customerName?: string) {
    if (customerName && customerName.length) {
      state.set('customerName', customerName)
      return
    }

    state.delete('customerName')
  }

  function changeStatusFromURL(state: URLSearchParams, status?: string) {
    if (status && status !== 'all') {
      state.set('status', status)
      return
    }

    state.delete('status')
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete('orderId')
      state.delete('customerName')
      state.delete('status')

      state.set('page', '1')

      return state
    })

    reset({
      orderId: '',
      customerName: '',
      status: 'all',
    })
  }

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit(handleFilter)}>
      <span className="text-sm font-semibold">Filtros:</span>
      <Input
        type="search"
        className="h-8 w-auto"
        placeholder="ID do pedido"
        {...register('orderId')}
      />
      <Input
        type="search"
        className="h-8 w-[320px]"
        placeholder="Nome do cliente"
        {...register('customerName')}
      />
      <Controller
        name="status"
        control={control}
        render={({ field: { name, value, disabled, onChange } }) => (
          <Select
            defaultValue="all"
            name={name}
            value={value}
            disabled={disabled}
            onValueChange={onChange}
          >
            <SelectTrigger className="h-8 w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="canceled">Cancelado</SelectItem>
              <SelectItem value="processing">Em preparo</SelectItem>
              <SelectItem value="delivering">Em entrega</SelectItem>
              <SelectItem value="delivered">Entregue</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      <Button type="submit" variant="secondary" size="xs">
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>

      <Button type="button" variant="outline" size="xs" onClick={handleClearFilters}>
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  )
}
