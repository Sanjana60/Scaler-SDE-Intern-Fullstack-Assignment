import {createSlice} from "@reduxjs/toolkit";

const initialState={
    whichTypeClicked:"TypeA",
};

export const typeClickedSlice = createSlice({
    name:"whichTypeClicked",
    initialState,
    reducers:{

        typeClicked:(state,action)=>{
            state.whichTypeClicked=action.payload;
        },
        

        // iconNotClicked:(state)=>{
        //     state.isIconClick=false;
        // },

    }

})

export const {typeClicked}=typeClickedSlice.actions;

export default typeClickedSlice.reducer;