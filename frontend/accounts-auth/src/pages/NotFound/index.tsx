import React, { useEffect } from 'react';
import BaseSign from '../Auth/BaseSign';
import { styled } from '@mui/material/styles';

const Root = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'center',
}));

// const Image = styled('div')(() => ({
//     backgroundImage: 'url(../../error-not-found.gif)',
//     backgroundRepeat: 'no-repeat',
//     height: '165px',
//     width: '201px',
// }));

function NotFound() {
    useEffect(() => {
        document.title = 'Ahhh... Não';
    }, []);

    return (
        <BaseSign>
            <div>
                <h1 style={{ textAlign: 'center' }}>Sorry, can´t find that.</h1>
                <Root></Root>
            </div>
        </BaseSign>
    );
}

export default NotFound;
