
export const timeFormater = (datetime) => {
    if(!datetime) return {};

    // datetime should have format '2023-07-07 00:00';
    const dateTimeArray = datetime.split(/[\s-]+/)      //['2023', '07', '05', '12:43']

    const year = dateTimeArray[0];  //  '2023';

    const day = Number(dateTimeArray[2]).toString() //05 => 5

    /*
    const day = () => {

        if (!dateTimeArray[2]) return;
        if (dateTimeArray[2][0] === '0') {
            return dateTimeArray[2].slice(1);
        } else {
            return dateTimeArray[2];
        }
    };
    //console.log("day", day())
*/
    
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

    const [hour, min] = dateTimeArray[3].split(":"); //'13:15'

    return {year, day, month, hour, min}
}
