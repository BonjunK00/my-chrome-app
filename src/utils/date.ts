export type DateObject = {
  year: number
  month: number
  date: number
}

export const isEqualsDate = (dateObject1: DateObject, dateObject2: DateObject) => {
  return (
    dateObject1.year === dateObject2.year &&
    dateObject1.month === dateObject2.month &&
    dateObject1.date === dateObject2.date
  )
}

export const getEnglishMonth = (month: number) => {
  return months[month - 1]
}

export const getEnglishWeekday = (dateObject1: DateObject) => {
  const date = new Date(dateObject1.year, dateObject1.month - 1, dateObject1.date)
  const weekday = date.getDay()
  return weekdays[weekday]
}

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
