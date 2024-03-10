import { format, parse } from 'date-fns'

export function formatDate(date: Date | undefined): string {
  if (!date) return ''
  return format(date.toDateString(), 'dd-MMM-yyyy')
}
export function parseDate(date: string | undefined): Date | string {
  if (!date) return ''
  return parse(date, 'dd-MMM-yyyy', new Date())
}
