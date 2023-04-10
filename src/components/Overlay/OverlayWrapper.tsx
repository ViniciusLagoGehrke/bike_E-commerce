import { useShoppingCart } from '../../store/ShoppingCart'
import OverlayCard from './OverlayCard'

type OverlayProps = {
  children: React.ReactNode
}

const OverlayWrapper = ({ children }: OverlayProps) => {
  const { state, dispatch } = useShoppingCart()

  const handleClose = () => {
    dispatch({ type: 'CLEAR_MESSAGE' })
  }

  return (
    <>
      {state.message ? (
        <OverlayCard onClose={handleClose} message={state.message} />
      ) : null}
      {children}
    </>
  )
}

export default OverlayWrapper
