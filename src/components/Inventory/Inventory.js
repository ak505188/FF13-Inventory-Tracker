import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import {
  MultiBackend,
  DndProvider,
  TouchTransition,
  MouseTransition,
  Preview,
} from 'react-dnd-multi-backend';
import Button from '../Button';
import InventoryItem from './InventoryItem';
import InventoryItemPreview from './InventoryItemPreview';
import { add, move, remove, reset as resetInventory, subtract } from '../../store/inventory';
import { reset as resetChapter } from '../../store/chapter';
import './Inventory.scss';

// https://codesandbox.io/p/sandbox/dnd-i79zd?file=%2Fsrc%2FApp.js%3A33%2C1-44%2C3
export const HTML5toTouch = {
  backends: [
    {
      id: "html5",
      backend: HTML5Backend,
      transition: MouseTransition
    },
    {
      id: "touch",
      backend: TouchBackend,
      options: { enableMouseEvents: true },
      preview: true,
      transition: TouchTransition
    }
  ]
};

export const generatePreview = (props) => {
  const { item, style } = props;
  const width = item.ref.current.getBoundingClientRect().width
  const newStyle = {
    ...style,
    width: `${width}px`
  };

  return (
    <InventoryItemPreview style={newStyle} item={item}/>
  );
};

const Inventory = () => {
  const inventory = useSelector(state => state.inventory.value);
  const gil = useSelector(state => state.inventory.gil);
  const dispatch = useDispatch();
  const moveCard = useCallback(({ from, to }) => dispatch(move({ from, to })), [dispatch])
  const clear = () => dispatch(resetInventory())
  const reset = () => {
    dispatch(resetChapter())
    dispatch(resetInventory())
  }
  const renderItem = useCallback((item, index) => {
    return (
      <InventoryItem
        key={index}
        item={item}
        index={index}
        add={() => dispatch(add({ name: item.name, amount: 1 }))}
        move={moveCard}
        remove={() => dispatch(remove({ name: item.name, amount: 1 }))}
        subtract={() => dispatch(subtract({ name: item.name, amount: 1 }))}
      />
    )
  }, [dispatch, moveCard])

  return (
    <div className="inventory container">
      <header>
        <h2>Inventory: {gil} gil
          <span>
            <Button onClick={clear}>Clear</Button>
            <Button onClick={reset}>Reset</Button>
          </span>
        </h2>
      </header>
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        <Preview>{generatePreview}</Preview>
        <ol>
          {inventory.map((item, index) => renderItem(item, index))}
        </ol>
      </DndProvider>
    </div>
  );
}

export default Inventory;
