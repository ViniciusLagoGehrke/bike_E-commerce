export type ButtonProps = {
  className?: string
  title: string
  buttonStyle?: 'primary' | 'secondary'
  buttonType?: 'submit' | 'button' | 'link'
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

function Button({
  className = '',
  title,
  buttonStyle = 'primary',
  buttonType = 'submit',
  onClick
}: ButtonProps) {
  const styleClass =
    buttonStyle === 'primary'
      ? 'bg-indigo-600 hover:bg-indigo-700'
      : 'bg-slate-400 hover:bg-slate-500'

  return (
    <>
      {buttonType === 'link' ? (
        <a className={styleClass + className} href="/" />
      ) : (
        <button
          type={buttonType}
          onClick={onClick}
          className={`${styleClass} ${className} flex h-10  w-40 items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white shadow-sm`}
        >
          {title}
        </button>
      )}
    </>
  )
}

export default Button
