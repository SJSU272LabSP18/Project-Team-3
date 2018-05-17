import { createStore } from 'redux';
import reducer from './reducer/index';


const DefaultState = {

	guest : true,
	userLoggedIn : false,
	user : {} ,
	booking : {}

};


const store = createStore(
    reducer,
    DefaultState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;