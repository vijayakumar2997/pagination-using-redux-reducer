import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
let userInfo = {
  entities: [],
  loading: false,
}

export const getBeers = createAsyncThunk(
    //action type string
     '/getbeers',
  // callback function
  async (data, thunkAPI) => {
    const response = await  axios.get('https://api.punkapi.com/v2/beers?page='+data.pageNo+'&per_page=10');

    if (response.status) {
      console.log("after login:: ",response.data);
      userInfo = response.data;
      return userInfo;
    } else {
    }

  })



export const beerSlice = createSlice({
  name: 'beer',
  initialState: { entities: userInfo },
  reducers: {
    getbeer: (state, action) => {
      state.entities = action.payload;
    }

  },
  extraReducers: {
    [getBeers.pending]: (state,{meta}) => {
      state.loading = true
    },
    [getBeers.fulfilled]: (state, { meta,payload }) => {
      console.log("fulfilled:: ", payload);
        if (payload &&payload.token)
        localStorage.setItem("UserToken", payload.token);
      state.loading = false
      state.entities = payload
    },
    [getBeers.rejected]: (state, { meta,payload ,error}) => {
      console.log("rejected:: ", payload);
      state.loading = false
    },

  }
});
export const { getbeer } = beerSlice.actions;
export const beerReducer = beerSlice.reducer;
export default beerReducer;