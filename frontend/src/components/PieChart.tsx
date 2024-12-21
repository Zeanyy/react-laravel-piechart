import { Chart } from "react-google-charts";

interface IPieChartItem {
    name: string,
    quantity: number,
}

interface IPieChartData {
    data: IPieChartItem[]
}

function PieChart({data}: IPieChartData) {
    
    const pieChartData = [
        ['Nazwa', 'Ilość'],
        ...data.map(item => [item.name, item.quantity])
    ]

    const options = {
        pieStartAngle: 100,
        sliceVisibilityThreshold: 0.02,
        legend: {
          position: "bottom",
          alignment: "center",
          textStyle: {
            color: "#233238",
            fontSize: 14,
          },
        },
      };

    return (
        <Chart
            chartType="PieChart"
            width="100%"
            height="400px"
            data={pieChartData}
            options={options}
      />
    )
}

export default PieChart;