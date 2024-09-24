import { useDispatch } from 'react-redux';
import { reset as resetInventory } from '../store/inventory';
import { reset as resetChapter } from '../store/chapter';

const Controls = () => {
  const dispatch = useDispatch();
  const reset = () => {
    dispatch(resetChapter());
    dispatch(resetInventory());
  }
  return (
    <div>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

export default Controls;
