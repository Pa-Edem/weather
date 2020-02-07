import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';

import Store from './Store';

ReactDOM.render(
	<Store>
		<App />
	</Store>,
	document.getElementById('root')
);
serviceWorker.unregister();
