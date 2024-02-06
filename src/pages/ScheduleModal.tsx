import { Modal } from '../components/Modal'
import { FiPlus, FiX } from 'react-icons/fi'
import { DateObject, getEnglishWeekday } from '../utils/date'
import { Divider } from '../components/Divider'

type Props = {
  dateObject: DateObject
  isOpen: boolean
  onCloseModal: () => void
}

export const ScheduleModal = ({ dateObject, isOpen, onCloseModal }: Props) => {
  return (
    <Modal classNames={{ modal: 'w-[360px] h-[400px]' }} isOpen={isOpen} onClose={onCloseModal}>
      <div className="flex flex-col">
        <div className="flex items-center justify-between py-[10px] px-[15px]">
          <div className="flex items-end space-x-[8px]">
            <div className="text-[26px] font-bold">{dateObject.date}</div>
            <div className="text-[20px] font-medium pb-[3px]">{getEnglishWeekday(dateObject)}</div>
          </div>
          <div className="flex space-x-[5px]">
            <button className="bg-[#E6ECF6] rounded-[3px] p-[3px] hover:bg-[#D9E0EE]">
              <FiPlus size={24} />
            </button>
            <button className="bg-[#E6ECF6] rounded-[3px] p-[3px] hover:bg-[#D9E0EE]" onClick={onCloseModal}>
              <FiX size={24} />
            </button>
          </div>
        </div>
        <Divider />
      </div>
    </Modal>
  )
}
