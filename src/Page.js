import React from 'react';
import "./styles/main.scss"

const Page = ({children}) => {
    return (
        <section className='page'>{children}</section>
    );
}

export default Page;
