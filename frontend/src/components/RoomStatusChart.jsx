import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import "../styling/components/RoomStatusChart.scss";

ChartJS.register(ArcElement, Tooltip);

export default function RoomStatusChart({ occupied = 0, available = 0 }) {
  const data = {
    labels: ["Occupied", "Available"],
    datasets: [
      {
        data: [occupied, available],
        backgroundColor: ["#317ac4", "#f14a68"],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };
  const options = {
    maintainAspectRatio: true,
    responsive: true,
    plugins: {
      legend: { display: false },
    },
  };
  console.log("RoomStatusChart data:", { occupied, available });

  return (
    <div className="room-status-chart">
      <div className="chart-wrapper">
        <Pie data={data} options={options} />
      </div>
      <div className="legend">
        <span className="occupied">Occupied</span>
        <span className="available">Available</span>
      </div>
    </div>
  );
}
