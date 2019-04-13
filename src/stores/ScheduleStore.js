import Reflux from 'reflux';

import Actions from '../actions/scheduleActions';
import URLS from '../routes/urls';
import {required, GET, POST} from '../utils/utils';

export default class StatusStore extends Reflux.Store {
    constructor() {
        super();
        this.state = {
            'open_slots': [],
            'schedule': {},
            'new_activity_recorded_toggle' : false
        };
        this.listenables = Actions;
    }

    onGetSchedule = (date = required(), limit = null) => {
        GET(URLS.getSchedule(date, limit))
            .then((responseJson) => {
                this.setState({'schedule': this._formatSchedule(responseJson)});
            });
    };

    onGetOpenSlots = (date = required(), limit = required(), duration) => {
        GET(URLS.getSchedule(date, limit))
            .then( (responseJson) => {
                this.setOpenSlots(responseJson, duration);
            });
    };

    onAddActivity = (duration = required(), date=required(), activity=required()) => {
        POST(URLS.addActivity(), this._encodeData({'duration':duration, 'date':date, 'activity':activity}))
            .then( responseJson => {
                this.setState({'new_activity_recorded_toggle' : !this.state.new_activity_recorded_toggle});
            });
    };

    onCleanUp = () => {
        this.setState({'open_slots':[]});
    };

    _formatSchedule = (schedule) => {
        let formatted = {};
        let format_month_key = { month: 'long', day: 'numeric'},
            format_day_key = { weekday: 'long' },
            format_time_key = { hour: 'numeric', minute: 'numeric', hour12: true };

        for(let i=0; i<schedule.length; ++i){
            let curr_date = new Date(schedule[i]['date']);
            let month_day = new Intl.DateTimeFormat('en-US', format_month_key).format(curr_date);
            let day = new Intl.DateTimeFormat('en-US', format_day_key).format(curr_date);
            let time = new Intl.DateTimeFormat('en-US', format_time_key).format(curr_date);
            if (!(month_day in formatted))
                formatted[month_day] = {};
            if(!(day in formatted[month_day]))
                formatted[month_day][day] = [];
            formatted[month_day][day].push( {'time': time, 'activity': schedule[i]['activity']} );
        }

        return formatted;
    };

    _encodeData = (data)  => {
         let urlEncodedDataPairs = [];
        //URL-encoded key/value pairs.
        for (let name in data) {
            urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
        }

        // Combine into a single string, replace all %-encoded spaces to the '+' character
        return urlEncodedDataPairs.join('&').replace(/%20/g, '+');
    };

    setOpenSlots = (schedule, duration) => {
        let open_slots = [];
        const suggestions_limit = 50;
        for (let i = 0; i < schedule.length; ++i) {
            let start = new Date(schedule[i]['end']); //Start of the open slot is the end of the previous slot
            start = this._setRightTimeWindow(start);
            let next_end = new Date(new Date(start).setMinutes(start.getMinutes() + duration));
            let next_limit = i < schedule.length - 1 ? new Date(schedule[i + 1]["date"]) : new Date().setDate(new Date().getDate() + 10);
            while (open_slots.length < suggestions_limit & next_end < next_limit) {
                open_slots.push(start);
                start = new Date(next_end);
                start = this._setRightTimeWindow(start);
                next_end = new Date(start);
                next_end = new Date(next_end.setMinutes(next_end.getMinutes() + duration));
            }
        }
        // If it´s empty at this point it means the user has nothing scheduled for tomorrow or the following 7 days
        if (open_slots.length == 0) {
            let start = this._getTomorrowStartDate(new Date());
            for (let i = 0; i < suggestions_limit; ++i) {
                open_slots.push(start);
                start = new Date(start.setMinutes(start.getMinutes() + duration));
                if(start.getHours() >= 22)
                   start = this._getTomorrowStartDate(start);
            }
        }
        this.setState({'open_slots': open_slots});
    };

    _setRightTimeWindow = (date) => {
        if (date.getHours() >= 22)
            date = this._getTomorrowStartDate(date);
        else if (date.getHours() < 8)
            date.setHours(8);
        return date;
    };

    _getTomorrowStartDate = (date) => {
        date.setDate(date.getDate() + 1);
        date.setHours(8);
        date.setMinutes(0);
        date.setMilliseconds(0);
        return date;
    };

}

/*

    {
      "id": 1,
      "date": "2019-04-13T13:00",
      "end": "2019-04-13T14:00",
      "duration": "60",
      "activity": "surfing"
    },
    {
      "id": 2,
      "date": "2019-04-14T02:00",
      "end": "2019-04-14T02:15",
      "duration": "15",
      "activity": "hiking"
    },
    {
      "id": 4,
      "date": "2019-04-14T05:15",
      "end": "2019-04-14T06:00",
      "duration": "150",
      "activity": "weights"
    },
    {
      "id": 3,
      "date": "2019-04-15T05:15",
      "end": "2019-04-15T06:00",
      "duration": "150",
      "activity": "weights"
    }



* */

