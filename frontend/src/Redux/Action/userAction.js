import Axios from '../axios';
import {
	LOADUSER_FAIL,
	LOADUSER_REQUEST,
	LOADUSER_SUCCESS,
	LOGIN_FAIL,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGOUT_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_FAIL,
	REGISTER_REQUEST,
	REGISTER_SUCCESS
} from '../constants/userContants';
Axios.defaults.withCredentials = true;

export const userRegister = (userData) => async (dispatch) => {
	try {
		dispatch({
			type: REGISTER_REQUEST
		});

		const config = { headers: { 'Content-Type': 'application/json' } };
		const { data } = await Axios.post('/api/v1/register', userData, config);
		console.log(data);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: data.user
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: REGISTER_FAIL,
			payload: error.response.data.message
		});
	}
};

export const userLogin = ({ email, password }) => async (dispatch) => {
	try {
		dispatch({
			type: LOGIN_REQUEST
		});

		const config = { headers: { 'Content-Type': 'application/json' } };
		const { data } = await Axios.post(`/api/v1/login`, { email, password }, config);

		console.log(data);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: data.user
		});
	} catch (error) {
		console.log(error.response.data.message);
		dispatch({
			type: LOGIN_FAIL,
			payload: error.response.data.message
		});
	}
};

export const userLogout = () => async (dispatch) => {
	try {
		await Axios.get(`/api/v1/logout`);
		dispatch({
			type: LOGOUT_SUCCESS
		});
	} catch (error) {
		dispatch({
			type: LOGOUT_FAIL,
			payload: error.response.data.message
		});
	}
};

export const LoadUser = () => async (dispatch) => {
	try {
		dispatch({
			type: LOADUSER_REQUEST
		});

		const { data } = await Axios.get(`/api/v1/loadme`);

		dispatch({
			type: LOADUSER_SUCCESS,
			payload: data.user
		});
	} catch (error) {
		console.log(error.response.data.message);
		dispatch({
			type: LOADUSER_FAIL,
			payload: error.response.data.message
		});
	}
};

export const clearErrors = () => async (dispatch) => {
	dispatch({ type: 'clearErrors' });
};
