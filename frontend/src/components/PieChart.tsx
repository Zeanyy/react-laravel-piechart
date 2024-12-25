import { Chart } from "react-google-charts";

/* Interfejs reprezentujący pojedyńczy element listy kanałów */
interface IPieChartItem {
    name: string,
    quantity: number,
}

/* Interfejs reprezentujący listę kanałów przekazaną w parametrach */
interface IPieChartData {
    data: IPieChartItem[]
}

/**
 * Komponent wyświetlający dane przekazane z API w formie wykresu kołowego
 * Przyjmuje parametry w postaci listy kanałów
 */
function PieChart({ data }: IPieChartData) {

    /* Zmapowanie listy kanałów na tablicę, która jest wymagana w <Chart/> */
    const pieChartData = [
        ['Nazwa', 'Ilość'],
        ...data.map(item => [item.name, item.quantity])
    ]

    /* Opcje konfiguracyjne wykresu kołowego */
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
            scrollArrows: {
                activeColor: '#fff',
                inactiveColor: '#1B1E23'
            },
        },
        backgroundColor: "#3b3b3b",
        colors: [
            "#1B1E23", "#3A5253", "#81B29A", "#FFF5F5", "#E07A5F",
            "#FFC857", "#4F6D7A", "#A3B4A2", "#D9CAB3", "#AC3931",
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