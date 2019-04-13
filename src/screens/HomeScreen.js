import React, { Component } from 'react';
import {Navbar,
        NavbarBrand,
        Container,
        Row,
        Col} from 'reactstrap';
import Reflux from 'reflux';

import Activity from '../components/activity';
import ScheduleScreen from './scheduleScreen';
import NixaButton from '../components/nixaButton';
import ScheduleStore from '../stores/ScheduleStore';
import scheduleActions from '../actions/scheduleActions';
import {dbDateFormat} from '../utils/utils';

import logo from '../media/logo_header_wide.svg';
import hiking from '../media/assets/hiking.png';
import hiking_icon from '../media/assets/icn_hiking.svg';
import weights from '../media/assets/weights.png';
import weights_icon from '../media/assets/icn_weights.svg';
import spinning from '../media/assets/spinning.png';
import spinning_icon from '../media/assets/icn_spin.svg';
import surfing_icon from '../media/assets/icn_surfing.svg';

export default class HomeScreen extends Reflux.Component {
    constructor(props){
        super(props);
        this.state = {
            'scheduling' : false
        };
        this.store = ScheduleStore;
    }

    componentDidMount(){
        this._loadScheduledActivities();
    }

    _loadScheduledActivities = () => {
        let today = new Date();
        scheduleActions.getSchedule(dbDateFormat(today));
    };

    scheduleActivity = (e) => {
        this.setState((prevState, props) => ({
            'scheduling': !prevState.scheduling
        }), () => {
            this._loadScheduledActivities();
        });
    };

    _getIcon = (activity) => {
        let icon;
        switch(activity){
            case "surfing":
                icon = surfing_icon;
                break;
            case "hiking":
                icon = hiking_icon;
                break;
            case "spinning":
                icon = spinning_icon;
                break;
            default:
                icon = weights_icon;
        };
        return icon;
    };

    getScheduledActivities = () => {
        let activities = Object.keys(this.state.schedule).length > 0
            ? []
            : <p className="section-info">You don´t have any activities scheduled yet.</p>;
        for(let date in this.state.schedule){
            const date_title = <h2 className="section-info">{date}</h2>;
            let date_title_arr = [];
            for(let day in this.state.schedule[date]){
                const day_title = <h1 className="section-title">{day}</h1>;
                let activities = [];
                this.state.schedule[date][day].forEach( activity => {
                    activities.push(<div className="float-left" key={activity['time']}>
                        <img src={this._getIcon(activity['activity'])} className="activity-icon shadow rounded-circle" alt={activity['activity']} />
                        <h3 className="section-info text-center">{activity['time']}</h3>
                    </div>);
                });
                // Fill up empty gaps of the day
                if(activities.length < 6){
                    for(let i=activities.length; i < 7; ++i){
                        activities.push(<div className="float-left" key={`placeholder-${date}-${i}`}>
                            <div className="activity-icon-placeholder rounded-circle"></div>
                        </div>);
                    }
                }
                date_title_arr.push((
                    <div className="activity-row clearfix" key={`${date}${day}`}>
                        {day_title}
                        <div className="scrollable-container">
                            <div className="activities-container">
                                {activities}
                            </div>
                        </div>
                    </div>
                ));
            }
            activities.push((
                <div className="scheduled-activities" key={date}>
                    {date_title}
                    {date_title_arr}
                </div>
            ));
        }
        return activities;
    };

    render() {
        if(this.state.scheduling)
            return <ScheduleScreen close={this.scheduleActivity}/>;

        return (
            <div id="homescreen">
                <Navbar className="justify-content-center shadow-sm">
                    <NavbarBrand href="/" className="m-0 p-0">
                        <img src={logo} className="img-fluid" alt="logo"/>
                    </NavbarBrand>
                </Navbar>
                <Container>
                    <h1 className="section-title text-center">Track Your Activity</h1>
                    <Row className="text-center justify-content-center">
                        <Col className="col-5">
                            <Activity />
                        </Col>
                        <Col className="col-5">
                            <Activity title="hiking" subtitle="torrey pines" img={hiking} icon={hiking_icon} img_alt="Man hiking" icon_alt="Hiking icon" />
                        </Col>
                    </Row>
                    <Row className="text-center justify-content-center">
                        <Col className="col-5">
                            <Activity title="Weights" subtitle="encinitas" img={weights} icon={weights_icon} img_alt="Man lifting weights" icon_alt="Weights icon" />
                        </Col>
                        <Col className="col-5">
                            <Activity title="spinning" subtitle="gym" img={spinning} icon={spinning_icon} img_alt="Women spinning" icon_alt="Spinning icon"/>
                        </Col>
                    </Row>
                    <h1 className="mt-0 section-title">Scheduled Activities</h1>
                    {this.getScheduledActivities()}
                    <Row>
                        <Col className="col">
                            <NixaButton title="Schedule Activity" onClick={this.scheduleActivity} />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
};
