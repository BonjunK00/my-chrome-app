import { getTimeString } from '../utils/date'
import { ScheduleObject } from '../utils/schedule'
import { IoIosCheckboxOutline } from 'react-icons/io'

type Props = {
  schedule: ScheduleObject
}

export const Schedule = ({ schedule }: Props) => {
  return (
    <div className="flex items-center justify-between text-[20px]">
      <div className="flex space-x-[8px] items-center">
        <div className="bg-blue-300 w-[15px] h-[36px] rounded-[5px]" />
        <div className="">{schedule.schedule}</div>
      </div>
      <div className="flex space-x-[8px] items-center">
        <div className="">{getTimeString(schedule.date)}</div>
        <button>
          <IoIosCheckboxOutline size={30} />
        </button>
      </div>
    </div>
  )
}
