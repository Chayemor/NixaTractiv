import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {InputGroup, InputGroupAddon, Input} from 'reactstrap';

import icn_search from '../../media/assets/icn_search_light.svg';


export default class Picker extends Component{
    constructor(props) {
        super(props);
        this._input = React.createRef();
    }

    focusInput = () => {
       if(this.props.onClickIcon)
           this.props.onClickIcon();
       else
           this._input.focus();
    };

    render() {
        return (
            <InputGroup>
                <Input type={this.props.type} innerRef={ e => this._input=e } onChange={this.props.onChange} {...this.props.inputProps} />
                <InputGroupAddon onClick={this.focusInput} addonType="append" className="justify-content-center">{this.props.addOn}</InputGroupAddon>
            </InputGroup>
        );
    }
};

Picker.propTypes = {
    type: PropTypes.oneOf(['button', 'checkbox','color', 'date', 'datetime-local', 'email', 'file', 'hidden', 'image', 'month', 'number', 'password']),
    addOn: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    onChange: PropTypes.func,
    onClickIcon: PropTypes.func
};

Picker.defaultProps = {
    type: 'datetime-local',
    addOn: <span className="input-group-text"><img src={icn_search} alt="Search"/></span>
};