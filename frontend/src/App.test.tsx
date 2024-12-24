import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

jest.mock('./components/DataTable', () => (() => <div>Mocked DataTable</div>))
jest.mock('./components/PieChart', () => (() => <div>Mocked PieChart</div>))

describe('App Component', () => {
  test('renders loading state', () => {
    render(<App />)

    const loadingElement = screen.getByText('Ładowanie...')

    expect(loadingElement).toBeInTheDocument()

    expect(screen.queryByText('Mocked DataTable')).not.toBeInTheDocument()
    expect(screen.queryByText('Mocked PieChart')).not.toBeInTheDocument()
  })

  test('renders DataTable and PieChart after loading', async () => {
    render(<App />)

    await waitFor(() => expect(screen.queryByText('Ładowanie...')).not.toBeInTheDocument())

    expect(screen.getByText('Mocked DataTable')).toBeInTheDocument()
    expect(screen.getByText('Mocked PieChart')).toBeInTheDocument()
  })
})
