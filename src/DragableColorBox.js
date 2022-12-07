import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import './styles/main.scss'
import DeleteIcon from "@mui/icons-material/Delete";

const DragableColorBox = SortableElement((props) => {
    const {handleClick, color, name} = props
    return (
        <div className='DCB-root' style={{backgroundColor: color}}>
            
            <div className='DCB-boxContent'>
                <span>{name}</span>
                <DeleteIcon className='DCB-deleteIcon' onClick={handleClick}/>
            </div>
            
        </div>
    );
})

export default DragableColorBox;
