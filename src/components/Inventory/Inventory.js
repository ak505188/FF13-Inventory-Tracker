import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Button from '../Button';
import { add, move, remove, reset as resetInventory, subtract } from '../../store/inventory';
import { reset as resetChapter } from '../../store/chapter';
import './Inventory.scss';

const Inventory = () => {
  const inventory = useSelector(state => state.inventory.value);
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
        <h2>Inventory
          <span>
            <Button onClick={clear}>Clear</Button>
            <Button onClick={reset}>Reset</Button>
          </span>
        </h2>
      </header>
      <DndProvider backend={HTML5Backend}>
        <ol>
          {inventory.map((item, index) => renderItem(item, index))}
        </ol>
      </DndProvider>
    </div>
  );
}

const InventoryItem = (props) => {
  const { item, add, index, move, remove, subtract } = props;
  const ref = useRef(null)

  const [{ handlerId }, drop] = useDrop({
    accept: 'INVENTORY_ITEM',
    collect: (monitor) => {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover: (item, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (!ref.current) return;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset = monitor.getClientOffset()

      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      move({ from: dragIndex, to: hoverIndex })
      item.index = hoverIndex;
    }
  })


  const [style, drag] = useDrag(
    () => ({
      type: 'INVENTORY_ITEM',
      item: {
        ...item,
        index
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
        cursor: monitor.isDragging() ? 'grabbing' : 'inherit'
      })
    }),
  )

  drag(drop(ref))
  if (item == null) return (
    <li
      ref={ref}
      style={{ style }}
      draggable={true}
      data-handler-id={handlerId}
    > --- </li>
  );

  return (
    <li ref={ref} style={{ style }} draggable={true} data-handler-id={handlerId}>
      <span>{index+1}: {item.name} - {item.amount}</span>
      <Button onClick={add}>+</Button>
      <Button onClick={subtract}>-</Button>
      <Button onClick={remove}>x</Button>
    </li>
  );
}

export default Inventory;
