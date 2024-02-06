import { Modal } from '../components/Modal'
import { useModal } from '../hooks/useModal'
import { cn } from '../utils/cn'
import { DateObject, getEnglishWeekday } from '../utils/date'

type Props = {
  dateObject: DateObject
  isSelected?: boolean
  isOtherMonth?: boolean
  onClickDate: (dateObject: DateObject) => void
}

export const CalendarDate = ({ dateObject, isSelected = false, isOtherMonth = false, onClickDate }: Props) => {
  const { isOpen, openModal, closeModal } = useModal()

  const handleClickDate = () => {
    onClickDate(dateObject)
    openModal()
  }
  return (
    <>
      <button
        className={cn(
          'flex flex-1 hover:bg-[#E3E9F6] justify-center text-[16px] p-[1px] font-medium',
          isOtherMonth ? 'text-[#B4B4B4]' : 'text-black',
        )}
        aria-selected={isSelected}
        onClick={handleClickDate}
      >
        <div>{dateObject.date}</div>
      </button>
      <Modal title={`${dateObject.date} ${getEnglishWeekday(dateObject)}`} isOpen={isOpen} onClose={closeModal}>
        <div>안녕하세요</div>
      </Modal>
    </>
  )
}
