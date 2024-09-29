import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../store/chapter';

import './Chapter.scss';

const ChapterControls = () => {
  const name = useSelector(state => {
    return state.chapter.name
  });
  const dispatch = useDispatch();

  return (
    <div className="chapter-controls">
      <h2>{name} Components</h2>
      <button onClick={() => dispatch(decrement())}>
        Prev
      </button>
      <button onClick={() => dispatch(increment())}>
        Next
      </button>
    </div>
  );
}

export default ChapterControls;
