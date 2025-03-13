'use client'

import { Bar, BarChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan", sales: 45, volume: 1200 },
  { name: "Feb", sales: 52, volume: 1400 },
  { name: "Mar", sales: 48, volume: 1300 },
  { name: "Apr", sales: 61, volume: 1700 },
  { name: "May", sales: 55, volume: 1500 },
  { name: "Jun", sales: 67, volume: 1800 },
]

export function SalesVolume() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          yAxisId="left"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip />
        <Bar
          dataKey="volume"
          fill="#8884d8"
          radius={[4, 4, 0, 0]}
          yAxisId="left"
        />
        <Line
          type="monotone"
          dataKey="sales"
          stroke="#82ca9d"
          strokeWidth={2}
          yAxisId="right"
          dot={false}
        />
      </BarChart>
    </ResponsiveContainer>
  )
} 