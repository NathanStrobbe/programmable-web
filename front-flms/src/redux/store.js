import { createStore } from 'redux';
import user from './reducer';

const store = createStore(user);

export default store;
