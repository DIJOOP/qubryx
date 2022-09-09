import {createReducer} from "@reduxjs/toolkit"

const initialState={}


export const userReducer=createReducer(initialState,{
	REGISTER_REQUEST: (state) => {
		state.loading = true;
		state.isAuthenticated = false;
	},
	REGISTER_SUCCESS: (state, action) => {
		state.loading = false;
		state.user = action.payload;
		state.isAuthenticated = true;
		// state.isRegistered = true;
	},
	REGISTER_FAIL: (state, action) => {
		state.loading = false;
		state.user = null;
		state.isAuthenticated = false;
		state.error = action.payload;
	},

    LOGIN_REQUEST: (state) => {
		state.loading = true;
		state.isAuthenticated = false;
	},
	LOGIN_SUCCESS: (state, action) => {
		state.loading = false;
		state.user = action.payload;
		state.isAuthenticated = true;
	},
	LOGIN_FAIL: (state, action) => {
		state.loading = false;
		state.user = null;
		state.isAuthenticated = false;
		state.error = action.payload;
	},
	LOADUSER_REQUEST: (state) => {
		state.loading = true;
		state.isAuthenticated = false;
	},

	LOADUSER_SUCCESS: (state, action) => {
		state.loading = false;
		state.user = action.payload;
		state.isAuthenticated = true;
	},

	LOADUSER_FAIL: (state, action) => {
		state.loading = false;
		state.user = null;
		state.isAuthenticated = false;
		state.loaderror = action.payload;
	},

	LOGOUT_SUCCESS: (state) => {
		state.isAuthenticated = false;
		state.user = null;
	},
	LOGOUT_FAIL: (state, action) => {
		state.error = action.payload;
	},


	clearErrors: (state) => {
		state.error = null;
	}


})



