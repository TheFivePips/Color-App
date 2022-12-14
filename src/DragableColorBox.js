import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import './styles/main.scss'
import DeleteIcon from "@mui/icons-material/Delete";
import chroma from 'chroma-js';

const DragableColorBox = SortableElement((props) => {
    const {handleClick, color, name} = props

    const isDarkColor = chroma(color).luminance() <= 0.08;
    return (
      <div className="DCB-root" style={{ backgroundColor: color }}>
        <div className="DCB-boxContent">
          <span className={isDarkColor ? "light-text" : undefined}>{name}</span>
          <DeleteIcon className="DCB-deleteIcon" onClick={handleClick} />
        </div>
      </div>
    );
})

export default DragableColorBox;
