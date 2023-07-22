import { /*useEffect, */ useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useMutation /*, useQuery */ } from "@apollo/client";
import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";

import { /* IIsAuthedData, */ ILogin, ILoginData } from "../@types";
import { redirectToUserAccount } from "../../../../../src/shared/utils/url";
import { TranslatedString } from "../../../../../src/shared/providers/translate";
import { SIGN_IN } from "../graphql/signIn.graphql";
// import { CHECK_AUTH } from "../graphql/check.graphql";
import { SIGNUP_V1_PATH } from "../../../../../src/shared/constants/paths";
import { StepFormProps } from "../index";

function Step1(props: any) {
    console.log("Step1 - props", props)
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { handleNext } = useOutletContext<StepFormProps>();

    const [showScreen, setShowScreen] = useState(true);
    const [loadingSign, setLoadingSign] = useState(false);
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        showPassword: false,
    });
    // const { loading: loadingQueryCheckAuth, data } = useQuery<IIsAuthedData>(CHECK_AUTH);

    // useEffect(() => {
    //     document.title = 'Fazer login na Conta do Project001';
    // }, []);

    // useEffect(() => {
    //     if (!loadingQueryCheckAuth) {
    //         if (!data?.isAuthed) {
    //             setShowScreen(true);
    //         } else {
    //             redirectToUserAccount(searchParams);
    //         }
    //     }
    // }, [loadingQueryCheckAuth, data, searchParams]);

    // useEffect(() => {
    //     if (!searchParams.get('redirect_uri')) {
    //         const redirectUri = `?redirect_uri=${encodeURIComponent(searchParams.get('redirect_uri') ?? USER_ACCOUNT_URL)}`;
    //         window.location.replace(`${ACCOUNTS_URL}${redirectUri}`);
    //     }
    // }, [showScreen, searchParams]);

    const [signIn] = useMutation<ILoginData, ILogin>(SIGN_IN, {
        update(_, { data }) {
            if (data?.token !== "") {
                setTimeout(() => {
                    redirectToUserAccount(searchParams);
                }, 3000);
            }
        },
        onError(/* error */) {
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

    const onSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        setLoadingSign(true);

        await signIn();
    };

    return showScreen ? (
        <form onSubmit={onSubmit} style={{ width: '100%' }}>
            <Grid container style={{ marginTop: '20px' }}>
                <TextField
                    label={<TranslatedString message={"common.fields.firstName.label"} />}
                    name="firstName"
                    variant="outlined"
                    style={{ width: '100%', marginBottom: '20px' }}
                    value={values.firstName}
                    onChange={handleInputChange}
                    disabled={loadingSign}
                />
                <TextField
                    label={<TranslatedString message={"common.fields.lastName.label"} />}
                    name="lastName"
                    variant="outlined"
                    style={{ width: '100%', marginBottom: '20px' }}
                    value={values.lastName}
                    onChange={handleInputChange}
                    disabled={loadingSign}
                />
            </Grid>
            <Grid container justifyContent="space-between" style={{ marginTop: '20px', justifyContent: 'flex-end' }}>
                <Button onClick={() => {
                    handleNext();
                    navigate(`${SIGNUP_V1_PATH}/step2`);
                }} type="submit" variant="contained" color="primary" disableElevation disabled={loadingSign}>
                    <TranslatedString message={"common.next"} />
                </Button>
            </Grid>
        </form>
    ) : (
        <></>
    );
}

export default Step1;
