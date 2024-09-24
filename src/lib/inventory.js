// Deprecated because react sucks for this
class Inventory {
  constructor() {
    this.inventory = [];
    this.first_available_slot = -1;
  }

  addItem(name, amount = 1) {
    const slot = this.findItemSlot(name);
    if (slot >= 0) this.inventory[slot].add(amount);
    else if (this.first_available_slot < 0) {
      this.inventory = [...this.inventory, new Item(name, amount)];
    } else {
      this.inventory[this.first_available_slot] = new Item(name, amount);
      this.updateFirstAvailableSlot();
    }
  }

  getItemBySlot(slot) {
    return this.inventory[slot];
  }

  removeItemBySlot(slot) {
    this.inventory[slot] = null;
    this.updateFirstAvailableSlot();
  }

  subtractItem(name, amount = 1) {
    const slot = this.findItemSlot(name);
    if (slot < 0) {
      console.error("Tried removing item that doesn't exist");
      return;
    }

    const new_amount = this.getItemBySlot(slot).remove(amount).amount;
    if (new_amount <= 0) {
      this.removeItemBySlot(slot);
    }
  }

  findItemSlot(name) {
    const slot = this.inventory.findIndex(item => item.name == name);
    return slot;
  }

  updateFirstAvailableSlot() {
    const slot = this.inventory.findIndex(i => i == null);
    this.first_available_slot = slot;
  }
}

class Item {
  constructor(name, amount = 1) {
    this.name = name;
    this.amount = amount;
  }

  add(amount = 1) {
    this.amount += amount;
    return this;
  }

  subtract(amount = 1) {
    this.amount += amount;
    return this;
  }
}

export default Inventory;
