import React, { useEffect, useState } from 'react';
import { Button, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useMutation, useQuery } from '@apollo/client';
import { useSearchParams } from 'react-router-dom';

import BaseSign from '../BaseSign';
import { SIGN_IN } from './graphql/signIn.graphql';
import { IIsAuthedData, ILogin, ILoginData } from './@types';
import { redirectToUserAccount } from '../../../shared/utils/url';
import { CHECK_AUTH } from './graphql/check.graphql';
import { ACCOUNTS_URL, USER_ACCOUNT_URL } from '../../../shared/constants/url';
import { TranslatedString, translatedString } from '../../../shared/providers/translate';
import { SIGNUP_V1_PATH } from '../../../../src/shared/constants/paths';

function SignIn() {
    const [searchParams] = useSearchParams();
    const [showScreen, setShowScreen] = useState(false);
    const [loadingSign, setLoadingSign] = useState(false);
    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
    });
    const { loading: loadingQueryCheckAuth, data } = useQuery<IIsAuthedData>(CHECK_AUTH);

    document.title = translatedString("common.pageSignInTitle") as string

    useEffect(() => {
        if (!loadingQueryCheckAuth) {
            if (!data?.isAuthed) {
                setShowScreen(true);
            } else {
                redirectToUserAccount(searchParams);
            }
        }
    }, [loadingQueryCheckAuth, data, searchParams]);

    useEffect(() => {
        console.log("[showScreen, searchParams]")
        if (!searchParams.get('redirect_uri')) {
            console.log("if [showScreen, searchParams]")
            const redirectUri = `redirect_uri=${encodeURIComponent(searchParams.get('redirect_uri') ?? USER_ACCOUNT_URL)}`;
            window.location.replace(`${ACCOUNTS_URL}/signin/v1/authentication?${redirectUri}`);
        }
    }, [showScreen, searchParams]);

    const [signIn] = useMutation<ILoginData, ILogin>(SIGN_IN, {
        update(_, { data }) {
            if (data?.token !== "") {
                setTimeout(() => {
                    redirectToUserAccount(searchParams);
                }, 3000);
            }
        },
        onError(/* error */) {
            /* TODO: Implement error handler */
            /*  console.log('error?.graphQLErrors[0].extensions', error?.graphQLErrors[0].extensions?.response); */
            setTimeout(() => {
                setLoadingSign(false);
            }, 2000);
        },
        variables: values,
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        setLoadingSign(true);

        await signIn();
    };

    return showScreen ? (
        <BaseSign title={<TranslatedString message={"common.title"} />} width="480px" loading={loadingSign}>
            <form onSubmit={onSubmit} style={{ width: '100%' }}>
                <Grid container style={{ marginTop: '20px' }}>
                    <TextField
                        label={<TranslatedString message={"common.fields.email.label"} />}
                        name="email"
                        variant="outlined"
                        style={{ width: '100%', marginBottom: '20px' }}
                        autoComplete="username"
                        value={values.email}
                        onChange={handleInputChange}
                        disabled={loadingSign}
                        inputProps={{
                            autoComplete: 'username',
                        }}
                    />
                    <FormControl variant="outlined" style={{ width: '100%' }} disabled={loadingSign}>
                        <InputLabel htmlFor="password">
                            {<TranslatedString message={"common.fields.password.label"} />}
                        </InputLabel>
                        <OutlinedInput
                            id="password"
                            name="password"
                            label={<TranslatedString message={"common.fields.password.label"} />}
                            autoComplete="current-password"
                            aria-describedby="password-helper-text"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleInputChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText id="password-helper-text"></FormHelperText>
                    </FormControl>
                </Grid>
                <Grid container>
                    <Typography>
                        <Link href="#" underline="none" color="primary">
                            <TranslatedString message={"common.forgotEmail"} />
                        </Link>
                    </Typography>
                </Grid>
                <Grid container justifyContent="space-between" style={{ marginTop: '20px' }}>
                    <Button href={SIGNUP_V1_PATH} type="submit" variant="text" color="primary" disableElevation style={{ left: '-8px' }}>
                        <TranslatedString message={"common.createAccount"} />
                    </Button>
                    <Button type="submit" variant="contained" color="primary" disableElevation disabled={loadingSign}>
                        <TranslatedString message={"common.enter"} />
                    </Button>
                </Grid>
            </form>
        </BaseSign>
    ) : (
        <></>
    );
}

export default SignIn;
