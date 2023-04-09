export type ButtonProps = {
  title: string
  buttonStyle?: 'primary' | 'secondary'
  buttonType?: 'submit' | 'button' | 'link'
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

function Button({
  title,
  buttonStyle = 'primary',
  buttonType = 'submit',
  onClick
}: ButtonProps) {
  const styleClass =
    buttonStyle === 'primary'
      ? 'bg-indigo-600 hover:bg-indigo-700'
      : 'bg-stone-600 hover:bg-stone-700'

  return (
    <>
      {buttonType === 'link' ? (
        <a className={styleClass} href="/" />
      ) : (
        <button
          type={buttonType}
          onClick={onClick}
          className={`${styleClass} flex h-10 items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white shadow-sm`}
        >
          {title}
        </button>
      )}
    </>
  )
}

export default Button
