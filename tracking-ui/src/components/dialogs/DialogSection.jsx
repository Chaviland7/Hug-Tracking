import * as React from 'react';

import { Divider, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
	content: {
		padding: theme.spacing(2)
	},
	description: {
		padding: theme.spacing(2)
	}
}));

export const DialogSection = (props) => {
	const { description, children } = props;
	const classes = useStyles(props);
	return (
		<Grid
			container
			direction="row"
			alignItems="stretch"
			justify="space-between"
		>
			{description ? (
				<>
					<Grid item xs={4} className={classes.description}>
						{description}
					</Grid><Grid item>
						<Divider orientation="vertical" />
					</Grid>
					<Grid item xs={7} className={classes.content}>
						{children}
					</Grid>
				</>
			) : (
				<Grid item xs={11} className={classes.content}>
					{children}
				</Grid>
			)}

			
		</Grid>
	);
};