import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cart: [],
  dataProduct: [],
};

const shopReducer = createSlice({
  name: "shopReducer",
  initialState,
  reducers: {
    getAllProductApiAction: (state, action) => {
    //   console.log(action);
      state.dataProduct = action.payload;
    },
    addToCartAction: (state, action) => {
    //   console.log(action);
    let itemCart = state.cart.find(item => item.id === action.payload.id);
    if(itemCart){
        itemCart.quantity += 1;
    } else {
        state.cart.push(action.payload);
    }
    },
    delItemAction: (state,action) => {
        const id = action.payload;
        state.cart = state.cart.filter(item => item.id !== id);
    },
    changeQuantityAction: (state, action) => {
        const {id,quantity} = action.payload;
        const itemCart = state.cart.find(item => item.id === id);
        if(itemCart){
            itemCart.quantity += quantity;
            if(itemCart.quantity < 1){
                if(window.confirm('Do you want to delete ?')){
                    state.cart = state.cart.filter(item => item.id !== id);
                }else {
                    itemCart.quantity -= quantity;
                }
            }
        }
    }

  },
});

export const { getAllProductApiAction, addToCartAction, delItemAction, changeQuantityAction } = shopReducer.actions;

export default shopReducer.reducer;

//-------------------------------action thunk
export const getAllProductApi = () => {
  return async (dispatch, getState) => {
    try {
      let {data, status, ...res} = await axios({
        url: "https://shop.cyberlearn.vn/api/Product",
        method: "GET",
      });
    //   console.log('result', result);
      //dispatch action len reducer
      // dispatch({
      //     type: 'shopReducer/getAllProductApi',
      //     data: result.data.content
      // })
      if(status === 200){
            const action = getAllProductApiAction(data.content);
            dispatch(action);
      }
    } catch (err) {
      console.log(err);
    }
  };
};
