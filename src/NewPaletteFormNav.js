import { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { styled} from "@mui/material/styles";
import Button from "@mui/material/Button";

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Link } from 'react-router-dom'


const drawerWidth = 400;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
    })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default function NewPaletteFormNav (props) {

    const {open, handleDrawerOpen, handleSubmit, handleSetNewPaletteName, newPaletteName, palettes } = props


     useEffect(() => {
       ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
         palettes.every(
           ({ paletteName }) =>
             paletteName.toLowerCase() !== value.toLowerCase()
         )
       );
     }, [palettes]);


    return (
      <div>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Create a Palette
            </Typography>
            <ValidatorForm onSubmit={handleSubmit}>
              <TextValidator
                label="Palette Name"
                value={newPaletteName}
                onChange={handleSetNewPaletteName}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={[
                  "Enter Palette Name",
                  "Palette Name must be Unique",
                ]}
              />
              <Button variant="contained" color="secondary" type="submit">
                Save Palette
              </Button>
              <Link to="/">
                <Button variant="contained" color="secondary">
                  Go Back
                </Button>
              </Link>
            </ValidatorForm>
          </Toolbar>
        </AppBar>
      </div>
    );
}


