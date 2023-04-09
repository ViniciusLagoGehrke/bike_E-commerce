import { useReducer } from 'react'
import { renderHook, act } from '@testing-library/react'
import cartReducer, { initialState } from './reducer'

describe('cartReducer', () => {
  it('should add an item to the cart', () => {
    const item = {
      id: '1',
      productName: 'Product 1',
      price: 10,
      maxAmount: 5,
      taxRate: 0.21,
      quantity: 1,
      index: 0
    }

    const { result } = renderHook(() => useReducer(cartReducer, initialState))

    act(() => {
      result.current[1]({ type: 'ADD_ITEM', payload: { item } })
    })

    expect(result.current[0]).toEqual({
      cartItems: [item],
      total: 10,
      maxProductsReached: false
    })
  })

  it('should update an existing item in the cart', () => {
    const item1 = {
      id: '1',
      productName: 'Product 1',
      price: 10,
      maxAmount: 5,
      taxRate: 0.21,
      quantity: 1,
      index: 0
    }

    const item2 = {
      id: '1',
      productName: 'Product 1',
      price: 10,
      maxAmount: 5,
      taxRate: 0.21,
      quantity: 2,
      index: 0
    }

    const { result } = renderHook(() =>
      useReducer(cartReducer, { ...initialState, cartItems: [item1] })
    )

    act(() => {
      result.current[1]({ type: 'ADD_ITEM', payload: { item: item2 } })
    })

    expect(result.current[0]).toEqual({
      cartItems: [
        {
          id: '1',
          productName: 'Product 1',
          price: 10,
          maxAmount: 5,
          taxRate: 0.21,
          quantity: 3,
          index: 0
        }
      ],
      total: 30,
      maxProductsReached: false
    })
  })

  it('should prevent adding more than 10 different product types to the cart', () => {
    const items = Array.from({ length: 11 }, (_, i) => ({
      id: i.toString(),
      productName: `Product ${i}`,
      price: 10,
      maxAmount: 5,
      taxRate: 0.21,
      quantity: 1,
      index: i
    }))

    const { result } = renderHook(() =>
      useReducer(cartReducer, {
        ...initialState,
        cartItems: items.slice(0, 10),
        total: 100
      })
    )

    expect(result.current[0]).toEqual({
      cartItems: items.slice(0, 10),
      total: 100,
      maxProductsReached: false
    })

    act(() => {
      result.current[1]({ type: 'ADD_ITEM', payload: { item: items[10] } })
    })

    expect(result.current[0]).toEqual({
      cartItems: items.slice(0, 10),
      total: 100,
      maxProductsReached: true
    })
  })

  it('should prevent adding a quantity of items that exceeds the maxAmount of the product', () => {
    const item = {
      id: '1',
      productName: 'Product 1',
      price: 10,
      maxAmount: 5,
      taxRate: 0.21,
      quantity: 6,
      index: 0
    }

    const { result } = renderHook(() => useReducer(cartReducer, initialState))

    act(() => {
      result.current[1]({ type: 'ADD_ITEM', payload: { item } })
    })

    expect(result.current[0]).toEqual({
      cartItems: [],
      total: 0,
      maxProductsReached: false
    })
  })

  it('should remove an specific item from store', () => {
    const item = {
      id: '1',
      productName: 'Product 1',
      price: 10,
      maxAmount: 5,
      taxRate: 0.21,
      quantity: 5,
      index: 0
    }

    const { result } = renderHook(() =>
      useReducer(cartReducer, {
        ...initialState,
        cartItems: [item],
        total: 50
      })
    )

    expect(result.current[0]).toEqual({
      cartItems: [item],
      total: 50,
      maxProductsReached: false
    })

    act(() => {
      result.current[1]({ type: 'REMOVE_ITEM', payload: { index: 0 } })
    })

    expect(result.current[0]).toEqual({
      cartItems: [],
      total: 0,
      maxProductsReached: false
    })
  })

  it('should clear the cart', () => {
    const items = Array.from({ length: 11 }, (_, i) => ({
      id: i.toString(),
      productName: `Product ${i}`,
      price: 10,
      maxAmount: 5,
      taxRate: 0.21,
      quantity: 1,
      index: i
    }))

    const { result } = renderHook(() =>
      useReducer(cartReducer, {
        ...initialState,
        cartItems: items.slice(0, 10),
        total: 100
      })
    )

    expect(result.current[0]).toEqual({
      cartItems: items.slice(0, 10),
      total: 100,
      maxProductsReached: false
    })

    act(() => {
      result.current[1]({ type: 'CLEAR_CART' })
    })

    expect(result.current[0]).toEqual({
      cartItems: [],
      total: 0,
      maxProductsReached: false
    })
  })
})
