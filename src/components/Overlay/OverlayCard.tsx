type OverlayProps = {
  message: string
  onClose: () => void
}

function Card({ message, onClose }: OverlayProps) {
  return (
    <div
      data-testid="overlay-card"
      onClick={(e) => e.stopPropagation()}
      className="z-20 flex h-24 flex-wrap rounded-md bg-white p-3 text-sm text-gray-700 shadow-lg"
    >
      <button
        data-testid="overlay-close-button"
        className="ml-auto cursor-pointer"
        onClick={onClose}
      >
        X
      </button>
      <div className="w-full text-center">
        <p>{message}</p>
      </div>
    </div>
  )
}

function OverlayCard({ message, onClose }: OverlayProps) {
  return (
    <div
      onClick={onClose}
      className="absolute left-0 z-10 flex h-full w-full items-center justify-center bg-gray-800/50"
    >
      <Card message={message} onClose={onClose} />
    </div>
  )
}

export default OverlayCard
