import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DashboardChart({ departmentStats = [] }) {
  const labels = departmentStats.map(
    (item) => item.department
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Students",
        data: departmentStats.map((item) => item.count),
        backgroundColor: [
          "#0d6efd",
          "#198754",
          "#ffc107",
          "#dc3545",
          "#6f42c1",
          "#20c997",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Students by Department",
      },
    },
  };

  return (
    <div className="card shadow mt-4">
      <div className="card-body">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default DashboardChart;