import React from 'react';
import * as XLSX from 'xlsx';

const Downloadfile = ({ data }) => {
	const dateFormater = (data) => {
		return new Date(data).toLocaleDateString();
	};

	const downloadHandler = () => {
		let arr = data.file;

		let array = arr.reduce((acc, ele) => {
			let element = {
				productdate: dateFormater(ele.productdate),
				product: ele.product,
				ticketnumber: ele.ticketnumber,
				opendate: dateFormater(ele.opendate),
				closedate: dateFormater(ele.closedate),
				openreading: ele.openreading
			};
			acc.push(element);
			return acc;
		}, []);

		console.log(array);
		let Heading = [ [ 'Product Date', 'Product', 'Ticket Number', 'Open Date', 'Close Date', 'Open Reading' ] ];

		const wb = XLSX.utils.book_new();
		const ws = XLSX.utils.json_to_sheet([]);
		XLSX.utils.sheet_add_aoa(ws, Heading);

		XLSX.utils.sheet_add_json(ws, array, { origin: 'A2', skipHeader: true });

		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

		XLSX.writeFile(wb, data.filename);
	};

	return <button onClick={downloadHandler}>Export to Excel</button>;
};

export default Downloadfile;
