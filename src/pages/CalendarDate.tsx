import { useState } from 'react'
import { useModal } from '../hooks/useModal'
import { cn } from '../utils/cn'
import { DateObject } from '../utils/date'
import { ScheduleObject } from '../utils/schedule'
import { ScheduleModal } from './ScheduleModal'

type Props = {
  dateObject: DateObject
  isSelected?: boolean
  isOtherMonth?: boolean
  onClickDate: (dateObject: DateObject) => void
}

export const CalendarDate = ({ dateObject, isSelected = false, isOtherMonth = false, onClickDate }: Props) => {
  const [schedules, setSchedules] = useState<ScheduleObject[]>([])

  const { isOpen, openModal, closeModal } = useModal()

  const handleClickDate = () => {
    onClickDate(dateObject)
    openModal()
  }

  const sortedSchedules = [...schedules].sort((a, b) => a.order - b.order)
  return (
    <>
      <div
        className={cn(
          'flex flex-col flex-1 hover:bg-[#E3E9F6] items-start text-[16px] p-[1px] font-medium cursor-pointer overflow-x-hidden',
          isOtherMonth ? 'text-[#C5CAD3]' : 'text-black',
        )}
        aria-selected={isSelected}
        onClick={handleClickDate}
      >
        <div className="flex justify-center w-full">{dateObject.date}</div>
        {sortedSchedules.map((schedule) => {
          return (
            <div className="flex space-x-[2px] p-[2px] overflow-x-hidden w-full">
              <div className="bg-blue-300 w-[6px] h-[18px] rounded-[3px]" />
              <div className="text-[12px] whitespace-nowrap overflow-hidden text-ellipsis">{schedule.schedule}</div>
            </div>
          )
        })}
      </div>
      {isOpen && (
        <ScheduleModal
          schedules={sortedSchedules}
          dateObject={dateObject}
          isOpen={isOpen}
          onChangeSchedules={setSchedules}
          onCloseModal={closeModal}
        />
      )}
    </>
  )
}
