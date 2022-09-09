import { createReducer } from '@reduxjs/toolkit';

const initialState = {};

export const newFileReducer = createReducer(initialState, {
	NEWFILE_REQUEST: (state) => {
		state.loading = true;
	},
	NEWFILE_SUCCESS: (state, action) => {
		state.loading = false;
		state.success = action.payload;
	},
	NEWFILE_FAIL: (state, action) => {
		state.loading = false;
		state.error = action.payload;
	},
	NEWFILE_RESET: (state, action) => {
		state.success = false;
	},
	clearErrors: (state) => {
		state.error = null;
	}
});


export const allFilesReducer=createReducer(initialState,{

    ALLFILE_REQUEST: (state) => {
		state.loading = true;
	},
	ALLFILE_SUCCESS: (state, action) => {
		state.loading = false;
		state.files = action.payload;
	},
	ALLFILE_FAIL: (state, action) => {
		state.loading = false;
		state.error = action.payload;
	},
	
	clearErrors: (state) => {
		state.error = null;
	}

})


export const myFileReducer=createReducer(initialState,{

    MYFILE_REQUEST: (state) => {
		state.loading = true;
	},
	MYFILE_SUCCESS: (state, action) => {
		state.loading = false;
		state.file = action.payload;
	},
	MYFILE_FAIL: (state, action) => {
		state.loading = false;
		state.error = action.payload;
	},
	
	clearErrors: (state) => {
		state.error = null;
	}

})