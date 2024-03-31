import { format, parse } from 'date-fns';
export function formatDate(date) {
    if (!date)
        return '';
    return format(date.toDateString(), 'dd-MMM-yyyy');
}
export function parseDate(date) {
    if (!date)
        return null;
    return parse(date, 'dd-MMM-yyyy', new Date());
}
//# sourceMappingURL=date-helper.js.map