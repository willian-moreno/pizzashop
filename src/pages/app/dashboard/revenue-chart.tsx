import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import colors from 'tailwindcss/colors'

const data = [
  { date: '10/12', revenue: 1200 },
  { date: '11/12', revenue: 459 },
  { date: '12/12', revenue: 787 },
  { date: '13/12', revenue: 226 },
  { date: '14/12', revenue: 487 },
  { date: '15/12', revenue: 968 },
  { date: '16/12', revenue: 792 },
]

export function RevenueChart() {
  function formatYAxisTick(value: number) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">Receita no período</CardTitle>
          <CardDescription>Receira diária no período</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} style={{ fontSize: 12 }}>
            <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />
            <YAxis
              stroke="#888"
              axisLine={false}
              tickLine={false}
              tickFormatter={formatYAxisTick}
              width={80}
              dx={-16}
            />
            <CartesianGrid vertical={false} className="stroke-muted" />
            <Line type="linear" strokeWidth={2} dataKey="revenue" stroke={colors.violet[500]} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
