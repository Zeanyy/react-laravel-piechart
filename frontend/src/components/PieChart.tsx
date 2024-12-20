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

    return (
        <Chart
            chartType="PieChart"
            width="100%"
            height="400px"
            data={pieChartData}
      />
    )
}

export default PieChart;