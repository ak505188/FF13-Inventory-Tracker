import { useDispatch, useSelector } from 'react-redux';
import { add } from '../../store/inventory';
import { COMPONENTS_BY_CHAPTER } from '../../lib/enums';

const ComponentList = () => {
  const chapter = useSelector(state => state.chapter.value);
  const components = COMPONENTS_BY_CHAPTER[chapter];
  const dispatch = useDispatch();
  const buttons = components.map(component => {
    return (
      <li key={component}>
        <button
          onClick={() => dispatch(add({ name: component }))}
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
