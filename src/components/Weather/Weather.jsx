import React from 'react';
import './Weather.scss';

import { Icon } from '@material-ui/core';

export default class Weather extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { city, temp, text, icon, speed, backdrop, maa } = this.props;

		return (
			<div className="weather">
				<div className="weather_header">
					{city},&nbsp;{maa}
				</div>
				{!backdrop ? (
					<div className="weather_info">
						<div className="weather_wrapper">
							<div className="weather_col">
								<div className="weather_current">
									<Icon fontSize="large">wb_sunny</Icon>
									<span className="weather_label">{temp}&deg;</span>
								</div>
							</div>
							<div className="weather_col">
								<div className="weather_current">
									<Icon fontSize="large">toys</Icon>
									<span className="weather_label">{speed}</span>
								</div>
							</div>
						</div>
						<div className="weather_wrapper">
							<div className="weather_image">
								<img src={icon} alt="" />
							</div>
							<span className="weather_text">{text}</span>
						</div>
					</div>
				) : null}
			</div>
		);
	}
}
