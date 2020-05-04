import React, { useState, useEffect, useRef } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { storeCurrentWeek } from '../actions/calendarActions';
import { createWeek, populateDays } from './Functions';
const merge = require('deepmerge');

const Week = (props) => {

    let [isMouseDown, setIsMouseDown] = useState(0);
    let [availability, setAvail] = useState({});

    const createdWeek = createWeek(props);

    // refs are for event listeners
    // https://medium.com/geographit/accessing-react-state-in-event-listeners-with-usestate-and-useref-hooks-8cceee73c559
    const isMouseDownRef = useRef(isMouseDown);
    const setIsMouseDownRef = data => {
        isMouseDownRef.current = data;
        setIsMouseDown(data);
    } ;

    const availabilityRef = useRef(availability);
    const setAvailRef = data => {
        availabilityRef.current = data;
        setAvail(data);
    } 

    useEffect(() => {
        attachEvents();
    }, [isMouseDown, availability]);

    const getCurrentWeek = () => {
        console.log('getCurrentWeek');
        const currentDate = props.currentDate || (new Date()).getDate();
        const allWeeks = createdWeek;
        let week = allWeeks.find((arr) => {
            return arr === (arr.find((d) => {
                return d === currentDate
            }) ? arr : 'error' )

        });
        return week;

    }

    const populateWeek = () => {
        let week = getCurrentWeek();
        let a = React.createElement('tr', {colSpan: '7'}, 
            React.createElement('td', {}, 'Times'),
            week.map((day, index) => {
            return React.createElement('td', {className: `${props.currentMonth}-${day}`, key: `${props.currentMonth}-${index}-${day}`}, day)
        }));
        return a;
    }

    const populateTimes = () => {
        const format = ['AM', 'PM'];
        const times = [12,1,2,3,4,5,6,7,8,9,10,11];
        const timeList = (format.map((meridiem) => { return times.map((hour) => { return `${hour} ${meridiem}`})})).flat();
        let week = getCurrentWeek();
        let timeSlots = timeList.map((t) => {
            let slot = React.createElement('td', {className: 'times', key: t}, t);
            return React.createElement(
                'tr', {key: `week-time-slots-${t}`}, 
                [
                    slot, 
                    week.map((l, ind) => React.createElement(
                        'td', 
                        {   className:'week-times', 
                            'data-date': l, 
                            'data-time': t,
                            onMouseDown:  (e) => { pickTime(e, 'mousedown') },
                            onMouseEnter: (e) =>  { pickTime(e, 'mouseenter') },
                            key: `${props.currentMonth}-${l}-${t}-${ind}` //added ${ind} to fix blank dates/t keys having the same key
                        }
                        , 
                        // React.createElement('span', {}, '')
                        ''
                        ))
                ]
            );
        });
        return timeSlots;
    }



    const pickTime = (e, eventName) => {
        e.stopPropagation();
        let selectedDate = e.currentTarget.dataset.date;
        let selectedTime = [e.currentTarget.dataset.time];
        let selectedMonth = props.currentMonth;
        let selectedYear = props.currentYear;
        let selectedAll = {};
        let oldState = availabilityRef.current;
        let newState = {};

        if(
            (
                eventName === 'mousedown' 
                || 
                (   
                    eventName === 'mouseenter' 
                    && 
                    isMouseDownRef.current === 1
                )
            )
            &&
            e.target.dataset.date !== ''
        )  
        {
            if(isMouseDownRef.current === 0) {
                setIsMouseDownRef(1);
            };

            selectedAll = setValueToField([selectedYear, selectedMonth, selectedDate], selectedTime);
            newState = merge(selectedAll, oldState, {arrayMerge: combineMerge});
            console.log('newState', newState);
            setAvailRef(newState);
            e.target.classList.add('selected');
        }
    }

    const attachEvents = () => {
        document.addEventListener('mouseup', () => {
            if (isMouseDownRef.current === 1) {
                setIsMouseDownRef(0);
            }
            
        });
    }

    // https://stackoverflow.com/questions/5484673/javascript-how-to-dynamically-create-nested-objects-using-object-names-given-by/48751698
    const setValueToField = (fields, value) => {
        const reducer = (acc, item, index, arr) => ({ [item]: index + 1 < arr.length ? acc : value });
        let result = fields.reduceRight(reducer, {});
        return result;
    };

    const combineMerge = (target, source, options) => {
        const destination = target.slice();
    
        source.forEach((item, index) => {
            if (typeof destination[index] === 'undefined') {
                destination[index] = options.cloneUnlessOtherwiseSpecified(item, options);
            } else if (options.isMergeableObject(item)) {
                destination[index] = merge(target[index], item, options);
            } else if (target.indexOf(item) === -1) {
                destination.push(item);
            }
        })
        return destination;
    }

    const reset = () => {
        let slots = document.getElementsByClassName('week-times');

        Array.from(slots).forEach((slot) => {
            slot.classList.remove('selected');
        });

        setAvail({});

    }
    

    console.log('week render');
    // createdWeek = createWeek(props);
    return (
        <div id='container-week'> 
            <table id="week">
                <thead>
                    <tr>
                        <th colSpan='8'>
                            Week
                        </th>
                    </tr>
                </thead>
                <tbody id='week-body'>
                    <tr colSpan='8'>
                        <td>
                        </td>
                        {populateDays(props)}
                    </tr>
                    {populateWeek()}
                    {populateTimes()}
                    
                </tbody>
            </table>
            <button id='reset' onClick={reset}>Reset</button>
            <button id='submit'>Submit</button>
        </div>
    )
}


const mapStateToProps = (state) => {
    console.log('state in Week mapstatetoprops is ', state.calendar);
    return state.calendar;
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         storeCurrentWeekToState: (week) => {
//             console.log('storeCurrentWeekToState');
//             dispatch(storeCurrentWeek(week));
//         }
//     }
// };


// export default withRouter(Week);
// export default React.forwardRef((props,ref) => <Week {...props} ref={ref} />);

const Container = connect(mapStateToProps)(Week);
export default Container;