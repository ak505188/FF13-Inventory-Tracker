import { useDispatch, useSelector } from 'react-redux';
import Chapter from '../Chapter/Chapter';
import { add } from '../../store/inventory';
import { COMPONENTS_BY_CHAPTER } from '../../lib/enums';
import './Component.scss';

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
      <header>
        <h2>Component Selection</h2>
        <Chapter/>
      </header>
      <ul className="component-selection">
        {buttons}
      </ul>
    </div>
  );
}

export default ComponentList;
