import ProgressBar from './ProgressBar'

const MAX_ITEMS = 10

type FooterProps = {
  totalItems: number
}

function Footer({ totalItems = 0 }: FooterProps) {
  return (
    <footer className="flex h-14 items-center justify-center border-t bg-blue-50">
      <ProgressBar min={0} max={MAX_ITEMS} progress={totalItems} />
    </footer>
  )
}

export default Footer
