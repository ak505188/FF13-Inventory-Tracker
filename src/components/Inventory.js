import { useDispatch, useSelector } from 'react-redux';
import { add, remove, subtract } from '../store/inventory';

const Inventory = () => {
  const inventory = useSelector(state => state.inventory.value);
  const dispatch = useDispatch();
  const items = inventory.map((item, index) => {
    if (item == null) return <li key={index}>-</li>;
    return (
      <InventoryItem
        key={index}
        item={item}
        add={() => dispatch(add({ name: item.name, amount: 1 }))}
        subtract={() => dispatch(subtract({ name: item.name, amount: 1 }))}
        remove={() => dispatch(remove({ name: item.name, amount: 1 }))}
      />
    )
  });

  return (
    <div class="inventory">
      <h2>Inventory</h2>
      <ol>
        {items}
      </ol>
    </div>
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
