import { useState } from 'react';
import { Grid, LinearProgress, MenuItem, Link, SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';

import * as S from './styles';
import Languages from 'src/shared/constants/languages';
import { IBaseSignInterface } from './interfaces/baseSign.interface';
import { ReactComponent as ProjectLogo } from 'src/assets/images/main-logo.svg';
import { TranslatedString } from 'src/shared/providers/translate';
import { brandName } from 'src/shared/constants/app';

function BaseSign(props: IBaseSignInterface) {
    const { i18n } = useTranslation()

    const [language, setLanguage] = useState(i18n.language);

    const handleLanguage = (event: SelectChangeEvent<unknown>) => {
        setLanguage((prevValue) => {
            i18n.changeLanguage(event.target.value as string);
            return prevValue = event.target.value as string
        })
    };

    return (
        <S.Root>
            <S.MainGrid container item xs={12} alignItems="center">
                <S.HeaderPaper elevation={0} variant="outlined">
                    {props.loading && (
                        <S.LoadingTopBar>
                            <LinearProgress />
                        </S.LoadingTopBar>
                    )}
                    <Grid container justifyContent="center">
                        <Grid container direction="column" justifyContent="center" alignItems="center">
                            <Grid item style={{ display: 'contents' }}>
                                <S.Logo>
                                    <ProjectLogo />
                                </S.Logo>
                                <h2 style={{ marginTop: 0, marginBottom: 0, fontSize: 30, color: '#5f5f5f' }}>{brandName}</h2>
                            </Grid>
                            <Grid item>
                                <h2 style={{ color: '#5f5f5f' }}>{props.title}</h2>
                            </Grid>
                        </Grid>
                    </Grid>
                    {props.children}
                </S.HeaderPaper>
                <S.FooterGrid justifyContent="space-between" alignItems="center">
                    <S.LanguageSelect disableUnderline variant="standard" color="primary" value={language} onChange={handleLanguage}>
                        {Languages.map((language, index) => (
                            <MenuItem key={index} value={language.localeCode}>
                                {language.localeLang} {Boolean(language.localeDesc) && `(${language.localeDesc})`}
                            </MenuItem>
                        ))}
                    </S.LanguageSelect>
                    <S.AboutTypography>
                        <Link
                            href="https://abount.localhost/TOS?loc=BR&hl=pt"
                            target="_blank"
                            underline="none"
                            onClick={(event) => event.preventDefault()}
                            color="inherit"
                        >
                            <TranslatedString message={"common.about"} />
                        </Link>
                    </S.AboutTypography>
                </S.FooterGrid>
            </S.MainGrid>
        </S.Root>
    );
}

export default BaseSign;
