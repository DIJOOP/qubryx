import { configureStore } from '@reduxjs/toolkit';
import { allFilesReducer, myFileReducer, newFileReducer } from './Reducer/DataReducer';
import { userReducer } from './Reducer/UserReducer';

const store = configureStore({
	reducer: {
		user: userReducer,
		newfile: newFileReducer,
		allfiles: allFilesReducer,
		myfile:myFileReducer
	}
});

export default store;
