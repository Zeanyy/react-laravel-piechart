import { Chart } from "react-google-charts";

interface IPieChartItem {
    name: string,
    quantity: number,
}

interface IPieChartData {
    data: IPieChartItem[]
}

function PieChart({ data }: IPieChartData) {

    const pieChartData = [
        ['Nazwa', 'Ilość'],
        ...data.map(item => [item.name, item.quantity])
    ]

    const options = {
        is3D: true,
        legend: {
            position: "bottom",
            alignment: "center",
            textStyle: {
                color: "#ffffff",
                fontSize: 14,
            },
        },
        backgroundColor: "#3b3b3b",
        colors: ["#27231E", "#3A5253", "#81B29A", "#FFF5F5", "#E07A5F"],
    };

    return (
        <div className="chart-container">
            <Chart
                chartType="PieChart"
                width="100%"
                height="400px"
                data={pieChartData}
                options={options}
            />
        </div>
    )
}

export default PieChart;