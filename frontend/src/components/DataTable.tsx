import { useState } from "react"

interface IChannelItem {
    id?: number,
    name: string,
    quantity: number | string,
}

interface IChannelList {
    data: IChannelItem[],
    handleRefresh: () => void,
}

interface IEdit {
    key: number | undefined,
    value: number | undefined,
}

function DataTable({ data, handleRefresh }: IChannelList) {

    const [newChannel, setNewChannel] = useState<IChannelItem>({
        name: "",
        quantity: "",
    })

    const [errors, setErrors] = useState<string[]>([])

    const [editing, setEditing] = useState(false)

    const [edit, setEdit] = useState<IEdit>({
        key: undefined,
        value: undefined,
    })

    const handleDelete = async (id: number) => {
        if (!window.confirm("Czy chcesz usunąć ten element?")) return;
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

    const handleCreate = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/add/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(newChannel)
            })
            if (!response.ok) {
                const errorData = await response.json()
                const errorMessages =  errorData.errors ? Object.values(errorData.errors).flat() : [];
                setErrors(errorMessages as string[])
            } else {
                setErrors([])
                setNewChannel({
                    name: "",
                    quantity: "",
                })
            }
        }
        catch (error: any) {
            setErrors(["Prosze spróbować później."])
        }
        finally {
            handleRefresh();
        }
    }

    const handleChangeElement = (key: number, value: number) => {
        setEdit({
            key: key,
            value: value,
        })
        setEditing(true)
    }

    const handleOnChange = (e: any) => {
        setEdit({
            ...edit,
            value: e.target.value,
        })
    }

    const handleEdit = async (e: any) => {
        if (e.key !== 'Enter') { return }

        try {
            const response = await fetch(`http://localhost:8000/api/edit/${edit.key}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ quantity: Number(edit.value) })
            })
            if (!response.ok) {
                const errorData = await response.json()
                const errorMessages =  errorData.errors ? Object.values(errorData.errors).flat() : [];
                setErrors(errorMessages as string[])
            } else {
                setErrors([])
                setEdit({
                    key: undefined,
                    value: undefined,
                })
                setEditing(false)
            }
        }
        catch (error: any) {
            setErrors(["Prosze spróbować później."])
        }
        finally {
            handleRefresh()
        }
    }

    return (
        <>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Nazwa</th>
                            <th>Ilość</th>
                            <th>Akcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((channel) => (
                            <tr key={channel.id as number}>
                                <td>{channel.name}</td>
                                <td onDoubleClick={(e) => { handleChangeElement(channel.id as number, channel.quantity as number) }}>
                                    {(editing && channel.id === edit.key) ? (
                                        <input type="number" value={edit.value} onChange={(e) => { handleOnChange(e) }} onKeyDown={(e) => { handleEdit(e) }} onMouseOut={() => { setEditing(false) }} />
                                    ) : (
                                        <>{channel.quantity}</>
                                    )}
                                </td>
                                <td>
                                    <button className="button-remove" onClick={() => handleDelete(channel.id as number)}>Usuń</button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    name="name"
                                    onChange={(e) => { setNewChannel({ ...newChannel, name: e.target.value }) }}
                                    value={newChannel.name}
                                    placeholder="Nazwa"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="quantity"
                                    onChange={(e) => { setNewChannel({ ...newChannel, quantity: Number(e.target.value) }) }}
                                    value={newChannel.quantity}
                                    placeholder="Ilość"
                                />
                            </td>
                            <td>
                                <button type="submit" className="button-add" onClick={handleCreate}>Dodaj</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="error-container">
                    {errors?.map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DataTable;