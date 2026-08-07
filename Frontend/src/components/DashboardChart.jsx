import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
  "#EC4899",
  "#10B981",
];

function DashboardChart({ departmentStats }) {

  const data = departmentStats.map((item) => ({
    name: item.department,
    value: item.count,
  }));

  if (data.length === 0) {

    return (

      <div
        style={{
          height: 350,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#94A3B8",
          fontSize: "16px",
        }}
      >

        No Department Data Available

      </div>

    );

  }

  return (

    <div
      style={{
        width: "100%",
        height: 350,
      }}
    >

      <ResponsiveContainer>

        <PieChart>

          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={120}
            innerRadius={70}
            paddingAngle={4}
            dataKey="value"
          >

            {data.map((entry, index) => (

              <Cell
                key={index}
                fill={
                  COLORS[
                    index % COLORS.length
                  ]
                }
              />

            ))}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>

  );

}

export default DashboardChart;