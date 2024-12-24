import { render, screen } from '@testing-library/react';
import PieChart from './PieChart';

jest.mock('react-google-charts', () => ({
    Chart: ({ data }: { data: any}) => (
        <div data-testid="chart">
            <div data-testid="chart-data">{JSON.stringify(data)}</div>
        </div>
    ),
}))

describe('PieChart', () => {
    it('renders the pie chart with correct data', () => {
        const mockData = [
            { name: 'Google', quantity: 100 },
        ]
    
        render(<PieChart data={mockData} />)
    
        const chartData = screen.getByTestId('chart-data')
        const expectedData = [
            ['Nazwa', 'Ilość'],
            ['Google', 100],
        ]

        expect(chartData).toHaveTextContent(JSON.stringify(expectedData))
    })
    

    it('renders with no data gracefully', () => {
        render(<PieChart data={[]} />)

        const chartData = screen.getByTestId('chart-data')

        expect(chartData).toHaveTextContent('["Nazwa","Ilość"]')
    })
})
