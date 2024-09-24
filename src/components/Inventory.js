const Inventory = (props) => {
  const { inventory, addItem, subtractItem, removeItem } = props;
  const items = inventory.map((item, index) => {
    if (item == null) return <li key={index}>-</li>;
    return (
      <InventoryItem
        key={index}
        item={item}
        add={() => addItem(item.name, 1)}
        subtract={() => subtractItem(item.name, 1)}
        remove={() => removeItem(item.name)}
      />
    )
  });

  return (
    <ul>
      {items}
    </ul>
  );
}

const InventoryItem = (props) => {
  const { item, add, subtract, remove } = props;

  return (
    <li key={item.name}>
      <span>{item.name}: {item.amount}</span>
      <button onClick={add}>+</button>
      <button onClick={subtract}>-</button>
      <button onClick={remove}>x</button>
    </li>
  );
}

export default Inventory;
