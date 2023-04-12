import { CartItemType } from '../types'
import { getGrossTotalOf } from '../utils'

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
  | { type: 'CLEAR_MESSAGE' }

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

      if (!item || !item.id) return state

      const existingItemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === item.id
      )

      if (existingItemIndex !== -1) {
        const existingItem = state.cartItems[existingItemIndex]

        if (existingItem.quantity + item.quantity > existingItem.maxAmount) {
          const itemUptoMax = {
            ...existingItem,
            quantity: existingItem.maxAmount
          }

          const updatedTotal =
            state.total -
            getGrossTotalOf(existingItem) +
            getGrossTotalOf(itemUptoMax)

          const quantityMessage = itemUptoMax.quantity > 1 ? 's' : ''

          const updatedCartItems = [...state.cartItems]
          updatedCartItems[existingItemIndex] = itemUptoMax

          return {
            ...state,
            cartItems: updatedCartItems,
            total: updatedTotal,
            message: `It was added up to this item's maximum of ${itemUptoMax.quantity} unit${quantityMessage}.`
          }
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
          total: state.total + getGrossTotalOf(updatedItem)
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
      const newTotal = state.total + getGrossTotalOf(item)

      return {
        ...state,
        cartItems: [...state.cartItems, newCartItem],
        total: newTotal
      }
    }

    case 'REMOVE_ITEM': {
      const { index } = action.payload
      const itemToRemove = state.cartItems[index]
      const updatedTotal = state.total - getGrossTotalOf(itemToRemove)
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

    case 'PURCHASE': {
      if (state.cartItems.length === 0) {
        return { ...state, message: 'Please add products to your cart' }
      }

      return { ...initialState, message: 'Purchase Confirmed!' }
    }

    case 'CLEAR_MESSAGE':
      return { ...state, message: null }

    default:
      return state
  }
}

export default cartReducer
