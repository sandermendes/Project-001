import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Grid, LinearProgress, MenuItem, Paper, Select, Typography, Link, SelectChangeEvent } from '@mui/material';

import Languages from '../../../shared/constants/languages';
import { IBaseSignInterface } from './interfaces/baseSign.interface';
import { ReactComponent as ProjectLogo } from '../../../assets/images/main-logo.svg';

const brandName = 'Project001';

const Root = styled('div')(({ theme }) => ({
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

const MainGrid = styled(Grid)(({ theme }) => ({
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

const HeaderPaper = styled(Paper)(({ theme }) => ({
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

const LoadingTopBar = styled('div')(({ theme }) => ({
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

const Logo = styled('div')(({ theme }) => ({
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

const FooterGrid = styled(Grid)(({ theme }) => ({
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

const BaseTextSize = {
    fontSize: '14px',
    lineHeight: '1.4',
};

const LanguageSelect = styled(Select)(() => BaseTextSize);

const AboutTypography = styled(Typography)(() => BaseTextSize);

function BaseSign(props: IBaseSignInterface) {
    const [language, setLanguage] = useState('pt-BR');

    const handleLanguage = (event: SelectChangeEvent<unknown>) => {
        setLanguage(event.target.value as string);
    };

    return (
        <Root>
            <MainGrid container item xs={12} alignItems="center">
                <HeaderPaper elevation={0} variant="outlined">
                    {props.loading && (
                        <LoadingTopBar>
                            <LinearProgress />
                        </LoadingTopBar>
                    )}
                    <Grid container justifyContent="center">
                        <Grid container direction="column" justifyContent="center" alignItems="center">
                            <Grid item style={{ display: 'contents' }}>
                                {/* {brandName === 'Project001' && <Logo />} */}
                                <Logo>
                                    <ProjectLogo />
                                </Logo>
                                <h2 style={{ marginTop: 0, marginBottom: 0, fontSize: 30, color: '#5f5f5f' }}>{brandName}</h2>
                            </Grid>
                            <Grid item>
                                <h2 style={{ color: '#5f5f5f' }}>{props.title}</h2>
                            </Grid>
                        </Grid>
                    </Grid>
                    {props.children}
                </HeaderPaper>
                <FooterGrid justifyContent="space-between" alignItems="center" style={{ justifyContent: 'space-between' }}>
                    <LanguageSelect disableUnderline variant="standard" color="primary" value={language} onChange={handleLanguage}>
                        {Languages.map((language, index) => (
                            <MenuItem key={index} value={language.localeCode}>
                                {language.localeLang} {language.displayDesc && `(${language.localeDesc})`}
                            </MenuItem>
                        ))}
                    </LanguageSelect>
                    <AboutTypography>
                        <Link
                            href="https://abount.localhost/TOS?loc=BR&hl=pt"
                            target="_blank"
                            underline="none"
                            onClick={(event) => event.preventDefault()}
                            color="inherit"
                        >
                            Sobre
                        </Link>
                    </AboutTypography>
                </FooterGrid>
            </MainGrid>
        </Root>
    );
}

export default BaseSign;
