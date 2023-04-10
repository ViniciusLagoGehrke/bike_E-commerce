export type ProgressBarProps = {
  min: number
  max: number
  progress: number
}

function ProgressBar({ min, max, progress }: ProgressBarProps) {
  const remainingItems = max - progress
  const percentFilled = (progress / max) * 100
  const textDescription =
    percentFilled === 100
      ? "You can't add more unique items"
      : `You can add more ${remainingItems} unique ${
          remainingItems === 1 ? 'item' : 'items'
        }`

  return (
    <div className="flex w-3/4 flex-wrap items-center justify-center">
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-300">
        <div
          role="progressbar"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={percentFilled}
          className={`h-full ${
            remainingItems > 0 ? 'bg-green-500' : 'bg-red-500'
          }`}
          style={{ width: `${percentFilled}%` }}
        />
      </div>
      <p className="mt-2 text-sm sm:text-base">{textDescription}</p>
    </div>
  )
}

export default ProgressBar
