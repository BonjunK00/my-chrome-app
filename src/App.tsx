import './App.css'
import { Calendar } from './components/Calendar'
import { DBConfig } from './DBConfig'
import { initDB } from 'react-indexed-db-hook'

initDB(DBConfig)

function App() {
  return (
    <div className="App">
      <Calendar />
    </div>
  )
}

export default App
