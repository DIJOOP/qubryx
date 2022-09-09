import Axios from '../axios';

import {
	ALLFILE_FAIL,
	ALLFILE_REQUEST,
	ALLFILE_SUCCESS,
	MYFILE_FAIL,
	MYFILE_REQUEST,
	MYFILE_SUCCESS,
	NEWFILE_FAIL,
	NEWFILE_REQUEST,
	NEWFILE_SUCCESS
} from '../constants/dataConstants';

export const addNewFile = (file) => async (dispatch) => {
	try {
		dispatch({
			type: NEWFILE_REQUEST
		});

		const config = { headers: { 'Content-Type': 'application/json' } };
		const { data } = await Axios.post('/api/v1/data/new', file, config);
		console.log(data);
		dispatch({
			type: NEWFILE_SUCCESS,
			payload: data.success
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: NEWFILE_FAIL,
			payload: error.response.data.message
		});
	}
};

export const getAllFiles = () => async (dispatch) => {
	try {
		dispatch({
			type: ALLFILE_REQUEST
		});

		const config = { headers: { 'Content-Type': 'application/json' } };
		const { data } = await Axios.get('/api/v1/data/user');

		console.log(data);

		dispatch({
			type: ALLFILE_SUCCESS,
			payload: data.files
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: ALLFILE_FAIL,
			payload: error.response.data.message
		});
	}
};

export const getSingleFile = (id) => async (dispatch) => {
	try {
		dispatch({
			type: MYFILE_REQUEST
		});

		const config = { headers: { 'Content-Type': 'application/json' } };
		const { data } = await Axios.get(`/api/v1/data/user/file/${id}`, config);

		console.log(data)
		dispatch({
			type: MYFILE_SUCCESS,
			payload: data.file
		});
	} catch (error) {
		dispatch({
			type: MYFILE_FAIL,
			payload: error.response.data.message
		});
	}
};

export const clearErrors = () => async (dispatch) => {
	dispatch({ type: 'clearErrors' });
};
