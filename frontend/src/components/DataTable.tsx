interface IChannelItem {
    id: number,
    name: string,
    quantity: number,
}

interface IChannelList {
    data: IChannelItem[],
    handleRefresh: () => void,
}

function DataTable({ data, handleRefresh }: IChannelList) {

    const handleDelete = async (id: number) => {
        try {
            await fetch(`http://localhost:8000/api/delete/${id}`, {
                method: 'DELETE'
            })
        }
        catch (error) {
            console.log(error)
        }
        finally {
            handleRefresh()
        }
    }

    return (
        <>
            {data?.length <= 0 ? (
                <h1>No data</h1>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Nazwa</th>
                            <th>Ilość</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((product) => {
                            return (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{product.quantity}</td>
                                    <td><button onClick={() => { handleDelete(product.id) }}>Usuń</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
        </>
    )
}

export default DataTable;