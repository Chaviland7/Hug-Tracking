import React, { useState } from "react";
import MaterialTable from 'material-table'
import { Card } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { getStaff } from "../apiClient";
import { tableIcons } from "./Helpers";

const useStyles = makeStyles(()=>({
    container:{
        margin: "2em",
        passing: "2em",
    },
}));

export const Staff = () => {
	const classes = useStyles();
	const [staff, setStaff] = useState([]);

	const loadStaff = async () => {
		const dbStaff = await getStaff();
		setStaff(dbStaff);
	}

	React.useEffect(() => {
		loadStaff();
	},[]);

	const columns = [
		{ title: "ID", field:"id", type: "numeric"},
		{ title: "First Name", field:"first_name"},
		{ title: "Last Name", field:"last_name"},
		{ title: "Email", field:"email"},
		{ title: "Genger", field:"gender"},
		{ title: "Preferred Language", field:"language"},
	]
	
	return (
		<Card className={classes.container}>
			<MaterialTable
				icons={tableIcons}
				title="Staff Members"
				data={staff}
				columns={columns}
			/>
		</Card>
	);
}