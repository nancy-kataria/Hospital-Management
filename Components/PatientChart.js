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
    name: "Air Ambulance",
    pv: 63,
    amt: 2400,
  },
  {
    name: "Ground Ambulance",
    pv: 51,
    amt: 2210,
  },
  {
    name: "Emergency Department",
    pv: 22,
    amt: 2290,
  },
  {
    name: "OPD",
    pv: 19,
    amt: 2000,
  },
  {
    name: "Elective Impatient Care",
    pv: 9,
    amt: 2181,
  },
];

function PatientChart() {
  return (
    <div className="statistics">
      <div className="chart">
        <h2>Percentage of Visits</h2>
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
    </div>
  );
}

export default PatientChart;
