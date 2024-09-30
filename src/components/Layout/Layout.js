import Inventory from '../Inventory/Inventory';
import ComponentSelection from '../Component/Component';
import './Layout.scss';

function App() {
  return (
    <div className="app">
      <Inventory/>
      <ComponentSelection/>
    </div>
  );
}

export default App;
