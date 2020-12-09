function getYearMonthDay (value) {
  const date = new Date(value)
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  return { year, month, day }
}

function getDate (year, month, day = 1) {
  return new Date(year, month, day)
}

export default {
  getYearMonthDay,
  getDate
}