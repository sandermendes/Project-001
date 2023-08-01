import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import BaseSign from '../BaseSign';
import { SIGNUP_STEP1_PATH, SIGNUP_V1_PATH } from 'src/shared/constants/paths';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import "src/styles.css"
import { TranslatedString, translatedString } from 'src/shared/providers/translate';
import { ISignUp, ISignUpData, SignUp, StepFormProps } from './@types';
import { useMutation } from '@apollo/client';
import { SIGN_UP } from './graphql/signUp.graphql';
import * as validate from 'src/shared/utils/validate';

const initialSignUp: SignUp = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
    complete: false,
}

function SignUpBase() {
    const location = useLocation();
    const navigate = useNavigate();

    const [loadingSign, setLoadingSign] = useState(false);
    const [signUpData, setSignUpData] = useState<SignUp>(initialSignUp);
    const [directionStep, setDirectionStep] = useState<"prev" | "next">("next");
    const [errors, setErrors] = useState<string | null>()

    document.title = translatedString("common.pageSignUpTitle") as string

    useEffect(() => {
        if (location.pathname === SIGNUP_V1_PATH) {
            navigate(`${SIGNUP_V1_PATH}/${SIGNUP_STEP1_PATH}`)
        }
    }, [navigate, location]);

    useEffect(() => {
        if (validate.isObjEmpty(signUpData)) {
            if (location.pathname !== `${SIGNUP_V1_PATH}/${SIGNUP_STEP1_PATH}`) {
                navigate(`${SIGNUP_V1_PATH}/${SIGNUP_STEP1_PATH}`)
            }    
        }
    }, [signUpData, location, navigate])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value,
        });
    };

    const handleNext = () => {
        setDirectionStep((prevValue) => prevValue = "next");
    };

    const handleBack = () => {
        setDirectionStep((prevValue) => prevValue = "prev");
    };

    const handleFinish = async () => {
        setErrors("")
        setLoadingSign(true);

        await signUp();
    };

    const [signUp] = useMutation<ISignUpData, ISignUp>(SIGN_UP, {
        update(_, { data }) {
            if (Object(data?.register).hasOwnProperty("token")) {
                setTimeout(() => {
                    setLoadingSign(false)
                    setSignUpData((prevData) => prevData = { ...prevData, complete: true })
                    console.log("signUpData", signUpData)
                    navigate(`${SIGNUP_V1_PATH}/complete`)
                }, 1500)
            }
        },
        onError({ graphQLErrors, networkError }) {
            /* TODO: Handle with returning erros */
            setTimeout(() => {
                setLoadingSign(false);
                setErrors(graphQLErrors[0].message)
            }, 2000);

            if (networkError) {
                console.log(`[Network error]: ${networkError}`);
            }
        },
        variables: signUpData,
    });

    const stepFormProps: StepFormProps = {
        errors,
        handleNext,
        handleBack,
        handleFinish,
        handleInputChange,
        setSignUpData,
        signUpData,
    }

    return (
        <BaseSign title={<TranslatedString message={"common.createAccount"} />} width="480px" loading={loadingSign}>
            <TransitionGroup>
                <CSSTransition key={location.pathname} timeout={{ enter: 500, exit: 500 }} classNames={directionStep}>
                    <Outlet context={{...stepFormProps}} />
                </CSSTransition>
            </TransitionGroup>
        </BaseSign>
    );
}

export default SignUpBase;
