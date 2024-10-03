import { render } from '@testing-library/react'
import { OrderStatus, type OrderStatus as OrderStatusType } from './order-status'

describe('Order Status', () => {
  const statusTestCases = [
    { status: 'pending', expectedText: 'Pendente', expectedClass: 'bg-slate-400' },
    { status: 'canceled', expectedText: 'Cancelado', expectedClass: 'bg-rose-500' },
    { status: 'delivered', expectedText: 'Entregue', expectedClass: 'bg-emerald-500' },
    { status: 'delivering', expectedText: 'Em entrega', expectedClass: 'bg-amber-500' },
    { status: 'processing', expectedText: 'Em preparo', expectedClass: 'bg-amber-500' },
  ] as { status: OrderStatusType; expectedText: string; expectedClass: string }[]

  statusTestCases.forEach(({ status, expectedText, expectedClass }) => {
    it(`should display the right text when order status is ${status}`, () => {
      const wrapper = render(<OrderStatus status={status} />)

      const badgeElement = wrapper.getByTestId('badge')
      const statusTextElement = wrapper.getByText(expectedText)

      expect(badgeElement).toHaveClass(expectedClass)
      expect(statusTextElement).toBeInTheDocument()
    })
  })
})
