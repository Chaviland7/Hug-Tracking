import React, { useState } from "react";
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
	// getCountries
} from "../../apiClient";
import { DialogSection } from "./DialogSection";

const useStyles = makeStyles((theme) => ({
	option: {
		alignItems: 'center',
		display: 'flex',
	},
	textField: {
		marginRight: theme.spacing(),
	},
}));

export const NewPersonDialog = (props) => {
	const classes = useStyles();
	const { open, onClose, onAdd, personType, nationalityOptions } = props;

	const [isValid, setIsValid] = useState(false);
	const [loading, setLoading] = useState(false);

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [dob, setDob] = useState(new Date());
	const [gender, setGender] = useState("");
	const [nationalities, setNationalities] = useState([]);

	React.useEffect(() => {
		setIsValid(
			firstName.length &&
			lastName.length &&
			gender &&
			nationalities.length
		)
		// TODO add dob validation
	}, [
		firstName,
		lastName,
		gender,
		dob,
		nationalities
	]);


	const clearValues = () => {
		setFirstName("");
		setLastName("");
		setDob(new Date());
		setGender(null);
		setNationalities([]);
	}

	const handleClose = () => {
		onClose();
		clearValues();
	};
	const handleAdd = () => {
		console.log(nationalities)
		onAdd({
			first_name: firstName,
			last_name: lastName,
			gender,
			date_of_birth: dob,
			nationalities
		});
		onClose();
	};

	if (loading) {
		return (<LinearProgress />)
	}

	// TODO
	const genders = ["M","F","O"]

	return (
		<Dialog fullWidth={true} maxWidth="md" open={open} onClose={onClose}>
			<DialogTitle>{`New ${personType}`}</DialogTitle>
			<DialogContent>
				<DialogSection
					description={null}
				>
					<Grid
						container
						spacing={2}
						direction="column"
						justify="flex-start"
						alignItems="stretch"
					>
						<Grid item>
							<TextField
								id="firstName"
								fullWidth
								className={classes.textField}
								helperText={"First Name Heler Text"}
								label={"First Name"}
								name="firstName"
								onChange={(event) => setFirstName(event.target.value)}
								type="text"
								value={firstName}
								variant="outlined"
							/>
						</Grid>
						<Grid item>
							<TextField
								id="lastName"
								fullWidth
								className={classes.textField}
								helperText={"Last Name Heler Text"}
								label={"Last Name"}
								name="lastName"
								onChange={(event) => setLastName(event.target.value)}
								type="text"
								value={lastName}
								variant="outlined"
							/>
						</Grid>
						<Grid item>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DatePicker
									label="Date Of Birth"
									value={dob}
									maxDate={new Date()}
									inputFormat={"dd-MM-yyyy"}
									onChange={(newValue) => setDob(newValue)}
									renderInput={(params) => <TextField {...params} />}
								/>
							</LocalizationProvider>
						</Grid>
						<Grid item>
							<Autocomplete
								value={gender}
								options={genders}
								onChange={(event, value) => {
									setGender(value);
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										variant="standard"
										label="Gender"
										fullWidth
									/>
								)}
							/>
						</Grid>
						<Grid item>
							<Autocomplete
								multiple
								value={nationalities}
								options={nationalityOptions.map((c) => c.id)}
								filterSelectedOptions={true}
								getOptionLabel={(id) => nationalityOptions.find((c) => c.id === id).name}
								onChange={(event, nats) => {
									setNationalities(nats);
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										variant="standard"
										label="Select Nationality"
										fullWidth
									/>
								)}
							/>
						</Grid>
					</Grid>
				</DialogSection>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleAdd} disabled={!isValid} color="primary">
					{`Add ${personType}`}
				</Button>
			</DialogActions>
		</Dialog>
	);
}