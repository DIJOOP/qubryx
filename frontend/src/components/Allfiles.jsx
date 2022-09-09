import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Link, useLocation } from 'react-router-dom';
import './gridview.css';
import { getAllFiles } from '../Redux/Action/dataAction';

const Allfiles = () => {
	const { files } = useSelector((state) => state.allfiles);
	const { user,isAuntenticated } = useSelector((state) => state.user)
	const dispatch = useDispatch();
	const [ rowData, setRowData ] = useState([]);

	const [ columnDefs ] = useState([
		{
			field: 'createdAt',
			headerName: 'Uploaded Date',
			cellRenderer: (data) => {
				return new Date(data.value).toLocaleDateString();
			},
			cellStyle: { 'text-align': 'left' }, width: 250, resizable: true 
		},
		{ field: 'filename', headerName: 'File Name', cellStyle: { 'text-align': 'left' },  width: 260, resizable: true },
		{ field: '_id', headerName: 'File Id', cellStyle: { 'text-align': 'left' }, width: 300, resizable: true },
		{
			field: '_id',
			headerName: 'Action',
			cellRenderer: (data) => {
				return <Link className='view_btn'  to={`/grid/${data.value}`}>View File</Link>;
			}, width: 262, resizable: true ,cellStyle: { 'text-align': 'left' }, headerClass: "ag-center-header"
		}
	]);

	useEffect(()=>{

		dispatch(getAllFiles());

		
	},[])

	useEffect(
		() => {
			if (!files) {
				dispatch(getAllFiles());
			}
			setRowData((rowData) => files);
		},
		[ dispatch,files,user]
	);

	return (
		<div className="master_containergrid">
			<div className="grid_container" style={{ width: '82%' }}>
				<div className="title_box">
					<h2 style={{"textAlign":"center"}}>Your Files</h2>
				</div>
				<div className="ag-theme-alpine" style={{ height: 450,alignSelf: 'center' }}>
					<AgGridReact
						pagination={true}
						defaultColDef={{ sortable: true, filter: true }}
						rowData={rowData}
						columnDefs={columnDefs}
					/>
				</div>
			</div>
		</div>
	);
};

export default Allfiles;
