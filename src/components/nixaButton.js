import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';

import plus from '../media/assets/icn_plus.svg';

export default class NixaButton extends Component {
    render(){
        const icon = this.props.icon
            ? <img src={this.props.icon} alt={this.props.icon_alt} />
            : '';
        return(
            <Button {...this.props} className={`text-center nixaButton ${this.props.className}`}>{icon}<span>{this.props.title}</span></Button>
        );
    }
};

NixaButton.defaultProps = {
    title: '',
    icon: plus,
    icon_alt: 'Plus icon',
};

NixaButton.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
    icon_alt: PropTypes.string,
};