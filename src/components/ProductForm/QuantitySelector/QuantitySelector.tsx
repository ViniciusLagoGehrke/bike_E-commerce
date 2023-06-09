import { useState } from 'react'

type SelectorProps = {
  min?: number
  max?: number
  step?: number
  defaultValue: number
  handleAmountChange: (newAmount: number) => void
}

function QuantitySelector({
  min = 1,
  max = 10,
  defaultValue = 1,
  handleAmountChange
}: SelectorProps) {
  const [value, setValue] = useState(defaultValue)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value)
    const selectedQuantity = value <= max ? value : max
    setValue(selectedQuantity)
    handleAmountChange(selectedQuantity)
  }

  return (
    <div className="flex gap-2">
      <div className="flex flex-col text-sm">
        <label className="text-slate-500" htmlFor="quantity-slider">
          Amount
        </label>
        <input
          className="relative w-24"
          type="range"
          id="quantity-slider"
          name="quantity-slider"
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
        />
      </div>
      <label htmlFor="quantity-input" />
      <div className="relative">
        <input
          className="h-10 w-10 rounded-md border border-slate-300 bg-white p-2 text-center text-sm shadow-sm placeholder:text-slate-400 invalid:border-pink-500
              invalid:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1
              focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
          type="number"
          id="quantity-input"
          name="quantity-input"
          min={min}
          max={max}
          value={value}
          onFocus={(e) => e.target.select()}
          onChange={handleChange}
        />
        <span className="absolute inline-block w-24 translate-y-10 -translate-x-1/2 text-red-600">
          {value > max ? `Max of ${max}` : ''}
        </span>
      </div>
    </div>
  )
}

export default QuantitySelector
