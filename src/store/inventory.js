import { createSlice } from '@reduxjs/toolkit'

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    value: []
  },
  reducers: {
    add: (state, action) => {
      state.value = addItem(state.value, action.payload.name, action.payload.amount);
    },
    subtract: (state, action) => {
      state.value = subtractItem(state.value, action.payload.name, action.payload.amount);
    },
    remove: (state, action) => {
      state.value = removeItem(state.value, action.payload.name);
    },
    reset: state => {
      state.value = [];
    }
  }
})

const findItemSlot = (inventory, name) => inventory.findIndex(item => item && item.name == name);
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
  return [
    ...inventory.slice(0, slot),
    null,
    ...inventory.slice(slot + 1)
  ]
}

// Action creators are generated for each case reducer function
export const { add, subtract, remove, reset } = inventorySlice.actions

export default inventorySlice.reducer
