import { useEffect, useState } from 'react';
import './App.css';
import DataTable from './components/DataTable';
import PieChart from './components/PieChart';

interface IChannelResponse {
  id: number,
  name: string,
  quantity: number,
}

function App() {
  const [channelList, setChannelList] = useState<IChannelResponse[]>([])
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
      const response = await fetch("http://localhost:8000/api/channels")
      const data = await response.json()
      setChannelList(data)
  }

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        setLoading(true)
        await fetchData()
      }
      catch(error) {
        console.log(error)
      }
      finally {
        setLoading(false)
      }
    }
    fetchDataAsync();
  }, [])

  const handleRefresh = async () => {
    try {
      await fetchData()
    }
    catch(error) {
      console.log(error)
    }
  }

  return (
    <div className="App">
      {loading ? (
        <h1>Ładowanie...</h1>
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
