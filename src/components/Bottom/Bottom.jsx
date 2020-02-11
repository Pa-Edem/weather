import React from 'react';
import './Bottom.scss';

import Forcast from '../Forcast/Forcast';

const Bottom = props => {
	const { backdrop } = props;
	const classes = ['bottom'];
	if (backdrop) {
		classes.push('backdrop');
	}
	return (
		<div className={classes.join(' ')}>
			{!backdrop ? (
				<Forcast
					forcast={props.forcast}
					iconBase={props.iconBase}
					iconEnd={props.iconEnd}
				/>
			) : null}
		</div>
	);
};
export default Bottom;
