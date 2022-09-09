import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './dropzone.css';
import Template from './Template';
import * as XLSX from 'xlsx';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Dropzone({ open }) {
	const [ jsonData, setJsonData ] = useState({});
	const [ isdata, setIsdata ] = useState(false);
	

	const onDrop = useCallback((acceptedFiles) => {
		acceptedFiles.forEach((file) => {
			const reader = new FileReader();

			reader.onabort = () => console.log('file reading was aborted');
			reader.onerror = () => console.log('file reading has failed');

			reader.onload = () => {
				var Heading = [ [ 'productdate', 'product', 'ticketnumber', 'opendate', 'closedate', 'openreading' ] ];
				const filename = file.path;
				const binaryStr = reader.result;
				console.log(binaryStr);
				const workbook = XLSX.read(binaryStr, { type: 'binary', cellDates: true });
				
				const sheetName = workbook.SheetNames[0];
				const worksheet = workbook.Sheets[sheetName];
				
				XLSX.utils.sheet_add_aoa(worksheet, Heading);

				const json = XLSX.utils.sheet_to_json(worksheet, { origin: 'A2', skipHeader: true });
				const data = {
					filename,
					file: json
				};
				
				setJsonData((jsonData) => data);
				setIsdata(true);
			};

			reader.readAsArrayBuffer(file);
		});
	}, []);

	const { getRootProps, getInputProps, isDragActive, acceptedFiles, fileRejections } = useDropzone({
		accept: { 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [ '.xlsx' ] },
		onDrop,
		maxFiles: 1
	});

	const files = acceptedFiles.map((file) => {
		return (
			<li key={file.path}>
				{file.path} - {Math.floor(file.size / 1024)} kb
			</li>
		);
	});

	const fileRejectionItems = fileRejections.map(({ file, errors }) => {
		return (
			<li key={file.path}>
				{file.path} - {Math.floor(file.size / 1024)} kb
				<ul>{errors.map((e) => <li key={e.code}>{e.message}</li>)}</ul>
			</li>
		);
	});

	return (
		<div className="main_Container">
			<div className="dropzone_container">
				<div {...getRootProps({ className: 'dropzone' })}>
					<input className="input-zone" {...getInputProps()} />
					<div className="text-center">
						{isDragActive ? (
							<p className="dropzone-content">Release to drop the file here</p>
						) : (
							<p className="dropzone-content">Drag n drop your file here, or click to select file</p>
						)}
						<CloudUploadIcon onClick={open} fontSize="large" />
						<p style={{"opacity":"0.5"}}>(Supported filetype is .xlsx)</p>
					</div>
				</div>
				<Template />
			</div>
			{isdata && (
				<div className="view_data">
					<p>{files}</p>
					<p>{fileRejectionItems}</p>

					<Link to="/grid" state={jsonData}>
						Submit and View
					</Link>
				</div>
			)}
		</div>
	);
}

export default Dropzone;
