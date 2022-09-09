import React, { useEffect, useState } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useLocation, useParams } from 'react-router-dom';
import './gridview.css';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleFile } from '../Redux/Action/dataAction';
import Downloadfile from './Downloadfile';
import Savefile from './Savefile';

const Gridview = () => {
	const location = useLocation();
	const jsonData = location.state;
	const { file } = useSelector((state) => state.myfile);
	const [ isparams, setIsparams ] = useState(false);

	const dispatch = useDispatch();
	const params = useParams();
	const [ rowData, setRowData ] = useState([]);

	const dateFormater = (data) => {
		return new Date(data.value).toLocaleDateString();
	};
	const [ columnDefs ] = useState([
		{
			field: 'productdate',
			headerName: 'Product Date',
			cellRenderer: dateFormater,
			cellStyle: { 'text-align': 'left' }
		},
		{ field: 'product', headerName: 'Product', cellStyle: { 'text-align': 'left' }, width: 200 },
		{ field: 'ticketnumber', headerName: 'Ticket Number', cellStyle: { 'text-align': 'left' }, width: 250 },
		{
			field: 'opendate',
			headerName: 'Open Date',
			cellRenderer: dateFormater,
			width: 240,
			cellStyle: { 'text-align': 'left' }
		},
		{
			field: 'closedate',
			headerName: 'Close Date',
			cellRenderer: dateFormater,
			cellStyle: { 'text-align': 'left' },
			width: 240
		},
		{ field: 'openreading', headerName: 'Open Reading', cellStyle: { 'text-align': 'left' } }
	]);

	useEffect(
		() => {
			if (params.id && !file) {
				dispatch(getSingleFile(params.id));
			}

			if(file&&(file._id!==params.id)){
				dispatch(getSingleFile(params.id));
			}

			params.id && setIsparams(true);
			file && setRowData(file.file);

			if (jsonData && !params.id) {
				setIsparams(false);
				console.log(jsonData);
				setRowData(jsonData.file);
			}
		},
		[ jsonData, params.id, file ]
	);

	return (
		<div className="master_containergrid">
			<div className="grid_container" style={{ width: '99%' }}>
				<div className="title_box">
					<h2>
						Your Data <span>({(jsonData && jsonData.filename) || (file && file.filename)})</span>{' '}
					</h2>
					{isparams ? <Downloadfile data={file} /> : <Savefile data={jsonData} />}
				</div>
				<div className="ag-theme-alpine" style={{ height: 460 }}>
					<AgGridReact rowData={rowData} columnDefs={columnDefs} pagination={true} />
				</div>
			</div>
		</div>
	);
};

export default Gridview;
