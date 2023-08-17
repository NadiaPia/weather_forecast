
export const timeFormater = (datetime) => {
    if (!datetime) return {};

    // datetime should have format '2023-07-07 00:00';
    const dateTimeArray = datetime.split(/[\s-]+/)      //['2023', '07', '05', '12:43']

    const dateNoTime = datetime.split(" "); //['2023-07-07', '12:43'] - due to the time diff btw UTC and browser location day of the week  
    //calculates incorrectly if date goes with the time => I removed the time

    const year = dateTimeArray[0];  //  '2023';

    const day = Number(dateTimeArray[2]).toString() //05 => 5

    const monthObject = {
        '01': 'Jan',
        '02': 'Feb',
        '03': 'Mar',
        '04': 'Apr',
        '05': 'May',
        '06': 'Jun',
        '07': 'Jul',
        '08': 'Aug',
        '09': 'Sep',
        '10': 'Oct',
        '11': 'Nov',
        '12': 'Dec'
    }

    const month = monthObject[dateTimeArray[1]];
    //console.log(monthWord)//Jul

    //week of the day:
    const [hour, min] = dateTimeArray[3] ? dateTimeArray[3].split(":") : ["", ""]; //'13:15' //because Tomorrow component may have no time
    
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];    
    let date = new Date(dateNoTime[0]);    
    const offset = (new Date()).getTimezoneOffset(); //get differance with UTC in minutes
    date.setHours(date.getHours() + (offset / 60)) //shift hours of the date to differance with UTC
    const weekdayIndex = date.getDay();
    const dayOfWeek = weekday[weekdayIndex];
    //console.log("hour", hour)
    return { year, day, month, hour, min, dayOfWeek };
    
};

export const timeTransformer = (amPmTime) => { //should have format 05:55 AM or 06:20 PM
    const amPmTimeArray = amPmTime.toLowerCase().split(/[\s-:]+/); //['05', '55', 'am']    
    let hour = amPmTimeArray[0];
    const min = amPmTimeArray[1];

    if(amPmTimeArray[2] === 'am' && hour === "12") {
        hour = "00";
    } else if
    (amPmTimeArray[2] === 'pm' && Number(hour) < 12) {
        hour = (Number(hour) + 12).toString();
    }
    return `${hour}:${min}`;
}

