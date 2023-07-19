import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import BaseSign from '../BaseSign';
import { SIGNUP_V1_PATH } from '../../../../src/shared/constants/paths';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import "../../../styles.css"

function SignUpBase() {
    console.log("SignUpBase")
    const location = useLocation();
    const navigate = useNavigate();

    const [loadingSign, setLoadingSign] = useState(false);
    // const location = useLocation();

    useEffect(() => {
        console.log("SignUpBase - location", location)
        if (location.pathname === SIGNUP_V1_PATH) {
            // window.location.replace(`${SIGNUP_V1_PATH}/step1`);
            navigate(`${SIGNUP_V1_PATH}/step1`)
        }
    }, [navigate, location]);

    return (
        <BaseSign title={/* <TranslatedString message={"common.title"} /> */ "Create account"} width="480px" loading={loadingSign}>
            <SwitchTransition /* component={Main} */>
                <CSSTransition key={location.pathname} timeout={450} classNames="page" unmountOnExit>
                    <Outlet />
                </CSSTransition>
            </SwitchTransition>
        </BaseSign>
    );
}

export default SignUpBase;
