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
            pagingTextStyle: {
                color: '#fff'
            },
            scrollArrows:{
                activeColor: '#fff',
                inactiveColor:'#1B1E23'
            },
        },
        backgroundColor: "#3b3b3b",
        colors: [
            "#1B1E23",
            "#3A5253",
            "#81B29A",
            "#FFF5F5",
            "#E07A5F",
            "#FFC857",
            "#4F6D7A",
            "#A3B4A2",
            "#D9CAB3",
            "#AC3931",
          ]
    };

    return (
        <div className="chart-container">
            <Chart
                chartType="PieChart"
                width="100%"
                height="100%"
                data={pieChartData}
                options={options}
            />
        </div>
    )
}

export default PieChart;