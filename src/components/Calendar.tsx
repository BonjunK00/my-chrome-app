import { useEffect, useState } from 'react'

const week = ['일', '월', '화', '수', '목', '금', '토']

type DateObject = {
  year: number
  month: number
  date: number
}

export const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<DateObject>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
  })
  const [weekRows, setWeekRows] = useState<number[][]>([])

  const getWeekRows = (year: number, month: number): number[][] => {
    const firstDay = new Date(year, month - 1, 1).getDay()
    const lastDay = new Date(year, month, 0).getDay()
    const lastDate = new Date(year, month, 0).getDate()
    const prevMonthLastDate = new Date(year, month - 1, 0).getDate()
    const rows = []
    let row = []
    for (let i = 0; i < firstDay; i++) {
      row.push(prevMonthLastDate - firstDay + i + 1)
    }
    for (let i = 1; i <= lastDate; i++) {
      if (row.length === 7) {
        rows.push(row)
        row = []
      }
      row.push(i)
    }
    if (row.length) {
      rows.push(row)
    }
    return rows
  }

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

  useEffect(() => {
    setWeekRows(getWeekRows(selectedDate.year, selectedDate.month))
  }, [selectedDate])

  return (
    <div className="p-[20px] h-full">
      <div className="flex flex-col bg-white p-[10px] h-full">
        <div className="flex items-center px-[10px] justify-between">
          <div>{`${selectedDate.year}년 ${selectedDate.month}월`}</div>
          <div className="flex text-[20px]">
            <button onClick={handleClickPrev}>{`<`}</button>
            <button onClick={handleClickNext}>{`>`}</button>
          </div>
        </div>
        <div className="flex border-b-[1px] border-black">
          {week.map((day) => (
            <div key={day} className="flex-1 text-center">
              {day}
            </div>
          ))}
        </div>
        {weekRows.map((weekRow, rowIndex) => (
          <div key={rowIndex} className="flex flex-1 border-l-[1px] border-black">
            {weekRow.map((date, columnIndex) => (
              <button
                key={`${rowIndex}_${columnIndex}`}
                className="flex flex-1 border-r-[1px] border-b-[1px] border-black hover:bg-gray-200"
                onClick={handleClickDate(date)}
              >
                <div className="items-center aria-selected:text-blue-500" aria-selected={selectedDate.date === date}>
                  {date}
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
