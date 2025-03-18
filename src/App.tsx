import './App.css'
import {Weather} from "./Weather.tsx";

function App() {
  return (
      <div className="app">
        <div>
            <input type="text" placeholder="Enter City" />
            <button>search</button>
            <Weather/>
        </div>
      </div>
  )
}

export default App
