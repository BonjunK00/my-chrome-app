import { useEffect, useState } from 'react'
import { CalendarDate } from './CalendarDate'
import { DateObject, getEnglishMonth, isEqualsDate, weekdays } from '../utils/date'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { useIndexedDB } from 'react-indexed-db-hook'

export const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<DateObject>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
  })
  const [weekRows, setWeekRows] = useState<DateObject[][]>([])

  const { getAll } = useIndexedDB('schedule')

  const updateWeekRows = (year: number, month: number) => {
    const firstDay = new Date(year, month - 1, 1).getDay()
    const lastDay = new Date(year, month, 0).getDay()
    const lastDate = new Date(year, month, 0).getDate()

    const prevMonth = month === 1 ? 12 : month - 1
    const nextMonth = month === 12 ? 1 : month + 1
    const prevYear = month === 1 ? year - 1 : year
    const nextYear = month === 12 ? year + 1 : year

    const prevMonthLastDate = new Date(year, month - 1, 0).getDate()

    const rows = []
    let row = []
    for (let i = 0; i < firstDay; i++) {
      row.push({ year: prevYear, month: prevMonth, date: prevMonthLastDate - firstDay + i + 1 })
    }
    for (let i = 1; i <= lastDate; i++) {
      if (row.length === 7) {
        rows.push(row)
        row = []
      }
      row.push({ year, month, date: i })
    }
    for (let i = 0; i < 7 - lastDay - 1; i++) {
      row.push({ year: nextYear, month: nextMonth, date: i + 1 })
    }
    if (row.length) {
      rows.push(row)
    }
    setWeekRows(rows)
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

  useEffect(() => {
    updateWeekRows(selectedDate.year, selectedDate.month)
  }, [selectedDate])

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAll()
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [getAll])

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex items-center px-[10px] justify-between bg-[#8195B9] text-white p-[5px]">
          <button className="text-[40px]" onClick={handleClickPrev}>
            <FaAngleLeft />
          </button>
          <div className="flex flex-col items-center">
            <div className="text-[30px]">{getEnglishMonth(selectedDate.month)}</div>
            <div className="text-[18px]">{selectedDate.year}</div>
          </div>
          <button className="text-[40px]" onClick={handleClickNext}>
            <FaAngleRight />
          </button>
        </div>
        <div className="flex bg-[#9AB5E7] text-white py-[10px] text-[18px]">
          {weekdays.map((day) => (
            <div key={day} className="flex-1 text-center">
              {day}
            </div>
          ))}
        </div>
        {weekRows.map((weekRow, rowIndex) => (
          <div
            key={rowIndex}
            className={`flex flex-1 overflow-hidden ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-[#EDF3FF]'}`}
          >
            {weekRow.map((dateObject) => (
              <CalendarDate
                key={`${dateObject.year}_${dateObject.month}_${dateObject.date}`}
                dateObject={dateObject}
                isSelected={isEqualsDate(selectedDate, dateObject)}
                isOtherMonth={dateObject.month !== selectedDate.month}
                onClickDate={setSelectedDate}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  )
}
