import { cn } from '../utils/cn'

type Props = {
  isOpen?: boolean
  children?: React.ReactNode
  closeOnOutsideClick?: boolean
  classNames?: {
    backdrop?: string
    modal?: string
  }
  onClose?: () => void
}

export const Modal = ({ isOpen, children, classNames, closeOnOutsideClick = true, onClose }: Props) => {
  const handleClickOutside = () => {
    if (closeOnOutsideClick) {
      onClose?.()
    }
  }

  return (
    <>
      {isOpen && (
        <div
          className={cn('fixed top-0 left-0 right-0 z-30 w-full h-full bg-gray-500/30', classNames?.backdrop)}
          onClick={handleClickOutside}
        >
          <div
            className={cn(
              'absolute z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2 rounded-[10px] shadow-md',
              classNames?.modal,
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </>
  )
}
