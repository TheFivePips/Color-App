import React from 'react';
// import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

import './styles/main.scss'
const MiniPalette = (props) => {

  const navigate = useNavigate()

  const {paletteName, emoji, colors, id} = props

  const miniColorBoxes = colors.map(color => (
    <div
      className='mini-color'
      style={{backgroundColor: color.color}}
      key={color.name}
    ></div>


  ))
  return (
    <div className="main" onClick={() => navigate(`/palette/${id}`)}>
      <div className="colors">{miniColorBoxes}</div>
      <h5 className="title">
        {paletteName} <span className="emoji">{emoji}</span>
      </h5>
    </div>
  );

}

export default MiniPalette;

