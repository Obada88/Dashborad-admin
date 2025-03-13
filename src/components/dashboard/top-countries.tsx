'use client'

import { Cell, Pie, PieChart, ResponsiveContainer, Legend } from "recharts"

const data = [
  { name: "United States", value: 35, color: "#8884d8" },
  { name: "Canada", value: 25, color: "#82ca9d" },
  { name: "United Kingdom", value: 20, color: "#ffc658" },
  { name: "Australia", value: 15, color: "#ff8042" },
]

export function TopCountries() {
  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend
            verticalAlign="middle"
            align="right"
            layout="vertical"
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
} 