import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useSearchParams } from 'react-router-dom';

import { USER_ACCOUNT_URL } from './shared/constants/url';
import SignIn from './pages/Auth/SignIn';
import SignUpBase from './pages/Auth/SignUpBase';
import NotFound from './pages/NotFound';
import { SIGNIN_PATH, SIGNUP_V1_PATH } from './shared/constants/paths';
import Step1 from './pages/Auth/SignUpBase/Step1';
import Step2 from './pages/Auth/SignUpBase/Step2';

export const getRedirectUri = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [searchParams] = useSearchParams();
    return `?redirect_uri=${encodeURIComponent(searchParams.get('redirect_uri') ?? USER_ACCOUNT_URL)}`;
};

const CustomRedirectNavigate = (props: { children?: React.ReactNode }) => {
    const redirectUri = getRedirectUri();
    console.log("redirectUri", redirectUri)
    return <Navigate replace to={`${SIGNIN_PATH}${redirectUri}`} />;
};

function AnimatedSwitch() {
    return (
        <Routes>
            <Route path="/" element={<CustomRedirectNavigate />} />
            <Route path={SIGNIN_PATH} element={<SignIn />} />
            <Route path={SIGNUP_V1_PATH} element={<SignUpBase />}>
                <Route path="step1" element={<Step1 />}/>
                <Route path="step2" element={<Step2 />}/>
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AnimatedSwitch />
        </BrowserRouter>
    );
}

export default App;
