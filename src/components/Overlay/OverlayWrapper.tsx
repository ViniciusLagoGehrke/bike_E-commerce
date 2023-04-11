import { useShoppingCart } from '../../store/CartStore'
import OverlayCard from './OverlayCard'

type OverlayProps = {
  children: React.ReactNode
}

function OverlayWrapper({ children }: OverlayProps) {
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
