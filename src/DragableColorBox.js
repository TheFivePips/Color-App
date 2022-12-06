import React, {forwardRef} from 'react';
import './styles/main.scss'
import DeleteIcon from "@mui/icons-material/Delete";

const DragableColorBox = forwardRef((props, ref) => {
    const {handleClick, color, name} = props
    return (
        <div className='DCB-root' style={{backgroundColor: color}} ref={ref}>
            
            <div className='DCB-boxContent'>
                <span>{name}</span>
                <DeleteIcon className='DCB-deleteIcon' onClick={handleClick}/>
            </div>
            
        </div>
    );
})

export default DragableColorBox;
