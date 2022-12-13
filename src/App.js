import React, { useState } from 'react';
import PaletteRouteDetails from './PaletteRouteDetails';
import { seedColors } from './seedColors';
import {Route, Routes, useLocation } from 'react-router-dom'
import PaletteList from './PaletteList';
// import SingleColorPalette from './SingleColorPalette';
import SCPRouteDetails from './SCPRouteDetails'
import NewPaletteForm from './NewPaletteForm';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Page from './Page';

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
            path="/Color-App"
            element={
              <Page>
                <PaletteList
                  palettes={palettes}
                  deletePalette={deletePalette}
                />
              </Page>
            }
          />
          <Route
            path="/Color-App/palette/:id"
            element={
              <Page>
                <PaletteRouteDetails seeds={palettes} />
              </Page>
            }
          />
          <Route
            path="/Color-App/palette/:id/:colorId"
            element={
              <Page>
                <SCPRouteDetails seeds={palettes} />
              </Page>
            }
          />
          <Route
            path="/Color-App/palette/new"
            element={
              <NewPaletteForm savePalette={savePalette} palettes={palettes} />
            }
          />
        </Routes>
      </CSSTransition>
    </SwitchTransition>
  );
  
}

export default App;
