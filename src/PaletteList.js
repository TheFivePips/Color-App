import React from 'react';
// import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette' ;
// import { Link } from 'react-router-dom'
import './PaletteList.scss'

const PaletteList = ({palettes}) => {

    
   
    
    return (
        <div className="palette-list">
        <div className="pl-container">
            <nav className="pl-nav">
            <h1>React Colors</h1>
            </nav>
            <div className="pl-palettes">
            {palettes.map((palette) => (
                <MiniPalette {...palette} key={palette.paletteName}/>
        
            ))}
            </div>
        </div>
        </div>
    );
    
}

export default PaletteList;
