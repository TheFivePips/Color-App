import React, { Component } from 'react';
import Slider from "rc-slider";
import {Select, MenuItem, Snackbar, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from 'react-router-dom';
import "rc-slider/assets/index.css";
import "./styles/main.scss"

class Navbar extends Component {
  constructor(props){
    super(props)
    this.state = {
      format: "hex",
      open: false
    }
    this.handelFormatChange = this.handelFormatChange.bind(this)
    this.closeSnackBar = this.closeSnackBar.bind(this)

  }
  handelFormatChange(e){
    this.setState({
      format: e.target.value,
      open: true
    })
    this.props.handleChange(e.target.value)
  }
  closeSnackBar(){
    this.setState({
      open: false
    })
  }
    render() {
        const {level, changeLevel, showingAllColors} = this.props
        const {format} = this.state
        return (
          <header className="Navbar">
            <div className="logo">
              <Link to={"/Color-App/"}>reactcolorpicker</Link>
            </div>
            {showingAllColors && (
              <div className="slider-contianer">
                <span>Level:{level} </span>
                <div className="slider">
                  <Slider
                    defaultValue={level}
                    min={100}
                    max={900}
                    step={100}
                    onAfterChange={changeLevel}
                  />
                </div>
              </div>
            )}

            <div className="select-container">
              <Select value={format} onChange={this.handelFormatChange}>
                <MenuItem value="hex">HEX - #ffffff</MenuItem>
                <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
                <MenuItem value="rgba">RGBA - rgba(255,255,255,1,0)</MenuItem>
              </Select>
            </div>
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              open={this.state.open}
              autoHideDuration={3000}
              message={
                <span id="message-id">
                  Format Changed to {format.toUpperCase()}!
                </span>
              }
              ContentProps={{ "aria-describedby": "message-id" }}
              onClose={this.closeSnackBar}
              action={[
                <IconButton
                  onClick={this.closeSnackBar}
                  color="inherit"
                  key="close"
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>,
              ]}
            />
          </header>
        );
    }
}

export default Navbar;
