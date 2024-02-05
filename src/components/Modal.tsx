type Props = {
  isOpen?: boolean
  children?: React.ReactNode
  onClose?: () => void
}

export const Modal = ({ isOpen, children, onClose }: Props) => {
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 right-0 z-30 w-full h-full bg-gray-500/30">
          <div className="absolute z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2 rounded-[5px]">
            <button onClick={onClose}>X</button>
            <div>{children}</div>
          </div>
        </div>
      )}
    </>
  )
}
