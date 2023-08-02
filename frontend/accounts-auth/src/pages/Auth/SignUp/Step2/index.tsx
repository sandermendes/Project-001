import React, { useEffect, useState } from "react";
import { Button, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { useNavigate, useOutletContext } from "react-router-dom";

import { TranslatedString, translatedString } from "@/shared/providers/translate";
import { SIGNUP_STEP1_PATH, SIGNUP_V1_PATH } from "@/shared/constants/paths";
import { StepFormProps } from "../@types";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { z } from "zod";

function Step2() {
    const schema = z.object({
        email: z
            .string()
            .nonempty({ message: translatedString("common.fields.email.errors.nonEmpty") })
            .email({ message: translatedString("common.fields.email.errors.invalid") }),
        password: z
            .string()
            .nonempty({ message: translatedString("common.fields.password.errors.nonEmpty") }),
        confirm: z
            .string()
            .nonempty({ message: translatedString("common.fields.confirm.errors.nonEmpty") }),
    })
    .partial()
    .refine((data) => data.password === data.confirm, {
        message: translatedString("common.fields.common.passwordNotMatch"),
        path: ["password", "confirm"],
    });

    const navigate = useNavigate();
    const { handleBack, handleFinish, errors: signUpErrors, signUpData, handleInputChange } = useOutletContext<StepFormProps>();

    const [loadingSign, setLoadingSign] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errors, setErrors] = useState<z.infer<typeof schema>>()

    useEffect(() => {
        if (signUpErrors) {
            setErrors({ email: signUpErrors })
            setLoadingSign(false)
        }
    }, [signUpErrors])

    const handleClickShowPassword = () => {
        setShowPassword((prevValue) => prevValue = !prevValue);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onBackClick = () => {
        handleBack();
        navigate(`${SIGNUP_V1_PATH}/${SIGNUP_STEP1_PATH}`)
    }
    
    const onFinishClick = async () => {
        setLoadingSign(true)
        try {
            setErrors({})
            schema.parse(signUpData);

            handleFinish();
        } catch (err) {
            setLoadingSign(false)
            if (err instanceof z.ZodError) {
                /* TODO: Improve this error handling */
                err.issues.map((issue) => {
                    return issue.path.map((path) => {
                        return setErrors((prevValue) => {
                            if (prevValue && Object.keys(prevValue).find((key) => key === path))
                                return { ...prevValue };

                            return { ...prevValue, [path]: issue.message };
                        });
                    });
                });
            }
        }
    }
    
    return (
        <div style={{ width: '100%' }}>
            <Grid container style={{ marginTop: '20px' }}>
                <TextField
                    label={<TranslatedString message={"common.fields.email.label"} />}
                    id="email"
                    name="email"
                    variant="outlined"
                    style={{ width: '100%', ...(errors?.email ? {} : { marginBottom: '20px' }) }}
                    value={signUpData?.email}
                    onChange={handleInputChange}
                    disabled={loadingSign}
                    autoComplete="new-email"
                    error={Boolean(errors?.email)}
                    helperText={errors?.email}
                    />
                <FormControl variant="outlined" style={{ width: '100%' }} disabled={loadingSign}>
                    <InputLabel htmlFor="password">
                        {<TranslatedString message={"common.fields.password.label"} />}
                    </InputLabel>
                    <OutlinedInput
                        id="password"
                        name="password"
                        label={<TranslatedString message={"common.fields.password.label"} />}
                        aria-describedby="password-error-text"
                        type={showPassword ? 'text' : 'password'}
                        style={{ width: '100%' }}
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
                        error={Boolean(errors?.password)}
                    />
                    <FormHelperText
                        id="password-error-text" 
                        error={Boolean(errors?.password)}
                        style={{ 
                            ...(errors?.password ? {} : { marginBottom: '20px' }) 
                        }}
                        >
                        {errors?.password}
                    </FormHelperText>
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
                        error={Boolean(errors?.confirm)}
                    />
                    <FormHelperText
                        id="confirm-helper-text"
                        error={Boolean(errors?.confirm)}
                    >
                        {errors?.confirm}
                    </FormHelperText>
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
