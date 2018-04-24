import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { ActionCableProvider } from 'react-actioncable-provider';
import 'semantic-ui-css/semantic.min.css';
import './stylesheets/index.css';
require('dotenv').config();

const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

const API_WS_ROOT = 'wss://wandr-backend.herokuapp.com/cable';

ReactDOM.render(
	<Router>
		<Provider store={store}>
			<ActionCableProvider url={API_WS_ROOT}>
				<App />
			</ActionCableProvider>
		</Provider>
	</Router>,
	document.getElementById('root')
);

registerServiceWorker();
