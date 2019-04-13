import React, { Component } from 'react';
import PropTypes from 'prop-types';

import surf from '../media/assets/surfing.png';
import surf_icon from '../media/assets/icn_surfing.svg';

export default class Activity extends Component {
    render(){
        return(
            <div className="activity-display shadow rounded">
                <img className="activity-img img-fluid" src={this.props.img} alt={this.props.img_alt} />
                <img className="activity-icon shadow rounded-circle" src={this.props.icon} alt={this.props.icon_alt} />
                <h2>{this.props.title}</h2>
                <h3>{this.props.subtitle}</h3>
            </div>
        );
    };
};

Activity.defaultProps = {
    title: 'Surfing',
    subtitle: 'ocean beach',
    img: surf,
    img_alt: "Girl on surfing board",
    icon: surf_icon,
    icon_alt: "Surfing Icon"
};

Activity.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    img: PropTypes.string,
    img_alt: PropTypes.string,
    icon: PropTypes.string,
    icon_alt: PropTypes.string,
};