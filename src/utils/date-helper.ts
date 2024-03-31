import { format, parse } from 'date-fns'

export function formatDate(date: Date | undefined): string {
  if (!date) return ''
  return format(date.toDateString(), 'dd-MMM-yyyy')
}
export function parseDate(date: string | undefined): Date | null {
  if (!date) return null
  return parse(date, 'dd-MMM-yyyy', new Date())
}
