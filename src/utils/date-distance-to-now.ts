import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function dateDistanceToNow(date: string | number | Date) {
  const distance = formatDistanceToNow(date, {
    locale: ptBR,
    addSuffix: true,
  })

  return distance
}