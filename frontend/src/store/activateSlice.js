import { createSlice } from '@reduxjs/toolkit'
//import { has } from 'immer/dist/internal';

const initialState = {
  name: '',
  pic: '',
};

export const activateSlice = createSlice({
  name: 'activate',
  initialState,
  reducers: {
    setName: (state, action) => {
      //TODO
      state.name = action.payload;
    },
    setPic: (state, action) => {
      state.pic = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setName, setPic } = activateSlice.actions

export default activateSlice.reducer