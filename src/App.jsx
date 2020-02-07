import React from 'react';
import './App.scss';

import axios from 'axios';

import Top from './components/Top/Top.jsx';
import Bottom from './components/Bottom/Bottom.jsx';

const API_KEY = 'b1ee199019e906629a5ac9ff6d363565';
const urlBase = 'http://api.openweathermap.org/data/2.5/forecast';
const iconBase = 'http://openweathermap.org/img/wn/';
const iconEnd = '@2x.png';
const unit = 'metric';
const lang = 'ru';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			city: 'Murmansk',
			isLoading: true,
			forcast: [],
		};
	}

	updateWeather() {
		const { city } = this.state;
		const URL = `${urlBase}?q=${city}&appid=${API_KEY}&units=${unit}&lang=${lang}`;
		axios
			.get(URL)
			.then(res => {
				return res.data;
			})
			.then(data => {
				const newForcast = [];
				const today = data.list[0].dt_txt.substr(8, 2);
				data.list.map((day, i) => {
					if (
						day.dt_txt.substr(8, 2) !== today &&
						day.dt_txt.substr(-8, 8) === '12:00:00'
					) {
						newForcast.push(day);
					}
					return true;
				});

				this.setState({
					time: data.list[0].dt_txt,
					city: data.city.name,
					temp: data.list[0].main.temp.toFixed(0),
					text: data.list[0].weather[0].description,
					icon: iconBase + data.list[0].weather[0].icon + iconEnd,
					speed: data.list[0].wind.speed,
					isLoading: false,
					forcast: newForcast,
				});
			})
			.catch(err => {
				if (err) {
					console.error('Cannot fetch Weather Data from API, ', err);
				}
			});
	}

	componentDidMount() {
		const { eventEmitter } = this.props;
		this.updateWeather();
		eventEmitter.on('updateWeather', data => {
			this.setState({ city: data }, () => this.updateWeather());
		});
	}

	render() {
		const {
			isLoading,
			time,
			city,
			temp,
			text,
			icon,
			speed,
			forcast,
		} = this.state;

		return (
			<div className="app">
				<div className="app_container">
					{isLoading && <h3 className="app_loading">Loading Weather...</h3>}
					{!isLoading && (
						<div className="app_section">
							<Top
								time={time}
								city={city}
								temp={temp}
								icon={icon}
								text={text}
								speed={speed}
								eventEmitter={this.props.eventEmitter}
							/>
						</div>
					)}
					<div className="app_section">
						<Bottom forcast={forcast} iconBase={iconBase} iconEnd={iconEnd} />
					</div>
				</div>
			</div>
		);
	}
}