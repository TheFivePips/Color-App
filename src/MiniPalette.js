import React from 'react';
// import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { Delete } from '@mui/icons-material';
import './styles/main.scss'
const MiniPalette = (props) => {

  const navigate = useNavigate()

  const {paletteName, emoji, colors, id, deletePalette} = props

  const miniColorBoxes = colors.map(color => (
    <div
      className='mini-color'
      style={{backgroundColor: color.color}}
      key={color.name}
    ></div>

  ))
  const handleDelete = (e) => {
    e.stopPropagation()
    deletePalette(id)
    
    
  }
  return (
    <div className="main" onClick={() => navigate(`/palette/${id}`)}>
        <Delete onClick={handleDelete} className='MP-deleteIcon' style={{transition: "all 0.3s ease-in-out"}}/>
      <div className="colors">{miniColorBoxes}</div>
      <h5 className="title">
        {paletteName} <span className="emoji">{emoji}</span>
      </h5>
    </div>
  );

}

export default MiniPalette;

