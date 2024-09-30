import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../store/chapter';
import Button from '../Button/';

import './Chapter.scss';

const ChapterControls = () => {
  const name = useSelector(state => {
    return state.chapter.name
  });
  const dispatch = useDispatch();

  return (
    <div className="chapter-controls">
      <h2>{name}</h2>
      <span>
        <Button onClick={() => dispatch(decrement())}>
          Prev
        </Button>
        <Button onClick={() => dispatch(increment())}>
          Next
        </Button>
      </span>
    </div>
  );
}

export default ChapterControls;
