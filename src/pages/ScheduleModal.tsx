import { Modal } from '../components/Modal'
import { FiPlus, FiX } from 'react-icons/fi'
import { DateObject, getEnglishWeekday } from '../utils/date'
import { Divider } from '../components/Divider'
import { ScheduleObject } from '../utils/schedule'
import { Schedule } from './Schedule'
import { DEFAULT_CATEGORY } from '../utils/category'

type Props = {
  schedules: ScheduleObject[]
  dateObject: DateObject
  isOpen: boolean
  onChangeSchedules: (schedules: ScheduleObject[]) => void
  onCloseModal: () => void
}

export const ScheduleModal = ({ schedules, dateObject, isOpen, onChangeSchedules, onCloseModal }: Props) => {
  const handleClickAddSchedule = () => {
    const newSchedule: ScheduleObject = {
      id: Date.now(),
      schedule: 'New Schedule',
      date: new Date(dateObject.year, dateObject.month, dateObject.date),
      category: DEFAULT_CATEGORY,
      order: schedules.length,
      completed: false,
    }
    onChangeSchedules([...schedules, newSchedule])
  }

  const sortedSchedules = schedules.sort((a, b) => a.order - b.order)

  return (
    <Modal classNames={{ modal: 'w-[360px] h-[400px]' }} isOpen={isOpen} onClose={onCloseModal}>
      <div className="flex flex-col">
        <div className="flex items-center justify-between py-[10px] px-[15px]">
          <div className="flex items-end space-x-[8px]">
            <div className="text-[26px] font-bold">{dateObject.date}</div>
            <div className="text-[20px] font-medium pb-[3px]">{getEnglishWeekday(dateObject)}</div>
          </div>
          <div className="flex space-x-[5px]">
            <button className="bg-[#E6ECF6] rounded-[3px] p-[3px] hover:bg-[#D9E0EE]" onClick={handleClickAddSchedule}>
              <FiPlus size={24} />
            </button>
            <button className="bg-[#E6ECF6] rounded-[3px] p-[3px] hover:bg-[#D9E0EE]" onClick={onCloseModal}>
              <FiX size={24} />
            </button>
          </div>
        </div>
        <Divider />
        <div className="flex flex-col space-y-[20px] p-[25px]">
          {sortedSchedules.map((schedule) => (
            <Schedule key={schedule.id} schedule={schedule} />
          ))}
        </div>
      </div>
    </Modal>
  )
}
