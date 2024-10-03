import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Button from '../Button';

const InventoryItem = (props) => {
  const { item, add, index, move, remove, subtract } = props;
  const ref = useRef(null)

  const [{ handlerId }, drop] = useDrop({
    accept: 'INVENTORY_ITEM',
    collect: (monitor) => {
      return {
        handlerId: monitor.getHandlerId(),
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
        index,
        ref
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
        cursor: monitor.isDragging() ? 'grabbing' : 'inherit',
      })
    })
  , [item])


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
    <li ref={ref} style={{ style }} data-index={index} draggable={true} data-handler-id={handlerId}>
      <span>{item.amount} {item.name}</span>
      <Button onClick={add}>+</Button>
      <Button onClick={subtract}>-</Button>
      <Button onClick={remove}>x</Button>
    </li>
  );
}

export default InventoryItem;
