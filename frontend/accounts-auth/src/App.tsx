import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { getRedirectUri } from '@/shared/constants/url';
import SignIn from '@/pages/Auth/SignIn';
import SignUpBase from '@/pages/Auth/SignUp';
import NotFound from '@/pages/NotFound';
import { SIGNIN_PATH, SIGNUP_V1_PATH } from '@/shared/constants/paths';
import Step1 from '@/pages/Auth/SignUp/Step1';
import Step2 from '@/pages/Auth/SignUp/Step2';
import Complete from '@/pages/Auth/SignUp/complete';

const CustomRedirectNavigate = () => {
    const redirectUri = getRedirectUri();
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
                <Route path="complete" element={<Complete />}/>
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
