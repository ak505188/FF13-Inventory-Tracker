import { useState } from 'react';
import { COMPONENTS, COMPONENTS_BY_CHAPTER } from '../lib/enums';
import ComponentSelection from './ComponentSelection';
import Inventory from './Inventory';

const App = () => {
  const [inventory, setInventory] = useState([]);
  const [chapter, setChapter] = useState(0);

  const reset = () => {
    setInventory([]);
    setChapter(0);
  }

  const findItemSlot = name => inventory.findIndex(item => item && item.name == name);
  const getItemBySlot = slot => inventory[slot];
  const getFirstAvailableSlot = () => inventory.findIndex(i => i == null);
  const addItem = (name, amount = 1) => {
    let slot = findItemSlot(name);
    if (slot >= 0) {
      return setInventory([
        ...inventory.slice(0, slot),
        { name, amount: inventory[slot].amount + amount },
        ...inventory.slice(slot + 1)
      ]);
    }

    slot = getFirstAvailableSlot();
    if (slot < 0) {
      return setInventory([...inventory, { name, amount }]);
    }
    setInventory([
      ...inventory.slice(0, slot),
      { name, amount },
      ...inventory.slice(slot + 1)
    ]);
  }

  const subtractItem = (name, amount = 1) => {
    const slot = findItemSlot(name);
    if (slot < 0) {
      console.error("Tried removing item that doesn't exist");
      return;
    }

    const new_amount = getItemBySlot(slot).amount - amount;
    if (new_amount <= 0) {
      removeItem(name);
    } else {
      setInventory([
        ...inventory.slice(0, slot),
        { name, amount: new_amount },
        ...inventory.slice(slot + 1)
      ]);
    }
  }

  const removeItem = name => {
    const slot = findItemSlot(name);
    setInventory([
      ...inventory.slice(0, slot),
      null,
      ...inventory.slice(slot + 1)
    ])
  }

  return (
    <div>
      <Inventory
        inventory={inventory}
        addItem={addItem}
        removeItem={removeItem}
        subtractItem={subtractItem}
      />
      <ComponentSelection addItem={addItem} components={COMPONENTS_BY_CHAPTER[0]}/>
    </div>
  )
}

export default App;
