const ComponentList = (props) => {
  const { components, addItem } = props;
  const buttons = components.map(component => {
    return (
      <li key={component}>
        <button
          onClick={() => {
            addItem(component)
          }}
        >
          {component}
        </button>
      </li>
    )
  });
  return (
    <div>
      <h2>Component Selection</h2>
      <ul>
        {buttons}
      </ul>
    </div>
  );
}

export default ComponentList;
