import React from 'react';
import './Bottom.scss';

import Forcast from '../Forcast/Forcast';

export default class Bottom extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="bottom">
				<Forcast
					forcast={this.props.forcast}
					iconBase={this.props.iconBase}
					iconEnd={this.props.iconEnd}
				/>
			</div>
		);
	}
}
