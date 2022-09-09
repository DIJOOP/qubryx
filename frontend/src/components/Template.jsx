import React from 'react';
import * as XLSX from 'xlsx';
import DownloadIcon from '@mui/icons-material/Download';

const Template = () => {
	const template = [ [ 'Product Date', 'Product', 'Ticket Number', 'Open Date', 'Close Date', 'Open Reading' ] ];

	const exportFile = () => {
		const ws = XLSX.utils.aoa_to_sheet(template);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');

		XLSX.writeFile(wb, 'sample.xlsx');
		
	};
	return (
		<div className="template_box">
			<div onClick={exportFile}>
				<DownloadIcon fontSize="large" />
				<p>Download Sample Template</p>{' '}
			</div>
		</div>
	);
};

export default Template;
