import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DataTable from './DataTable';

global.fetch = jest.fn()

const mockData = [
    { id: 1, name: 'Google', quantity: 100 },
]

describe('DataTable Component', () => {

    beforeEach(() => {
        (fetch as jest.Mock).mockClear();
    })

    it('renders the data table with initial data', () => {
        render(<DataTable data={mockData} handleRefresh={() => {}} />)

        expect(screen.getByText('Google')).toBeInTheDocument()
        expect(screen.getByText('100')).toBeInTheDocument()
    })

    it('handles the creation of a new channel', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({})
        })

        render(<DataTable data={mockData} handleRefresh={() => {}} />)

        fireEvent.change(screen.getByPlaceholderText('Nazwa'), {
            target: { value: 'Facebook' },
        })
        fireEvent.change(screen.getByPlaceholderText('Ilość'), {
            target: { value: '200' },
        })

        fireEvent.click(screen.getByText('Dodaj'));

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/add/', expect.objectContaining({
                method: 'POST',
                headers: expect.objectContaining({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }),
                body: JSON.stringify({
                    name: 'Facebook',
                    quantity: 200,
                })
            }))
        })
    })

    it('handles the deletion of a channel', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({}),
        })

        render(<DataTable data={mockData} handleRefresh={() => {}} />)

        fireEvent.click(screen.getAllByText('Usuń')[0])

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/delete/1', expect.objectContaining({
                method: 'DELETE',
            }))
        })
    })

    it('handles the editing of a channel quantity', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({}),
        })

        render(<DataTable data={mockData} handleRefresh={() => {}} />)

        fireEvent.doubleClick(screen.getByText('100'))

        fireEvent.change(screen.getByDisplayValue('100'), {
            target: { value: '200' },
        })

        fireEvent.keyDown(screen.getByDisplayValue('200'), { key: 'Enter', code: 'Enter' })

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/edit/1', expect.objectContaining({
                method: 'PUT',
                body: JSON.stringify({
                    quantity: 200,
                }),
            }))
        })
    })

    it('displays errors when creation fails', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            json: async () => ({
                errors: {
                    name: ['Nazwa jest wymagana.'],
                    quantity: ['Ilość musi być liczbą.'],
                }
            }),
        })

        render(<DataTable data={mockData} handleRefresh={() => {}} />)

        fireEvent.change(screen.getByPlaceholderText('Nazwa'), {
            target: { value: '' },
        })
        fireEvent.change(screen.getByPlaceholderText('Ilość'), {
            target: { value: 'asdf' },
        })

        fireEvent.click(screen.getByText('Dodaj'))

        await waitFor(() => {
            expect(screen.getByText('Ilość musi być liczbą.')).toBeInTheDocument()
            expect(screen.getByText('Nazwa jest wymagana.')).toBeInTheDocument()
        })
    })
})