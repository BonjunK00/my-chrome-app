import { useEffect, useState } from 'react'

const defaultWeekRows = [
  [1, 2, 3, 4, 5, 6, 7],
  [8, 9, 10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19, 20, 21],
  [22, 23, 24, 25, 26, 27, 28],
  [29, 30, 31],
]

const week = ['일', '월', '화', '수', '목', '금', '토']

type DateObject = {
  year: number
  month: number
  date: number
}

export const Calendar = () => {
  const today = new Date()

  const [selectedDate, setSelectedDate] = useState<DateObject>({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    date: today.getDate(),
  })
  const [weekRows, setWeekRows] = useState<number[][]>(defaultWeekRows)

  const handleClickPrev = () => {
    if (selectedDate.month === 1) {
      setSelectedDate({ year: selectedDate.year - 1, month: 12, date: 1 })
      return
    }
    setSelectedDate({ year: selectedDate.year, month: selectedDate.month - 1, date: 1 })
  }

  const handleClickNext = () => {
    if (selectedDate.month === 12) {
      setSelectedDate({ year: selectedDate.year + 1, month: 1, date: 1 })
      return
    }
    setSelectedDate({ year: selectedDate.year, month: selectedDate.month + 1, date: 1 })
  }

  const handleClickDate = (date: number) => () => {
    setSelectedDate({ ...selectedDate, date })
  }

  return (
    <div className="p-[20px]">
      <div className="flex flex-col bg-white w-fit p-[10px] ">
        <div className="flex items-center justify-between px-[10px]">
          <div>{`${selectedDate.year}년 ${selectedDate.month}월`}</div>
          <div className="flex text-[20px]">
            <button onClick={handleClickPrev}>{`<`}</button>
            <button onClick={handleClickNext}>{`>`}</button>
          </div>
        </div>
        <div className="flex">
          {week.map((day) => (
            <div key={day} className="w-[40px]">
              {day}
            </div>
          ))}
        </div>
        {weekRows.map((weekRow, index) => (
          <div key={index} className="flex">
            {weekRow.map((date) => (
              <button
                key={date}
                aria-selected={selectedDate.date === date}
                className="w-[40px] text-start aria-selected:text-blue-500"
                onClick={handleClickDate(date)}
              >
                {date}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
