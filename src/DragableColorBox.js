import React from 'react';
import './styles/main.scss'

const DragableColorBox = (props) => {
    return (
        <div className='DCB-root' style={{backgroundColor: props.color}}>
            {props.name}
            
        </div>
    );
}

export default DragableColorBox;
