import { CartItemType } from '../types'

export type State = {
  cartItems: CartItemType[]
  total: number
  maxProductsReached: boolean
  MAX_ITEMS: number
  isCartClosed: boolean
  message: string | null
}

export type Action =
  | { type: 'ADD_ITEM'; payload: { item: CartItemType } }
  | { type: 'REMOVE_ITEM'; payload: { index: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'PURCHASE' }
  | { type: 'RESET' }

const MAX_ITEMS = 10

export const initialState: State = {
  cartItems: [],
  total: 0,
  maxProductsReached: false,
  MAX_ITEMS,
  isCartClosed: true,
  message: null
}

const cartReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { item } = action.payload
      const existingItemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === item.id
      )

      if (existingItemIndex !== -1) {
        const existingItem = state.cartItems[existingItemIndex]

        if (existingItem.quantity + item.quantity > existingItem.maxAmount) {
          return { ...state }
        }

        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + item.quantity
        }
        const updatedCartItems = [...state.cartItems]
        updatedCartItems[existingItemIndex] = updatedItem

        return {
          ...state,
          cartItems: updatedCartItems,
          total: state.total + updatedItem.price * updatedItem.quantity
        }
      }

      if (state.cartItems.length >= 10) {
        return { ...state, maxProductsReached: true }
      }

      if (item.quantity > item.maxAmount) {
        return { ...state }
      }

      const newCartItem = {
        ...item,
        index: state.cartItems.length,
        quantity: item.quantity
      }
      const newTotal = state.total + item.price * item.quantity

      return {
        ...state,
        cartItems: [...state.cartItems, newCartItem],
        total: newTotal
      }
    }

    case 'REMOVE_ITEM': {
      const { index } = action.payload
      const itemToRemove = state.cartItems[index]
      const updatedTotal =
        state.total - itemToRemove.price * itemToRemove.quantity
      const updatedCartItems = state.cartItems.filter(
        (cartItem) => cartItem.index !== index
      )

      const updatedCartItemsWithNewIndices = updatedCartItems.map(
        (cartItem, index) => {
          return { ...cartItem, index }
        }
      )

      return {
        ...state,
        cartItems: updatedCartItemsWithNewIndices,
        total: updatedTotal
      }
    }

    case 'CLEAR_CART':
      return { ...initialState, isCartClosed: false }

    case 'OPEN_CART':
      return { ...state, isCartClosed: false }

    case 'CLOSE_CART':
      return { ...state, isCartClosed: true }

    case 'PURCHASE':
      return { ...initialState, message: 'Purchase Confirmed!' }

    case 'RESET':
      return { ...initialState }

    default:
      return state
  }
}

export default cartReducer
