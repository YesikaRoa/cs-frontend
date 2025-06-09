export default function formatDateTime(isoString, format = 'dateTime') {
  const date = new Date(isoString)

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const yearShort = String(date.getFullYear()).slice(-2)

  const formattedDate = `${day}-${month}-${yearShort}`

  const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true }
  const formattedTime = date.toLocaleTimeString('en-US', timeOptions)

  switch (format) {
    case 'date':
      return formattedDate
    case 'time':
      return formattedTime
    case 'dateTime':
    default:
      return `${formattedDate} ${formattedTime}`
  }
}
