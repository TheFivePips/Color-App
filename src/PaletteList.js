import React from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette' ;
import './styles/main.scss'

const PaletteList = ({palettes, deletePalette}) => {

    
   
    
    return (
        <div className="palette-list">
        <div className="pl-container">
            <nav className="pl-nav">
            <h1>React Colors</h1>
            <Link to={'/palette/new'}>Create New Palette</Link>
            </nav>
            <div className="pl-palettes">
            {palettes.map((palette) => (
                <MiniPalette {...palette} key={palette.paletteName} deletePalette={deletePalette}/>
        
            ))}
            </div>
        </div>
        </div>
    );
    
}

export default PaletteList;
