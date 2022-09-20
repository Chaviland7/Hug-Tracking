import React, { useState } from "react";
import {
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemText,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";

const useStyles = makeStyles(()=>({
    link:{
        textDecoration:"none",
        color: "blue",
        fontSize: "20px",
    },
    icon:{
        color: "white"
    }
}));

export const DrawerComponent = () => {
	const classes = useStyles();
	const [openDrawer, setOpenDrawer] = useState(false);

	return (
		<>
			<Drawer
				open={openDrawer}
				onClose={() => setOpenDrawer(false)}
			>
				<List>
					<ListItem onClick={() => setOpenDrawer(false)}>
						<ListItemText>
							<Link to="/" className={classes.link}>Home</Link>
						</ListItemText>
					</ListItem>
					<ListItem onClick={() => setOpenDrawer(false)}>
						<ListItemText>
							<Link to="/staff" className={classes.link}>Staff</Link>
						</ListItemText>
					</ListItem>
					<ListItem onClick={() => setOpenDrawer(false)}>
						<ListItemText>
							<Link to="/cases" className={classes.link}>Cases</Link>
						</ListItemText>
					</ListItem>
				</List>
			</Drawer>
			<IconButton onClick={() => setOpenDrawer(!openDrawer)}>
				<MenuIcon className={classes.icon}/>
			</IconButton>
		</>
	);
};