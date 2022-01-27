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
      name: "Nikhil",
      pv: 9,
      amt: 2400,
    },
    {
      name: "Maya",
      pv: 3,
      amt: 2210,
    },
    {
      name: "Jatin",
      pv: 1,
      amt: 2290,
    },
    {
      name: "Sunny",
      pv: 4,
      amt: 2000,
    },
    {
      name: "Anoop",
      pv: 1,
      amt: 2181,
    },
    {
      name: "Raveesh",
      pv: 5,
      amt: 2500,
    },
    {
      name: "Harjot",
      pv: 2,
      amt: 2100,
    },
  ];

function DoctorChart() {
  return <div className="statistics">
       <div className="chart">
      <h2>Doctor's Working Statistics</h2>
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

export default DoctorChart;
