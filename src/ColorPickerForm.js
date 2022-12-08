import React, { useEffect } from "react";
import useHandleChange from "./hooks/useHandleChange";
import Button from "@mui/material/Button";
import { HexColorPicker } from "react-colorful";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Typography from "@mui/material/Typography";
import './styles/main.scss'


const ColorPickerForm = (props) => {
    ColorPickerForm.defaultProps = {
       maxColors: 20,
    };


    const { colorsArray, handleSetColorsArray, clearColors, addRandomColor } = props

    const [currentColor, setColor] = React.useState("#aabbcc");
    const [newColorName, setNewColorName] = useHandleChange("");


    useEffect(() => {
    ValidatorForm.addValidationRule("isColorUnique", () =>
        colorsArray.every(({ color }) => color !== currentColor)
    );
    }, [colorsArray, currentColor]);

    useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) =>
        colorsArray.every( 
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
        )
    );
    }, [colorsArray]);

    // const handleSetNewColorName = (e) => {
    // setNewColorName(e);
    // };

    const handleColorChange = (newColor) => {
        setColor(newColor);
    };

    const addNewColor = () => {
      const newColor = {
        color: currentColor,
        name: newColorName,
      };
      handleSetColorsArray([...colorsArray, newColor]);
      setNewColorName("");
    };
    
  const paletteIsFull = colorsArray.length >= props.maxColors;


    return (
      <div className="CP-container">
        <Typography variant="h4">Design your Palette</Typography>
        <div className="CP-btns">
          <Button variant="contained" color="secondary" onClick={clearColors}>
            Clear Palette
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={paletteIsFull}
            onClick={addRandomColor}
          >
            Random Color
          </Button>
        </div>
        <HexColorPicker color={currentColor} onChange={handleColorChange} className='CP-picker' />
        <ValidatorForm onSubmit={addNewColor}>
          <TextValidator
            placeholder="Enter a color name"
            className="CP-colorinput"
            variant='filled'
            margin='normal'
            value={newColorName}
            onChange={setNewColorName}
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            errorMessages={[
              "This field is required",
              "The color name must be unique",
              "That color has already been used",
            ]}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: paletteIsFull ? "grey" : currentColor }}
            type="submit"
            disabled={paletteIsFull}
            className='CP-addcolor'
          >
            {paletteIsFull ? "Palette is full" : "Add Color"}
          </Button>
        </ValidatorForm>
      </div>
    );
}

export default ColorPickerForm;
