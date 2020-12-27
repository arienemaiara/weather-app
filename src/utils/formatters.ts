import moment from 'moment'

export function formatDateToCalendar(datetime: string) {
  console.log('formatDateToCalendar', datetime)
  return moment(datetime).calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: 'DD/MM/YYYY'
  })
}
