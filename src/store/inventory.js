import { createSlice } from '@reduxjs/toolkit'
import { getComponentGilValue } from '../lib/items';

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    value: [],
    gil: 0,
  },
  reducers: {
    add: (state, action) => {
      state.value = addItem(state.value, action.payload.name, action.payload.amount);
      state.gil = calcInventoryGilValue(state.value)
    },
    move: (state, action) => {
      const { from, to } = action.payload;
      const inventory = state.value;
      state.value = moveItem(inventory, from, to);
    },
    remove: (state, action) => {
      state.value = removeItem(state.value, action.payload.name);
      state.gil = calcInventoryGilValue(state.value)
    },
    reset: state => {
      state.value = [];
      state.gil = 0;
    },
    subtract: (state, action) => {
      state.value = subtractItem(state.value, action.payload.name, action.payload.amount);
      state.gil = calcInventoryGilValue(state.value)
    },
  }
})

const findItemSlot = (inventory, name) => inventory.findIndex(item => item && item.name === name);
const getItemBySlot = (inventory, slot) => inventory[slot];
const getFirstAvailableSlot = (inventory) => inventory.findIndex(i => i == null);

const addItem = (inventory, name, amount = 1) => {
  let slot = findItemSlot(inventory, name);
  if (slot >= 0) {
    return [
      ...inventory.slice(0, slot),
      { name, amount: inventory[slot].amount + amount },
      ...inventory.slice(slot + 1)
    ];
  }

  slot = getFirstAvailableSlot(inventory);
  if (slot < 0) {
    return [...inventory, { name, amount }];
  }
  return [
    ...inventory.slice(0, slot),
    { name, amount },
    ...inventory.slice(slot + 1)
  ];
}

const subtractItem = (inventory, name, amount = 1) => {
  const slot = findItemSlot(inventory, name);
  if (slot < 0) {
    console.error("Tried removing item that doesn't exist");
    return inventory;
  }

  const new_amount = getItemBySlot(inventory, slot).amount - amount;
  if (new_amount <= 0) {
    return removeItem(inventory, name);
  } else {
    return [
      ...inventory.slice(0, slot),
      { name, amount: new_amount },
      ...inventory.slice(slot + 1)
    ];
  }
}

const removeItem = (inventory, name) => {
  const slot = findItemSlot(inventory, name);
  return cleanInventory([
    ...inventory.slice(0, slot),
    null,
    ...inventory.slice(slot + 1)
  ])
}

const cleanInventory = (inventory) => {
  while (inventory.length > 0 && inventory[inventory.length - 1] == null) {
    inventory.pop();
  }

  return inventory;
}

const moveItem = (inventory, from, to) => {
  console.log(inventory);
  if (from > to) {
    return [
      ...inventory.slice(0, to),
      inventory[from],
      ...inventory.slice(to, from),
      ...inventory.slice(from + 1)
    ];
  } else if (from < to) {
    return [
      ...inventory.slice(0, from),
      ...inventory.slice(from + 1, to + 1),
      inventory[from],
      ...inventory.slice(to + 1)
    ]
  }
}

const calcInventoryGilValue = (inventory) => {
  const gil_value = inventory.reduce((gil, item) => {
    if (item == null) return gil;
    const { name, amount } = item;
    const item_gil_value = getComponentGilValue(name) * amount;
    if (item_gil_value) gil += item_gil_value
    return gil;
  }, 0)
  return gil_value;
}

// Action creators are generated for each case reducer function
export const { add, move, remove, reset, subtract } = inventorySlice.actions

export default inventorySlice.reducer
