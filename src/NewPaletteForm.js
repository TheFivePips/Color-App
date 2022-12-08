import React from 'react';
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import DraggableColorList from './DraggableColorList';

import { arrayMoveImmutable } from 'array-move';
import NewPaletteFormNav from './NewPaletteFormNav';
import ColorPickerForm from './ColorPickerForm';


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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));


export default function NewPaletteForm(props) {

 
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const [colorsArray, setColorsArray] = React.useState(props.palettes[0].colors)



   
 

  const handleSetColorsArray = (arr) => {
    setColorsArray(arr)
  }

  const  handleDrawerOpen = () => {
    setOpen(true);
  }

  const handleDrawerClose = () => {
    setOpen(false);
  };

 

  const removeColor = (colorName) => {
    setColorsArray(
      colorsArray.filter(color => color.name !== colorName)
    )
  }

  const onSortEnd = ({oldIndex, newIndex}) => {
    setColorsArray(
      arrayMoveImmutable(colorsArray, oldIndex, newIndex)
    )
  }
  const clearColors =() => {
    setColorsArray([])
  }

  const addRandomColor = () => {
    const allColors = props.palettes.map(p => p.colors).flat()
    const rand = Math.floor(Math.random() * allColors.length)
    let randomColor = allColors[rand]
    // just adding some slightly better randomization
    if(colorsArray.includes(randomColor)){
      randomColor = allColors[rand + rand]
      setColorsArray([...colorsArray, randomColor]);
    } else {
      setColorsArray([...colorsArray, randomColor]);
    }
    
  }
  
  return (
    <Box sx={{ display: "flex" }}>
      <NewPaletteFormNav 
        drawerWidth={drawerWidth} 
        open={open}
        colorsArray={colorsArray}
        handleDrawerOpen={handleDrawerOpen}
        savePalette={props.savePalette}
        palettes={props.palettes}
      />
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
        

       <ColorPickerForm 
          colorsArray={colorsArray}
          handleSetColorsArray={handleSetColorsArray}
          clearColors={clearColors}
          addRandomColor={addRandomColor}
       />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <DraggableColorList
          colors={colorsArray}
          removeColor={removeColor}
          axis="xy"
          onSortEnd={onSortEnd}
        />
      </Main>
    </Box>
  );
}


