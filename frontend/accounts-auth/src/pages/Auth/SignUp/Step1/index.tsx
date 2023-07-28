import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useNavigate, useOutletContext } from "react-router-dom";

import { TranslatedString, translatedString } from "../../../../shared/providers/translate";
import { SIGNUP_STEP2_PATH, SIGNUP_V1_PATH } from "../../../../shared/constants/paths";
import { StepFormProps } from "../@types";
import { z } from "zod";

const Step1: React.FC = () => {
    const schema = z.object({
        firstName: z
            .string()
            .nonempty({ message: translatedString("common.fields.firstName.errors.nonEmpty") })
            .min(4, { message: translatedString("common.fields.firstName.errors.min") }),
        lastName: z
            .string()
            .optional(),
    }).partial();

    const navigate = useNavigate();
    const { handleNext, signUpData, handleInputChange } = useOutletContext<StepFormProps>();
    const [loadingSign, ] = useState(false);

    const [errors, setErrors] = useState<z.infer<typeof schema>>()

    const onNextClick = async () => {
        try {
            setErrors({})
            schema.parse(signUpData);

            handleNext();
            navigate(`${SIGNUP_V1_PATH}/${SIGNUP_STEP2_PATH}`);
        } catch (err) {
            if (err instanceof z.ZodError) {
                setErrors({ [err.issues[0].path[0]]: err.issues[0].message })
            }
        }
    }

    return (
        <div style={{ width: '100%' }}>
            <Grid container style={{ marginTop: '20px' }}>
                <TextField
                    label={<TranslatedString message={"common.fields.firstName.label"} />}
                    name="firstName"
                    variant="outlined"
                    style={{ width: '100%', ...(Boolean(errors?.firstName) ? {} : { marginBottom: '20px' }) }}
                    value={signUpData?.firstName}
                    onChange={handleInputChange}
                    disabled={loadingSign}
                    error={Boolean(errors?.firstName)}
                    helperText={errors?.firstName}
                />
                <TextField
                    label={<TranslatedString message={"common.fields.lastName.label"} />}
                    name="lastName"
                    variant="outlined"
                    style={{ width: '100%' }}
                    value={signUpData?.lastName}
                    onChange={handleInputChange}
                    disabled={loadingSign}
                    error={Boolean(errors?.lastName)}
                    helperText={errors?.lastName}
                />
            </Grid>
            <Grid container justifyContent="space-between" style={{ marginTop: '20px', justifyContent: 'flex-end' }}>
                <Button onClick={onNextClick} type="submit" variant="contained" color="primary" disableElevation disabled={loadingSign}>
                    <TranslatedString message={"common.next"} />
                </Button>
            </Grid>
        </div>
    );
}

export default Step1;
