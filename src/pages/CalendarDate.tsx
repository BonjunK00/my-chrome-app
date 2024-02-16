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
          'flex flex-col flex-1 hover:bg-[#E3E9F6] items-start text-[16px] p-[1px] font-medium cursor-pointer overflow-hidden',
          isOtherMonth ? 'text-[#C5CAD3]' : 'text-black',
        )}
        aria-selected={isSelected}
        onClick={handleClickDate}
      >
        <div className="flex justify-center w-full">{dateObject.date}</div>
        <div className="flex flex-col w-full overflow-hidden px-[2px]">
          {sortedSchedules.map((schedule) => {
            return (
              <div className="flex items-center space-x-[1px] overflow-x-hidden w-full min-h-[21px]">
                <div className="bg-blue-300 min-w-[5px] w-[5px] h-[15px] rounded-[2px]" />
                <div
                  className={cn(
                    'text-[12px] whitespace-nowrap overflow-hidden text-ellipsis',
                    schedule.completed && 'line-through',
                  )}
                >
                  {schedule.schedule}
                </div>
              </div>
            )
          })}
        </div>
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
