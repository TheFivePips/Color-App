import {useState} from 'react'


function useHandleChange(initialValue){
    const [value, setValue] = useState(initialValue)

    const handleChange = e => {
        setValue(e.target.value)
    };
    return [value, handleChange]

};

export default useHandleChange