import { Modal } from '../components/Modal'
import { FiPlus, FiX, FiChevronDown, FiChevronUp, FiTrash2, FiEdit3 } from 'react-icons/fi'
import { DateObject, getEnglishWeekday } from '../utils/date'
import { Divider } from '../components/Divider'
import { ScheduleObject } from '../utils/schedule'
import { Schedule } from './Schedule'
import { DEFAULT_CATEGORY } from '../utils/category'
import { useState } from 'react'
import { useIndexedDB } from 'react-indexed-db-hook'

type Props = {
  schedules: ScheduleObject[]
  dateObject: DateObject
  isOpen: boolean
  onChangeSchedules: (schedules: ScheduleObject[]) => void
  onCloseModal: () => void
}

export const ScheduleModal = ({ schedules, dateObject, isOpen, onChangeSchedules, onCloseModal }: Props) => {
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | undefined>(undefined)
  const {add} = useIndexedDB('schedule')

  const handleClickDelete = () => {
    if (selectedScheduleId === undefined) return
    const newSchedules = schedules.filter((schedule) => schedule.id !== selectedScheduleId)
    onChangeSchedules(newSchedules)
    setSelectedScheduleId(undefined)
  }

  const handleClickUp = () => {
    if (selectedScheduleId === undefined) return
    const index = schedules.findIndex((schedule) => schedule.id === selectedScheduleId)
    if (index === 0) return
    const newSchedules = [...schedules]
    const temp = newSchedules[index].order
    newSchedules[index].order = newSchedules[index - 1].order
    newSchedules[index - 1].order = temp
    onChangeSchedules(newSchedules)
  }

  const handleClickDown = () => {
    if (selectedScheduleId === undefined) return
    const index = schedules.findIndex((schedule) => schedule.id === selectedScheduleId)
    if (index === schedules.length - 1) return
    const newSchedules = [...schedules]
    const temp = newSchedules[index].order
    newSchedules[index].order = newSchedules[index + 1].order
    newSchedules[index + 1].order = temp
    onChangeSchedules(newSchedules)
  }

  const handleClickAddSchedule = async () => {
    const maxOrder =
      schedules.length > 0
        ? schedules.reduce((a, b) => {
            if (a.order > b.order) return a
            return b
          }).order
        : 0

    const newSchedule: ScheduleObject = {
      id: Date.now(),
      schedule: 'New Schedule',
      date: new Date(dateObject.year, dateObject.month, dateObject.date, 9, 0, 0),
      category: DEFAULT_CATEGORY,
      order: maxOrder + 1,
      completed: false,
    }
    await add(newSchedule)
    onChangeSchedules([...schedules, newSchedule])
  }

  const handleChangeSelectedScheduleId = (schedule: ScheduleObject) => {
    setSelectedScheduleId(schedule.id)
  }

  const handleCloseModal = () => {
    setSelectedScheduleId(undefined)
    onCloseModal()
  }

  const handleClickEmpty = () => {
    setSelectedScheduleId(undefined)
  }

  const handleChangeSchedule = (changedSchedule: ScheduleObject) => {
    const changedSchedules = schedules.map((schedule) => {
      if (schedule.id === changedSchedule.id) return changedSchedule
      return schedule
    })
    onChangeSchedules(changedSchedules)
  }

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal}>
      <div className="flex flex-col w-[360px] h-[400px]" onClick={handleClickEmpty}>
        <div className="flex items-center justify-between py-[10px] px-[15px]">
          <div className="flex items-end space-x-[8px]">
            <div className="text-[26px] font-bold">{dateObject.date}</div>
            <div className="text-[20px] font-medium pb-[3px]">{getEnglishWeekday(dateObject)}</div>
          </div>
          <div className="flex space-x-[5px]" onClick={(e) => e.stopPropagation()}>
            {selectedScheduleId !== undefined && (
              <>
                <button className="bg-[#E6ECF6] rounded-[3px] p-[3px] hover:bg-[#D9E0EE]" onClick={handleClickDelete}>
                  <FiTrash2 size={24} />
                </button>
                <button className="bg-[#E6ECF6] rounded-[3px] p-[3px] hover:bg-[#D9E0EE]" onClick={handleClickUp}>
                  <FiChevronUp size={24} />
                </button>
                <button className="bg-[#E6ECF6] rounded-[3px] p-[3px] hover:bg-[#D9E0EE]" onClick={handleClickDown}>
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
        <div className="flex flex-col space-y-[5px] p-[15px] overflow-auto scrollbar-hide">
          {schedules.map((schedule) => (
            <Schedule
              key={schedule.id}
              schedule={schedule}
              isSelected={selectedScheduleId === schedule.id}
              onClickSchedule={handleChangeSelectedScheduleId}
              onChangeSchedule={handleChangeSchedule}
            />
          ))}
        </div>
      </div>
    </Modal>
  )
}
