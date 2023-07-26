import { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useNavigate, useOutletContext } from "react-router-dom";

import { TranslatedString } from "../../../../../src/shared/providers/translate";
import { SIGNUP_V1_PATH } from "../../../../../src/shared/constants/paths";
import { StepFormProps } from "../@types";

function Step1() {
    const navigate = useNavigate();
    const { handleNext, signUpData, handleInputChange } = useOutletContext<StepFormProps>();
    const [loadingSign, setLoadingSign] = useState(false);

    const onNextClick = async () => {
        handleNext();
        navigate(`${SIGNUP_V1_PATH}/step2`);
    }

    return (
        <div style={{ width: '100%' }}>
            <Grid container style={{ marginTop: '20px' }}>
                <TextField
                    label={<TranslatedString message={"common.fields.firstName.label"} />}
                    name="firstName"
                    variant="outlined"
                    style={{ width: '100%', marginBottom: '20px' }}
                    value={signUpData?.firstName}
                    onChange={handleInputChange}
                    disabled={loadingSign}
                />
                <TextField
                    label={<TranslatedString message={"common.fields.lastName.label"} />}
                    name="lastName"
                    variant="outlined"
                    style={{ width: '100%', marginBottom: '20px' }}
                    value={signUpData?.lastName}
                    onChange={handleInputChange}
                    disabled={loadingSign}
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
