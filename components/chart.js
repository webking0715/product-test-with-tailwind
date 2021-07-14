import React from "react";
import { Line } from "react-chartjs-2";

export default function Chart({label, pData, borderColor, title}) {
  const generateRangeData = (label, pData, range) => {
    let flag = false;
    const arr = []
    for (var i = 0; i < label.length; i++ ) {
      if (label[i] === 'Today') {
        flag = true
        arr.push(pData[i])
        continue
      } else if (flag) {
        arr.push(pData[i] * range)
        continue
      }
      arr.push(pData[i])
    }
    return arr
  }

  const dataUp = generateRangeData(label, pData, 1.05)
  const dataDown = generateRangeData(label, pData, 0.95)

  const data = {
    labels: [...label],
    datasets: [
      {
        label: "Product " + title,
        data: [...pData],
        fill: false,
        borderColor,
        tension: 0.3
      },
      {
        label: "Range -5%",
        data: [...dataDown],
        fill: true,
        borderColor: "#0249e8",
        backgroundColor: "rgba(255,255,255,0.8)",
        tension: 0.3
      },
      {
        label: "Range +5%",
        data: [...dataUp],
        fill: true,
        borderColor: "#742774",
        backgroundColor: "rgba(116,39,116,0.2)",
        tension: 0.3
      }      
    ],

  };
    return (
    <div className="chart width-80">
      <Line data={data} />
    </div>
  );
}
