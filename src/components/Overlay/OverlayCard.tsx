type OverlayProps = {
  message: string
  onClose: () => void
}

const OverlayCard: React.FC<OverlayProps> = ({ message, onClose }) => {
  return (
    <div
      onClick={onClose}
      className="absolute left-0 z-10 flex h-full w-full items-center justify-center bg-gray-800"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="z-20 flex flex-wrap rounded-md bg-white p-3 text-sm text-gray-700 shadow-lg"
      >
        <button className="ml-auto cursor-pointer" onClick={onClose}>
          X
        </button>
        <div className="w-full text-center">
          <p>{message}</p>
        </div>
      </div>
    </div>
  )
}

export default OverlayCard
