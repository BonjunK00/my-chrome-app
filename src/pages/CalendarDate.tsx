import { Modal } from '../components/Modal'
import { useModal } from '../hooks/useModal'
import { DateObject, getEnglishWeekday } from '../utils/date'

type Props = {
  dateObject: DateObject
  isSelected?: boolean
  onClickDate: (dateObject: DateObject) => void
}

export const CalendarDate = ({ dateObject, isSelected = false, onClickDate }: Props) => {
  const { isOpen, openModal, closeModal } = useModal()

  const handleClickDate = (dateObject: DateObject) => () => {
    onClickDate(dateObject)
    openModal()
  }
  return (
    <>
      <button
        className="flex flex-1 hover:bg-[#E3E9F6] justify-center text-[16px] p-[1px] text-[#262C37] font-medium"
        aria-selected={isSelected}
        onClick={handleClickDate(dateObject)}
      >
        <div>{dateObject.date}</div>
      </button>
      <Modal title={`${dateObject.date} ${getEnglishWeekday(dateObject)}`} isOpen={isOpen} onClose={closeModal}>
        <div>안녕하세요</div>
      </Modal>
    </>
  )
}
