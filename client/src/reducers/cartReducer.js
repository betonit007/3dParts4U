import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
  console.log(state.cartItems)
  switch(action.type) {
      case CART_ADD_ITEM:
      const item = action.payload
      
      const existItem = state.cartItems.find(x => x.product === item.product)  //check to see if item is already in cart

      if(existItem) {
          return {
              ...state,
              cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x) //map thru current items and if item exists 'replace' it with updated item (qty)
          }

      } else {
          return {
              ...state,
              cartItems: [...state.cartItems, item]
          }
      }

      case CART_REMOVE_ITEM:
          return {
              ...state,
              cartItems: state.cartItems.filter(x => x.product !== action.payload)
          }

      default: return state
  }
}