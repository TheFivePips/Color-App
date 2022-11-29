import React from 'react';
// import { styled } from '@mui/material/styles';
import './MiniPalette.scss'
const MiniPalette = (props) => {

  const {paletteName, emoji, colors} = props
  const miniColorBoxes = colors.map(color => (
    <div
      className='mini-color'
      style={{backgroundColor: color.color}}
      key={color.name}
    ></div>
  ))
  return (
    <div className='main'>
      <div className='colors'>
        {miniColorBoxes}
      </div>
      <h5 className='title'>{paletteName} <span className='emoji'>{emoji}</span></h5>
    </div>
  )

}

export default MiniPalette;

