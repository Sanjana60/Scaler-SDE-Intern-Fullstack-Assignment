import { configureStore } from '@reduxjs/toolkit';
import typeClickedSlice from '../Components/Slices/typeClickedSlice';

export const store = configureStore({
    reducer:{
        whichTypeClicked:typeClickedSlice,
    }
})