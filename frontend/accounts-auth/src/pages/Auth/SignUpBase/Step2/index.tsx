import React, { useState } from "react";
import { Button, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { useNavigate, useOutletContext } from "react-router-dom";

import { TranslatedString } from "../../../../shared/providers/translate";
import { SIGNUP_V1_PATH } from "../../../../../src/shared/constants/paths";
import { StepFormProps } from "../@types";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Step2() {
    const navigate = useNavigate();
    const { handleBack, handleFinish, signUpData, handleInputChange } = useOutletContext<StepFormProps>();

    const [loadingSign, setLoadingSign] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = () => {
        setShowPassword((prevValue) => prevValue = !prevValue);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onBackClick = () => {
        handleBack();
        navigate(`${SIGNUP_V1_PATH}/step1`)
    }
    
    const onFinishClick = async () => {
        handleFinish();
    }
    
    return (
        <div style={{ width: '100%' }}>
            <Grid container style={{ marginTop: '20px' }}>
                <TextField
                    label={<TranslatedString message={"common.fields.email.label"} />}
                    id="email"
                    name="email"
                    variant="outlined"
                    style={{ width: '100%', marginBottom: '20px' }}
                    value={signUpData?.email}
                    onChange={handleInputChange}
                    disabled={loadingSign}
                    autoComplete="new-email"
                    />
                <FormControl variant="outlined" style={{ width: '100%' }} disabled={loadingSign}>
                    <InputLabel htmlFor="password">
                        {<TranslatedString message={"common.fields.password.label"} />}
                    </InputLabel>
                    <OutlinedInput
                        id="password"
                        name="password"
                        label={<TranslatedString message={"common.fields.password.label"} />}
                        aria-describedby="password-helper-text"
                        type={showPassword ? 'text' : 'password'}
                        style={{ width: '100%', marginBottom: '20px' }}
                        value={signUpData?.password}
                        onChange={handleInputChange}
                        autoComplete="new-password"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <FormHelperText id="password-helper-text"></FormHelperText>
                </FormControl>
                <FormControl variant="outlined" style={{ width: '100%' }} disabled={loadingSign}>
                    <InputLabel htmlFor="confirm">
                        {<TranslatedString message={"common.fields.confirm.label"} />}
                    </InputLabel>
                    <OutlinedInput
                        id="confirm"
                        name="confirm"
                        label={<TranslatedString message={"common.fields.confirm.label"} />}
                        aria-describedby="confirm-helper-text"
                        type={showPassword ? 'text' : 'password'}
                        value={signUpData?.confirm}
                        onChange={handleInputChange}
                        autoComplete="new-confirm"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle confirm visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <FormHelperText id="password-helper-text"></FormHelperText>
                </FormControl>
            </Grid>
            <Grid container justifyContent="space-between" style={{ marginTop: '20px' }}>
                <Button onClick={onBackClick} variant="outlined" color="primary" disableElevation disabled={loadingSign}>
                    <TranslatedString message={"common.prev"} />
                </Button>
                <Button onClick={onFinishClick} variant="contained" color="primary" disableElevation disabled={loadingSign}>
                    <TranslatedString message={"common.finish"} />
                </Button>
            </Grid>
        </div>
    );
}

export default Step2;
