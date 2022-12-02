import React, { Component } from 'react';
import ColorBox from './colorBox';
import './styles/main.scss'
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
// import { Routes, Route } from 'react-router-dom'
// import SingleColorPalette from './SingleColorPalette';
// import { generatePalette } from './colorHelpers'; 
// import { color } from '@mui/system';
class Palette extends Component {
    constructor(props){
        super(props)
        this.state = {
            level : 500,
            format: "hex"
        }

        this.changeLevel = this.changeLevel.bind(this)
        this.changeColorFormat = this.changeColorFormat.bind(this)
    }
    changeLevel(newLevel){
        this.setState({
            level: newLevel
        })
    }
    changeColorFormat(value){
        this.setState({
            format: value
        })

    }
    render() {
        const { colors, paletteName, emoji, id } = this.props.palette
        const{ level, format } = this.state

        const colorBoxes = colors[level].map(color => {
            return <ColorBox 
                background={color[format]}
                name={color.name} 
                key={color.id}
                moreURL={`/palette/${id}/${color.id}`}
                showLink={true}
                />
            
        })

        return (
          <div className="Palette">
            <Navbar
              level={level}
              changeLevel={this.changeLevel}
              handleChange={this.changeColorFormat}
              showingAllColors={true}
            />
            <div className="Palette-colors">{colorBoxes}</div>
            <PaletteFooter paletteName={paletteName} emoji={emoji}/>
            
          </div>
        );
    }
}

export default Palette;
