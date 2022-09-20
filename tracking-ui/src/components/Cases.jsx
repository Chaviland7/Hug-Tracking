import { format } from "date-fns";
import React, { useState } from "react";
import MaterialTable from "material-table"
import {
	Card,
	Icon,
	Typography,
	Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { createCase, getCases } from "../apiClient";
import { AddCaseDialog } from "./dialogs/AddCaseDialog";
import { tableIcons } from "./Helpers";

const useStyles = makeStyles(()=>({
	addCaseButton: {
		margin:"1em !important",
	},
    table: {
        margin: "2em",
        padding: "2em",
    },
}));

export const Cases = () => {
	const classes = useStyles();
	const [addCaseDialogOpen, setAddCaseDialogOpen] = useState(false);
	const [cases, setCases] = useState([]);

	const loadCases = async () => {
		const dbCases = await getCases();
		setCases(dbCases);
	}

	React.useEffect(() => {
		loadCases();
	},[]);

	const handleAddCase = async (newCase) => {
		await createCase(newCase);
		loadCases();
		setAddCaseDialogOpen(false);
	}

	const renderDuration = (inputMonths) => {
		const years = Math.floor(inputMonths / 12);
		const months = inputMonths % 12;
		return (
			<>
				{years > 0 && (
					<Typography>{years} years</Typography>
				)}
				{months > 0 && (
					<Typography>{months} months</Typography>
				)}
			</>
		)
	}
	const renderDate = (date) => <Typography>{format(new Date(date), 'MMM dd yy')}</Typography>;
	const renderPeople = (people) => people.length ? people.map((p) => <Typography>{p.first_name} {p.last_name}</Typography>) : <Typography>(None)</Typography>;
	const renderPartners = (partners) => partners.length ? partners.map((p) => <Typography>{p.name} ({p.country})</Typography>): <Typography>(None)</Typography>;
	const renderAbuseTypes = (types) => types.map((t) => <Typography>{t.name}</Typography>)

	const columns = [
		// { title: "ID", field:"id", type: "numeric"},
		{ title: "Rescue Date", field:"rescue_date", render: d => renderDate(d.rescue_date)},
		{ title: "Province", field:"province", render: d => <Typography>{d.province.hs}</Typography>},
		{ title: "Client(s)", field:"clients", render: d => renderPeople(d.clients)},
		{ title: "Perpetrator(s)", field:"perpetrators", render: d => renderPeople(d.perpetrators)},
		{ title: "Abuse Duration", field:"months_of_abuse", render: d => renderDuration(d.months_of_abuse)},
		{ title: "Tip Type", field:"tip_type"},
		{ title: "Reported By Client", field:"reported_by_client"},
		{ title: "Abuse Type(s)", field:"abuse_types", render: d => renderAbuseTypes(d.abuse_types)},
		{ title: "Staff Members", field:"staff", render: d => renderPeople(d.staff)},
		{ title: "Partner(s)", field:"partners", render: d => renderPartners(d.partners)},
		{ title: "Court Cases(s)", field:"court_cases"},
	]
	
	return (
		<>
			<MaterialTable
				className={classes.table}
				icons={tableIcons}
				title="All Cases"
				data={cases}
				columns={columns}
			/>
			<Button
				className={classes.addCaseButton}
				color="primary"
				size="medium"
				variant="contained"
				onClick={() => setAddCaseDialogOpen(true)}
			>
				New Case
			</Button>
			<AddCaseDialog
				open={addCaseDialogOpen}
				onClose={() => setAddCaseDialogOpen(false)}
				onAdd={(newCase) => handleAddCase(newCase)}
			/>
		</>
	);
}