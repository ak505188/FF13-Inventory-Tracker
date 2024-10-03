import Button from '../Button';

const InventoryItemPreview = (props) => {
  const { item, style } = props;

  if (!item.name) return (
    <li
      className="inventory-item-preview"
      style={style}
    > --- </li>
  );

  return (
    <li style={style} className="inventory-item-preview">
      <span>{item.amount} {item.name}</span>
      <Button>+</Button>
      <Button>-</Button>
      <Button>x</Button>
    </li>
  );
}

export default InventoryItemPreview;
