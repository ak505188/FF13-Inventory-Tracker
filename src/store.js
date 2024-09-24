import { configureStore } from '@reduxjs/toolkit'
import inventoryReducer from './store/inventory';
import chapterReducer from './store/chapter';

export default configureStore({
  reducer: {
    inventory: inventoryReducer,
    chapter: chapterReducer
  }
})
