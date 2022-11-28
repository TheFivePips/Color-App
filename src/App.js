import React, { Component } from 'react';
import PaletteRouteDetails from './PaletteRouteDetails';
import { seedColors } from './seedColors';
import {Route, Routes} from 'react-router-dom'
import PaletteList from './PaletteList';

class App extends Component{

  
  render() {
    return (
      <Routes>
        <Route exact path="/" element={<PaletteList palettes={seedColors}/>} />
        <Route
          exact
          path="/palette/:id"
          element={<PaletteRouteDetails seeds={seedColors}/>}
        />
      </Routes>
      //   <div>
      //     <Palette palette={generatePalette(seedColors[4])}/>

      //   </div>
    );
  }
}

export default App;
