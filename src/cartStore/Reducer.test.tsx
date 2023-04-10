import { useReducer } from 'react'
import { renderHook, act } from '@testing-library/react'
import cartReducer, { initialState } from './Reducer'

describe('cartReducer', () => {
  const initialResult = {
    MAX_ITEMS: 10,
    cartItems: [],
    isCartClosed: true,
    maxProductsReached: false,
    message: null,
    total: 0
  }

  const item = {
    id: '1',
    productName: 'Product 1',
    price: 10,
    maxAmount: 5,
    taxRate: 0.21,
    quantity: 1,
    index: 0
  }

  it('should add an item to the cart', () => {
    const { result } = renderHook(() => useReducer(cartReducer, initialState))

    act(() => {
      result.current[1]({ type: 'ADD_ITEM', payload: { item } })
    })

    expect(result.current[0]).toEqual({
      ...initialResult,
      cartItems: [item],
      total: 10
    })
  })

  it('should update an existing item in the cart', () => {
    const item2 = {
      ...item,
      quantity: 2
    }

    const { result } = renderHook(() =>
      useReducer(cartReducer, { ...initialState, cartItems: [item] })
    )

    act(() => {
      result.current[1]({ type: 'ADD_ITEM', payload: { item: item2 } })
    })

    expect(result.current[0]).toEqual({
      ...initialResult,
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
      total: 30
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
      ...initialResult,
      cartItems: items.slice(0, 10),
      total: 100
    })

    act(() => {
      result.current[1]({ type: 'ADD_ITEM', payload: { item: items[10] } })
    })

    expect(result.current[0]).toEqual({
      ...initialResult,
      cartItems: items.slice(0, 10),
      maxProductsReached: true,
      total: 100
    })
  })

  it('should prevent adding a quantity of items that exceeds the maxAmount of the product', () => {
    const item1 = {
      ...item,
      quantity: 6
    }

    const { result } = renderHook(() => useReducer(cartReducer, initialState))

    act(() => {
      result.current[1]({ type: 'ADD_ITEM', payload: { item: item1 } })
    })

    expect(result.current[0]).toEqual({
      ...initialResult
    })
  })

  it('should add up to maxAmount of the product when updating it', () => {
    const item1 = {
      ...item,
      quantity: 6
    }

    const { result } = renderHook(() => useReducer(cartReducer, initialState))

    expect(result.current[0]).toEqual({
      ...initialResult
    })

    act(() => {
      result.current[1]({ type: 'ADD_ITEM', payload: { item } })
    })

    expect(result.current[0]).toEqual({
      ...initialResult,
      cartItems: [item],
      total: 10
    })

    act(() => {
      result.current[1]({ type: 'ADD_ITEM', payload: { item: item1 } })
    })

    expect(result.current[0]).toEqual({
      ...initialResult,
      cartItems: [{ ...item, quantity: 5 }],
      message: "It was added up to this item's maximum of 5 units.",
      total: 50
    })
  })

  it('should remove an specific item from store', () => {
    const { result } = renderHook(() =>
      useReducer(cartReducer, {
        ...initialState,
        cartItems: [item],
        total: 10
      })
    )

    expect(result.current[0]).toEqual({
      ...initialResult,
      cartItems: [item],
      total: 10
    })

    act(() => {
      result.current[1]({ type: 'REMOVE_ITEM', payload: { index: 0 } })
    })

    expect(result.current[0]).toEqual({
      ...initialResult
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
      ...initialResult,
      cartItems: items.slice(0, 10),
      total: 100
    })

    act(() => {
      result.current[1]({ type: 'CLEAR_CART' })
    })

    expect(result.current[0]).toEqual({
      ...initialResult,
      isCartClosed: false
    })
  })

  it('should open the cart', () => {
    const { result } = renderHook(() => useReducer(cartReducer, initialState))

    act(() => {
      result.current[1]({ type: 'OPEN_CART' })
    })

    expect(result.current[0]).toEqual({
      ...initialResult,
      isCartClosed: false
    })
  })

  it('should close the cart', () => {
    const { result } = renderHook(() =>
      useReducer(cartReducer, { ...initialState, isCartClosed: false })
    )

    act(() => {
      result.current[1]({ type: 'CLOSE_CART' })
    })

    expect(result.current[0]).toEqual({
      ...initialResult,
      isCartClosed: true
    })
  })

  it('should set to initial state and a confirmation message when purchase', () => {
    const item = {
      id: '1',
      productName: 'Product 1',
      price: 10,
      maxAmount: 5,
      taxRate: 0.21,
      quantity: 1,
      index: 0
    }

    const { result } = renderHook(() =>
      useReducer(cartReducer, { ...initialState, cartItems: [item] })
    )

    act(() => {
      result.current[1]({ type: 'PURCHASE' })
    })

    expect(result.current[0]).toEqual({
      ...initialResult,
      message: 'Purchase Confirmed!'
    })
  })

  it('should set warning message for purchase with empty cart', () => {
    const { result } = renderHook(() => useReducer(cartReducer, initialState))

    expect(result.current[0]).toEqual(initialResult)

    act(() => {
      result.current[1]({ type: 'PURCHASE' })
    })

    expect(result.current[0]).toEqual({
      ...initialResult,
      message: 'Please add products to your cart'
    })
  })

  it('should clear cart message', () => {
    const { result } = renderHook(() =>
      useReducer(cartReducer, {
        ...initialState,
        message: 'This message should be cleared'
      })
    )

    act(() => {
      result.current[1]({ type: 'CLEAR_MESSAGE' })
    })

    expect(result.current[0]).toEqual({
      ...initialResult,
      message: null
    })
  })
})
