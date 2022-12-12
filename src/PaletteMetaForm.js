import React, {useEffect} from "react";
import useHandleChange from "./hooks/useHandleChange";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useNavigate } from "react-router";

const PaletteMetaForm = (props) => {
    const { palettes, colorsArray, savePalette, hideForm } = props

    const [open, setopen] = React.useState('form');
    const [newPaletteName, setNewPaletteName] = useHandleChange("");


    useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
        palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
        )
    );
    }, [palettes]);

    const navigate = useNavigate();


    const handleClose = () => {
    setopen(false);
    };

    const handleSetNewPaletteName = (e) => {
        setNewPaletteName(e);
    }; 

     
    
    const handleSubmit = (emoji) => {
        
        const newName = newPaletteName;
        const newPalette = {
        paletteName: newName,
        id: newName.toLowerCase().replace(/ /g, "-"),
        colors: colorsArray,
        emoji: emoji.native
        };
        savePalette(newPalette);
        setopen('')
        navigate("/");
    };
    const showEmojiPicker =() => {
        setopen('emoji')
        
    }

    return (
      <div>
        <Dialog open={open === 'emoji'}>
          <DialogTitle style={{backgroundColor:"black", color:"white"}}>Please Choose a Palette Emoji</DialogTitle>
          <Picker 
            data={data} 
            onEmojiSelect={handleSubmit}
          />
        </Dialog>
        <Dialog open={open === 'form'} onClose={handleClose}>
          <ValidatorForm onSubmit={showEmojiPicker}>
            <DialogContent>
              <DialogTitle>Choose A Palette Name</DialogTitle>

              <TextValidator
                label="Palette Name"
                value={newPaletteName}
                onChange={handleSetNewPaletteName}
                fullWidth
                margin="normal"
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={[
                  "Enter Palette Name",
                  "Palette Name must be Unique",
                ]}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={hideForm}>Cancel</Button>
              <Button variant="contained" color="secondary" type="submit">
                Save Palette
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    );

}

export default PaletteMetaForm;
