import { Grid, Paper, Select, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Root = styled('div')(({ theme }) => ({
    display: ['-webkit-box', '-webkit-flex', 'flex'],
    WebkitFlexDirection: 'column',
    flexDirection: 'column',
    minHeight: '100vh',
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
        '&:before, &:after': {
            content: '""',
            display: 'block',
            WebkitBoxFlex: '1',
            boxFlex: '1',
            WebkitFlexGrow: '1',
            flexGrow: '1',
            height: '24px',
        },
    },
}));

export const MainGrid = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
        width: '480px',
    },
    [theme.breakpoints.down('sm')]: {
        minHeight: '100vh',
        WebkitFlexDirection: 'column',
        flexDirection: 'column',
        width: 'unset',
    },
    margin: '0 auto',
    zIndex: 2,
}));

export const HeaderPaper = styled(Paper)(({ theme }) => ({
    height: 'auto',
    minHeight: '500px',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        padding: '25px 50px',
        position: 'relative',
    },
    [theme.breakpoints.down('sm')]: {
        paddingLeft: '24px',
        paddingRight: '24px',
        WebkitFlexGrow: 1,
        flexGrow: 1,
        border: 'unset',
        background: 'unset',
        padding: '48px 40px 36px',
    },
    '@media (max-width: 450px)': {
        padding: '24px 24px 36px',
    },
}));

export const LoadingTopBar = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('xs')]: {
        left: 0,
        top: 0,
        position: 'absolute',
        width: '100%',
        borderRadius: '3px 3px 0 0',
        overflow: 'hidden',
    },
    [theme.breakpoints.down('xs')]: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
    },
}));

export const Logo = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
        height: '100px',
        width: '100px',
    },
    [theme.breakpoints.down('sm')]: {
        height: '80px',
        width: '80px',
        backgroundSize: '80px',
    },
}));

export const FooterGrid = styled(Grid)(({ theme }) => ({
    justifyContent: 'space-between',
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
        height: '16.8px',
        padding: '10px 0 0',
    },
    width: '100%',
    fontSize: '12px',
    [theme.breakpoints.down('sm')]: {
        padding: '0 24px',
        height: '48px',
    },
}));

export const BaseTextSize = {
    fontSize: '14px',
    lineHeight: '1.4',
};

export const LanguageSelect = styled(Select)(() => BaseTextSize);

export const AboutTypography = styled(Typography)(() => BaseTextSize);
