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
  return (
    <>
      <button
        className={cn(
          'flex flex-1 hover:bg-[#E3E9F6] justify-center text-[16px] p-[1px] font-medium',
          isOtherMonth ? 'text-[#C5CAD3]' : 'text-black',
        )}
        aria-selected={isSelected}
        onClick={handleClickDate}
      >
        <div>{dateObject.date}</div>
      </button>
      <ScheduleModal
        schedules={schedules}
        dateObject={dateObject}
        isOpen={isOpen}
        onChangeSchedules={setSchedules}
        onCloseModal={closeModal}
      />
    </>
  )
}
