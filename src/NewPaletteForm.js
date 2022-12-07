import React, { useEffect } from 'react';
import useHandleChange from './hooks/useHandleChange';
import { useNavigate } from 'react-router';
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Button from "@mui/material/Button";
import DraggableColorList from './DraggableColorList';
import { HexColorPicker } from "react-colorful";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { arrayMove } from 'react-sortable-hoc';



const drawerWidth = 400;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    height: "calc(100vh - 64px)",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));


export default function NewPaletteForm(props) {

  NewPaletteForm.defaultProps = {
    maxColors: 20,
  };
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [colorsArray, setColorsArray] = React.useState(props.palettes[0].colors)
  const [currentColor, setColor] = React.useState("#aabbcc");

  const [newColorName, setNewColorName] = useHandleChange("")
  const [newPaletteName, setNewPaletteName] = useHandleChange("");


  const navigate = useNavigate();


  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) =>
      colorsArray.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );
  }, [colorsArray]);

  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
      props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }, [props.palettes]);

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorUnique", () =>
      colorsArray.every(
        ({ color }) => color !== currentColor
      )
      );
  }, [colorsArray, currentColor]);
  
   
    
  function handleDrawerOpen() {
    setOpen(true);
  }

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleColorChange = (newColor) => {
    setColor(newColor)
  }

  const addNewColor = () => {
    const newColor = {
        color: currentColor,
        name: newColorName
    }
    setColorsArray([...colorsArray, newColor])
    setNewColorName('')
    
  }

  const handleSubmit= () => {
    const newName = newPaletteName;
    const newPalette = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, "-"),
      colors: colorsArray
    }
    props.savePalette(newPalette)
    navigate('/')
  }

  const removeColor = (colorName) => {
    setColorsArray(
      colorsArray.filter(color => color.name !== colorName)
    )
  }

  const onSortEnd = ({oldIndex, newIndex}) => {
    setColorsArray(
      arrayMove(colorsArray, oldIndex, newIndex)
    )
  }
  const clearColors =() => {
    setColorsArray([])
  }

  const addRandomColor = () => {
    const allColors = props.palettes.map(p => p.colors).flat()
    const rand = Math.floor(Math.random() * allColors.length)
    const randomColor = allColors[rand]
    setColorsArray(
      [...colorsArray, randomColor]
    )
  }
  const paletteIsFull = colorsArray.length >= props.maxColors;
  
  return (
    <Box sx={{ display: "flex" }}>
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
              onChange={setNewPaletteName}
              validators={["required", "isPaletteNameUnique" ]}
              errorMessages={["Enter Palette Name", "Palette Name must be Unique"]}
            />
            <Button variant="contained" color="secondary" type='submit'>
              Save Palette
            </Button>
          </ValidatorForm>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Typography variant="h4">Design your Palette</Typography>
        <div>
          <Button variant="contained" color="secondary" onClick={clearColors}>
            Clear Palette
          </Button>
          <Button variant="contained" color="primary" disabled={paletteIsFull} onClick={addRandomColor}>
            Random Color
          </Button>
        </div>

        <HexColorPicker color={currentColor} onChange={handleColorChange} />
        <ValidatorForm onSubmit={addNewColor}>
          <TextValidator
            value={newColorName}
            onChange={setNewColorName}
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            errorMessages={[
              "This field is required",
              "The color name must be unique",
              "That color has already been used"
            ]}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: paletteIsFull? 'grey' : currentColor }}
            type="submit"
            disabled={paletteIsFull}
            
          >
            {paletteIsFull? 'Palette is full' : 'Add Color'}
          </Button>
        </ValidatorForm>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <DraggableColorList
         colors={colorsArray}
         removeColor={removeColor}
         axis='xy'
         onSortEnd={onSortEnd}
        />
        
      </Main>
    </Box>
  );
}


