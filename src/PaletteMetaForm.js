import React, {useEffect} from "react";
import useHandleChange from "./hooks/useHandleChange";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import { useNavigate } from "react-router";

const PaletteMetaForm = (props) => {
    const { palettes, colorsArray, savePalette} = props

    const [open, setOpen] = React.useState(false);
    const [newPaletteName, setNewPaletteName] = useHandleChange("");


    useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
        palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
        )
    );
    }, [palettes]);

    const navigate = useNavigate();


    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };

    const handleSetNewPaletteName = (e) => {
        setNewPaletteName(e);
    }; 

    const handleSubmit = () => {
        const newName = newPaletteName;
        const newPalette = {
        paletteName: newName,
        id: newName.toLowerCase().replace(/ /g, "-"),
        colors: colorsArray,
        };
        savePalette(newPalette);
        navigate("/");
    };

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                Save Palette
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Please Enter A Name For Your Palette
                </DialogContentText>
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
                </ValidatorForm>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </div>
    );

}

export default PaletteMetaForm;
