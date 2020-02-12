import React from 'react';
import './App.scss';

import axios from 'axios';

import Top from './components/Top/Top.jsx';
import Bottom from './components/Bottom/Bottom.jsx';
import Loader from './components/Loader/Loader.jsx';

const API_KEY = 'b1ee199019e906629a5ac9ff6d363565';
const urlBase = 'https://api.openweathermap.org/data/2.5/forecast';
const iconBase = 'http://openweathermap.org/img/wn/';
const iconEnd = '@2x.png';
const unit = 'metric';
const lang = 'fi';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			city: 'Murmansk',
			isLoading: true,
			backdrop: true,
			forcast: [],
		};
	}

	updateWeather() {
		this.setState({
			isLoading: true,
			backdrop: true,
		});
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
					maa: data.city.country,
					temp: data.list[0].main.temp.toFixed(0),
					text: data.list[0].weather[0].description,
					icon: iconBase + data.list[0].weather[0].icon + iconEnd,
					speed: data.list[0].wind.speed.toFixed(0),
					isLoading: false,
					backdrop: false,
					forcast: newForcast,
				});
			})
			.catch(err => {
				if (err) {
					this.setState({
						city: 'Virheellinen kaupungin nimi',
						isLoading: false,
						backdrop: true,
					});

					console.error(err);
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
			maa,
			temp,
			text,
			icon,
			speed,
			forcast,
			backdrop,
		} = this.state;

		return (
			<div className="app">
				<div className="app_container">
					{isLoading && <Loader />}
					{!isLoading && (
						<div className="app_section">
							<Top
								time={time}
								city={city}
								maa={maa}
								temp={temp}
								icon={icon}
								text={text}
								speed={speed}
								eventEmitter={this.props.eventEmitter}
								backdrop={backdrop}
							/>
						</div>
					)}
					<div className="app_section">
						<Bottom
							forcast={forcast}
							iconBase={iconBase}
							iconEnd={iconEnd}
							backdrop={backdrop}
						/>
					</div>
				</div>
			</div>
		);
	}
}
