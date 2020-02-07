import React from 'react';
import './Weather.scss';

export default class Weather extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { city, temp, text, icon, speed } = this.props;
		return (
			<div className="weather">
				<div className="weather_header">{city}</div>
				<div className="weather_wrapper">
					<div className="weather_col">
						<div className="weather_current">
							<span className="weather_label">Воздух</span>
							<span>{temp}&deg;</span>
						</div>
					</div>
					<div className="weather_col">
						<div className="weather_current">
							<span className="weather_label">Ветер м/с</span>
							<span>{speed}</span>
						</div>
					</div>
				</div>
				<div className="weather_footer">
					<div className="weather_image">
						<img src={icon} alt="" />
					</div>
					{text}
				</div>
			</div>
		);
	}
}
