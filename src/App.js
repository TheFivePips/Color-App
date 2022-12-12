import React, { useState } from 'react';
import PaletteRouteDetails from './PaletteRouteDetails';
import { seedColors } from './seedColors';
import {Route, Routes, useLocation } from 'react-router-dom'
import PaletteList from './PaletteList';
// import SingleColorPalette from './SingleColorPalette';
import SCPRouteDetails from './SCPRouteDetails'
import NewPaletteForm from './NewPaletteForm';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

function App() {
  
  const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'))
    
  const [palettes, setPalettes] = useState(savedPalettes || seedColors)
    
  const location = useLocation()

  const savePalette = (newPalette) => {
    // pass synclocalstorage as a callback to guraentee the palettes get saved in the correct order 
    setPalettes([...palettes, newPalette],
    syncLocalStorage) 
  }
  
  const syncLocalStorage = () => {
    window.localStorage.setItem('palettes', JSON.stringify(palettes))
  }

  const deletePalette = (id) => {
    setPalettes(palettes.filter(p => p.id !== id))
    syncLocalStorage()
  }
  
  return (
    <SwitchTransition>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Routes location={location}>
          <Route
            path="/"
            element={
              <PaletteList
                palettes={palettes}
                deletePalette={deletePalette}
              />
            }
          />
          <Route
            path="/palette/:id"
            element={<PaletteRouteDetails seeds={palettes} />}
          />
          <Route
            path="/palette/:id/:colorId"
            element={<SCPRouteDetails seeds={palettes} />}
          />
          <Route
            path="/palette/new"
            element={
              <NewPaletteForm
                savePalette={savePalette}
                palettes={palettes}
              />
            }
          />
        </Routes>
      </CSSTransition>
    </SwitchTransition>
  );
  
}

export default App;
