import React from 'react';

export const getCurrentMonth = (props) => {
    console.log('getCurrentMonth');
    let month;
    if(props.currentMonth !== null) {
        month = props.currentMonth;
    } else {
        month = (new Date()).getMonth();
        props.storeCurrentMonthToState(month);
    }
    return month;
}


export const getCurrentYear = (props) => {
    console.log('getCurrentYear');
    let year;
    if(props.currentYear !== null) {
        year = props.currentYear;
    } else {
        year = (new Date()).getFullYear();
        props.storeCurrentYearToState(year);
    }
    return year;
}

export const getCurrentDate = (props) => {
    console.log('getCurrentDate');
    let date;
    if(props.currentDate !== null) {
        date = props.currentDate;
    } else {
        date = (new Date()).getDate();
    }
    props.storeCurrentDateToState(date);
    return date;
}


// last date of any given month is
// 1st date of next month - 1
// need current year
export const getLastFullDate = (props) => {
    console.log('getLastFullDate');
    let currentMonth = props.currentMonth || getCurrentMonth(props);
    let currentYear = currentMonth === 11 ? // if december, make it new year
        (props.currentYear  || getCurrentYear(props)) + 1 
        : (props.currentYear  || getCurrentYear(props));
    let nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    // add 1 to nextMonth to get exact month
    // because months array is zero-based
    // thus, 0 is january but 1/1 is january 1st in date format
    let nextMonthFullDate = (new Date(`${nextMonth + 1}/1/${currentYear}`));
    let lastFullDate =  (new Date(nextMonthFullDate.setDate(0)));
    return lastFullDate;
}

// get first day of the month
export const getFirstDay = (props) => {
    console.log('getFirstDay', props.currentMonth);
    let month = (props.currentMonth || getCurrentMonth(props)) + 1;
    let currentYear = props.currentYear || getCurrentYear(props);
    let firstDate = (new Date(`${month}/1/${currentYear}`));
    let firstDay = firstDate.getDay();
    return firstDay;
}


//get # of weeks
// count 2 weeks straight off-the-bat. 1st week where first date of month is.
// 2nd week is where last date of month is.
// take first date of the last week, subtract 1 to get the last date of the week before
// i.e. if 27 is first date of last week, then the 26th is the last date of the week before
// after getting that date, look for the last date of the first week
// then subtract that from the last date of 2nd-to-the-last week
export const getNumberOfWeeks = (props) => {
    console.log('getNumberOfWeeks');
    let weekCount = 2;
    let lastFullDate = getLastFullDate(props);
    let lastDate = lastFullDate.getDate();
    let lastDay = lastFullDate.getDay();
    let a = lastDate - lastDay;
    let firstDay = getFirstDay(props);
    let b = 1 + (6 - firstDay);
    weekCount += (a - b - 1)/7
    return weekCount;
}

export const createWeek = (props) => {
    console.log('createWeek');
    let allWeeks = [];
    let week = [];
    let dateNumber = 1; // date counter
    let weekNumber = 1; // first week
    // const lastFullDate = (getLastFullDate(props)).getDate();
    const lastDate = (getLastFullDate(props)).getDate();
    const weekCount = getNumberOfWeeks(props);
    const firstDay = getFirstDay(props);
    const tdCount = weekCount * 7;
    let dateCount = 0; //date counter
    // create elements inside week. always will have 7 tds.
    for (let i = 0; i <= tdCount; i++) {
        let elem = ''
        if(i >= firstDay && i <= firstDay + lastDate - 1) {
            elem = dateNumber;
            dateNumber++;
        }
        week.push(elem)
    }

    for(let i = weekNumber; i <= weekCount; i++) {
        let elem = [week[dateCount],
        week[dateCount+1],
        week[dateCount+2],
        week[dateCount+3],
        week[dateCount+4],
        week[dateCount+5],
        week[dateCount+6],
        ]
        allWeeks.push(elem);
        dateCount+=7;
    }
    return allWeeks;

}


export const populateDays = () => {
    console.log('populateDays');
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    let tabledays = [];
    for(let i in days) {
        tabledays.push(React.createElement('td', {key: `${days[i]}-${i}` }, days[i]));
    }
    return (
        tabledays
    );
}

