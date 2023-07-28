import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import BaseSign from '../BaseSign';
import { SIGNUP_V1_PATH } from '../../../../src/shared/constants/paths';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import "../../../styles.css"
import { TranslatedString, translatedString } from '../../../../src/shared/providers/translate';
import { ISignUp, ISignUpData, SignUp, StepFormProps } from './@types';
import { useMutation } from '@apollo/client';
import { SIGN_UP } from './graphql/signUp.graphql';
import * as validate from '../../../../src/shared/utils/validate';

const initialSignUp: SignUp = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
}

function SignUpBase() {
    const location = useLocation();
    const navigate = useNavigate();

    const [loadingSign, setLoadingSign] = useState(false);
    const [signUpData, setSignUpData] = useState<SignUp>(initialSignUp);
    const [directionStep, setDirectionStep] = useState<"prev" | "next">("next");

    document.title = translatedString("common.pageSignUpTitle") as string

    useEffect(() => {
        if (location.pathname === SIGNUP_V1_PATH) {
            navigate(`${SIGNUP_V1_PATH}/step1`)
        }
    }, [navigate, location]);

    useEffect(() => {
        if (validate.isObjEmpty(signUpData)) {
            if (location.pathname !== `${SIGNUP_V1_PATH}/step1`) {
                navigate(`${SIGNUP_V1_PATH}/step1`)
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
        setLoadingSign(true);

        await signUp();
    };

    const [signUp] = useMutation<ISignUpData, ISignUp>(SIGN_UP, {
        update(_, { data }) {
            if (data?.token !== "") {
                /* TODO: Some redirect after success registration */
            }
        },
        onError() {
            /* TODO: Handle with returning erros */
            /*  console.log('error?.graphQLErrors[0].extensions', error?.graphQLErrors[0].extensions?.response); */
            setTimeout(() => {
                setLoadingSign(false);
            }, 2000);
        },
        variables: signUpData,
    });

    const stepFormProps: StepFormProps = {
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
