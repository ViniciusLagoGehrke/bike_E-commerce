import { createContext, useContext, useReducer } from 'react'
import cartReducer, { State, Action, initialState } from './Reducer'

type ShoppingCartContextType = {
  state: State
  dispatch: React.Dispatch<Action>
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(
  undefined
)

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext)

  if (context === undefined) {
    throw new Error(
      'useShoppingCart must be used within a ShoppingCartProvider'
    )
  }

  return context
}

type ProviderProps = {
  mockValue?: ShoppingCartContextType
  children: React.ReactNode
}

export const ShoppingCartProvider = ({
  mockValue,
  children
}: ProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const value = { state, dispatch }

  return (
    <ShoppingCartContext.Provider value={mockValue ?? value}>
      {children}
    </ShoppingCartContext.Provider>
  )
}
