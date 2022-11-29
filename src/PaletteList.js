import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import './PaletteList.scss'

class PaletteList extends Component {
    render() {
        const {palettes} = this.props
        return (
          <div className="palette-list">
            <div className="pl-container">
              <nav className="pl-nav">
                <h1>React Colors</h1>
              </nav>
              <div className="pl-palettes">
                {palettes.map((palette) => (
                  <MiniPalette {...palette} />
                ))}
              </div>
            </div>
          </div>
        );
    }
}

export default PaletteList;
