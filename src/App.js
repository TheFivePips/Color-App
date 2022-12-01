import React, { Component } from 'react';
import PaletteRouteDetails from './PaletteRouteDetails';
import { seedColors } from './seedColors';
import {Route, Routes} from 'react-router-dom'
import PaletteList from './PaletteList';
// import SingleColorPalette from './SingleColorPalette';
import SCPRouteDetails from './SCPRouteDetails'

class App extends Component{

  
  render() {
    return (
      <Routes>
        <Route path="/" element={<PaletteList palettes={seedColors}/>} />
        <Route
         path="/palette/:id"
          element={<PaletteRouteDetails seeds={seedColors}/>}
        />
        <Route 
          path='/palette/:id/:colorId'
          element={<SCPRouteDetails seeds={seedColors}/>}/>
        
      </Routes>
      //   <div>
      //     <Palette palette={generatePalette(seedColors[4])}/>

      //   </div>
    );
  }
}

export default App;
