type ProductKeys = 'id' | 'productName' | 'maxAmount' | 'taxRate' | 'price'

type ProductValueForKey<K extends ProductKeys> = K extends 'id' | 'productName'
  ? string
  : number

export type ProductType = {
  [K in ProductKeys]: ProductValueForKey<K>
}

export type CartItemType = Omit<ProductType, 'maxAmount'> &
  Record<'quantity', number>
