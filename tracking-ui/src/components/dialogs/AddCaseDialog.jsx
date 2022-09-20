import React, { useState } from "react";
import { differenceInYears, format } from "date-fns";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
	Autocomplete,
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	FormControlLabel,
	Grid,
	LinearProgress,
	TextField,
	Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import {
	getAbuseTypes,
	getClients,
	getPartners,
	getPerpetrators,
	getProvinces,
	getStaff,
	// getTipTypes
} from "../../apiClient";
import { DialogSection } from "./DialogSection";
import { NewPersonDialog } from "./NewPersonDialog";

const useStyles = makeStyles((theme) => ({

	option: {
		alignItems: 'center',
		display: 'flex',
	},
	textField: {
		marginRight: theme.spacing(),
	},
}));

export const AddCaseDialog = (props) => {
	const classes = useStyles();
	const { open, onClose, onAdd } = props;

	const [provinceOptions, setProvinceOptions] = useState([]);
	const [abuseTypeOptions, setAbuseTypeOptions] = useState([]);
	// const [tipTypeOptions, setTipTypeOptions] = useState([]);
	const [StaffOptions, setStaffOptions] = useState([]);
	const [partnerOptions, setPartnerOptions] = useState([]);
	const [knownClientOptions, setKnownClientOptions] = useState([]);
	const [knownPerpetratorOptions, setKnownPerpetratorOptions] = useState([]);

	const [isValid, setIsValid] = useState(false);
	const [loading, setLoading] = useState(true);

	const [province, setProvince] = useState(null);
	const [rescueDate, setRescueDate] = useState(new Date());
	const [monthsOfAbuse, setMonthsOfAbuse] = useState(0);
	const [abuseTypes, setAbuseTypes] = useState([]);
	const [tipType, setTipType] = useState('');
	const [reportedByClient, setReportedByClient] = useState(false);
	const [staff, setStaff] = useState([]);
	const [partners, setPartners] = useState([]);
	const [knownClients, setKnownClients] = useState([]);
	const [newClients, setNewClients] = useState([]);
	const [knownPerpetrators, setKnownPerpetrators] = useState([]);
	const [newPerpetrators, setNewPerpetrators] = useState([]);

	const [newClientDialogOpen, setNewClientDialogOpen] = useState(false);
	const [newPerpetratorDialogOpen, setNewPerpetratorDialogOpen] = useState(false);

	const dateFormatString = "MM/dd/yyyy";

	const loadFormOptions = async () => {
		const dbAbuseTypes = await getAbuseTypes();
		setAbuseTypeOptions(dbAbuseTypes);
		const dbClients = await getClients();
		setKnownClientOptions(dbClients);
		const dbPartners = await getPartners();
		setPartnerOptions(dbPartners);
		const dbPerpetrators = await getPerpetrators();
		setKnownPerpetratorOptions(dbPerpetrators);
		const dbProvinces = await getProvinces();
		setProvinceOptions(dbProvinces);
		const dbStaff = await getStaff();
		setStaffOptions(dbStaff);
		// const dbTipTypes = await getTipTypes();
		// setTipTypeOptions(dbTipTypes);

		setLoading(false);
	};

	React.useEffect(() => {
		setIsValid(
			province &&
			rescueDate &&
			abuseTypes.length &&
			tipType.length &&
			staff.length &&
			[...knownClients, ...newClients].length
		)
	}, [
		province,
		rescueDate,
		monthsOfAbuse,
		abuseTypes,
		tipType,
		staff,
		knownClients,
		newClients
	]);

	React.useEffect(() => {
		loadFormOptions();
	},[props.open]);

	const clearValues = () => {
		setProvince(null);
		setRescueDate(new Date());
		setMonthsOfAbuse(0);
		setAbuseTypes([]);
		setTipType(''); // the only string here
		setReportedByClient(null);
		setStaff([]);
		setPartners([]);
		setKnownClients([]);
		setNewClients([]);
		setKnownPerpetrators([]);
		setNewPerpetrators([]);
	}

	const handleClose = () => {
		onClose();
		clearValues();
	};

	const formatPersonForApi = (p) => {
		const { first_name, last_name, gender, nationalities } = p;
		console.log(p)
		return {
			first_name,
			last_name,
			gender,
			nationalities,
			date_of_birth: format(p.date_of_birth, dateFormatString),
		}
	};

	const handleAdd = () => {
		const data = {
			province,
			rescue_date: format(rescueDate, dateFormatString),
			months_of_abuse: monthsOfAbuse,
			abuse_types: abuseTypes,
			tip_type: tipType,
			reported_by_client: reportedByClient,
			staff,
			partners,
		}

		if (newClients.length) {
			data['new_clients'] = newClients.map(formatPersonForApi);
		}
		if (knownClients.length) {
			data['known_clients'] = knownClients
		}
		if (newPerpetrators.length) {
			data['new_perpetrators'] = newPerpetrators.map(formatPersonForApi);
		}
		if (knownPerpetrators.length) {
			data['known_perpetrators'] = knownPerpetrators
		}

		onAdd(data);
		clearValues();
	};

	const calculateAge = (dob) => differenceInYears(new Date(), new Date(dob));

	const getPersonLabel = (p) => {
		// allow for a populated or unpopulated array of nationalities
		const nationalityCodes = p.nationalities.map(n => n.code ? n.code : countries.find(c => c.id === n).code)
		return `${p.first_name} ${p.last_name} (${p.gender}, ${calculateAge(p.date_of_birth)}, ${nationalityCodes.join(" & ")})`;
	}


	const countries = [
		{
			id: 1,
			name: "United States of America",
			code: "US"
		},
		{
			id: 2,
			name: "Thailand",
			code: "TH"
		},
	];

	if (loading) {
		return (<LinearProgress />)
	} else {
		return (
			<>
				<Dialog fullWidth={true} maxWidth="md" open={open} onClose={onClose}>
					<DialogTitle>New Case</DialogTitle>
					<DialogContent>
						<DialogSection
							description={<Typography variant="h5">General</Typography>}
						>
							<Grid
								container
								spacing={2}
								direction="column"
								justify="flex-start"
								alignItems="stretch"
							>
								<Grid item>
									<LocalizationProvider dateAdapter={AdapterDateFns}>
										<DatePicker
											label="Rescue Date"
											value={rescueDate}
											maxDate={new Date()}
											inputFormat={"dd-MM-yyyy"}
											onChange={(newValue) => setRescueDate(newValue)}
											renderInput={(params) => <TextField {...params} />}
										/>
									</LocalizationProvider>
								</Grid>
								<Grid item>
									<Autocomplete
										value={province}
										options={provinceOptions.map((p) => p.id)}
										filterSelectedOptions={true}
										getOptionLabel={(id) => provinceOptions.find((po) => po.id === id).hs}
										onChange={(event, province) => {
											setProvince(province || null);
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												variant="standard"
												label="Select Province"
												fullWidth
											/>
										)}
									/>
								</Grid>
								<Grid item>
									<Autocomplete
										multiple
										value={abuseTypes}
										options={abuseTypeOptions.map(at => at.id)}
										filterSelectedOptions={true}
										getOptionLabel={(id) => abuseTypeOptions.find(at => at.id === id).name}
										onChange={(event, value) => {
											setAbuseTypes(value);
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												variant="standard"
												label="Abuse Type(s)"
												fullWidth
											/>
										)}
									/>
								</Grid>
								<Grid item>
									<TextField
										id="tipType"
										fullWidth
										className={classes.textField}
										helperText={"Tip Type Heler Text"}
										label={"Tip Type"}
										name="tipType"
										onChange={(event) => setTipType(event.target.value)}
										type="text"
										value={tipType}
										variant="outlined"
									/>
								</Grid>
								<Grid item>
									<TextField
										id="abuseDuration"
										fullWidth
										className={classes.textField}
										helperText={"For less than one month enter 0"}
										label={"Abuse Duration (months)"}
										name="abuseDuration"
										onChange={(event) => setMonthsOfAbuse(Math.max(event.target.value,0))}
										type="number"
										value={monthsOfAbuse}
										variant="outlined"
									/>
								</Grid>
								<Grid item>
									<FormControlLabel
										control={
											<Checkbox
												checked={reportedByClient}
												onChange={(e) => setReportedByClient(e.target.checked)}
												name="reportedByClient"
												color="primary"
											/>
										}
										label="Self Reported"
									/>
								</Grid>
								<Grid item>
									<Autocomplete
										multiple
										value={partners}
										options={partnerOptions.map(p => p.id)}
										filterSelectedOptions={true}
										getOptionLabel={id => partnerOptions.find(po => po.id === id).name}
										onChange={(event, value) => {
											setPartners(value);
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												variant="standard"
												label="Partner Organization(s)"
												fullWidth
											/>
										)}
									/>
								</Grid>
								<Grid item>
									<Autocomplete
										multiple
										value={staff}
										options={StaffOptions.map(s => s.id)}
										filterSelectedOptions={true}
										getOptionLabel={(id) => {
											const staff = StaffOptions.find(so => so.id === id);
											return `${staff.first_name} ${staff.last_name}`
										}}
										onChange={(event, value) => {
											setStaff(value);
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												variant="standard"
												label="Staff Member(s)"
												fullWidth
											/>
										)}
									/>
								</Grid>
							</Grid>
						</DialogSection>

						<Divider />

						<DialogSection
							description={<Typography variant="h5">Client(s)</Typography>}
						>
							<Grid
								container
								spacing={2}
								direction="column"
								justify="flex-start"
								alignItems="stretch"
							>
								<Grid item>
									<Autocomplete
										multiple
										value={knownClients}
										options={knownClientOptions.map(c => c.id)}
										filterSelectedOptions={true}
										getOptionLabel={(id) => getPersonLabel(knownClientOptions.find(c => c.id === id))}
										onChange={(event, value) => {
											setKnownClients(value);
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												variant="standard"
												label="Known Client(s)"
												fullWidth
											/>
										)}
									/>
									{newClients.map(nc => (
										<Typography>{getPersonLabel(nc)}</Typography>
									))}
									<Button onClick={() => setNewClientDialogOpen(true)} disabled={false} color="primary">
										Add New Client
									</Button>
								</Grid>
							</Grid>
						</DialogSection>

						<Divider />

						<DialogSection
							description={<Typography variant="h5">Perpetrator(s)</Typography>}
						>
							<Grid
								container
								spacing={2}
								direction="column"
								justify="flex-start"
								alignItems="stretch"
							>
								<Grid item>
									<Autocomplete
										multiple
										value={knownPerpetrators}
										options={knownPerpetratorOptions.map(p => p.id)}
										filterSelectedOptions={true}
										getOptionLabel={(id) => getPersonLabel(knownPerpetratorOptions.find(p => p.id === id))}
										onChange={(event, value) => {
											setKnownPerpetrators(value);
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												variant="standard"
												label="Known Perpetrator(s)"
												fullWidth
											/>
										)}
									/>
									{newPerpetrators.map(np => (
										<Typography>{getPersonLabel(np)}</Typography>
									))}
									<Button onClick={() => setNewPerpetratorDialogOpen(true)} disabled={false} color="primary">
										Add New Perpetrator
									</Button>
								</Grid>
							</Grid>
						</DialogSection>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button onClick={handleAdd} disabled={!isValid} color="primary">
							Save Case
						</Button>
					</DialogActions>
				</Dialog>
				<NewPersonDialog
					open={newClientDialogOpen}
					onClose={() => setNewClientDialogOpen(false)}
					onAdd={(newClient) => setNewClients([...newClients, newClient])}
					nationalityOptions={countries}
					personType={"Client"}
				/>
				<NewPersonDialog
					open={newPerpetratorDialogOpen}
					onClose={() => setNewPerpetratorDialogOpen(false)}
					onAdd={(newPerp) => setNewPerpetrators([...newPerpetrators, newPerp])}
					nationalityOptions={countries}
					personType={"Perpetrator"}
				/>
			</>
		);
	}
}