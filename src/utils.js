export const containsNumber = (str) => {
    return /\d/.test(str);
}

export const containsOnlyNumber = (str) => {
    return /^\d+$/.test(str);
}

export const isValidPhoneNumber = (str) => {
    const regex = /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8,9})$/;
    return regex.test(str);
}

export const isValidEmail = (str) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(str);
}

/**
 * compareBetweenTwoTimeString() function
 *
 * @param firstTimeString  The first time string 'HH:MM:SS'
 * 
 * @param secondTimeString  The second time string 'HH:MM:SS'
 * 
 * @returns 
 * 1 if first time  secondTimeString, 
 * -1 if firstTimeString  secondTimeString, 
 * 0 if firstTimeString  secondTimeString
 */
export const compareBetweenTwoTimeString = (firstTimeString, secondTimeString) => {
    const firstTime = firstTimeString.split(':');
    const secondTime = secondTimeString.split(':');
    const firstHour = parseInt(parseInt(firstTime[0]));
    const secondHour = parseInt(parseInt(secondTime[0]));
    const firstMinute = parseInt(parseInt(firstTime[1]));
    const secondMinute = parseInt(parseInt(secondTime[1]));
    const firstSecond = parseInt(parseInt(firstTime[2]));
    const secondSecond = parseInt(parseInt(secondTime[2]));

    if (firstHour < secondHour) {
        return -1;
    } else if (firstHour === secondHour && firstMinute < secondMinute) {
        return -1;
    } else if (firstHour === secondHour
        && firstMinute === secondMinute
        && firstSecond < secondSecond) {
        return -1;
    } else if (firstHour === secondHour
        && firstMinute === secondMinute
        && firstSecond === secondSecond) {
        return 0;
    } else {
        return 1;
    }
}

export const getTimeStringFromMinutesAgo = (timeString, minutesAgo) => {
    const time = timeString.split(':');
    const hour = parseInt(time[0]);
    const minute = parseInt(time[1]);
    const second = parseInt(time[2]);

    let date = new Date();
    date.setHours(hour, minute, second)
    let dateFromMinutesAgo = new Date(date - 1000 * (60 * minutesAgo)).toLocaleTimeString();

    return dateFromMinutesAgo;
}

export const getSeperateTimeFromMinutesAgo = (timeString, minutesAgo) => {
    const time = timeString.split(':');
    const hour = parseInt(time[0]);
    const minute = parseInt(time[1]);
    const second = parseInt(time[2]);

    let date = new Date();
    date.setHours(hour, minute, second)
    let dateFromMinutesAgo = new Date(date - 1000 * (60 * minutesAgo)).toLocaleTimeString();

    return [
        parseInt(dateFromMinutesAgo.split(':')[0]),
        parseInt(dateFromMinutesAgo.split(':')[1]),
        parseInt(dateFromMinutesAgo.split(':')[2]),
    ];
}

export const getSeperateTimeFromMinutesLater = (timeString, minutesLater) => {
    const time = timeString.split(':');
    const hour = parseInt(time[0]);
    const minute = parseInt(time[1]);
    const second = parseInt(time[2]);

    let date = new Date();
    date.setHours(hour, minute + minutesLater, second)
    let dateFromMinutesAgo = new Date(date).toLocaleTimeString();

    return [
        parseInt(dateFromMinutesAgo.split(':')[0]),
        parseInt(dateFromMinutesAgo.split(':')[1]),
        parseInt(dateFromMinutesAgo.split(':')[2]),
    ];
}

export const calculateValidTimeOut = (timeInInput, availableTimes) => {
    // 7-11 | 13-17 => valid: 00:00-06:59 | 11:01-12:59 | 17:01 - 11:59
    // const time = [
    //     {
    //         timein: '07:30:00',
    //         timeout: '11:00:00'
    //     },
    //     {
    //         timein: '13:00:00',
    //         timeout: '17:00:00'
    //     },
    // ];

    // in_input < 1st in => out_input < 1st in
    // in_input < next in => out_input < next in
    // in_input > last out => out_input with all values

    let validTimeOut = '';
    for (let i = 0; i < availableTimes.length; i++) {
        if (compareBetweenTwoTimeString(timeInInput, availableTimes[i].timein) === -1 && i !== availableTimes.length) {
            validTimeOut = getTimeStringFromMinutesAgo(availableTimes[i].timein, 15);
            break;
        } else if (compareBetweenTwoTimeString(timeInInput, availableTimes[i].timeout) === 1 && i !== availableTimes.length) {
            validTimeOut = '23:59:59';
        }
    }
    return validTimeOut;
}
