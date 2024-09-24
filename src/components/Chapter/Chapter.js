import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../store/chapter';

import './Chapter.scss';

const ChapterControls = () => {
  const name = useSelector(state => {
    console.log(state);
    return state.chapter.name
  });
  console.log(name);
  const dispatch = useDispatch();

  return (
    <div class="chapter-controls">
      <button onClick={() => dispatch(decrement())}>
        &lt;
      </button>
      <h2>{name}</h2>
      <button onClick={() => dispatch(increment())}>
        &gt;
      </button>
    </div>
  );
}

export default ChapterControls;
