
export default function timeFormat (utcString) {
    const dateFormat = new Date(utcString);
    const hours = dateFormat.getHours()
    const minutes = dateFormat.getMinutes()
    return `${hours}:${minutes}`;
}





