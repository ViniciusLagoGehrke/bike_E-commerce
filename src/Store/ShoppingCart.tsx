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

type Props = {
  children: React.ReactNode
}

export const ShoppingCartProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const value = { state, dispatch }

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  )
}
