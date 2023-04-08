import { useEffect, useState } from 'react'

type DropdownProps = {
  currentAmount: number
  maxAmount: number | undefined
  handleAmountChange: (newAmount: number) => void
}

function QuantitySelector({
  currentAmount = 1,
  maxAmount = 1,
  handleAmountChange
}: DropdownProps) {
  const [value, setValue] = useState(currentAmount)

  useEffect(() => {
    setValue(currentAmount)
  }, [currentAmount])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value)
    const selectedQuantity = value <= maxAmount ? value : maxAmount
    setValue(selectedQuantity)
    handleAmountChange(selectedQuantity)
  }
  return (
    <div className="flex flex-col pl-2">
      <label htmlFor="quantity" />
      <input
        className="h-10 w-16 rounded-md border border-slate-300 bg-white p-2 text-sm shadow-sm placeholder:text-slate-400 invalid:border-pink-500
              invalid:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1
              focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
        type="number"
        id="quantity"
        name="quantity"
        min={1}
        max={maxAmount}
        value={value}
        onFocus={(e) => e.target.select()}
        onChange={handleChange}
      />
    </div>
  )
}

export default QuantitySelector
