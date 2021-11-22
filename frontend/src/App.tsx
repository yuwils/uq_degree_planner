import './App.css'
import Display from './components/DisplayWindow'

function App () {
  return (
    <div className="App">
      <div className = "Headline"> UQ Degree Planner</div>
      <div className = "Display"> <Display /> </div>
      <div className = "Disclaimer"> This website is not affiliated with the University of Queensland. Always check the official website. </div>
    </div>
  )
}

export default App
