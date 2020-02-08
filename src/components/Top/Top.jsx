import React from 'react';
import './Top.scss';

import { Manager, Reference, Popper } from 'react-popper';

import Weather from '../Weather/Weather.jsx';

export default class Top extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isSelectLocationOpen: false,
			isDisabled: true,
		};
	}

	onToggleSelectLocation() {
		this.setState(prevState => ({
			isSelectLocationOpen: !prevState.isSelectLocationOpen,
			isDisabled: true,
		}));
	}

	onLocationNameChange(event) {
		this.setState({
			city: event.target.value,
		});
		if (this.state.city) {
			this.setState({
				isDisabled: false,
			});
		}
	}

	onSelectCity(e) {
		e.preventDefault();
		const { city } = this.state;
		const { eventEmitter } = this.props;
		eventEmitter.emit('updateWeather', city);
		this.onToggleSelectLocation();
	}

	componentDidUpdate() {
		this.textInput && this.textInput.focus();
	}

	render() {
		const { isSelectLocationOpen } = this.state;

		return (
			<div className="top">
				<div className="top_wrap">
					<div className="top_date">{this.props.time}</div>
					<div className="top_title">Weather Up</div>
				</div>
				<Weather {...this.props} />

				<div className="top_ui--wrap">
					<Manager>
						<Reference>
							{({ ref }) => (
								<button
									className="top_btn"
									ref={ref}
									onClick={this.onToggleSelectLocation.bind(this)}>
									Select location
								</button>
							)}
						</Reference>
						<Popper placement="left">
							{({ ref, placement, arrowProps }) =>
								isSelectLocationOpen && (
									<div
										className="top_popper"
										ref={ref}
										data-placement={placement}>
										<form className="top_popper--form">
											<input
												type="text"
												className="top_popper--input"
												ref={input => {
													this.textInput = input;
												}}
												onChange={this.onLocationNameChange.bind(this)}
											/>
											<button
												className="top_btn top_btn--select"
												disabled={this.state.isDisabled}
												onClick={this.onSelectCity.bind(this)}>
												Select
											</button>
										</form>
										<div ref={arrowProps.ref} style={arrowProps.style} />
									</div>
								)
							}
						</Popper>
					</Manager>
				</div>
			</div>
		);
	}
}
