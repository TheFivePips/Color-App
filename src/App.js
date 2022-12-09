import React, { Component } from 'react';
import PaletteRouteDetails from './PaletteRouteDetails';
import { seedColors } from './seedColors';
import {Route, Routes} from 'react-router-dom'
import PaletteList from './PaletteList';
// import SingleColorPalette from './SingleColorPalette';
import SCPRouteDetails from './SCPRouteDetails'
import NewPaletteForm from './NewPaletteForm';

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      palettes: seedColors
    }
    this.savePalette = this.savePalette.bind(this)
  }

  savePalette(newPalette){
    this.setState({
      palettes : [...this.state.palettes, newPalette]
    })
  }
  
  render() {
    return (
      <Routes>
        <Route path="/" element={<PaletteList palettes={this.state.palettes}/>} />
        <Route
         path="/palette/:id"
          element={<PaletteRouteDetails seeds={this.state.palettes}/>}
        />
        <Route 
          path='/palette/:id/:colorId'
          element={<SCPRouteDetails seeds={this.state.palettes}/>}/>
        <Route path='/palette/new' element={<NewPaletteForm savePalette={this.savePalette} palettes={this.state.palettes}/>}/>
      </Routes>
    );
  }
}

export default App;
