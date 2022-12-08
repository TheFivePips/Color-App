
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { styled} from "@mui/material/styles";
import Button from "@mui/material/Button";

import { Link } from 'react-router-dom'
import "./styles/main.scss";
import PaletteMetaForm from "./PaletteMetaForm";



const drawerWidth = 400;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
    })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'Center',
    height: '64px',
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

    const {open, handleDrawerOpen, palettes, colorsArray, savePalette } = props

    const [formShowing, setFormShowing] = React.useState(false)
     
    const showForm = () => {
      setFormShowing(true)
    }

    const hideForm = () => {
      console.log("hidden");
      setFormShowing(false)
    }

    return (
      <div className="NPFN-root">
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
          </Toolbar>
          <div className="NPFN-nav-btns">
            <Link to="/">
              <Button variant="contained" color="secondary">
                Go Back
              </Button>
            </Link>
            <Button
              variant="contained"
              color="secondary"
              onClick={showForm}
            >
              Save Palette
            </Button>
          </div>
        </AppBar>
        {formShowing && (<PaletteMetaForm
          hideForm={hideForm}
          palettes={palettes}
          colorsArray={colorsArray}
          savePalette={savePalette}
        />)}
      </div>
    );
}


