type Props = {
  isOpen?: boolean
  children?: React.ReactNode
  onClose?: () => void
}

export const Modal = ({ isOpen, children, onClose }: Props) => {
  return (
    <>
      {isOpen && (
        <div className="absolute z-50 transform -translate-x-1/2 -translate-y-1/2 bg-green-300 top-1/2 left-1/2">
          <div>{children}</div>
          <button onClick={onClose}>닫기</button>
        </div>
      )}
    </>
  )
}
