class DateFormatter {

    timeFormat (utcString) {
        const dateFormat = new Date(utcString);
        const hours = dateFormat.getHours()
        const minutes = dateFormat.getMinutes()
        return `${hours}:${minutes}`;
    }

    getAge = (utcString) => {
        const today = new Date();
        const birthDate = new Date(utcString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
            age--;
        }
        return age;
    }
}

const dateFormatter = new DateFormatter();
export default dateFormatter;





