import { Modal } from '../components/Modal'
import { FiPlus, FiX, FiChevronDown, FiChevronUp, FiTrash2, FiEdit3 } from 'react-icons/fi'
import { DateObject, getEnglishWeekday } from '../utils/date'
import { Divider } from '../components/Divider'
import { ScheduleObject } from '../utils/schedule'
import { Schedule } from './Schedule'
import { DEFAULT_CATEGORY } from '../utils/category'
import { useState } from 'react'

type Props = {
  schedules: ScheduleObject[]
  dateObject: DateObject
  isOpen: boolean
  onChangeSchedules: (schedules: ScheduleObject[]) => void
  onCloseModal: () => void
}

export const ScheduleModal = ({ schedules, dateObject, isOpen, onChangeSchedules, onCloseModal }: Props) => {
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | undefined>(undefined)

  const handleClickAddSchedule = () => {
    const newSchedule: ScheduleObject = {
      id: Date.now(),
      schedule: 'New Schedule',
      date: new Date(dateObject.year, dateObject.month, dateObject.date, 9, 0, 0),
      category: DEFAULT_CATEGORY,
      order: schedules.length,
      completed: false,
    }
    onChangeSchedules([...schedules, newSchedule])
  }

  const handleChangeSelectedScheduleId = (schedule: ScheduleObject) => {
    setSelectedScheduleId(schedule.id)
  }

  const handleCloseModal = () => {
    setSelectedScheduleId(undefined)
    onCloseModal()
  }

  const sortedSchedules = [...schedules].sort((a, b) => a.order - b.order)

  return (
    <Modal classNames={{ modal: 'w-[360px] h-[400px]' }} isOpen={isOpen} onClose={handleCloseModal}>
      <div className="flex flex-col">
        <div className="flex items-center justify-between py-[10px] px-[15px]">
          <div className="flex items-end space-x-[8px]">
            <div className="text-[26px] font-bold">{dateObject.date}</div>
            <div className="text-[20px] font-medium pb-[3px]">{getEnglishWeekday(dateObject)}</div>
          </div>
          <div className="flex space-x-[5px]">
            {false && (
              <>
                <button className="bg-[#E6ECF6] rounded-[3px] p-[3px] hover:bg-[#D9E0EE]">
                  <FiEdit3 size={24} />
                </button>
                <button className="bg-[#E6ECF6] rounded-[3px] p-[3px] hover:bg-[#D9E0EE]">
                  <FiTrash2 size={24} />
                </button>
                <button className="bg-[#E6ECF6] rounded-[3px] p-[3px] hover:bg-[#D9E0EE]">
                  <FiChevronUp size={24} />
                </button>
                <button className="bg-[#E6ECF6] rounded-[3px] p-[3px] hover:bg-[#D9E0EE]">
                  <FiChevronDown size={24} />
                </button>
              </>
            )}

            <button className="bg-[#E6ECF6] rounded-[3px] p-[3px] hover:bg-[#D9E0EE]" onClick={handleClickAddSchedule}>
              <FiPlus size={24} />
            </button>
            <button className="bg-[#E6ECF6] rounded-[3px] p-[3px] hover:bg-[#D9E0EE]" onClick={handleCloseModal}>
              <FiX size={24} />
            </button>
          </div>
        </div>
        <Divider />
        <div className="flex flex-col space-y-[10px] p-[15px]">
          {sortedSchedules.map((schedule) => (
            <Schedule
              key={schedule.id}
              schedule={schedule}
              isSelected={selectedScheduleId === schedule.id}
              onClickSchedule={handleChangeSelectedScheduleId}
            />
          ))}
        </div>
      </div>
    </Modal>
  )
}
