import React from 'react'
import { useState } from 'react';
import { Popover, styled } from '@mui/material';
import { AccountCircle as AccountCircleIcon } from '@mui/icons-material';

import * as S from './styles';
import AccountMenu from './AccountMenu';

const FloatingArea = styled(Popover)(({ theme }) => ({
    width: '400px',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
}));

function RightBar() {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    const open = Boolean(anchorEl)
    const id = open ? 'account-popover' : undefined

    return (
        <>
            <S.AccountButton aria-describedby={id} onClick={handleClick}>
                <AccountCircleIcon sx={{ width: '44px', height: '44px' }}/>
            </S.AccountButton>
            <FloatingArea
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    style: {
                        width: '100%',
                    },
                }}
            >
                <AccountMenu />
            </FloatingArea>
        </>
    )
}

export default RightBar;