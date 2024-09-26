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
    move: (state, action) => {
      const { from, to } = action.payload;
      const inventory = state.value;
      if (from > to) {
        state.value = [
          ...inventory.slice(0, to),
          inventory[from],
          ...inventory.slice(to, from),
          ...inventory.slice(from + 1)
        ];
      } else if (from < to) {
        state.value = [
          ...inventory.slice(0, from),
          ...inventory.slice(from + 1, to + 1),
          inventory[from],
          ...inventory.slice(to + 1)
        ]
      }
    },
    remove: (state, action) => {
      state.value = removeItem(state.value, action.payload.name);
    },
    reset: state => {
      state.value = [];
    },
    subtract: (state, action) => {
      state.value = subtractItem(state.value, action.payload.name, action.payload.amount);
    },
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
export const { add, move, remove, reset, subtract } = inventorySlice.actions

export default inventorySlice.reducer
