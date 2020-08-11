import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Container,
        Row,
        Col,
        FormGroup, CustomInput} from 'reactstrap';
import Reflux from 'reflux';

import NixaButton from '../components/nixaButton';
import ScheduleStore from '../stores/ScheduleStore';
import scheduleActions from '../actions/scheduleActions';
import {dbDateFormat} from '../utils/utils';
import Picker from '../components/forms/Picker';

import hiking_icon from '../media/assets/icn_hiking.svg';
import weights_icon from '../media/assets/icn_weights.svg';
import spinning_icon from '../media/assets/icn_spin.svg';
import surfing_icon from '../media/assets/icn_surfing.svg';
import surfing_icon_light from '../media/assets/icn_surfing_light.svg';
import hiking_icon_light from '../media/assets/icn_hiking_light.svg';
import weights_icon_light from '../media/assets/icn_weights_light.svg';
import spinning_icon_light from '../media/assets/icn_spin_light.svg';

export default class ScheduleScreen extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = { // TODO type check whenever any of these re changed
            'activity' : null,
            'duration' : 15,
            'date': null,
            'open_slots' : null
        };
        this.store = ScheduleStore;
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.new_activity_recorded_toggle !== this.state.new_activity_recorded_toggle){
            this.cleanUpAndClose();
        }
    }

    cleanUpAndClose = () => {
        this.setState({
            'activity': null,
            'duration': 15,
            'date': null,
            'open_slots': null
        }, () => {
            scheduleActions.cleanUp();
            this.props.close();
        });
    };

    pullOpenSlots = () => {
        let today = new Date(),
            tomorrow = new Date(),
            limit = new Date();
        tomorrow.setDate(today.getDate()+1);
        limit.setDate(tomorrow.getDate()+7);
        scheduleActions.getOpenSlots(dbDateFormat(tomorrow),dbDateFormat(limit), this.state.duration);
    };

    onDurationChange = (e) => {
        const duration = e.target.value; //Otherwise you´d need e.persist()
        this.setState((prevState, prevProps) => {
            return {'duration': +duration};
        }, () => {
            scheduleActions.cleanUp();
        });
    };

    onDateChange = (e) => {
      const date = e.target.value; //Otherwise you´d need e.persist()
      if(date !== "" && date !== null) {
          const date_selected = new Date(date);
          this.setState((prevState, prevProps) => {
              return {'date': dbDateFormat( date_selected)};
          });
      }
    };

    changeActivity = (activity) => {
        this.setState((prevState, props) => ({
            'activity' : activity
        }));
    };

    scheduleActivity = () => {
        scheduleActions.addActivity(this.state.duration, this.state.date, this.state.activity);
    };

    render() {
        let disabled = this.state.duration < 15 || this.state.date === null;
        disabled = disabled || this.state.activity === null ? "disabled" : "";
        let onClickSchedule = disabled ? () => false : this.scheduleActivity;

        const togglePicker = this.state.open_slots === null || this.state.open_slots.length === 0
            ? <Picker onChange={this.onDateChange} onClickIcon={this.pullOpenSlots}/>
            : this.getSelectOpenSlots() ;

        return (<Container id="schedule-activity">
            <span onClick={this.props.close} className="close-me">&times;</span>
            <h1 className="text-center">Schedule your activity</h1>
            <Row>
                <ActivityIcon onClick={this.changeActivity} icon={spinning_icon} icon_alt="spinning" icon_light={spinning_icon_light} title="spinning" icon_id={1} selected={this.state.activity} />
                <ActivityIcon onClick={this.changeActivity} icon={surfing_icon} icon_alt="surfing" icon_light={surfing_icon_light} title="surfing" icon_id={2} selected={this.state.activity} />
                <ActivityIcon onClick={this.changeActivity} icon={weights_icon} icon_alt="weights" icon_light={weights_icon_light} title="weights" icon_id={3} selected={this.state.activity} />
                <ActivityIcon onClick={this.changeActivity} className="mr-0" icon={hiking_icon} icon_light={hiking_icon_light} icon_alt="hiking" title="hiking" icon_id={4} selected={this.state.activity} />
            </Row>
            <p>How long do you want to do this activity?</p>
            <Picker onChange={this.onDurationChange} type="number" inputProps={{'placeholder':"15 min", 'step':"15"}} addOn="&#x25BC;"/>
            <p>When do you want to do this activity?</p>
            {togglePicker}
            <div className="text-center">
                <NixaButton className={disabled} title="Schedule" onClick={onClickSchedule} icon="" />
            </div>
        </Container>);
    }

    getSelectOpenSlots = () => {
        let format_options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        let options = [<option key="non-valid-option" value="">Open slots</option>];
        this.state.open_slots.forEach(slot => {
            options.push(
                <option key={slot.getTime()}>{new Intl.DateTimeFormat('en-US', format_options).format(slot)}</option>
            );
        });
        return (<FormGroup>
            <CustomInput id="open-slots-select" onChange={this.onDateChange} type="select" name="customSelect">
                {options}
            </CustomInput>
        </FormGroup>);
    };

};

ScheduleScreen.propTypes = {
    close: PropTypes.func.isRequired,
};

class ActivityIcon extends Component {
    onClick = (e) => {
        this.props.onClick(this.props.title.toLowerCase());
    };

    render() {
        const selected = this.props.title.toLowerCase() === this.props.selected;
        const class_style = selected ? 'activity-icon-light' : '';
        return (
            <Col onClick={this.onClick} className={`col-3 text-center activity-icon m-0 p-0 ${this.props.className} ${class_style}`}>
                <img src={selected ? this.props.icon_light : this.props.icon} alt={this.props.icon_alt} className="rounded-circle"/>
                <span>{this.props.title}</span>
            </Col>
        );
    }
};

ActivityIcon.propTypes = {
    title: PropTypes.string,
    selected: PropTypes.string,
    icon_alt: PropTypes.string,
    className: PropTypes.string,
    icon: PropTypes.string,
    icon_light: PropTypes.string,
};

ActivityIcon.defaultProps = {
    className: ''
};
