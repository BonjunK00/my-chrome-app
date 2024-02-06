type Props = {
  title?: string
  isOpen?: boolean
  children?: React.ReactNode
  closeOnOutsideClick?: boolean
  onClose?: () => void
}

export const Modal = ({ title = '', isOpen, children, closeOnOutsideClick = true, onClose }: Props) => {
  const handleClickOutside = () => {
    if (closeOnOutsideClick) {
      onClose?.()
    }
  }

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 right-0 z-30 w-full h-full bg-gray-500/30" onClick={handleClickOutside}>
          <div className="absolute z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2 rounded-[3px]">
            <div className="flex items-center justify-between">
              <div>{title}</div>
              <button onClick={onClose}>X</button>
            </div>
            <div>{children}</div>
          </div>
        </div>
      )}
    </>
  )
}
