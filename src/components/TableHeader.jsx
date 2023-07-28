import React from "react";

const columns = [
	{
		colId: "id",
		label: "S. No.",
	},
	{
		colId: "name",
		label: "Name",
	},
	{
		colId: "specialty",
		label: "Specialty",
	},
	{
		colId: "firm",
		label: "Firm",
	},
	{
		colId: "address",
		label: "Address",
	},
	{
		colId: "phone_number",
		label: "Contact no.",
	},
];

const TableHeader = () => {
	return (
		<tr>
			{columns.map((col) => (
				<th key={col.colId} className="px-6 py-4">
					{col.label}
				</th>
			))}
		</tr>
	);
};

export default TableHeader;
