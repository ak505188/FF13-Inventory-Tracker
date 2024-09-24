import Inventory from './components/App';
import Chapter from './components/Chapter/Chapter';
import Controls from './components/Controls';
import './App.css';

function App() {
  return (
    <div className="App">
      <Controls/>
      <Chapter/>
      <Inventory/>
    </div>
  );
}

export default App;
