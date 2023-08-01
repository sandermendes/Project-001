import { Grid, Typography } from "@mui/material";
import { ReactComponent as RegistrationComplete } from 'src/assets/images/registration-complete.svg';
import { TranslatedString } from "src/shared/providers/translate";

function Complete() {
    return (
        <div style={{ width: '100%' }}>
            <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
                <RegistrationComplete width={'200px'} />
                <Typography align="center">
                    {<TranslatedString message={"common.pageComplete"} />}
                </Typography>
            </Grid>
        </div>
    );
}

export default Complete;
