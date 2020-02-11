import React from 'react';
import './Forcast.scss';

export default class Forcast extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const daysOfWeek = ['Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La'];
		return (
			<div className="forcast">
				{this.props.forcast.map((day, index) => {
					const str = new Date(day.dt_txt);
					const today = `${str.getDate()} ${daysOfWeek[str.getDay()]}`;
					const icon =
						this.props.iconBase + day.weather[0].icon + this.props.iconEnd;
					return (
						<div className="forcast_day" key={index}>
							<div className="forcast_date">{today}</div>
							<div className="forcast_image">
								<img className="forcast_icon" src={icon} alt="" />
							</div>
							<div className="forcast_temp">
								{day.main.temp.toFixed(0)}&deg;
							</div>
							<div className="forcast_text">{day.weather[0].description}</div>
						</div>
					);
				})}
			</div>
		);
	}
}
