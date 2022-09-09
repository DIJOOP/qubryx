import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewFile, clearErrors } from '../Redux/Action/dataAction';
import { toast } from 'react-toastify';
import { NEWFILE_RESET } from '../Redux/constants/dataConstants';
import { useState } from 'react';

const Savefile = ({ data }) => {
	const { success, loading, error } = useSelector((state) => state.newfile);
	const [ filename, setFilename ] = useState('');
	const dispatch = useDispatch();

	const uploadHandler = () => {
		if (filename === data.filename) {
			toast.error(filename +" "+'Already Uploaded');
		}else dispatch(addNewFile(data));
		
	};

	useEffect(
		() => {
			if (success) {
				toast.success('File Saved Successfully');
				dispatch({ type: NEWFILE_RESET });
				setFilename(data.filename);
			}
			if(error){
				toast.error(error)
				dispatch(clearErrors)
			}
		},
		[ success,error ]
	);

	return <button className={loading?"Loader":""} onClick={uploadHandler}>Save to Database</button>;
};

export default Savefile;
