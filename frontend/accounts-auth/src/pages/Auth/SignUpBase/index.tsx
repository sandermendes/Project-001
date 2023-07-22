import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import BaseSign from '../BaseSign';
import { SIGNUP_V1_PATH } from '../../../../src/shared/constants/paths';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import "../../../styles.css"
import { TranslatedString } from '../../../../src/shared/providers/translate';

export interface StepFormProps {
    handleNext: () => void;
    handleBack: () => void;
}

function SignUpBase() {
    console.log("SignUpBase")
    const location = useLocation();
    const navigate = useNavigate();

    const [loadingSign, setLoadingSign] = useState(false);
    const [activeStep, setActiveStep] = useState<number>(0);
    const [directionStep, setDirectionStep] = useState<"prev" | "next">("next");

    // const location = useLocation();

    useEffect(() => {
        console.log("SignUpBase - location", location)
        if (location.pathname === SIGNUP_V1_PATH) {
            // window.location.replace(`${SIGNUP_V1_PATH}/step1`);
            navigate(`${SIGNUP_V1_PATH}/step1`)
        }
    }, [navigate, location]);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setDirectionStep((prevValue) => prevValue = "next")
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setDirectionStep((prevValue) => prevValue = "prev")
    };

    const stepFormProps: StepFormProps = {
        handleNext,
        handleBack,
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
