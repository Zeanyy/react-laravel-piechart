import { useState } from "react"

/* Interfejs reprezentujący pojedyńczy element listy kanałów */
interface IChannelItem {
    id?: number,
    name: string,
    quantity: number | string,
}

/* Interfejs reprezentujący przekazane parametry */
interface IChannelList {
    data: IChannelItem[],
    handleRefresh: () => void,
}

/* Interfejs reprezentujący dane potrzebne do edycji */
interface IEdit {
    key: number | undefined,
    value: number | undefined,
}

/**
 * Komponent wyświetlający dane przekazane z API w formie tabeli
 * Przyjmuje parametry w postaci listy kanałów oraz funkcji do odświerzania danych
 */
function DataTable({ data, handleRefresh }: IChannelList) {
    /* Stan przechowujący dane kanału, który będzie dodany */
    const [newChannel, setNewChannel] = useState<IChannelItem>({
        name: "",
        quantity: "",
    })

    /* Stan przechowujący liste błędów walidacji przy dodawaniu lub edycji kanału */
    const [errors, setErrors] = useState<string[]>([])

    /* Stan informujący o tym czy dane są w trybie edycji */
    const [editing, setEditing] = useState(false)

    /* Stan przechowujący dane potrzebne do edycji */
    const [edit, setEdit] = useState<IEdit>({
        key: undefined,
        value: undefined,
    })

    /**
     * Funkcja do usuwania rekordu z bazy danych
     * Wykonywana jest w przypadku kliknięcia przycisku `Usuń`
     */
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


    /**
     * Funkja do dodawania rekordu do bazy danych
     * Wykonywana w przypadku kliknięcia przycisku `Dodaj`
     * Walidacja: Jeśli dane są błędne, komunikaty o błędach są wyświetlane
     * Po wykonaniu zapytania odświerza liste
     */
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
                const errorMessages = errorData.errors ? Object.values(errorData.errors).flat() : [];
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

    /**
     * Funkjca do rozpoczynania edycji w kolumnie `Ilość`
     * Wykonywana w przypadku podwójnego kliknięcia na pole z ilością
     */
    const handleChangeElement = (key: number, value: number) => {
        setEdit({
            key: key,
            value: value,
        })
        setEditing(true)
    }

    /**
     * Funkcja do zmieniania wartości w `edit`
     * Wykonywana, gdy użytkownik wprowadza nową wartość w polu edycji
     */
    const handleOnChange = (e: any) => {
        setEdit({
            ...edit,
            value: e.target.value,
        })
    }

    /**
     * Funcja do edycji rekordu w bazie danych
     * Wykonywana w przypadku kliknięcia klawisza Enter podczas edycji
     * Walidacja: Jeśli dane są błędne, komunikaty o błędach są wyświetlane
     */
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
                const errorMessages = errorData.errors ? Object.values(errorData.errors).flat() : [];
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
                        {/* Wyświetlanie danych z listy kanałów */}
                        {data?.map((channel) => (
                            <tr key={channel.id as number}>
                                {/* Wyświetlanie nazwy */}
                                <td>{channel.name}</td>

                                {/* Edycja ilości po podwójnym kliknięciu */}
                                <td onDoubleClick={(e) => { handleChangeElement(channel.id as number, channel.quantity as number) }}>
                                    {(editing && channel.id === edit.key) ? (
                                        <input
                                            type="number"
                                            value={edit.value}
                                            onChange={(e) => { handleOnChange(e) }}
                                            onKeyDown={(e) => { handleEdit(e) }}
                                            onBlur={() => { setEditing(false) }} 
                                            autoFocus={true}/>
                                    ) : (
                                        /* Wyświetlanie ilości, gdy edycja nie jest aktywna */
                                        <>{channel.quantity}</>
                                    )}
                                </td>
                                <td>
                                    {/* Przycisk do usuwania kanału */}
                                    <button className="button-remove" onClick={() => handleDelete(channel.id as number)}>Usuń</button>
                                </td>
                            </tr>
                        ))}
                        {/* Formularz do dodawania nowego kanału */}
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
                                {/* Przycisk do dodawania kanału */}
                                <button type="submit" className="button-add" onClick={handleCreate}>Dodaj</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {/* Wyświetlanie błędów walidacji */}
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