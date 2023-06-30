import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useSearchParams } from 'react-router-dom';
import SignIn from './pages/Auth/SignIn';
import NotFound from './pages/NotFound';
import { USER_ACCOUNT_URL } from './shared/constants/url';

export const getRedirectUri = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [searchParams] = useSearchParams();
    return `?redirect_uri=${encodeURIComponent(searchParams.get('redirect_uri') ?? USER_ACCOUNT_URL)}`;
};

const CustomRedirectNavigate = () => {
    const redirectUri = getRedirectUri();
    console.log("redirectUri", redirectUri)
    return <Navigate replace to={`/signin/v1/identifier${redirectUri}`} />;
};

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<CustomRedirectNavigate />} />
                    <Route path="/signin/v1/identifier" element={<SignIn />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
