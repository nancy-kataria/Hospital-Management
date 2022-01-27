import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
  } from "recharts";


  const data = [
    {
      name: "Nancy",
      pv: 3,
      amt: 2400,
    },
    {
      name: "Nikhil",
      pv: 7,
      amt: 2210,
    },
    {
      name: "Maya",
      pv: 12,
      amt: 2290,
    },
    {
      name: "Jatin",
      pv: 9,
      amt: 2000,
    },
    {
      name: "Siddarth",
      pv: 5,
      amt: 2181,
    },
    {
      name: "Scooby",
      pv: 2,
      amt: 2500,
    },
    {
      name: "Anoop",
      pv: 1,
      amt: 2100,
    },
  ];

export default function StaffChart() {
  return <div className="statistics">
        <div className="chart">
      <h2>Working Statistics</h2>
      <LineChart
        width={700}
        height={400}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
      </div>
      <img
        src="https://i.pinimg.com/736x/a6/74/c2/a674c29ddf986e8ad938ac942574f6c5.jpg"
        alt="doctor"
      ></img>
  </div>;
}
