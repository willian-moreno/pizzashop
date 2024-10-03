import { render } from '@testing-library/react'
import { OrderStatus } from './order-status'

describe('Order Status', () => {
  it('should display the right text when order status is pending', () => {
    const wrapper = render(<OrderStatus status="pending" />)

    const badgeElement = wrapper.getByTestId('badge')
    const statusTextElement = wrapper.getByText('Pendente')

    expect(badgeElement).toHaveClass('bg-slate-400')
    expect(statusTextElement).toBeInTheDocument()
  })

  it('should display the right text when order status is canceled', () => {
    const wrapper = render(<OrderStatus status="canceled" />)

    const badgeElement = wrapper.getByTestId('badge')
    const statusTextElement = wrapper.getByText('Cancelado')

    expect(badgeElement).toHaveClass('bg-rose-500')
    expect(statusTextElement).toBeInTheDocument()
  })

  it('should display the right text when order status is delivered', () => {
    const wrapper = render(<OrderStatus status="delivered" />)

    const badgeElement = wrapper.getByTestId('badge')
    const statusTextElement = wrapper.getByText('Entregue')

    expect(badgeElement).toHaveClass('bg-emerald-500')
    expect(statusTextElement).toBeInTheDocument()
  })

  it('should display the right text when order status is delivering', () => {
    const wrapper = render(<OrderStatus status="delivering" />)

    const badgeElement = wrapper.getByTestId('badge')
    const statusTextElement = wrapper.getByText('Em entrega')

    expect(badgeElement).toHaveClass('bg-amber-500')
    expect(statusTextElement).toBeInTheDocument()
  })

  it('should display the right text when order status is processing', () => {
    const wrapper = render(<OrderStatus status="processing" />)

    const badgeElement = wrapper.getByTestId('badge')
    const statusTextElement = wrapper.getByText('Em preparo')

    expect(badgeElement).toHaveClass('bg-amber-500')
    expect(statusTextElement).toBeInTheDocument()
  })
})
