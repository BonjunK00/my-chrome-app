import { getTimeString } from '../utils/date'
import { ScheduleObject } from '../utils/schedule'
import { IoIosCheckboxOutline } from 'react-icons/io'

type Props = {
  schedule: ScheduleObject
  isSelected?: boolean
  onChangeSchedule?: (schedule: ScheduleObject) => void
  onClickSchedule: (schedule: ScheduleObject) => void
}

export const Schedule = ({ schedule, isSelected, onChangeSchedule, onClickSchedule }: Props) => {
  const handleClickSchedule = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClickSchedule(schedule)
  }

  return (
    <div className="flex space-x-[8px] items-center">
      <div
        className="flex flex-1 items-center justify-between text-[20px] aria-selected:ring-[2px] ring-[#9AB5E7] p-[8px] rounded-[5px] cursor-pointer"
        aria-selected={isSelected}
        onClick={handleClickSchedule}
      >
        <div className="flex space-x-[8px] items-center">
          <div className="bg-blue-300 w-[15px] h-[36px] rounded-[5px]" />
          <div className="">{schedule.schedule}</div>
        </div>
        <div className="">{getTimeString(schedule.date)}</div>
      </div>

      <button>
        <IoIosCheckboxOutline size={30} />
      </button>
    </div>
  )
}
