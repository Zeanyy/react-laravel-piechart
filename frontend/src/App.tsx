import { useEffect, useState } from 'react';
import './App.css';
import DataTable from './components/DataTable';
import PieChart from './components/PieChart';

/* Interfejs reprezentujący odpowiedź z API zawierającą dane kanału */
interface IChannelResponse {
  id: number,
  name: string,
  quantity: number,
}

function App() {
  /* Stan przechowujący liste kanałów */
  const [channelList, setChannelList] = useState<IChannelResponse[]>([])

  /* Stan przechowujący status ładaowania danych */
  const [loading, setLoading] = useState(false)

  /**
   * Funkcja do pobierania danych z API
   * Wykonuje zapytanie do serwera i zapisuje dane w `channelList`
   */
  const fetchData = async () => {
    const response = await fetch("http://localhost:8000/api/channels")
    const data = await response.json()
    setChannelList(data)
  }

  /**
   * Uruchamia funkcję fetchData przy pierwszym ładowaniu komponentu
   * Ustawia status ładanowania `loading` na `true` (przed pobieraniem danych) i `false` (po zakończeniu)
   */

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        setLoading(true)
        await fetchData()
      }
      catch (error) {
        console.log(error)
      }
      finally {
        setLoading(false)
      }
    }
    fetchDataAsync();
  }, [])

  /**
   * Funkcja do ręcznego odświerzania listy kanałów
   * Ponownie pobiera dane za pomocą `fetchData`, aby pobrać nowe dane
   */
  const handleRefresh = async () => {
    try {
      await fetchData()
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="App">
      {loading ? (
        <div className="loading-container">
          <h1>Ładowanie...</h1>
        </div>
      ) : (
        <>
          <DataTable data={channelList} handleRefresh={handleRefresh} />
          <PieChart data={channelList} />
        </>
      )}
    </div>
  );
}

export default App;
